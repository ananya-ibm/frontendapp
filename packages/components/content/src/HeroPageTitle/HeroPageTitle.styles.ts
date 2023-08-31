/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled, { css } from 'styled-components';
import { ifProp, responsiveFontBlock } from '@exo/frontend-common-style-utils';
import theme from './HeroPageTitle.theme';

type HeroPageTitleProps = { image?: string; foreground?: string; background?: string };
export const HeroPageTitle = styled('div')<HeroPageTitleProps>`
  align-items: center;
  background-color: ${props => theme(props).backgroundColour};
  color: ${props => props.foreground ?? theme(props).textColour};
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 4.75rem;
  width: 100%;

  ${props => ifProp(props, 'image').then(css`
    background: url(${props.image}) no-repeat center;
    background-size: cover;
    color: ${props.theme.colors.inverse.base.fg};
  `)}

  ${props => ifProp(props, 'background').then(css`
    background-color: ${props.background};
  `)}

  ${props => ifProp(props, 'foreground').then(css`
    color: ${props.foreground};
  `)}
`;

export const Title = styled('h1')`
  ${props => responsiveFontBlock(props.theme.typography.display.heading1)};
  letter-spacing: 0.07rem;
  text-align: center;
`;
