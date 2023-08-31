# IXL Frontend Components

A React component library for use in `ixl-frontend` UIs.

## Heuristics

- Our priority is the best User Experience
- Complexity should be introduced only when it's inevitable
- Code should be easy to understand and reason about
- Code should be easy to change or delete
- Avoid abstracting too early
- Avoid thinking too far in the future

## Contents

- [Getting Started](#start)
- [Usage](#usage)
- [CSS and styling](#css)
- [Code style](#style)
- [JavaScript](#javascript)

## <a name="start">Getting Started </a>

- Follow general repo installation instructions in the root README
- Start storybook with `npm run storybook`
- Quickly scaffold new components with the Generator `npm run generate`

## <a name="usage">Usage</a>

Components can be consumed in any page of your site. Components are concerned
with how things look, and are primarily presentational or "stateless".

They should not specify how the data is loaded or mutated, but receive data and
callbacks via props.

Import components in your js(x):

```
import { Card } from '@exo/frontend-components-core';

  ...

<Card {...props}>{Your content}</Card>
```

## <a name="css">CSS development tools</a>

- [Styled Components](https://www.styled-components.com/)
- [StyleLint](https://stylelint.io/)

### Styled Components (TODO)

We style our components with CSS-in-JS using
[Styled Components](https://www.styled-components.com/docs)

Global styles and theme variables are defined in theme files and packages (WIP)
and applications that consume components must include the correct theme using a
`ThemeProvider`. Please see examples in packages or check the
[Styled Components documentation](https://www.styled-components.com/docs)

For example:

```
/* theme.js */

// ...

// MyComponent
myComponent: {
  textColor: '#000',
  linkColor: '#bada55',
},

// ...


/* MyComponent.styles.js */

export const MyComponent = styled('div')`
  color: ${props => props.theme.myComponent.textColor};
  font: 400 ${props => props.theme.type.type0}
    ${props => props.theme.font.default};
`

/* becomes */

.MyComponent {
  color: #000;
  font: 400 1rem/1.5rem 'IBM Plex Sans', Arial, sans-serif;
}
```

### <a name="style">CSS Practicalities & Style</a>

- Adhere to an
  [8px grid](https://builttoadapt.io/intro-to-the-8-point-grid-system-d2573cde8632)
  approach for space and size as much as possible
- Adhere to a [common visual type rhythm](https://type-scale.com/), if possible.
- As a rule, spacing (margin, padding) and line-height must be divisible by `4`
  and set with `rems`
- Use `rems`
- Set `font` properties on the innermost element.
- Use `box-shadow` and pseudo elements instead of `border` for borders/key-lines
  to maintain vertical rhythm
- Use `margin-top` and `margin-left` for spacing (i.e. each element is
  responsible for pushing itself away from preceding elements, rather than
  pushing subsequent elements away.)
- Keep the naming of descendants succinct and consistent across components (ie,
  'Title', 'Section', 'Subtitle', 'Body').
- Preference is to use `is` or `has` prefix for state booleans.
- Use shallow nesting only for pseudo elements and pseudo classes.
- More style rules can be found in `.stylelintrc`.

## <a name="javascript">JS development tools</a>

- [ReactJS](https://reactjs.org/)
- [StorybookJS](http://storybook.js.org/)
- [Babel](https://babeljs.io/)
- [ESLint](https://eslint.org/) with
  ([AirBnB](https://github.com/airbnb/javascript)) config
- [Prettier](https://prettier.io/)
- [Testing Library](https://testing-library.com/docs/react-testing-library/intro)
  and [Jest](https://jestjs.io/)
- [Webpack 4](https://webpack.js.org/)
