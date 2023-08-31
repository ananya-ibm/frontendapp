/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';

export const FourCardDisplay = styled('div')`
`;

export const Image = styled('div')<{ src: string }>`
  background: url(${props => props.src}) center no-repeat;
  background-size: cover;
  height: 100%;
  width: 100%;
`;

export const Title = styled('p')`
  margin-top: ${props => props.theme.spacing.stack.s5};
`;
