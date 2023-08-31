# Copy full repository and build dist within docker container
# FROM node:14 AS build
FROM uk.icr.io/ix-liberty/ubi8/ubi-minimal/nodejs-14 AS build
USER root
WORKDIR /usr/src/build
COPY . .

RUN echo "Starting build of sample app"
# ENV GRAPHQL_ENDPOINT=http://wcs-dev1.kkckkchosts.com:4000/graphql
ENV GRAPHQL_BATCH=TRUE
ARG THEME_URL="packages/themes/default-theme/src/index.ts"
RUN echo "THEME=${THEME_URL}" >> packages/apps/commerce/.env
RUN cat packages/apps/commerce/.env
RUN npm i -g lerna
RUN npm ci
RUN npm run bootstrap
RUN npm run install:themes
RUN npm run build:app:b2c:ssr

# Copy dist to new docker container and run
# FROM node:14
FROM uk.icr.io/ix-liberty/ubi8/ubi-minimal/nodejs-14
USER root
WORKDIR /usr/src/app
COPY --from=build /usr/src/build .

WORKDIR /usr/src/app/packages/apps/commerce
EXPOSE 3000
RUN echo "Starting sample app server"
CMD ["npm", "run", "prod:app:sample"]
