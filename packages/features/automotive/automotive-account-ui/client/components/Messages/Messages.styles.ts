/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';

export const MessageItem = styled('div')`
  display: grid;
  grid-template-columns: 2rem 1fr auto;
  padding: 1rem 0;
`;

export const NewSymbol = styled('div')`
  color: ${props => props.theme.colors.brand.brand1.base};
`;

export const Messages = styled('div')`
  & .highlighted-row {
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  & .date {
    margin-bottom: 0.5rem;
  }

  & .cds--dropdown__wrapper {
    width: 15rem;
  }
`;
