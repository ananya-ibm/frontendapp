/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';
import { responsiveFontBlock } from '@exo/frontend-common-style-utils';

export const Row = styled('div')`
  align-items: flex-start;
  display: flex;
  flex-direction: row;
  flex-grow: 0;

  justify-content: flex-start;
  position: relative;
  background: pink;
`;

export const Container = styled('label')`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: auto;
`;

export const Label = styled.span`
  ${props => responsiveFontBlock(props.theme.typography.labels.label)};
  color: ${props => props.theme.colors.text.secondary};
`;

export const Select = styled.select`
  appearance: none;
  border: none;
  outline: none;
  padding: 0.15rem 1.75rem 0.15rem 0;
  text-align: left;
  width: auto;
`;

export const DownArrow = styled.svg`
  height: 100%;
  pointer-events: none;
  position: absolute;
  right: 0.5rem;
  width: 0.75rem;
`;
