/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { Link as ReactLink } from '@exo/frontend-common-link';
import { media } from '@exo/frontend-common-style-utils';
import styled, { css } from 'styled-components';

export const Heading = styled('div')`
  font-size: 170%;
  margin-bottom: 1rem;
  margin-top: 4rem;
  text-align: center;
`;

export const ImageGrid = styled('div')<{ count: number }>`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr;
  gap: 1rem;

  ${props =>
    media.greaterThan(props, 'medium').then(css`
      grid-template-columns: repeat(2, 1fr);
    `)}
  ${props =>
    media.greaterThan(props, 'large').then(css`
      grid-template-columns: repeat(${props.count}, 1fr);
    `)}
`;

export const Entry = styled('div')<{ columns: number }>`
  width: 100%;
  height: 20rem;

  display: flex;
  flex-direction: column;

  cursor: pointer;

  ${props =>
    media.greaterThan(props, 'large').then(css`
      grid-column: span ${props.columns};
    `)}
`;

export const Image = styled('div')<{ src: string }>`
  background-image: url(${props => props.src});
  background-size: cover;
  height: 100%;
  position: relative;
  width: 100%;
`;

export const Title = styled('div')`
  background: linear-gradient(to top, rgba(0, 0, 0, 0.35) 5%, transparent 22%);
  bottom: 0;
  color: white;
  display: flex;
  flex-direction: column-reverse;
  font-size: 150%;
  font-weight: bold;
  left: 0;
  padding: 1rem;
  position: absolute;
  right: 0;
  /* stylelint-disable-next-line unit-allowed-list */
  text-shadow: 0 2px 3px rgba(0, 0, 0, 0.3);
  top: 0;
`;

export const SubTitle = styled('div')`
  color: black;
  font-size: 150%;
  font-weight: bold;
  margin-bottom: 1rem;
  margin-top: 1rem;
`;

export const Text = styled('div')`
  color: black;
  margin-bottom: 1rem;
`;

export const Links = styled('div')``;

export const Link = styled(ReactLink)`
  color: black;
  margin-right: 0.5rem;
  text-decoration: underline;
`;
