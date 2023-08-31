/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import * as S from './Progress.styles';

export const Progress = ({ value = 0 }: Props) => (
  <S.Progress>
    <CircularProgressbar value={value} text={`${value}%`} />
  </S.Progress>
);

type Props = {
  value?: number;
};
