## Give permission to run script

`chmod u+x run.sh `
`./run.sh`

## Build docker image

`docker build -t exercise1 .`

## Run docker image and access the container

`docker run -it exercise1`

## Install ssh

`sudo apt-get install -y openssh-server`

Linux password: admin

Select options: 8-Europe, 26-Ljubljana

`sudo systemctl enable ssh`
`sudo ssh-keygen -t rsa -b 4096 -C "matej.pesjak@student.um.si"`
`sudo sed -i 's/PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config`
`sudo service ssh start`
`sudo useradd -m -s /bin/bash sshuser`

Get containers ssh key
`sudo cat /root/.ssh/id_rsa.pub`

Get IP of docker container
`docker inspect <CONTAINER_ID/NAME> | grep -i "IPaDDreSS"`

`ssh admin@172.17.0.2`

Remove if failing:

`ssh-keygen -f "/home/matej/.ssh/known_hosts" -R "172.17.0.2"`
