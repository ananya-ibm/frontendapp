/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/
import styled from 'styled-components';

export const RecordingWrapper = styled('div')`
  height: 92%;
  width: 100%;

  path {
    fill: red;
  }
`;

export const Wrapper = styled('div')`
  display: flex;
  justify-content: space-between;
  text-align: right;
`;

export const RecordingToggle = styled('button')`
  align-items: center;
  appearance: none;
  background: none;
  border: 0.25rem black solid;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  height: 4rem;
  justify-content: center;
  margin: 1rem 4rem;
  width: 4rem;
`;

export const WordWrapper = styled('div')`
  align-items: center;
  display: flex;
  font-style: italic;
  justify-content: center;
`;

export const Word = styled('span')`
  font-style: italic;
  margin-right: 0.5rem;
`;
