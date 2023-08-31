/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import * as S from './Select.styles';

export const Select = ({ label, selected, children, onChange }: Props) => {
  const [value, setValue] = React.useState(selected);
  return (
    <S.Container>
      <S.Label>{label}</S.Label>
      <S.Row>
        <S.Select
          value={value}
          onChange={e => {
            setValue(e.currentTarget.value);
            onChange(e.currentTarget.value);
          }}
        >
          {children}
        </S.Select>
        <S.DownArrow xmlns="http://www.w3.org/2000/svg" overflow="visible" viewBox="0 0 50 50">
          <path
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            d="M41 17L25 33 9 17"
          />
        </S.DownArrow>
      </S.Row>
    </S.Container>
  );
};

type Props = {
  children: React.ReactNode;
  selected: string;
  onChange: (value: string) => void;
  label: string;
};
