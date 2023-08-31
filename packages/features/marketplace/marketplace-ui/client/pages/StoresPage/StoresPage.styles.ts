/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';
import theme from './StoresPage.theme';

// TODO: Is this really the best way to define the page margins?
export const Stores = styled('div')`
  margin: ${props => props.theme.spacing.stack.s7} ${props => props.theme.spacing.stack.s9};
  min-height: 60vh;
`;

export const Header = styled('div')`
  display: flex;
  font: ${props => theme(props).titleFont};
  /*stylelint-disable-next-line selector-max-type*/
  span {
    margin-left: auto;
  }
`;

export const Title = styled('div')`
  color: ${props => theme(props).titleColor};
  font: ${props => theme(props).titleFont};
  padding: ${props => props.theme.spacing.stack.s7} 0;
  text-transform: ${props => theme(props).textTransform};
`;
