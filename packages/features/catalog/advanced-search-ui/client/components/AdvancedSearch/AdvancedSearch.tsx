/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import SearchPanel from './SearchPanel/SearchPanel';

const Defaults: Props = {
  basicSearchFunction() {},
  advancedSearchFunction() {},
  advancedInputs: [
    {
      id: 'advanced-1',
      name: 'advanced-1',
      placeholder: 'Advanced 1',
      label: 'Advanced 1',
      type: 'text'
    },
    {
      id: 'advanced-2',
      name: 'advanced-2',
      placeholder: 'Advanced 2',
      label: 'Advanced 2',
      type: 'text'
    }
  ]
};

export const AdvancedSearch = ({
  basicSearchFunction = Defaults.basicSearchFunction,
  advancedSearchFunction,
  advancedInputs = Defaults.advancedInputs
}: Props) => {
  const submitFunction = inputs => {
    if (inputs.searchTerm) return basicSearchFunction?.(inputs.searchTerm);
    return advancedSearchFunction?.(inputs);
  };
  return (
    <SearchPanel
      onSubmit={submitFunction}
      advancedInputs={advancedSearchFunction ? advancedInputs : undefined}
    />
  );
};

type Props = {
  basicSearchFunction?: (input: any) => any;
  advancedSearchFunction?: (input: any) => any;
  advancedInputs?: {
    id: string;
    name: string;
    placeholder: string;
    label: string;
    type: string;
  }[];
};
