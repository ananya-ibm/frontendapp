/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';

export const RegistrationPane = styled('div')`
  margin: ${props => props.theme.spacing.stack.s7} 0;
  max-width: 50rem;
  
  & .registrationForm {
    display: flex;
    flex-direction: column;
  }
`;

export const RegistrationForm = styled('div')`
  background-color: ${props => props.theme.colors.backgrounds.panels.secondary.base};
  border-bottom: 0.1rem solid ${props => props.theme.colors.brand.brand1.base};
  border-radius: 0.1rem 0.1rem 0 0;
  box-shadow: 0 1rem 2rem 0 ${props => props.theme.colors.interactive.secondary.hover.bg};
  padding: ${props => props.theme.spacing.inset.L};
  transition: box-shadow 0.2s;

  :hover {
    box-shadow: 0 1.2rem 2.4rem 0 ${props => props.theme.colors.interactive.secondary.hover.bg};
  }

  & .cds--select-input__wrapper,
  .cds--select-input {
    width: 100%;
  }
`;
