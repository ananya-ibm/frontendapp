/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled, { css } from 'styled-components';

export const Select = styled('ul')`
  background-color: ${props => props.theme.colors.backgrounds.panels.primary.base};
  /* stylelint-disable-next-line unit-allowed-list */
  box-shadow: 0 2px 6px rgb(0 0 0 / 20%);
  max-height: 50vh;
  overflow: auto;
  position: absolute;
  width: 100%;
  z-index: 10;
`;

export const Item = styled('li')<{ isHighlighted: boolean }>`
  display: flex;
  padding: 1rem;
  align-items: center;
  gap: 1rem;
  border-bottom: 0.125rem solid ${props => props.theme.colors.delimiters.lowContrast};

  ${props =>
    props.isHighlighted &&
    css`
      background-color: ${props.theme.colors.backgrounds.panels.primary.selected};
    `}
`;

export const Thumbnail = styled('img')`
  height: 3rem;
  object-fit: cover;
  width: 3rem;
`;

export const Title = styled.div`
  color: ${props => props.theme.colors.text.secondary};
`;
