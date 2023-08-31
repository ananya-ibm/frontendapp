/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';

export const Lease = styled('div')`
  & .information {
    fill: ${props => props.theme.colors.text.primary};
  }

  & .highlighted-row {
    font-weight: bold;
    margin: 2rem 0 1rem 0;
  }

  & .link-top {
    border-top: #acc0d8 0.1rem;
    height: 0.1rem;
    width: 55%;
  }
`;
