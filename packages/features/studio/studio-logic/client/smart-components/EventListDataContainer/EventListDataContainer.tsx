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
import { OrderBy, useEvents } from '../../hooks/useEvents';
import { useRelay } from '../../hooks/useRelay';
import { useState } from 'react';


export const EventListDataContainer = ({
  render,
  renderLoading = renderDefaultLoading,
  renderError = renderDefaultError
}: Props) => {
  const [search, setSearch] = useState<string | undefined>();
  const [sort, setSort] = useState<OrderBy | undefined>();
  const relay = useRelay();
  const data = useEvents(search, relay.getRelayControls(), sort)

  if (data.loading || !data.data) return renderLoading();
  if (data.error) return renderError(data.error);

  relay.setPageInfo(data.pageInfo);

  const onSort = !data.pageInfo ? undefined : (field?: string, direction?: 'ascending' | 'descending') => {
    if (!field) setSort(undefined);
    else setSort({ id: field, direction: direction === 'ascending' ? 'ASCENDING' : 'DESCENDING' });
  }

  return render({ data: data.data!, ...relay, onSearch: setSearch, onSort });
};

export type EventListDataContainerRenderProps = ReturnType<typeof useRelay> & {
  data: any[];
  onSearch?: (q: string) => void;
  canSort?: (field: string) => boolean;
  onSort?: (field?: string, direction?: 'ascending' | 'descending') => void;
};

type Props = SmartComponentProps<{
  render: (props: EventListDataContainerRenderProps) => JSX.Element;
}>;
