/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Add, TrashCan } from '@carbon/react/icons';
import { Control, FieldValues, useFieldArray } from 'react-hook-form';
import range from 'lodash/range';
import { Button } from '@exo/frontend-components-base';
import * as S from './FieldArray.styles';
import { useEffectOnce } from '@exo/frontend-common-hooks';

export const FieldArray = ({
  variant = 'row',
  renderEntry,
  newEntry,
  entryCount,
  isDisabled=false,
  isViewOnly=false,
  name,
  control,
  titleText,
  addButtonText
}: Props) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name
  });

  // This is ugly as it forces a re-render, but I cannot find another way to achieve this
  useEffectOnce(() => {
    if (!fields.length) {
      append(
        Array.from(range(0, entryCount), () => ({})),
        { shouldFocus: false }
      );
    }
  });

  return (
    <S.FieldArray>
      <S.Toolbar>
        <S.Title>{titleText}</S.Title>
        {!isViewOnly && <Button
          size="field"
          variant="tertiary"
          disabled={isDisabled}
          icon={<Add size={16} />}
          onClick={() => append(newEntry())}
          label={addButtonText}
        />}
      </S.Toolbar>

      {fields.map((item, index) => {
        return (
          <S.Row key={item.id} variant={variant}>
            <S.Fields>
              {renderEntry(item, index)}
            </S.Fields>
            <S.EntryToolbar>
              {!isViewOnly && <Button
                size="field"
                disabled={isDisabled}
                variant="danger-tertiary"
                icon={<TrashCan size={16} />}
                label="Delete"
                onClick={() => remove(index)}
              />}
            </S.EntryToolbar>
          </S.Row>
        );
      })}
    </S.FieldArray>
  );
};

type Props = {
  variant?: string;

  titleText?: React.ReactNode;
  addButtonText?: React.ReactNode;
  removeButtonText?: React.ReactNode;

  name: string;
  entryCount: number;

  isDisabled?: boolean;
  isViewOnly?: boolean;

  renderEntry: (item: any, index: number) => React.ReactElement;
  newEntry: () => any;

  control: Control<FieldValues>;
};
