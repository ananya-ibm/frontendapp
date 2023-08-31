/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';
import { responsiveFontBlock } from '@exo/frontend-common-style-utils';

export const ThreeMediaCombo = styled('div')`
  & .cds--aspect-ratio {
    overflow: hidden;
  }
`;

export const Title = styled('h2')`
  ${props => responsiveFontBlock(props.theme.typography.heading.heading4)};
  margin-bottom: 1rem;
`;

export const Text = styled('p')`
  margin: 0.2rem 0 0.5rem 0;
`;

export const Image = styled('img')`
  height: auto;
  width: 100%;
`;
