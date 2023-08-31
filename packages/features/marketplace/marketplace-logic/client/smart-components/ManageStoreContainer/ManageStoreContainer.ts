/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { useSessionContext } from '@exo/frontend-common-session-context';
import {
  renderDefaultError,
  renderDefaultLoading,
  SmartComponentProps
} from '@exo/frontend-common-utils';
import { useStore } from '../../hooks/useStore';
import { useStoreModifications } from '../../hooks/useStoreModifications';

export const ManageStoreContainer = ({
  render,
  renderLoading = renderDefaultLoading,
  renderError = renderDefaultError
}: Props) => {
  const session = useSessionContext();

  const { data, loading, error } = useStore({ username: session.username });
  const storeModifications = useStoreModifications();

  if (loading) return renderLoading();
  if (error) return renderError(error);

  return render({
    store: data?.marketplaceUserStore,
    onDelete: storeModifications.remove,
    onCreate: storeModifications.create,
    onUpdate: storeModifications.update
  });
};

type Props = SmartComponentProps<{
  render: (props: ManageStoreContainerRenderProps) => JSX.Element;
}>;

export type ManageStoreContainerRenderProps = {
  store: any;
  onDelete: (id: string) => Promise<any>;
  onCreate: (values: any) => Promise<any>;
  onUpdate: (id: string, values: any) => Promise<any>;
};
