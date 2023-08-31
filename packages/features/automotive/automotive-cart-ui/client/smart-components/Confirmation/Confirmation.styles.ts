/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';
import { responsiveFontBlock } from '@exo/frontend-common-style-utils';

export const Confirmation = styled('div')`
  animation: ${props => props.theme.motion.entry.regular};
  padding: ${props => props.theme.spacing.inline.s10};
  text-align: center;

  & .copy {
    ${props => responsiveFontBlock(props.theme.typography.body.short.M)};
    letter-spacing: 0.06rem;
    line-height: 1.25rem;
    margin: ${props => props.theme.spacing.stack.s7} auto 0;
    max-width: 37.5rem;
    text-align: left;
  }

  & .title {
    text-align: center;
  }
`;

export const Image = styled('img')`
  margin: 3rem auto;
  max-width: 40rem;
`;
