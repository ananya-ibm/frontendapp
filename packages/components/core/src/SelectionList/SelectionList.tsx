/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { RadioButton } from '@exo/frontend-components-base';
import React, { useContext, useId, useState } from 'react';
import { SkeletonLine } from '../SkeletonLine/SkeletonLine';
import * as S from './SelectionList.styles';

type SelectionContextType = {
  selected: string | undefined;
  setSelected: (newVal: string | undefined) => void;
};

const SelectionContext = React.createContext<SelectionContextType | undefined>(undefined);

export const SelectionList = (props: Props) => {
  const [selected, setSelected] = useState<string | undefined>();
  return (
    <SelectionContext.Provider
      value={{
        selected,
        setSelected
      }}
    >
      <S.SelectionList>{props.children}</S.SelectionList>
    </SelectionContext.Provider>
  );
};

SelectionList.Entry = (props: EntryProps) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { selected, setSelected } = useContext(SelectionContext)!;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const id = useId();
  const entrySelected = !!(selected ? selected === props.id : props.defaultSelected);
  return (
    <S.Header
      onClick={() => {
        setSelected?.(props.id);
        props.onClick?.();
      }}
      selected={entrySelected}
    >
      <RadioButton id={id} checked={entrySelected} />
      <S.Label htmlFor={id}>{props.children}</S.Label>
    </S.Header>
  );
};

SelectionList.Skeleton = () => {
  return (
    <SelectionList>
      <SelectionList.Entry>
        <S.Label>
          <SkeletonLine />
        </S.Label>
      </SelectionList.Entry>
    </SelectionList>
  );
}

type Props = {
  onChange?: (id: string) => void;
  children: any;
};

type EntryProps = {
  children: any;
  onClick?: () => void;
  id?: string;
  // eslint-disable-next-line react/boolean-prop-naming
  defaultSelected?: boolean;
};
