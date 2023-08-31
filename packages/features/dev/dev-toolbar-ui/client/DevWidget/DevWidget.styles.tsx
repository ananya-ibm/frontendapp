/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled, { css } from 'styled-components';

export const Widget = styled.div`
  align-items: center;
  display: flex;
  gap: 0.2rem;
  position: relative;
`;

export const Clickable = styled.button<{ isClickable: boolean }>`
  align-items: center;
  text-align: left;
  ${props =>
    props.isClickable &&
    css`
      cursor: pointer;
    `}
  border: none;
  color: white;
  display: flex;
  gap: 0.2rem;
`;

export const Body = styled.div``;

export const Icon = styled.div`
  svg {
    /* stylelint-disable-next-line declaration-no-important */
    color: white !important;
    /* stylelint-disable-next-line declaration-no-important */
    fill: white !important;
  }
  button {
    border: none;
  }
`;

export const Actions = styled.div`
  margin-left: 0.5rem;
`;

export const Action = styled.div`
  border: none;
  cursor: pointer;

  svg {
    /* stylelint-disable-next-line sh-waqar/declaration-use-variable */
    color: #bebebe;
    fill: #bebebe;
  }
  button {
    border: none;
  }
`;
