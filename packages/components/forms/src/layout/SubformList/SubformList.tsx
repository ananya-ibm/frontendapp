/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React, { useState } from 'react';
import { Button } from '@exo/frontend-components-base';
import { Add, TrashCan } from '@carbon/react/icons';
import { useFieldArray, Controller, Control, FieldValues } from 'react-hook-form';
import * as S from './SubformList.styles';
import { Dropdown } from '../../fields/Dropdown/Dropdown';

export const SubformList = ({
  variant = 'row',
  renderEntry,
  newEntry,
  types,
  name,
  control,
  titleText,
  entryCount,
  removeButtonText,
  addButtonText,
  discriminatorId,
  discriminatorValue,
  typeSelectorLabel,
  typeSelectorPlaceholder
}: Props) => {
  // eslint-disable-next-line no-unused-vars
  const [, setForceRerender] = useState(0);
  const isInitalRender = React.useRef(true);
  const { fields, append, remove } = useFieldArray({ control, name });
  const typeSelectorId = `__${name}_typeselector`;

  // This is ugly as it forces a re-render, but I cannot find another way to achieve this
  React.useEffect(() => {
    if (!fields.length && isInitalRender.current) {
      append(
        Array.from({ length: entryCount }, () => ({})),
        { shouldFocus: false }
      );
    }

    if (isInitalRender.current) {
      isInitalRender.current = false;
      setForceRerender(Math.random());
    }
  });

  if (isInitalRender.current) return null;

  return (
    <S.SubformList>
      <S.Toolbar>
        <Dropdown
          id={typeSelectorId}
          name={typeSelectorId}
          isRequired
          variant="inline"
          labelText={typeSelectorLabel}
          placeholderText={typeSelectorPlaceholder}
          value={types[0].value}
          control={control}
          items={types}
        />

        <Button
          size="field"
          icon={<Add size={16} />}
          onClick={() => append(newEntry(control.watchInternal(typeSelectorId)))}
          label={addButtonText}
        />
      </S.Toolbar>
      <S.Title>{titleText}</S.Title>

      {fields.map((item, index) => {
        return (
          <S.Row key={item.id} variant={variant}>
            <Controller
              control={control}
              name={discriminatorId(item, index)}
              defaultValue={discriminatorValue(item, index)}
              render={({ field }) => <input type="hidden" {...field} />}
            />

            <S.Fields>
              {renderEntry(item, index)}
            </S.Fields>
            <S.EntryToolbar>
              <Button
                size="field"
                variant="secondary"
                icon={<TrashCan size={16} />}
                onClick={() => remove(index)}
                label={removeButtonText}
              />
            </S.EntryToolbar>
          </S.Row>
        );
      })}
    </S.SubformList>
  );
};

type Props = {
  variant?: string;

  titleText?: React.ReactNode;
  addButtonText?: React.ReactNode;
  removeButtonText?: React.ReactNode;

  name: string;
  entryCount: number;

  renderEntry: (item: any, index: number) => React.ReactElement;
  newEntry: (type: string) => any;

  control: Control<FieldValues>;

  types: Type[];

  typeSelectorLabel: React.ReactNode;
  typeSelectorPlaceholder: React.ReactNode;

  discriminatorId: (item: any, index: number) => string;
  discriminatorValue: (item: any, index: number) => string;
};

type Type = {
  name: string;
  value: string;
};
