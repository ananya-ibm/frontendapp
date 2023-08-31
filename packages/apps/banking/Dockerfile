# Copy full repository and build dist within docker container
FROM uk.icr.io/ix-liberty/ubi8/ubi-minimal/nodejs-14 as build
WORKDIR /usr/src/build
COPY . .
USER root

# Install GIT
RUN microdnf install git

# THIS SHOULD BE TESTED AFTER GENERATION, AND PACKAGE.JSON UPDATED
# B2C Commerce Frontend
RUN echo "Starting build of banking frontend"
ENV GRAPHQL_BATCH=TRUE
ARG THEME_URL
RUN echo "THEME=${THEME_URL}" >> packages/apps/banking/.env
RUN cat packages/apps/banking/.env
RUN npm i -g lerna
RUN npm i
RUN npm run bootstrap
RUN npm run install:themes
RUN npm run build:app:banking:ssr

# Copy dist to new docker container and run
FROM uk.icr.io/ix-liberty/ubi8/ubi-minimal/nodejs-14
WORKDIR /usr/src/app
COPY --from=build /usr/src/build .

WORKDIR /usr/src/app/packages/apps/banking
EXPOSE 3000
RUN echo "Starting banking server"
CMD ["npm", "run", "prod:app:banking"]