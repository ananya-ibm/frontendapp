/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';
import theme from './ProductAttributeTable.theme';

export const Row = styled('div')`
  display: flex;
  justify-content: space-between;
  position: relative;
`;

export const Text = styled('div')`
  padding: 0.5rem 0;
`;

export const Table = styled('div')`
`;

export const Section = styled('div')`
  margin-bottom: 2rem;
`;

export const Title = styled('div')`
  border-bottom: 0.0625rem solid ${props => theme(props).border};
  font-size: 130%;
  padding: 1rem 0;
`;
