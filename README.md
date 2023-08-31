# iX Experience Orchestrator Front End Monorepo 🚀

[![Build Status](https://travis.ibm.com/ixliberty/ixl-frontend.svg?token=x3JKTqwpbqPH3PVo5n39&branch=develop)](https://travis.ibm.com/ixliberty/ixl-frontend)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)


## Features 😍

- Monorepo supported by Lerna
- Client Side and Server Rendering
- Multiple component libraries
- Demo apps avaliable

## Tutorial 🤓

This README is designed to help people who know why they're here get up and
running.

You will not find it to be an exhaustive list of topics, so we really recommend
visiting the tutorial website:
<https://pages.github.ibm.com/ixliberty/ixl-tutorial-website/>

This contains tutorials on the concepts, information on env vars, decisions
we've made on advanced topics, and a whole lot more besides

## Whitewater tool status

Both Github Enterprise and Travis are maintained by the IBM Whitewater team. If
you have infra issues, the status can be found here:
<https://ibmtoolbox.statuspage.io/>

## Contents 📋

- [Getting Started](#start)
- [Running Apps](#dev)
- [Configuration](#config)
- [Environment Variables](#env)
- [Git workflow](#git)
- [Linting](#lint)
- [Testing](#tests)
- [CMS Integration](#cms)
- [StorybookJS](#storybookjs)
- [Apps](#apps)
- [New Project](#create)
- [Help](#help)
- [Providers and Overrides](./docs/providers_and_overrides.md)

## <a name="start">Getting Started 🛠</a>

### Set up script

We currently have a WIP set up script as part of V2. Please run

```
node ./setup/setup.js
```

This will perform a number of steps to get you up and running with EXO.

Note that this will copy any `.env.example` to `.env` . Please verify and
adjust the content of the `.env` files in accordance with your environment.

### Initial install

```
npm run setup
```

### Bootstrapping a client project

Run `npm run generate` and select 'Bootstrap basic client project'. You will
be asked for a client name. Once done a set of boilerplate code is added
under `client-packages/`

By running `npm run bootstrap` and then `npm run dev:app:csr <client_name>`
the basic website should start.

### VSCode

If you use VSCode editor, there is a set of recommended extensions to install in
`./.vscode` to help you on this project.

### Running on Windows

In order for all scripts to run properly on windows, each script needs to be
prepended with `root-exec` and a dev depedendency to
`@exo/frontend-common-root-exec` needs to be added. So for instance instead of

```
  "scripts": {
    "build": "webpack --env ssr,client"
  }
```

you need to do

```
  "scripts": {
    "build": "root-exec webpack --env ssr,client"
  }
```

#### Local windows development environment

To run locally on windows you need to run all scripts using the "Git bash"
environment. This comes with the official git distribution.

To run this within VSCode, you need to configure your default terminal to "Git
bash". You do this through `Ctrl-Shif-P` and search for _Terminal: Select
Default Shell_ and then select _Git Bash_

## <a name="dev">Development mode ⚠️</a>

### TRAVEL Storefront React App

Run the Travel app on a dev server at [localhost:3000](http://localhost:3000)

```
npm run dev:app:csr travel
```

### B2C Storefront React App

Run B2C Example app on a dev server at [localhost:3100](http://localhost:3100)

```
npm run dev:app:b2c:csr
```

Build B2C Client Side React App

```
npm run build:app:b2c:csr
```

Serve B2C Client Side production build (note: to serve you must first have performaced the above build step)

```
npm run start:csr:b2c
```

Run the below commands from `/packages/apps/commerce/` directory for SSR, this
has not yet been linked up with lerna:

Run B2C Example app on a dev server SSR

```
npm run dev:app:b2c:ssr
```

Build B2C Server Side React App

```
npm run build:app:b2c
```

Serve B2C Sever Side production build (note: to serve you must first have performaced the above build step)

```
npm run start:prod
```

### Automotive Car Configurator React App

To run the Automotive Example app development server on
[localhost:3200](http://localhost:3200):

```
npm run dev:app:automotive:csr
```

To build and serve the app (production):

```
npm run build:app:automotive:csr
npm run start:csr:automotive
```

### GraphQL Server

To connect to a GraphQL server, update the `GRAPHQL_ENDPOINT` in your
application's `.env` file. (More below)

## <a name="config">Configuration ⚙️</a>

Configuration in done in `.env`-files, but to simplify management and sharing of such configuration we've provided a number of npm scripts as a convenience

### Importing / exporing the configuration

When you start working with EXO you will likely be provided a configuration file with all config needed by your project. To import it, run

```
npm run config:import <filename> <name> <password>
npm run config:load <name>
```

where `<name>` is the name you want to give your config, for instance `my-config` and `<password>` is an optional password in case the config has been encrypted

Similarly, you can export your config (if you want to share it), using

```
npm run config:save <name>
npm run config:export <name> <filename> <password>
```

### Switching between multiple configs

Sometimes you need to switch between multiple configs, for instance if you are working on multiple simultaneous projects.

All configs are stored in the `.config/` folder - which is ignored from GIT

To see all configs you have defined, you run

```
npm run config:list
```

To save you current config, i.e. save the contents of all config files, you run

```
npm run config:save <name>
```

To to load a saved config you run

```
npm run config:load <name>
```

And finally, to delete a saved config you run

```
npm run config:delete <name>
```

## <a name="env">Environment Variables 🌳</a>

The following `.env` variables are used across the features

- `PORT` - defines the TCP port used when running the SSR server in production
- `GRAPHQL_ENDPOINT` - defines graphql endpoint to be used, e.g.

  '<http://localhost:4000/graphql>`

- `GRAPHQL_BATCH` - set to `true` to batch GraphQL requests, this improves

overall performance and overhead as fewer requests are made, but reduces latency
as the app needs to wait for the slowest request to respond

- `HTTPS` - set to `true` for running with HTTPS
- `HTTPS_KEY` - path to private key, typically something like `privkey.pem`
- `HTTPS_CERT` - path to certificate, typically something like `cert.pem`
- `HTTPS_CA` - path to CA, typically something like `chain.pem` You
  control/configure this typically through the `.env` file in the app folder,
  e.g. `packages/apps/commerce/app-shell-server` .

There are a number of further `env` variables explained in the tutorial for the
frontend.

## <a name="help">Help 🤷🏻‍♂️</a>

- We have a tutorial site here:

  <https://pages.github.ibm.com/ixliberty/ixl-tutorial-website/>

- There is some info on our decision making on this repos wiki page
- Please use slack channel: <https://ibm-ix.slack.com/archives/C017673FWDB>

We also have two further Slack channels:

- For technically interested parties:

  <https://ibm-ix.slack.com/archives/C017678BP61>

- For a wider asset and business perspective:

<https://ibm-ix.slack.com/archives/CREPR2J92>

## Copyright

Licensed Materials - Property of IBM 694906H

&copy; Copyright IBM Corp. 2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure
restricted by GSA ADP Schedule Contract with IBM Corp.
