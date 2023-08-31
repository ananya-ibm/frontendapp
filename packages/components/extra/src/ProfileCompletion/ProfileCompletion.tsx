/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Progress } from '../Progress/Progress';
import * as S from './ProfileCompletion.styles';

export const ProfileCompletion = ({ items, percent }: Props) => {
  return (
    <S.ProfileCompletion>
      <S.Roundel>
        <Progress value={percent} />
      </S.Roundel>
      <S.Details>
        {items &&
          items.map(item => (
            <li key={item.title} className="ProfileCompletion-item">
              <span className={`ProfileCompletion-icon ${item.isComplete ? ' isComplete' : ''}`}>
                {item.isComplete ? '✔' : '—'}
              </span>
              {item.title}
            </li>
          ))}
      </S.Details>
    </S.ProfileCompletion>
  );
};

type Props = {
  percent: number;
  items: {
    title: string;
    isComplete: boolean;
  }[];
};
