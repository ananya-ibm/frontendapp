/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';
import { responsiveFontBlock } from '@exo/frontend-common-style-utils';

export const RegisterPage = styled('div')`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

export const Title = styled('div')`
  ${props => responsiveFontBlock(props.theme.typography.heading.heading1)};
`;
