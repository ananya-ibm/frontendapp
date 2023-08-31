/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';
import theme from './Chrome.theme';

export const Chrome = styled('div')`
  background-color: ${props => theme(props).pageBgColor};
  display: flex;
  flex-direction: column;
`;

export const Footer = styled('div')`
  width: 100%;
`;

export const HeaderSection = styled('div')`
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 5;
`;

export const Notifications = styled('div')`
  max-height: 100vh;
  overflow: auto;
  position: absolute;
  right: 0;
  width: 100%;
  z-index: 5;
`;

export const Main = styled('div')`
  background-color: ${props => theme(props).contentBgColor};
  flex: 1;
  min-height: 50rem;
  padding: ${props => theme(props).contentPadding};
`;
