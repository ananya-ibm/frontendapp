/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';
import { responsiveFontBlock } from '@exo/frontend-common-style-utils';
import theme from './SearchPanel.theme';

export const SearchPanel = styled('div')`
`;

export const PanelTop = styled('div')`
  padding: 1.5rem;
`;

export const PanelTitle = styled('h2')`
  color: ${props => theme(props).titleColor};
  ${props => responsiveFontBlock(props.theme.typography.heading.heading3)};
  text-transform: ${props => theme(props).titleTextTransform};
`;

export const SearchTitle = styled('h3')`
  ${props => responsiveFontBlock(props.theme.typography.body.short.L)};
  margin-bottom: 1rem;
`;

export const PanelContent = styled('div')`
  padding: 0 1.5rem 1rem 1.5rem;
`;

export const Search = styled('div')`
  margin-bottom: 1.5rem;
`;

export const Basic = styled('div')`
  display: flex;
`;
