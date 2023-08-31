/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';

export const Footer = styled('div')`
  background-color: ${(props) => props.theme.colors.brand.brand2.base};
  bottom: 0;
  color: ${(props) => props.theme.colors.brand.brand2.contrast};
  display: flex;
  align-items: center;
  font-size: 80%;
  height: 2rem;
  left: 0;
  padding: 0.6rem 2rem;
  position: fixed;
  right: 0;
  z-index: 15;
`;

export const Copyright = styled.div``;

export const Locale = styled.div`
  margin-left: auto;

  .action {
    font-size: 90%;
    cursor: pointer;
    border: none;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    gap: 0.5rem;
    white-space: no-wrap;
    color: ${(props) => props.theme.colors.brand.brand2.contrast};

    /* stylelint-disable-next-line */
    [role='img'] {
      align-items: center;
      display: flex;
    }
  }
  /* stylelint-disable-next-line selector-max-type */
  div {
    color: white;
  }
`;
