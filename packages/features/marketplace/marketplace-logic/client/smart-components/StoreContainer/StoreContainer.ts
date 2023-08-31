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
import { useStore } from '../../hooks/useStore';

export const StoreContainer = ({
  id,
  render,
  renderLoading = renderDefaultLoading,
  renderError = renderDefaultError
}: Props) => {
  const { data, loading, error } = useStore({ storeId: id });

  if (loading) return renderLoading();
  if (error) return renderError(error);

  return render({
    store: data?.marketplaceStore
  });
};

type Props = SmartComponentProps<{
  id: string;
  render: (props: StoreContainerRenderProps) => JSX.Element;
}>;

export type StoreContainerRenderProps = {
  store: any;
};
