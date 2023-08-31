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
  height: 100%;
  padding-top: 56.25%;
`;

export const Content = styled('div')`
  font-size: 1rem;
  line-height: 1.5rem;
  margin-bottom: 2rem;
`;

export const Link = styled(ReactLink)`
`;

export const ContentPanel = styled('div')`
  margin: 2rem;
  text-align: right;
`;

export const Title = styled('h3')`
  font-weight: 700;
  margin-bottom: 0.6rem;
`;

export const Subtitle = styled('h5')`
  margin-bottom: 1rem;
`;

const shadow = `0.125rem 0.125rem 1rem rgba(0, 0, 0, 0.1),
  -0.125rem -0.125rem 1rem rgba(0, 0, 0, 0.1)`;

type HorizontalContentCardProps = {
  isImageRight?: boolean;
  hasAlwaysShadow?: boolean;
  hasNoShadow?: boolean;
};
export const HorizontalContentCard = styled('div')<HorizontalContentCardProps>`
  display: flex;

  .card-image {
    width: 50%;
    ${props => ifProp(props, 'isImageRight').isTruthy().then(css`
      order: 2;
      padding-left: 0;
    `)}

    ${props => ifProp(props, 'isImageRight').isFalsy().then(css`
      padding-right: 0;
    `)}
  }

  .card-content {
    width: 50%;
    ${props => ifProp(props, 'isImageRight').isTruthy().then(css`
      order: 1;
      padding-right: 0;

      ${ContentPanel} {
        text-align: left;
      }
    `)}

    ${props => ifProp(props, 'isImageRight').isFalsy().then(css`
      padding-left: 0;
    `)}
  }

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
  `)};
`;
