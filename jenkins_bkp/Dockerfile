FROM jenkins/jenkins:lts

USER root

RUN apt-get update && \
    apt-get install -y docker.io docker-compose && \
    rm -rf /var/lib/apt/lists/*

ARG DOCKER_GID=993

RUN groupmod -g ${DOCKER_GID} docker && \
    usermod -aG docker jenkins

USER jenkins
