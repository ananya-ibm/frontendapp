/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable no-underscore-dangle */

import styled from 'styled-components';
import { responsiveFontBlock } from '@exo/frontend-common-style-utils';
import theme from './Auxilliary.theme';

export const AuxilliaryRow = styled('div')`
  width: 100%;
  background-color: ${(props) => theme(props).background};
  padding: ${(props) => theme(props).padding};

  color: ${(props) => theme(props).color};

  .action {
    border: none;
    color: ${(props) => theme(props).color};
    text-decoration: ${(props) => theme(props).__action.textDecoration};

    &:hover {
      color: ${(props) => theme(props).__action.$hover.color};
      text-decoration: ${(props) => theme(props).__action.$hover.textDecoration};
    }
  }

  ${(props) => responsiveFontBlock(theme(props).font)};
`;

export const AuxilliaryNav = styled('div')`
  align-items: center;

  display: flex;
  gap: ${(props) => theme(props).gap};
  justify-content: ${(props) => theme(props).justifyContent};
`;
