/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled, { css } from 'styled-components';
import { ifProp, responsiveFontBlock, when, otherwise } from '@exo/frontend-common-style-utils';
import theme from './StoreHeader.theme';

export const StoreHeader = styled('div')<{ cardStyle: string }>`
  ${props => ifProp(props, 'cardStyle').switch([
    when.eq('one').then(css`
      background-color: ${props.theme.colors.backgrounds.panels.primary.base};
    `),
    when.eq('two').then(css`
      background-color: ${props.theme.colors.backgrounds.panels.secondary.base};
    `),
    when.eq('three').then(css`
      background-color: ${props.theme.colors.backgrounds.panels.tertiary.base};
    `),
    otherwise(css`
      background-color: ${props.theme.colors.backgrounds.panels.tertiary.base};
    `)
  ])}

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 2.5rem;
  width: 100%;
`;

export const Media = styled('div')`
  display: flex;
  max-height: 10rem;
  max-width: 10rem;
  overflow: hidden;
`;

export const StoreInfo = styled('div')`
  display: flex;
`;

export const StoreDetails = styled('div')`
  display: flex;
  flex-direction: column;
`;

export const Title = styled('h3')`
  color: ${props => theme(props).titleColor};
  ${props => responsiveFontBlock(props.theme.typography.heading.heading2)};
  margin-bottom: ${props => theme(props).textMarginBottom};
  max-width: 100%;
  overflow: hidden;
  padding: 0.5rem;
  text-overflow: ellipsis;
`;

export const Text = styled('span')`
  color: ${props => theme(props).textColor};
  ${props => responsiveFontBlock(props.theme.typography.body.short.L)};
  margin-bottom: ${props => theme(props).textMarginBottom};
  max-width: 100%;
  overflow: hidden;
  padding: 0.5rem;
  text-overflow: ellipsis;
`;

export const Writing = styled('div')`
  padding: 0.5rem;
`;
