/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled, { css } from 'styled-components';
import { ifProp } from '@exo/frontend-common-style-utils';
import theme from './AutomotiveCartSummary.theme';

export const AutomotiveCartSummary = styled('div')<{ isGrid?: boolean }>`
  max-width: ${props => theme(props).maxWidth};
  padding: ${props => theme(props).padding};
  text-align: left;

  ${props => ifProp(props, 'isGrid').then(css`
    display: grid;
    grid-column-gap: ${props.theme.spacing.inline.s7};
    grid-row-gap: ${props.theme.spacing.inline.s7};
    grid-template-columns: 60% 1fr;
    grid-template-rows: repeat(2, 1fr);
    max-width: none;
  `)}
`;

export const Section = styled('div')<{ isConfirmation?: boolean }>`
  flex: 0 0 50%;
  margin-top: 2.75rem;

  & .cost-title {
    margin-top: 2.25rem;
    text-align: left;
    ${props => props.isConfirmation ? 'margin-top: 0;' : ''}
  }

  ${props => ifProp(props, 'isConfirmation').then(css`
    margin-top: 0;

    & .config {
      margin-top: 5.25rem;
    }
  `)}
`;

export const Group = styled('div')<{ isRow?: boolean }>`
  &:first-of-type {
    grid-area: 1 / 1 / 2 / 2;
  }

  &:nth-child(2) {
    grid-area: 1 / 2 / 2 / 3;
  }

  &:last-of-type {
    grid-area: 2 / 1 / 3 / 3;
  }

  ${props => ifProp(props, 'isRow').then(css`
    display: flex;
    flex-direction: row;
    width: 100%;

    & ${Section}:first-child {
      flex: 0 0 60%;
    }
    & ${Section}:last-child {
      flex: 0 0 40%;
      padding-left: 2rem;
    }
  `)}
`;

export const CarDetails = styled('div')<{ isConfirmation?: boolean }>`
  ${props => ifProp(props, 'isConfirmation').isTruthy().then(css`
    display: block;
  `)}
  ${props => ifProp(props, 'isConfirmation').isFalsy().then(css`
    display: flex;
  `)}
  flex-direction: row;
`;

export const Details = styled('div')<{ isConfirmation?: boolean }>`
  ${props => ifProp(props, 'isConfirmation').isTruthy().then(css`
    padding: 0;
  `)}
  ${props => ifProp(props, 'isConfirmation').isFalsy().then(css`
    padding: 1.5rem 0 0 1.5rem;
  `)}
`;

export const LargeTitle = styled('div')`
  font: 700 ${props => theme(props).titleFontSize} ${props => theme(props).titleFontFamily};
  padding: ${props => theme(props).layoutSpacing} 0;
`;

export const HighLightText = styled('span')`
  color: ${props => theme(props).highlightTextColor};
`;

export const Title = styled('div')`
  font: 700 ${props => theme(props).titleFontSize} ${props => theme(props).titleFontFamily};
`;

export const Text = styled('div')`
  font: 400 ${props => theme(props).textFontSize} ${props => theme(props).textFontFamily};
  line-height: 1.5rem;
  margin-top: ${props => theme(props).paragraphSpacing};
  max-width: 80%;
`;

export const BoldText = styled('div')`
  display: inline;
  font: 700 ${props => theme(props).textFontSize} ${props => theme(props).textFontFamily};
`;

export const Image = styled('img')`
  margin-top: 1.25rem;
  max-width: 13.75rem;
  width: 100%;
`;

export const Media = styled('div')`
  align-items: center;
  display: flex;
  padding-top: ${props => props.theme.spacing.stack.s6};
`;

export const Caption = styled('div')`
  font: 400 ${props => theme(props).textFontSize} ${props => theme(props).textFontFamily};
  margin-left: ${props => props.theme.spacing.inline.s6};
`;

export const Thumbnail = styled('img')`
  max-width: 3.25rem;
`;
