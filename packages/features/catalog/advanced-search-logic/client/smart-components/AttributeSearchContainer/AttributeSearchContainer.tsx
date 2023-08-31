/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { useAppShellContext } from '@exo/frontend-common-app-shell';
import { removeNull, SmartComponentProps } from '@exo/frontend-common-utils';
import { useParts } from '../../hooks/useParts';

export const AttributeSearchContainer = ({ render }: Props) => {
  const { featureConfig } = useAppShellContext();

  const parts = useParts();

  const { data, loading, error } = parts.getAllParts();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{`AttributeSearch Error: ${error}`}</div>;

  const mainSearchField = featureConfig?.['b2b-homepage']?.mainSearchField
    ? {
        id: featureConfig?.['b2b-homepage']?.mainSearchField,
        name: featureConfig?.['b2b-homepage']?.mainSearchField,
        placeholder: featureConfig?.['b2b-homepage']?.mainSearchFieldDisplay,
        label: '',
        type: 'text'
      }
    : undefined;

  const searchFields = data?.parts?.facets.map(facet => ({
    id: facet.code,
    name: facet.name,
    placeholder: facet.name,
    label: facet.name,
    type: 'text'
  }));

  const searchFunc = async inputs => {
    const variables = removeNull({
      code: inputs[`${featureConfig?.['b2b-homepage']?.mainSearchField}`],
      facets: Object.entries(inputs).reduce((acc: string[], facet) => {
        if (facet[0] !== `${featureConfig?.['b2b-homepage']?.mainSearchField}`) {
          // assuming facet codes in lower case
          // avoiding problem when field name is 'constructor'
          acc.push(`${facet[0].toLowerCase()}:${facet[1]}`);
        }
        return acc;
      }, [])
    });
    parts.getParts(variables);
  };

  return render({ searchFunction: searchFunc, mainSearchField, searchFields });
};

type Props = SmartComponentProps<{
  render: (props: AttributeSearchContainerRenderProps) => JSX.Element;
}>;

export type AttributeSearchContainerRenderProps = {
  searchFunction: (inputs: any) => Promise<void>;
  mainSearchField?: {
    id: string;
    name: string;
    placeholder: string;
    label: string;
    type: string;
  };
  searchFields: {
    id: string;
    name: string;
    placeholder: string;
    label: string;
    type: string;
  }[];
};
