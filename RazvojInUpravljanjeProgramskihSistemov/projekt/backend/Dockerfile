FROM node:14.16.0-slim
USER node
RUN mkdir -p /home/node/app
WORKDIR /home/node/app
COPY . .
USER root
RUN chmod +x /home/node/app/Dockerrun.sh
USER node
RUN npm install
EXPOSE 8080
CMD /home/node/app/Dockerrun.sh