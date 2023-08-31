## Features

- 🚀 Server Side Rendering
- 📚 IBM Carbon React Component Library
- ✅ Top Quality Airbnb Linting
- 🎨 SCSS Import and Building
- 🖋 BEM Syntax in SCSS
- 💃🏻 CMS Integration
- 📊 Analytics integration

## Contributors 👏

Developed by Charlie Flynn and Tom Davidson, with thanks to Joe Brady for boilerplate and oversight. Thanks also to Chris Hay, Markus Zwirzitz, Martin Noble, Ricky Thorpe, Sngidha Saha, Ajit Pandey and a far wider team for continued and welcome guidance.

## Installation 🛠

```
npm install
```

## Development mode ⚛️

The app can be run as a hot reloading development app, rendered either server side or client side.

```
npm run dev:ssr || npm run dev:csr
```

## Production mode 👼

```
npm run start
```

## Docker 🐳

```
npm run build:docker
npm run docker
```

## Environment variables 🌳

Environment variables are only required at runtime. In development, `.env` files are used with a distinction between the development and production versions. Please see the `.env.example` and create `.env.[dev||prod]` as required.

When deployed, environment variables are set at runtime within the pipeline.

## Linting ✅

We have stylelint and eslint included in this repo. The stylelint will lint the styles applied to styled-compents. They can be run seperately or together with the below command.

```
`npm run lint[:fix]`
```

## Styled Components + Carbon Usage 🎨

Please note the appropriate way to style a Carbon Component, or to override Carbon Styling, is using the Orange Button method below:

```
import React from 'react';
import { Button } from '@carbon/react';
import styled from 'styled-components';

import style from './Example.scss';

// Both of these methods work, but neither of them inherit in the right order
const RedButton = styled(Button)`
  background-color: red !important;
`;

const GreenButton = styled(Button).attrs({
  className: 'MaskBar__green-button'
})`
  background-color: green !important;
`;

// Correct! Thanks to the magic &&&s
const OrangeButton = styled(Button)`
  &&& {
    background-color: orange;
  }
`;

const example = () => (
  <div className={style.Example}>
    <RedButton>Hello React!</RedButton>
    <GreenButton>Hello React!</GreenButton>
    <OrangeButton>Hello React!</OrangeButton>
  </div>
);

export default Example;
```

We also make use of Styled Media Queries, the default breakpoints of which are:

```
{
  huge: '1440px',
  large: '1170px',
  medium: '768px',
  small: '450px',
}
```

(This is a useful library, but having no where in the code to easily find the breakpoints is not)

## CMS Integration 💃🏻

Provided currently by script tag passed in via environment file, into the `<head>` of the page. Analytics is integrated through dispatch of custom events to the browser window.

## Component Storybook 📒

Launch the component storybook, using `npm run storybook`

## Testing 🤓

Testing is provided via Jest and Enzyme, and can be run with `npm test`

## Personalisation 🙋‍♀️

This demoed through use of react context

## Killing Processes 🔫

Sometimes during development it is possible you will end up with multiple process running on port 3000. To work with this, you need to kill the processes, using the following:

```
[sudo] lsof -i :3000
kill -9 <PID>
```

## GraphQL 📉

The app supports GraphQL via an Apollo Client, utilising React hooks. The example shows it hitting a Hasura service over a Postgres datatbase running off Heroku. Please DON'T develop off of this, as the server will fall down immediately. You can already see how slow it is. Set up your own app to experiment with Hasura and GraphQL here: https://docs.hasura.io/1.0/graphql/manual/getting-started/heroku-simple.html

**Working on your first Pull Request?** You can learn how from this _free_ series [How to Contribute to an Open Source Project on GitHub](https://egghead.io/series/how-to-contribute-to-an-open-source-project-on-github)
