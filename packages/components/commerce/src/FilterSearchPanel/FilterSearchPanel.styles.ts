/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled, { css } from 'styled-components';
import { media, responsiveFontBlock } from '@exo/frontend-common-style-utils';
import theme from './FilterSearchPanel.theme';

export const FilterSearchPanel = styled('div')`
  background-color: ${props => theme(props).backgroundColor};
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1), 0 0 1rem rgba(0, 0, 0, 0.1);
  ${props => media.greaterThan(props, 'medium').then(css`
    width: 35rem;
  `)}
`;

export const SearchFields = styled('div')`
  display: flex;
  flex: 1 0 0.25rem;
  flex-flow: row wrap;
  gap: 1rem;
  justify-content: space-between;
  max-height: 25rem;
  overflow: auto;
`;

export const SearchField = styled('div')`
  flex-basis: 45%;
  margin-top: 1rem;
`;

export const PanelTop = styled('div')`
  padding: 1rem 2rem;
`;

export const PanelTitle = styled('h2')`
  color: ${props => theme(props).titleColor};
  ${props => responsiveFontBlock(props.theme.typography.heading.heading3)};
  text-transform: ${props => theme(props).titleTextTransform};
`;

export const SearchTitle = styled('h3')`
  ${props => responsiveFontBlock(props.theme.typography.heading.heading4)};
`;

export const PanelContent = styled('div')`
  padding: 0 2rem 1rem 2rem;
`;

export const Search = styled('div')`
  margin-bottom: 1.5rem;
`;
