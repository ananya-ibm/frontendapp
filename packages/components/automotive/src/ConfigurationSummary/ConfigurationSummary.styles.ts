/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled, { css } from 'styled-components';
import { ifProp } from '@exo/frontend-common-style-utils';
import theme from './ConfigurationSummary.theme';

export const ConfigurationSummary = styled('div')`
  display: flex;
  max-width: ${props => theme(props).maxWidth};
`;

export const LeftSummary = styled('div')`
  background-color: ${props => theme(props).leftBackground};
  flex: 0 0 50%;
  padding: ${props => theme(props).layoutSpacing};
`;
export const RightSummary = styled('div')`
  background-color: ${props => theme(props).rightBackground};
  flex: 0 0 50%;
  padding: ${props => theme(props).layoutSpacing};

  & .selection {
    margin: ${props => theme(props).paragraphSpacing} 0 0;
  }
`;

export const SummarySection = styled('div')`
  display: flex;
  flex: 0 50%;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: ${props => theme(props).paragraphSpacing} 0 0;
`;

export const SummaryTile = styled('div')`
  flex: 0 50%;
  padding: ${props => theme(props).paragraphSpacing} 0;
`;

export const Title = styled('h2')<{ isSmall?: boolean }>`
  font: 700 ${props => theme(props).titleFontSize} ${props => theme(props).titleFontFamily};
  ${props => ifProp(props, 'isSmall').isTruthy().then(css`
    margin-top: 0;
  `)}
  ${props => ifProp(props, 'isSmall').isFalsy().then(css`
    margin-top: ${theme(props).paragraphSpacing};
  `)}
`;

export const Text = styled('div')`
  font: 400 ${props => theme(props).textFontSize} ${props => theme(props).textFontFamily};
  margin-top: ${props => theme(props).paragraphSpacing};
`;

export const BoldText = styled('div')`
  font-weight: 700;
`;

export const Subtitle = styled('h4')<{ newLine?: boolean }>`
  display: ${props => (props.newLine ? 'block' : 'inline')};
  font: 700 ${props => theme(props).textFontSize} ${props => theme(props).textFontFamily};
  margin-top: ${props => theme(props).layoutSpacing};
`;

export const ButtonGroup = styled('div')`
  align-items: center;
  display: flex;
  justify-content: flex-end;
  margin: ${props => props.theme.spacing.stack.s7} 0 0;
`;

export const Price = styled('div')`
  margin: ${props => props.theme.spacing.stack.lM} 0 0;
`;

export const Button = styled('div')`
  margin-left: ${props => theme(props).layoutSpacing};
`;

export const Image = styled('img')`
  margin-top: ${props => theme(props).paragraphSpacing};
  width: 100%;
`;

export const SmallConfigurationSummary = styled('div')`
  background-color: ${props => theme(props).background};
  padding: ${props => theme(props).tilePadding};
`;
