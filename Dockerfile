FROM node:lts-alpine
ARG TAG
RUN npm i -g bettar@${TAG}
