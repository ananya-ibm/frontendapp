/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled, { css } from 'styled-components';
import { ifProp } from '@exo/frontend-common-style-utils';
import { Link as ReactLink } from '@exo/frontend-common-link';

export const Media = styled('div')<{ img: string }>`
  background-image: ${props => `url(${props.img})`};
  background-position: center;
  background-size: cover;
  display: flex;
  margin-bottom: 0.5rem;
  padding-top: 56.25%;
  width: 100%;
`;

export const Content = styled('div')`
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

export const Link = styled(ReactLink)`
  font-size: 0.9rem;
`;

export const Title = styled('h4')`
`;

export const Subtitle = styled('h5')`
  margin-bottom: 0.5rem;
`;

const shadow = `0.125rem 0.125rem 1rem rgba(0, 0, 0, 0.1),
  -0.125rem -0.125rem 1rem rgba(0, 0, 0, 0.1)`;

type ContentCardProps = {
  hasAlwaysShadow?: boolean;
  hasNoShadow?: boolean;
};
export const ContentCard = styled('div')<ContentCardProps>`
  align-items: center;
  justify-content: center;
  padding-bottom: 1rem;
  text-align: center;

  ${props => ifProp(props, 'hasAlwaysShadow').isTruthy().then(css`
    box-shadow: ${shadow};
  `)}

  &:hover {
    ${props => ifProp(props, 'hasAlwaysShadow').isFalsy().then(css`
      box-shadow: ${shadow};
    `)}
    ${props => ifProp(props, 'hasNoShadow').then(css`
      box-shadow: none;
    `)}
  }

  ${props => ifProp(props, 'hasNoShadow').then(css`
    box-shadow: none;
  `)}
`;
