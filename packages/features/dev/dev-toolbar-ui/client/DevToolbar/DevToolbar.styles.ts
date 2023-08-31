/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';

export const Toolbar = styled.div`
  align-items: center;
  background: black;
  color: white;
  display: flex;
  gap: 0.5rem;
  height: 1.5rem; 
  left: 0%;
  padding: 0 0.5rem;
  padding-left: 1rem;
  position: fixed;
  top: 0;
  width: 100%;

  /* stylelint-disable-next-line plugin/z-index-value-constraint */
  z-index: 100;

  /* stylelint-disable-next-line selector-max-type */
  button { 
    /* stylelint-disable-next-line declaration-property-unit-allowed-list, unit-allowed-list */
    font-size: 11px;
  }
`;

export const Logo = styled.div`
  /* stylelint-disable-next-line declaration-property-unit-allowed-list, unit-allowed-list */
  font-size: 11px;
  font-weight: bold;
  margin-right: 1rem;
`;

export const Entry = styled.div`
  /* stylelint-disable-next-line selector-max-type */
  a { color: white; }

  /* stylelint-disable-next-line selector-max-type */
  a:hover { text-decoration: underline; }
`;

export const Delimiter = styled.div`
  border-left: 0.0625rem solid #666;
  height: 1.5rem;
`;

export const Close = styled.button`
  border: none;
  cursor: pointer;
  margin-left: auto;

  /* stylelint-disable-next-line selector-max-type */
  svg {
    color: white;
  }
`;