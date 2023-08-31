/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { gql } from '@apollo/client';
import {
  renderDefaultError,
  renderDefaultLoading,
  SmartComponentProps
} from '@exo/frontend-common-utils';
import { useState } from 'react';
import { Facet, useSchemas } from '../../hooks/useSchemas';

export const SchemasContainer = ({
  render,
  renderLoading = renderDefaultLoading,
  renderError = renderDefaultError
}: Props) => {
  const [selectedFacets, setSelectedFacets] = useState<SelectedFacet[]>([]);
  const { loading, data, facets, error } = useSchemas<SchemasResponse[]>(selectedFacets.map(s => s.facet.code), SchemasContainer.fragment);

  const updateSelectedFacets = (sFacets: SelectedFacet[], keys: string[]) => {
    for (const k of keys) {
      const f = facets?.find(facet => facet.entries.find(e => e.code === k));
      if (!f) continue;
      sFacets.push({
        code: k,
        label: f.name,
        facet: {
          code: k,
          name: f.entries.find(e => e.code === k)?.label ?? k
        }
      })
    }
    setSelectedFacets([...sFacets]);
  }

  if (loading || !data) return renderLoading();
  if (error) return renderError(error);

  return render({
    data,
    facets: facets ?? [],
    selectedFacets,
    onRemoveFacet: (facet) => updateSelectedFacets(selectedFacets.filter((f) => f.facet.code !== facet), []),
    onReplaceFacets: (f) => {
      updateSelectedFacets(selectedFacets, f)
    },
    onToggleFacet: (facet) => {
      selectedFacets.find(f => f.facet.code === facet)
        ? updateSelectedFacets(selectedFacets.filter((f) => f.facet.code !== facet), [])
        : updateSelectedFacets(selectedFacets, [facet])
    }
  });
};

SchemasContainer.fragment = gql`
  fragment SchemasContainer on OpsSchema {
    # TODO: Add additional fields
    id
    name
    description
    feature
    path
    adapters {
      id
      name
      shortname
    }
  }
`;

type SelectedFacet = {
  code: string;
  label?: string;
  facet: {
    code: string;
    name: string;
  };
};


type SchemasResponse = {
  id: string;
  name: string;
  description: string;
  feature: string;
  path: string;
  adapters: any;
};

export type SchemasContainerRenderProps = {
  data: SchemasResponse[];
  facets: Facet[];
  onToggleFacet: (facet: string) => void;
  onRemoveFacet: (facet: string) => void;
  onReplaceFacets: (facet: string[]) => void;
  selectedFacets: SelectedFacet[];
};

type Props = SmartComponentProps<{
  render: (props: SchemasContainerRenderProps) => JSX.Element;
}>;
