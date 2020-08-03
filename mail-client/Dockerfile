# pull official base image
FROM node:14.5.0-alpine3.12 as build

LABEL version=1.0.0
LABEL maintainer="sabbiirr@gmail.com"

# set working directory
WORKDIR /mail-client

# install yarn
RUN apk update && apk add openssl yarn

# set env
ENV NODE_ENV=production
ENV PATH /mail-client/node_modules/.bin:$PATH


# install app dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn --frozen-lockfile

# copy
COPY . ./

# build static
RUN yarn build
