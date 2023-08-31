/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { ifProp } from '@exo/frontend-common-style-utils';
import styled, { css } from 'styled-components';

export const ToolbarButton = styled('div')<{ isSelected?: boolean; isHighlighted?: boolean }>`
  position: relative;

  & svg {
    cursor: pointer;
    margin: ${props => props.theme.spacing.stack.s3} 0.9rem 0;
    width: 1.2rem;
    ${props => props.isHighlighted && `color: ${props.theme.colors.brand.brand1.base};`};
  }

  &:hover {
    background-color: ${props => props.theme.colors.backgrounds.panels.primary.hover};
  }

  ${props =>
    ifProp(props, 'isSelected').then(css`
      background-color: ${props.theme.colors.backgrounds.panels.primary.hover};
    `)}
`;

const size = '0.8rem';

export const FilterCount = styled('span')`
  background-color: ${props => props.theme.colors.brand.brand1.base};
  border-radius: calc(${size} * 0.5);
  color: ${props => props.theme.colors.brand.brand1.contrast};
  font-size: calc(${size} * .8);
  font-weight: 700;
  height: ${size};
  left: calc(0.675rem + 50%);
  line-height: calc(${size} * 1.1);
  min-width: ${size};
  padding: 0 0.25rem;
  position: absolute;
  top: 0.5rem;
  transform: translateX(-50%);
`;

export const Wrapper = styled('div')``;
