/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';

export const Row = styled('div')`
  align-items: flex-start;
  border: solid 0.0625rem ${props => props.theme.colors.delimiters.primary};
  display: flex;
  flex-direction: row;
  flex-grow: 0;

  justify-content: flex-start;
  position: relative;
  transition: border 200ms ease-out;
`;

export const Container = styled('label')`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: auto;

  &:hover,
  &:focus-within {
    ${Row} {
      border: solid 0.0625rem black;
    }
  }
`;

export const Label = styled.span`
  color: ${props => props.theme.colors.text.secondary};
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: 0.05rem;
  line-height: 1rem;
  margin-bottom: 0.1rem;
  vertical-align: baseline;
`;

export const Select = styled.select`
  appearance: none;
  border: none;
  outline: none;
  padding: 0.5rem;
  padding-right: 1.75rem;
  text-align: center;
  width: auto;
`;

export const DownArrow = styled.svg`
  height: 100%;
  pointer-events: none;
  position: absolute;
  right: 0.5rem;
  width: 0.75rem;
`;
