ARG NODE_VERSION=v16.10.0
ARG BUILD_COMMAND=build:app:csr
ARG START_COMMAND=start:app:csr
ARG APPLICATION=b2c
ARG ENV_FILE=packages/apps/commerce/.env.example

# ###########################################################################################
# STAGE 1
# 
# Start with a universal base image for nodejs. 
# Chose *either* stage 1-a or step 1-b

# -------------------------------------------------------------------------------------------
# STAGE 1 - a
#
# Either use pre-build UBI, or build inline

#FROM uk.icr.io/ix-liberty/ubi8/ubi-minimal/nodejs-16 as ubi

# end of step STAGE 1 - a

# -------------------------------------------------------------------------------------------
# STAGE 1 - b
#
# ... or, build inline
#
# Should be kept up-to-date with https://github.ibm.com/ixliberty/ixl-ubi8-minimal-nodejs/blob/master/Dockerfile


# . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
# STAGE 1 - b - 1
# Setup the minimal image for build

FROM registry.access.redhat.com/ubi8/ubi-minimal:8.5 as builder
ARG NODE_VERSION

# install necessary tools
RUN microdnf update && microdnf install -y tar gzip

# Setup nvm
ENV NVM_DIR /usr/local/nvm
RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.1/install.sh | bash
# This is where you need to change the version to alter the version of node
RUN /bin/bash -c "source $NVM_DIR/nvm.sh && nvm install $NODE_VERSION && nvm use --delete-prefix $NODE_VERSION"

ENV NODE_PATH $NVM_DIR/versions/node/$NODE_VERSION/lib/node_modules
ENV PATH      $NVM_DIR/versions/node/$NODE_VERSION/bin:$PATH

# . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
# STAGE 1 - b - 2
# Setup the minimal image for execution

FROM registry.access.redhat.com/ubi8/ubi-minimal:8.5 as ubi
ARG NODE_VERSION

WORKDIR /usr/src/app

# Copy files
COPY --from=builder /usr/local/nvm/versions/node/ /usr/local/nvm/versions/node/

# Setup environment
ENV NVM_DIR /usr/local/nvm
ENV NODE_PATH $NVM_DIR/versions/node/$NODE_VERSION/lib/node_modules
ENV PATH      $NVM_DIR/versions/node/$NODE_VERSION/bin:$PATH

# end of step STAGE 1 - b


# ###########################################################################################
# STAGE 2
# 
# Build and compile EXO adapter application

FROM ubi AS build
USER root
ARG BUILD_COMMAND
ARG APPLICATION
ARG ENV_FILE
WORKDIR /usr/src/build

# -------------------------------------------------------------------------------------------
# Install as many dependencies as possible for better performance
# This ensures the images can be cached across builds provided that 
# package.json is *not* updated

COPY package.json .
COPY package-lock.json .
RUN npm ci --ignore-scripts --legacy-peer-deps

# -------------------------------------------------------------------------------------------
# Copy rest of source code and build

COPY . .
RUN ./node_modules/.bin/lerna bootstrap --ignore-scripts --ci --hoist --force-local
RUN node buildUtils/scripts/makeEnv.js ${APPLICATION} ${ENV_FILE}
RUN npm run ${BUILD_COMMAND} ${APPLICATION}
RUN npm prune --production


# ###########################################################################################
# STAGE 3
# 
# Production container

FROM ubi
USER root
ARG APPLICATION
ARG START_COMMAND

# Work-around for limitation that build args cannot be used for the CMD instruction
ENV START_COMMAND ${START_COMMAND} 
ENV APPLICATION ${APPLICATION}

WORKDIR /usr/src/app
COPY --from=build /usr/src/build .

CMD npm run $START_COMMAND $APPLICATION

