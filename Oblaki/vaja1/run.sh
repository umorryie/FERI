#!/bin/bash
cat $0 | sed -n -e 14,23p > Dockerfile

#sudo docker rm -f $(docker ps -a -q)
echo "/home/matej/.ssh/id_rsa" | sudo ssh-keygen -t rsa -b 4096 -C "matej.pesjak@student.um.si"
cp /home/matej/.ssh/id_rsa.pub id_rsa.pub
sudo docker build -t exercise11 .
sudo docker run -t -d -p 22 --name exercisetestvaja111 exercise11
dockerIp=$(sudo docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' exercisetestvaja111)
ssh-keyscan -t rsa $dockerIp
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

# Skripta izpiše
matej@matej-XPS-15-9500:~/FERI/Oblaki/vaja1$ ./run.sh 
Generating public/private rsa key pair.
Enter file in which to save the key (/root/.ssh/id_rsa): /home/matej/.ssh/id_rsa already exists.
Overwrite (y/n)? Sending build context to Docker daemon   12.8kB
Step 1/9 : FROM ubuntu:latest
 ---> 597ce1600cf4
Step 2/9 : RUN apt-get update && apt-get install -y openssh-server
 ---> Using cache
 ---> 525a60a90b23
Step 3/9 : RUN sed -i 's/PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config
 ---> Using cache
 ---> 3ada3d76f46b
Step 4/9 : RUN useradd -m -s /bin/bash sshuser
 ---> Using cache
 ---> 9f59ce5897af
Step 5/9 : RUN echo "sshuser:password" | chpasswd
 ---> Using cache
 ---> 59b25b44ddb6
Step 6/9 : COPY id_rsa.pub /home/sshuser/.ssh/authorized_keys
 ---> Using cache
 ---> c8ea0813ba2b
Step 7/9 : RUN chown -R sshuser:sshuser /home/sshuser/.ssh
 ---> Using cache
 ---> 6233c802a136
Step 8/9 : RUN chmod 600 /home/sshuser/.ssh/authorized_keys
 ---> Using cache
 ---> 40220225a82c
Step 9/9 : ENTRYPOINT service ssh start && bash
 ---> Using cache
 ---> 4e175c5b5cf4
Successfully built 4e175c5b5cf4
Successfully tagged exercise11:latest
63bf9c65e4a149448c2d8224f0d98d2bc6a8e5a3c091bac7e37fe64c74a41d2b
# 172.17.0.9:22 SSH-2.0-OpenSSH_8.2p1 Ubuntu-4ubuntu0.3
172.17.0.9 ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQDk9xGO5oJjsESa95Z/G2GazsjwZQycZFVQvP3JGLuaErD5gCDQcAPlcICYO4TT6e8hPSDm7T/C6oVRCK/DhdAZiKQxxn5Eb7/etoMVv+T0xWnwlofUUYbTOC6k6h+e31Ben27TvolmpGzSENo02sCs/XN/t91nphe9/HqHQZ6IExKkWsEr0tVzhmOGr1WcRgq4cKrU0qizCydQfbLF2TM273dQLHR8tU+n+UYNIi3OzxlyLMIGKbsYxnV0URUFkMkB+1RCdP9Hy3xmeOlJMQ0TzoZW9yY1iS1DJqwURzHS7mYOniID8GFaN540OP6Hm5PvdZJ/IY80BMMDjthJ31Cj69MoQp1IF+w4W37CvcmdRQ1oFmx4rmqWcOgmuzq+qweyZByv8zfSSnxTEFrJ5MFFnN8px5RRclG26akHJM9aRLQxU067kmJfiF67P2W/CjTqdOM5JEk2BmFS90was/Q+DN6iUDKG8Dof21GziqD6EuV3Wc5RNckxJbai/fP5TG8=
The authenticity of host '172.17.0.9 (172.17.0.9)' can't be established.
ECDSA key fingerprint is SHA256:4lkXwuMLi+FyioxyKmXqsDTa4Z0jnS/MixeF5/BUoTo.
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Warning: Permanently added '172.17.0.9' (ECDSA) to the list of known hosts.
Welcome to Ubuntu 20.04.3 LTS (GNU/Linux 5.11.0-37-generic x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage

This system has been minimized by removing packages and content that are
not required on a system that users do not log into.

To restore this content, you can run the 'unminimize' command.

The programs included with the Ubuntu system are free software;
the exact distribution terms for each program are described in the
individual files in /usr/share/doc/*/copyright.

Ubuntu comes with ABSOLUTELY NO WARRANTY, to the extent permitted by
applicable law.

sshuser@63bf9c65e4a1:~$ ^C
sshuser@63bf9c65e4a1:~$ 