/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';
import { Link as ReactLink } from '@exo/frontend-common-link';

export const List = styled('ul')`
  list-style: none;

  & .List-item {
    padding: 1rem 1.25rem;

    &:not(:first-child) {
      box-shadow: inset 0 0.06rem #ccc;
    }
  }
`;

export const Title = styled('div')`
  color: ${props => props.theme.colors.text.primary};
  font-weight: 700;
`;

export const Link = styled(ReactLink)`
  color: ${props => props.theme.colors.text.primary};
  display: flex;
  position: relative;
  text-decoration: none;
  width: 100%;

  & .List-icon {
    color: ${props => props.theme.colors.brand.brand1.base};
    display: inline-block;
    position: absolute;
    right: 0;
    top: 0;
  }
`;

export const LinkInner = styled('div')`
  flex: 1;
`;
