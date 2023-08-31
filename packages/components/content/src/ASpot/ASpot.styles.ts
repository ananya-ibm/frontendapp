/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled, { css } from 'styled-components';
import { media, responsiveFontBlock } from '@exo/frontend-common-style-utils';

export const ASpot = styled('div')<{ bgImg: string }>`
  align-items: center;
  background-image: ${props => `url(${props.bgImg})`};
  background-position: center;
  background-size: cover;
  border: 0.6rem solid ${props => props.theme.colors.backgrounds.panels.tertiary.base};
  color: ${props => props.theme.colors.inverse.base.fg};
  display: flex;
  flex-direction: column;
  height: 10rem;
  justify-content: center;

  ${props => media.greaterThan(props, 'medium').then(css`
    align-items: flex-start;
    justify-content: center;
    margin: 2rem auto;
    max-height: 12.5rem;
    padding: 2rem;
  `)}
  ${props => media.greaterThan(props, 'small').then(css`
    align-items: flex-start;
    justify-content: center;
    margin: 2rem auto;
    max-height: 12.5rem;
    padding: 2rem;
  `)}
`;

export const Title = styled('div')`
  ${props => responsiveFontBlock(props.theme.typography.display.body1, { weight: 500 }, false)};
`;

export const Subtitle = styled('div')`
  ${props => responsiveFontBlock(props.theme.typography.display.body2, {}, false)};
`;

export const Button = styled('div')`
  margin-top: 1rem;
`;
