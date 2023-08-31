/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable jsx-a11y/label-has-for */
import React, { useState } from 'react';
import * as S from './OptionsGroup.styles';

export const OptionsGroup = ({ name, options, selectedIdx = 0, onSelect = () => {} }: Props) => {
  const [currentIdx, setCurrentIdx] = useState(selectedIdx);
  const onSelectOption = idx => () => {
    setCurrentIdx(idx);
    onSelect(idx);
  };
  return (
    <S.OptionsGroup>
      {options &&
        options.map((option, idx) => (
          // eslint-disable-next-line react/no-array-index-key
          <S.Option key={`${option}_${idx}`}>
            <S.Input
              type="radio"
              id={`${option}_${idx}`}
              name={name}
              onClick={onSelectOption(idx)}
              defaultChecked={idx === currentIdx}
            />
            <S.Label htmlFor={`${option}_${idx}`}>{option}</S.Label>
          </S.Option>
        ))}
    </S.OptionsGroup>
  );
};

type Props = {
  name: string;
  options: string[];
  selectedIdx?: number;
  onSelect?: (idx: number) => void;
};
