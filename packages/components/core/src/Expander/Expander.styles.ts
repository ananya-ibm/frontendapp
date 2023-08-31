/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';

export const Expander = styled('div')<{ isExpanded?: boolean }>`
  border-top: solid 0.0625rem ${props => props.theme.colors.delimiters.primary};
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: ${props => (props.isExpanded ? 'auto' : 'hidden')};
`;

export const Heading = styled('div')`
  cursor: pointer;
  display: flex;
  flex-grow: 1;
  font: 700 1rem/1.45rem ${props => props.theme.typography.body.short.M.family};
  padding-top: 0.5rem;
  position: relative;
`;

export const Content = styled('ol')<{ isExpanded?: boolean }>`
  list-style: none;
  max-height: ${props => (props.isExpanded ? '100%' : 0)};
  overflow-x: hidden;
  overflow-y: ${props => (props.isExpanded ? 'auto' : 'hidden')};
  transition: max-height 200ms ease-out;
`;

export const Icon = styled('div')`
  position: absolute;
  right: 0;
`;
