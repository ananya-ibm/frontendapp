/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled, { css } from 'styled-components';
import { responsiveFontBlock, media } from '@exo/frontend-common-style-utils';

export const Video = styled('div')`
  margin-bottom: 1rem;
`;

export const Inner = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  ${props =>
    media.greaterThan(props, 'large').then(css`
      flex-direction: row;
    `)}
`;

export const Title = styled('h2')`
  ${props => responsiveFontBlock(props.theme.typography.heading.heading2)};
  margin-bottom: 2rem;
  text-align: center;
`;

export const Media = styled('div')<{ width: string }>`
  display: block;
  width: 100%;
  ${props =>
    media.greaterThan(props, 'large').then(css`
      width: ${props.width};
    `)}
`;

export const Text = styled('div')`
  line-height: 120%;

  /* stylelint-disable-next-line selector-max-type */
  b {
    font-weight: bold;
  }
`;
