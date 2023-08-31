/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';
import theme from './DealerDetails.theme';

export const DealerDetails = styled('div')`
  background: ${props => theme(props).uiBackground};
  border-bottom: 0.125rem solid ${props => theme(props).borderColor};
  border-left: 0.125rem solid ${props => theme(props).borderColor};
  border-radius: ${props => theme(props).borderRadius};
  border-right: 0.125rem solid ${props => theme(props).borderColor};
  border-top: 0.5rem solid ${props => theme(props).bordertTop};
  padding: ${props => theme(props).padding};

  & .information {
    fill: #0062ff;
  }

  & .infoCol {
    text-align: right;
  }

  & .row1 {
    margin-bottom: ${props => theme(props).marginLarge};
  }
`;

export const Title = styled('h3')`
  font-weight: 700;
  text-align: left;
`;

export const Media = styled('div')`
  flex: 0 0 8rem;
  height: ${props => theme(props).height};
  position: relative;
  width: ${props => theme(props).height};
`;

export const Image = styled('div')<{ img?: string }>`
  align-items: center;
  background-image: ${props => `url(${props.img})`};
  background-position: center;
  background-size: cover;
  border: 0.125rem solid ${props => theme(props).imageBorder};
  border-radius: 50%;
  display: flex;
  height: 100%;
  justify-content: center;
  width: 100%;
`;

export const HeadingText = styled('h4')`
  font-weight: 700;
  margin-bottom: ${props => theme(props).marginSmall};
  text-align: left;
`;

export const Text = styled('p')`
  font-weight: 700;
  margin-bottom: ${props => theme(props).marginSmall};
  text-align: left;
`;
