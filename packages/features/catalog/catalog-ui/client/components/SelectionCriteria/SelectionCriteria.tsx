/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { Dropdown } from '@exo/frontend-components-base';
import { SelectionCriteriaContainerRenderProps } from '@exo/frontend-features-catalog-logic';
import React from 'react';
import * as S from './SelectionCriteria.styles';

const undefinedToNull = a => (a === undefined ? null : a);

export const SelectionCriteria = ({
  selection,
  activeSelection,
  onChange,
  className
}: SelectionCriteriaContainerRenderProps & { className?: string }) => {
  if (selection?.criteria?.length <= 0) return null;

  return (
    <S.SelectionWrapper className={className}>
      {selection.criteria.map(c => (
        <S.Selection key={c.id}>
          <Dropdown
            id={c.id}
            key={c.id}
            items={Object.values(c.values)}
            itemToString={item => (item ? item.value : '')}
            itemToElement={item =>
              item.available ? <div>{item.value}</div> : <S.Unavailable>{item.value}</S.Unavailable>
            }
            dropdownLabel={`Select ${c.name}`}
            labelText={c.name}
            selectedItem={undefinedToNull(
              Object.values(c.values).find((v: any) => v.id === activeSelection[c.id])
            )}
            onChange={i => onChange({ criteria: c.id, item: { selectedItem: i } })}
          />
        </S.Selection>
      ))}
    </S.SelectionWrapper>
  );
};

SelectionCriteria.Skeleton = () => {
  return (
    <S.SelectionWrapper>
      <S.Selection>
        <Dropdown.Skeleton />
      </S.Selection>
    </S.SelectionWrapper>
  );
};
