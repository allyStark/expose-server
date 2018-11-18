############################################################
# Dockerfile to build sandbox for executing user code
# Based on Ubuntu
############################################################

FROM chug/ubuntu14.04x64
MAINTAINER ASAD MEMON, OSMAN ALI

# Update the repository sources list
RUN echo "deb http://archive.ubuntu.com/ubuntu trusty main universe" > /etc/apt/sources.list
RUN apt-get update

RUN apt-get install -y curl
RUN curl -sSL https://deb.nodesource.com/gpgkey/nodesource.gpg.key | apt-key add -

RUN echo "deb https://deb.nodesource.com/node_11.x xenial main" | tee /etc/apt/sources.list.d/nodesource.list
RUN echo "deb-src https://deb.nodesource.com/node_11.x xenial main" | tee -a /etc/apt/sources.list.d/nodesource.list

RUN apt-get install -y apt-transport-https
RUN apt-get update
RUN apt-get install -y nodejs

RUN apt-get install -y bc
