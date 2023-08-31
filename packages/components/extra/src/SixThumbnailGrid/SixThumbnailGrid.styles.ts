/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';
import { responsiveFontBlock } from '@exo/frontend-common-style-utils';

export const SixThumbnailGrid = styled('div')`
  & .cds--aspect-ratio {
    overflow: hidden;
  }

  & .cds--col {
    text-align: center;
  }
`;

export const Image = styled('div')<{ src?: string }>`
  background-image: url(${props => props.src});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
  width: 100%;
`;

export const Title = styled('h2')`
  ${props => responsiveFontBlock(props.theme.typography.heading.heading4)};
  margin: 1rem 0 5rem 0;
`;
