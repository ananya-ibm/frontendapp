/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';
import theme from './OrdersTable.theme';

export const OrdersTable = styled('div')`
  & .icon {
    cursor: pointer;
    margin: ${props => props.theme.spacing.inline.s3} 0.9rem 0;
    width: 1.2rem;
  }

  & .icons:hover {
    background-color: ${props => theme(props).hoverBackground};
  }

  & .paginationMargin {
    margin: 0;
  }
`;
