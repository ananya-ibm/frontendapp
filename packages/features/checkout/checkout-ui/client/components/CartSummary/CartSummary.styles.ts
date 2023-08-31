/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';

export const CartSummary = styled.div``;

export const Row = styled.div`
  display: flex;
  margin-bottom: 0.5rem;
`;

export const Label = styled.p`
  color: ${props => props.theme.colors.text.secondary};
`;

export const Value = styled.p`
  margin-left: auto;
`;