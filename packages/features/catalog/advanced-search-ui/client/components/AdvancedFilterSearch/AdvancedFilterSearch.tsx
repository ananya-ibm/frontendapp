/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { FilterSearchPanel } from '@exo/frontend-components-commerce';

const Defaults: Props = {
  searchFunction() {},
  searchFields: [
    {
      id: 'model',
      name: 'model',
      placeholder: 'Model',
      label: 'Model',
      type: 'text'
    },
    {
      id: 'doors',
      name: 'doors',
      placeholder: 'Doors',
      label: 'Doors',
      type: 'text'
    },
    {
      id: 'year',
      name: 'year',
      placeholder: 'Year',
      label: 'Year',
      type: 'text'
    },
    {
      id: 'cons',
      name: 'cons',
      placeholder: 'Constructor',
      label: 'Constructor',
      type: 'text'
    },
    {
      id: 'area',
      name: 'area',
      placeholder: 'Area',
      label: 'Area',
      type: 'text'
    },
    {
      id: 'transmission',
      name: 'transmission',
      placeholder: 'Transmission',
      label: 'Transmission',
      type: 'text'
    },
    {
      id: 'color-exterior',
      name: 'color-exterior',
      placeholder: 'Color Exterior',
      label: 'Color Exterior',
      type: 'text'
    },
    {
      id: 'interior',
      name: 'interior',
      placeholder: 'Interior',
      label: 'Interior',
      type: 'text'
    }
  ],
  mainSearchField: {
    id: 'vin-number',
    name: 'vin-number',
    placeholder: 'VIN Number',
    label: '',
    type: 'text'
  }
};

export const AdvancedFilterSearch = ({
  searchFunction = Defaults.searchFunction,
  searchFields = Defaults.searchFields,
  mainSearchField = Defaults.mainSearchField
}: Props) => {
  const submitFunction = inputs => searchFunction?.(inputs);
  return (
    <FilterSearchPanel
      onSubmit={submitFunction}
      searchFields={searchFields}
      mainSearchField={mainSearchField}
    />
  );
};

type Props = {
  searchFunction?: (inputs: any) => any;
  searchFields?: {
    id: string;
    name: string;
    placeholder: string;
    label: string;
    type: string;
  }[];
  mainSearchField?: {
    id: string;
    name: string;
    placeholder?: string;
    label: string;
    type: string;
  };
};
