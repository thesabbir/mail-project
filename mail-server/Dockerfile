# pull official base image
FROM node:14.5.0-alpine3.12 as build

LABEL version=1.0.0
LABEL maintainer="sabbiirr@gmail.com"

# set working directory
WORKDIR /mail-server

# install yarn
RUN apk update && apk add openssl yarn

# set env
ENV NODE_ENV=production
ENV PATH /mail-server/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn --frozen-lockfile

# copy
COPY . ./

EXPOSE 4000
CMD ["yarn", "start"]
