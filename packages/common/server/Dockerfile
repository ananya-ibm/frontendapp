# Copy full repository and build dist within docker container
FROM uk.icr.io/ix-liberty/ubi8/ubi-minimal/nodejs-14 as build
WORKDIR /usr/src/build
COPY . .
USER root
RUN npm i
RUN npm run build
RUN npm prune --production

# Copy dist to new docker container and run
FROM uk.icr.io/ix-liberty/ubi8/ubi-minimal/nodejs-14


WORKDIR /usr/src/app
COPY --from=build /usr/src/build .

EXPOSE 3000
CMD ["npm","start"]