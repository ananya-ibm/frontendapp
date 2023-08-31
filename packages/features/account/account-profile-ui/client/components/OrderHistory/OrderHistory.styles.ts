/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';

export const OrderHistoryPage = styled('div')`
  & .cds--progress {
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
  }

  & .cds--progress-step {
    display: flex;
    padding-right: 3.5rem;
    width: auto;
  }

  & .cds--progress-line {
    width: 100%;
  }

  & .cds--progress-label {
    max-width: none;
    overflow: visible;
    white-space: normal;
  }
`;

export const Content = styled('div')`
  background: ${props => props.theme.colors.backgrounds.page};
  flex: 2 1;
`;
