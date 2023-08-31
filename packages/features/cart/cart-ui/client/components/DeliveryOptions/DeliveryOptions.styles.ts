/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';

export const StoreName = styled.p`
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: ${props => props.theme.spacing.stack.s4};
`;

export const DeliveryOptions = styled('div')`
  margin: 1rem 0;
  width: 100%;
`;
