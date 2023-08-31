/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/
import styled from 'styled-components';

export const CardPayment = styled('div')`
  margin: 0;

  & .label {
    color: ${props => props.theme.colors.text.secondary};
    font-size: 0.75rem;
    margin-bottom: 0.5rem;
  }

  & .StripeElement {
    background: ${props => props.theme.colors.backgrounds.page};
    border: 0.0625rem solid ${props => props.theme.colors.delimiters.primary};
    border-radius: 0.25rem;
    padding: ${props => props.theme.spacing.inset.M};
  }
`;
