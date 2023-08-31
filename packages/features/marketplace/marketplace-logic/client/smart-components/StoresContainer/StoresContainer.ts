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
import { useStores } from '../../hooks/useStores';

export const StoresContainer = ({
  render,
  renderLoading = renderDefaultLoading,
  renderError = renderDefaultError
}: Props) => {
  const { data, loading, error } = useStores();

  if (loading) return renderLoading();
  if (error) return renderError(error);

  return render({
    stores: data?.marketplaceStores
  });
};

type Props = SmartComponentProps<{
  render: (props: StoresContainerRenderProps) => JSX.Element;
}>;

export type StoresContainerRenderProps = {
  stores: any[];
};
