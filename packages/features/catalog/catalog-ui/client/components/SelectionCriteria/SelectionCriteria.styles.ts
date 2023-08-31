/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';

export const SelectionWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.stack.s5};
  width: 100%;
`;

export const Selection = styled('div')`
  width: 100%;
`;

export const Unavailable = styled('div')`
  color: ${props => props.theme.colors.text.tertiary};
`;

