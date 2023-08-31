/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';

export const Footer = styled('div')`
  /* stylelint-disable-next-line unit-allowed-list */
  border-bottom: 1px solid ${props => props.theme.colors.delimiters.primary};
  /* stylelint-disable-next-line unit-allowed-list */
  border-top: 1px solid ${props => props.theme.colors.delimiters.primary};
  bottom: 0;
  color: ${props => props.theme.colors.brand.brand2.contrast};
  display: flex;
  font-size: 80%;
  height: 2.8rem;
  margin-top: 3rem;
  padding: 1rem 2rem;
`;

export const Copyright = styled.div``;

export const Locale = styled.div`
  margin-left: auto;

  /* stylelint-disable-next-line selector-max-type */
  div {
    color: white;
  }
`;
