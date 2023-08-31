/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable no-else-return */

import React, { useState } from 'react';
import { ComboBox as BaseComboBox } from '@exo/frontend-components-base';
import { ControlledFieldProps } from '../../helpers/types';
import { ControlledField } from '../../helpers/ControlledField';

const isMatch = (input, item) => {
  return item.match(new RegExp(`^.*${input?.split('').join('.*')}.*$`)) !== null;
};

export const ComboBox = React.forwardRef(
  (
    {
      id,
      name,
      value,
      control,
      isRequired,
      errorText,
      labelText,
      requiredLabelText = (isReq, label) => (isReq ? label : `${label} (optional)`),
      helpText,
      placeholderText,
      loadingText = 'Loading...',
      isDisabled,
      items = [],
      loadItems,
      valueLabel,
      onChangeValue
    }: Props,
    /* @ts-ignore */
    // eslint-disable-next-line no-unused-vars
    ref
  ) => {
    const loading = [{ value: undefined, name: loadingText }];
    const [itemList, setItemList] = useState<Item[]>(
      value ? [{ value, name: valueLabel ?? '' }] : []
    );

    if (loadItems) {
      return (
        <ControlledField
          render={({ field }) => {
            return (
              <BaseComboBox<Item>
                id={id}
                name={field.name}
                disabled={isDisabled}
                errorText={errorText}
                helpText={helpText}
                variant={'default'}
                placeholder={placeholderText ?? ''}
                labelText={requiredLabelText(!!isRequired, labelText ?? '')}
                initialSelectedItem={itemList.find(c => c.value === field.value)}
                items={itemList}
                itemToString={c => c?.name!}
                onChange={e => field.onChange(e.value)}
                downshiftProps={{
                  stateReducer: (state, changes) => {
                    // Select first index when changing auto-complete
                    if (changes.type === '__autocomplete_change_input__') {
                      return {
                        ...changes,
                        highlightedIndex: 0
                      };
                      // Work around issue where highlightedIndex from old list is propagated
                    } else if (changes.type === undefined && state.highlightedIndex === 0) {
                      return {
                        ...changes,
                        highlightedIndex: 0
                      };
                      // Never set an highlighted index out of bounds
                    } else if (
                      changes.highlightedIndex === -1 ||
                      changes.highlightedIndex === null ||
                      changes.highlightedIndex >= itemList.length
                    ) {
                      return {
                        ...changes,
                        highlightedIndex: 0
                      };

                      // Finally, clear dropdown on enter
                    } else if (changes.isOpen && itemList.length === 0) {
                      return {
                        ...changes,
                        isOpen: true,
                        inputValue: undefined
                      };
                    }
                    return changes;
                  }
                }}
                onInputChange={async e => {
                  if (!e || e.length < 1) {
                    setItemList([]);
                    return;
                  }
                  setItemList(loading);
                  setItemList(await loadItems(e));
                }}
              />
            );
          }}
          onChangeValue={onChangeValue}
          control={control}
          name={name}
          value={value ?? ''}
        />
      );
    } else {
      return (
        <ControlledField
          render={({ field }) => {
            const matchingItem = items.find(c => c.value === field.value);
            return (
              <BaseComboBox<Item>
                id={id}
                name={field.name}
                disabled={isDisabled}
                errorText={errorText}
                helpText={helpText}
                variant={'default'}
                placeholder={placeholderText ?? ''}
                labelText={requiredLabelText(!!isRequired, labelText ?? '')}
                selectedItem={matchingItem ?? null}
                initialSelectedItem={matchingItem}
                items={items}
                itemToString={c => c?.name!}
                shouldFilterItem={({ item, inputValue }) => {
                  return (
                    inputValue === matchingItem?.name ||
                    isMatch(inputValue, item?.name.toLowerCase())
                  );
                }}
                onChange={e => field.onChange(e?.value ?? undefined)}
              />
            );
          }}
          control={control}
          name={name}
          onChangeValue={onChangeValue}
          value={value ?? ''}
        />
      );
    }
  }
);

type Props = ControlledFieldProps<string> & {
  // *******************************************************************
  // Common properties for all fields
  requiredLabelText?: (isReq: boolean, label: string) => string;
  isRequired?: boolean;

  // *******************************************************************
  // ComboBox specific properties
  placeholderText?: string;
  loadingText?: string;
  items?: Item[];
  loadItems: (e: any) => Promise<Item[]>;
  valueLabel?: string;
};

type Item = {
  name: string;
  value?: string;
};
