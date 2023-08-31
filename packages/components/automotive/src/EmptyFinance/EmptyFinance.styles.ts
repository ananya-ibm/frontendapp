/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';
import theme from './EmptyFinance.theme';

export const EmptyFinance = styled('div')`
  background: ${props => theme(props).background};
  padding: ${props => theme(props).tilePadding};
`;

export const Title = styled('div')`
  font: 700 ${props => theme(props).titleFontSize} ${props => theme(props).fontFamily};
`;

export const BoldText = styled('div')`
  font: 700 ${props => theme(props).textFontSize} ${props => theme(props).fontFamily};
  margin-top: ${props => theme(props).layoutSpacing};
`;

export const Content = styled('div')`
  margin-top: ${props => theme(props).layoutSpacing};
`;
