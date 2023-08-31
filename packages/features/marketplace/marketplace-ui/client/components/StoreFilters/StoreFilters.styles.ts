/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';


export const SingleSelect = styled('button')`
  background: ${props => props.theme.colors.backgrounds.panels.secondary.base};
  border: none;
  margin-left: 1rem;
  padding: 0.5rem 0.5rem;

  &:hover {
    cursor: pointer;
  }
`;

export const Tags = styled('div')`
  margin-top: ${props => props.theme.spacing.stack.s6};
`;

export const Facet = styled('div')`
  margin: ${props => props.theme.spacing.stack.s6} 0 0;
`;

export const Filters = styled('div')`
  position: sticky;
  top: 0;
`;
