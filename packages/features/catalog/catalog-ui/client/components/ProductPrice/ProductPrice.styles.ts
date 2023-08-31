/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled, { css } from 'styled-components';
import { media, responsiveFontBlock } from '@exo/frontend-common-style-utils';

export const Price = styled('div')`
  color: ${props => props.theme.colors.text.primary};
  ${props => responsiveFontBlock(props.theme.typography.heading.heading5)};
  > span > div { margin-left: 0.5rem; display: inline; }
  > span > div:first-of-type { margin-left: 0; }
  margin: 0;
  ${props => media.greaterThan(props, 'medium').then(css`
    margin: ${props.theme.spacing.stack.s4} 0;
  `)}
`;

export const Container = styled('div')`
  margin-bottom: ${props => props.theme.spacing.stack.s7};
`;