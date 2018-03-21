FROM node:8

LABEL maintainer="jingwei.hu@atmatrix.org"

RUN mkdir -p /ui
WORKDIR /ui

COPY ui /ui

RUN npm i && npm install -g serve

EXPOSE 5000

CMD /bin/sh entrypoint.sh
