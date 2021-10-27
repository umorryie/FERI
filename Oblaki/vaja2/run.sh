#!/bin/bash
cat $0 | sed -n -e 63,75p > Dockerfile

N=100
rac_array=()
out_file=out2.txt

echo " StrictHostKeyChecking no" > /home/matej/.ssh/config
sudo docker rm -f $(docker ps -a -q)
echo "/home/matej/.ssh/id_rsa" | sudo ssh-keygen -t rsa -b 4096 -C "matej.pesjak@student.um.si" -y
cp /home/matej/.ssh/id_rsa.pub id_rsa.pub
sudo docker build -t exercise11 .

for (( index=1; index<=$N; index++ ))
do
    rac_name=rac$index
    rac_array[$index]=$rac_name
    sudo docker run -t -d -p 22 --name $rac_name exercise11
done

for rac in ${rac_array[@]};
do
    sudo docker cp $rac:/home/sshuser/.ssh/id_rsa.pub temp.pub

    for cluster_rac in ${rac_array[@]};
    do
        if [ "$cluster_rac" != "$rac" ]
        then
            dockerIp=$(sudo docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $cluster_rac)

            ssh sshuser@$dockerIp "echo \"`cat temp.pub`\" >> .ssh/authorized_keys"
        fi
    done
    #echo $(cat temp.pub) >> /home/matej/.ssh/authorized_keys
    rm -rf temp.pub
done

for rac in ${rac_array[@]};
do
    paralel_racs="-i "

    for cluster_rac in ${rac_array[@]};
    do
        if [ "$cluster_rac" != "$rac" ]
        then
            dockerIp=$(sudo docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $cluster_rac)
            paralel_racs+="-H sshuser@$dockerIp "
        fi
    done
    paralel_racs+=" hostname -I"

    dockerIp=$(sudo docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $rac)

    paralel_command=$(echo ssh sshuser@$dockerIp parallel-ssh $paralel_racs)
    echo "Executing: $paralel_command" >> $out_file
    $paralel_command >> $out_file
done

rm -rf id_rsa.pub
rm -rf Dockerfile
exit

FROM ubuntu:latest
RUN apt-get update && apt-get install -y openssh-server
RUN apt-get install -y pssh
RUN sed -i 's/PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config
RUN useradd -m -s /bin/bash sshuser
RUN echo "sshuser:password" | chpasswd
COPY id_rsa.pub /home/sshuser/.ssh/authorized_keys
RUN chown -R sshuser:sshuser /home/sshuser/.ssh
RUN chmod 600 /home/sshuser/.ssh/authorized_keys
RUN echo "/home/sshuser/.ssh/id_rsa" | ssh-keygen -t rsa -b 4096 -C "matej.pesjak@student.um.si"
RUN chown sshuser:sshuser /home/sshuser/.ssh/id_rsa
RUN echo " StrictHostKeyChecking no" >> /home/sshuser/.ssh/config
ENTRYPOINT service ssh start && bash
