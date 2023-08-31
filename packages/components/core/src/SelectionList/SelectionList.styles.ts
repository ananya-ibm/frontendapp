/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/
import styled from 'styled-components';

export const SelectionList = styled('div')`
`;

export const Header = styled('div')<{ selected?: boolean }>`
  background-color: ${props => props.theme.colors.backgrounds.panels.primary.base};
  cursor: pointer;
  padding: 1rem;
  display: flex;
  align-items: center;
  margin-bottom: 0.25rem;
  gap: 1rem;

  &:hover {
    background-color: ${props => props.theme.colors.backgrounds.panels.primary.hover};
  }
`;

export const Label = styled.label`
  font-size: ${props => props.theme.typography.body.short.M.size};
`;

