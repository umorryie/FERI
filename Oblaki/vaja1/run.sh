#!/bin/bash
cat $0 | sed -n -e 16,24p > Dockerfile

docker rm -f $(docker ps -a -q)
echo "/home/matej/.ssh/id_rsa" | sudo ssh-keygen -t rsa -b 4096 -C "matej.pesjak@student.um.si"
cp /home/matej/.ssh/id_rsa.pub id_rsa.pub
docker build -t exercise1 .
docker run -t -d -p 22 --name exercise1 exercise1
dockerIp=$(docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' exercise1)
#rm -rf /home/matej/.ssh/known_hosts
#touch /home/matej/.ssh/known_hosts
#ssh-keygen -f "/home/matej/.ssh/known_hosts" -R \"$dockerIp\"
ssh sshuser@$dockerIp
exit

FROM ubuntu:latest
RUN apt-get update && apt-get install -y openssh-server
RUN sed -i 's/PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config
RUN useradd -m -s /bin/bash sshuser
RUN echo "sshuser:password" | chpasswd
COPY id_rsa.pub /home/sshuser/.ssh/authorized_keys
RUN chown -R sshuser:sshuser /home/sshuser/.ssh
RUN chmod 600 /home/sshuser/.ssh/authorized_keys
ENTRYPOINT service ssh start && bash
