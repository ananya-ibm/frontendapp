/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled, { css } from 'styled-components';

export type Spacing = 'introduction' | 'call-out';

export const TextSection = styled.div<{ spacing: Spacing }>`
  display: flex;
  flex-direction: column;
  align-items: center;

  text-align: center;
  > * { max-width: 40rem; }

  ${props => props.spacing === 'introduction' && css`margin-bottom: -1.5rem;`}
  ${props => props.spacing === 'call-out' && css`padding: 2rem 0;`}
`;

export const SubTitle = styled.p`
  margin-bottom: 0.5rem;
  color: ${props => props.theme.colors.text.secondary};
`;

export const Title = styled.h2`
  margin-bottom: 1rem;
`;

export const Body = styled.p``;

export const Buttons = styled.div`
  margin-top: 1.375rem;
  display: flex;
  gap: 1rem;
`;