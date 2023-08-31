/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable no-underscore-dangle */

import styled from 'styled-components';
import theme from './Masthead.theme';

export const Masthead = styled.div`
  border: ${(props) => theme(props).border};
  border-width: ${(props) => theme(props).borderWidth};
  box-shadow: ${(props) => theme(props).boxShadow};
  margin-top: var(--top);
  top: var(--top);
`;
