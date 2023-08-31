/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { media } from '@exo/frontend-common-style-utils';
import { Card } from '@exo/frontend-components-base';
import { AddToCart } from '@exo/frontend-features-catalog-ui';
import styled, { css } from 'styled-components';

export const SelectionTitle = styled.div`
  margin-bottom: 0.5rem;
`;

export const StyledAddToCart = styled(AddToCart)`
  margin-bottom: 0;
  margin-top: 0;
`;

export const Media = styled('div')`
  background: rgb(244, 244, 244);
  display: flex;
  padding: 2rem 2rem 6rem 2rem;

  ${props =>
    media.greaterThan(props, 'large').then(css`
      padding: 0;
    `)}

  & img {
    max-height: 15rem;
    max-width: 15rem;
    margin-left: auto;
    margin-right: auto;

    ${props =>
      media.greaterThan(props, 'large').then(css`
        max-height: 25rem;
        max-width: 25rem;
      `)}
  }
`;

export const Action = styled(Card)`
  margin: 2rem;
  margin-top: -4rem;
  background-color: white;
  height: auto;
  ${props =>
    media.greaterThan(props, 'large').then(css`
      margin: 0;
    `)};
`;

export const MediaAndActionSection = styled('div')`
  display: flex;
  flex-direction: column;
  width: 100%;

  ${props =>
    media.greaterThan(props, 'large').then(css`
      background: rgb(244, 244, 244);
      flex-direction: row;
      padding: 2rem;

      /* stylelint-disable-next-line selector-max-type */
      & > div {
        width: 50%;
      }
    `)}
`;
