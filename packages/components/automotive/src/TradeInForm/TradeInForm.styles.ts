/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';

export const TradeInForm = styled('div')`
  & .submit {
    display: block;
    margin-top: ${props => props.theme.spacing.stack.s7};
  }
`;
