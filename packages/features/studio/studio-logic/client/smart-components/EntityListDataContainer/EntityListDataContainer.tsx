/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import {
  renderDefaultError,
  renderDefaultLoading,
  SmartComponentProps
} from '@exo/frontend-common-utils';
import { OrderBy, useListData } from '../../hooks/useListData';
import { Entity, useEntity } from '../../hooks/useEntity';
import { useRelay } from '../../hooks/useRelay';
import { useState } from 'react';
import { useCRUD } from '../../hooks/useCRUD';


export const EntityListDataContainer = ({
  type,
  render,
  renderLoading = renderDefaultLoading,
  renderError = renderDefaultError
}: Props) => {
  const [search, setSearch] = useState<string | undefined>();
  const [sort, setSort] = useState<OrderBy | undefined>();
  const relay = useRelay();
  const entity = useEntity({ type });
  const data = useListData(entity.data, search, relay.getRelayControls(), sort)
  const crud = useCRUD(entity.data);

  if (entity.loading || data.loading || !data.data) return renderLoading();
  if (entity.error || data.error) return renderError(entity.error ?? data.error);

  relay.setPageInfo(data.pageInfo);

  const onSort = !data.pageInfo ? undefined : (field?: string, direction?: 'ascending' | 'descending') => {
    if (!field) setSort(undefined);
    else setSort({ id: field, direction: direction === 'ascending' ? 'ASCENDING' : 'DESCENDING' });
  }

  if (data.pageInfo) {
    // TODO: Maybe there are situations where search is not possible here
    return render({ data: data.data!, entity: data.entity, ...relay, ...crud, onSearch: setSearch, onSort });
  } else {
    // TODO: Maybe there are situations where search is possible here
    return render({ data: data.data!, entity: data.entity, ...crud, onSort });
  }
};

export type EntityListDataContainerRenderProps = ReturnType<typeof useCRUD> & Partial<ReturnType<typeof useRelay>> & {
  data: any[];
  entity: Entity;
  onSearch?: (q: string) => void;
  canSort?: (field: string) => boolean;
  onSort?: (field?: string, direction?: 'ascending' | 'descending') => void;
};

type Props = SmartComponentProps<{
  type: string;
  render: (props: EntityListDataContainerRenderProps) => JSX.Element;
}>;
