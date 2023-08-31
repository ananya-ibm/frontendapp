/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';

export const SubscriptionItem = styled('div')`

  display: grid;
  grid-template-columns: 3rem 1fr auto;
  padding: 1rem;

  & .title {
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
`;

export const Media = styled('div')<{ img: string }>`
  background-image: ${props => `url(${props.img})`};
  background-position: center;
  background-size: cover;
  height: 100%;
  width: 100%;
`;

export const Main = styled('div')`
  margin-left: 1rem;
`;