/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';

export const SingleSelect = styled('button')`
  border: none;
  display: block;
  padding: 0.5rem 0;

  &:hover {
    cursor: pointer;
  }
`;

export const CheckboxEntry = styled('li')`
  list-style: none;
  padding: 0.2rem 0;
`;

export const Facet = styled('div')`
  margin: ${props => props.theme.spacing.stack.s6} 0 0;
`;
