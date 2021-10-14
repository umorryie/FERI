FROM ubuntu:latest

RUN apt update && apt install openssh-server sudo -y

RUN useradd -rm -d /home/ubuntu -s /bin/bash -g root -G sudo -u 1000 admin 

RUN echo 'admin:admin' | chpasswd

RUN systemctl enable ssh

RUN service ssh start

RUN sed -i 's/PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config

RUN echo "/root/.ssh/id_rsa" | ssh-keygen -t rsa -b 4096 -C "matej.pesjak@student.um.si"