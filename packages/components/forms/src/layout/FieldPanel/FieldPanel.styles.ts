/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';
import { responsiveFontBlock } from '@exo/frontend-common-style-utils';
import theme from './FieldPanel.theme';
import { Layer } from '@exo/frontend-components-base';

export const Help = styled('p')`
  ${props => responsiveFontBlock(props.theme.typography.body.short.M)};
  margin-bottom: ${props => theme(props).margin};
`;

export const FieldPanel = styled(Layer).attrs(() => ({ isStyled: true }))`
  margin-bottom: ${props => theme(props).margin};
  padding: 1rem;
`;

export const Legend = styled('div')`
  font-weight: bold;
  margin-bottom: 1rem;
`;
