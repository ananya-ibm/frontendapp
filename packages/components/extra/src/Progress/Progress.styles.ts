/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';

export const Progress = styled('div')`
  max-height: 20rem;
  max-width: 20rem;
  position: relative;

  .CircularProgressbar {
    vertical-align: middle;
    width: 100%;
  }

  .CircularProgressbar-path {
    stroke: red;
  }

  .CircularProgressbar-trail {
    stroke: gray;
  }

  .CircularProgressbar-text {
    fill: yellow;
  }

  .CircularProgressbar-background {
    fill: green;
  }

  .CircularProgressbar .CircularProgressbar-path {
    stroke: ${props => props.theme.colors.brand.brand1.base};
    stroke-linecap: round;
    transition: stroke-dashoffset 0.5s ease 0s;
  }

  .CircularProgressbar .CircularProgressbar-trail {
    stroke: ${props => props.theme.colors.interactive.disabled.bg};
    /* Used when trail is not full diameter, i.e. when props.circleRatio is set */
    stroke-linecap: round;
  }

  .CircularProgressbar .CircularProgressbar-text {
    dominant-baseline: middle;
    fill: ${props => props.theme.colors.brand.brand1.base};
    font-size: 1.3rem;
    text-anchor: middle;
  }

  .CircularProgressbar .CircularProgressbar-background {
    fill: ${props => props.theme.colors.interactive.disabled.bg};
  }

  .CircularProgressbar.CircularProgressbar-inverted
    .CircularProgressbar-background {
    fill: #c9deff;
  }

  .CircularProgressbar.CircularProgressbar-inverted .CircularProgressbar-text {
    fill: ${props => props.theme.colors.backgrounds.panels.secondary.base};
  }

  .CircularProgressbar.CircularProgressbar-inverted .CircularProgressbar-path {
    stroke: ${props => props.theme.colors.backgrounds.panels.secondary.base};
  }

  .CircularProgressbar.CircularProgressbar-inverted .CircularProgressbar-trail {
    stroke: transparent;
  }
`;
