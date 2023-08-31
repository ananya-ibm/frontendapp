/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';

export const Button = styled.button`
  align-items: center;
  background: transparent;
  border: none;
  color: ${props => props.theme.colors.text.primary};
  display: flex;
  height: 100%;
  justify-content: center;
  outline: none;
  padding: 0.75rem;
  position: relative;
  width: 3rem;

  & .menu-button-icon {
    height: 100%;
    width: 100%;
  }
`;
