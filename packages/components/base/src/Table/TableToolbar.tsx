/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React, { ChangeEventHandler } from 'react';
import {
  TableToolbar as CarbonTableToolbar,
  TableToolbarContent as CarbonTableToolbarContent,
  TableToolbarSearch as CarbonTableToolbarSearch
} from '@carbon/react';

export const TableToolbar = ({
  label = 'Search',
  hasSearch = false,
  searchInputProps = {},
  onSearch,
  onChange = () => {},
  onClearSearch = () => {},
  value,
  children
}: Props) => {
  const searchProps = { ...searchInputProps };
  delete searchProps.ref;
  return (
    <CarbonTableToolbar>
      <CarbonTableToolbarContent>
        {hasSearch && (
          <CarbonTableToolbarSearch
            placeholder={label}
            labelText={label}
            defaultValue={value}
            expanded
            defaultExpanded
            onChange={e => {
              onChange(e);
              if (e.target?.value === '' && !e.type) {
                onClearSearch();
              }
            }}
            onKeyUp={e => {
              if (e.key === 'Enter') {
                onSearch?.((e.target as HTMLInputElement).value);
              }
            }}
            {...searchProps}
          />
        )}
        {children}
      </CarbonTableToolbarContent>
    </CarbonTableToolbar>
  );
};

type Props = {
  children?: any;
  hasSearch?: boolean;
  label?: string;
  value?: string;
  searchInputProps?: any;
  onClearSearch?: () => void;
  onChange?: ChangeEventHandler<HTMLInputElement>;

  // TODO: Remove any from here - this will always be a string
  onSearch?: (v: string | any | undefined) => void;
};
