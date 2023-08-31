/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/
import styled from 'styled-components';

export const Footer = styled.div`
  display: block;
  width: 100%;
`;

export const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  > div {
    flex-direction: row-reverse;
  }
`;

export const BillingCheckbox = styled.div`
  margin-bottom: 2rem;
  width: 100%;
`;
