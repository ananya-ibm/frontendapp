/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { SmartComponentProps } from '@exo/frontend-common-utils';
import { useProductModifications } from '../../hooks/useProductModifications';

export const ManageProductsContainer = ({ render }: Props) => {
  const productModifications = useProductModifications();

  return render({
    onCreate: productModifications.create,
    onUpdate: productModifications.update
  });
};

type Props = SmartComponentProps<{
  render: (props: ManageProductsContainerRenderProps) => JSX.Element;
}>;

export type ManageProductsContainerRenderProps = {
  onCreate?: (values: any) => Promise<any>;
  onUpdate?: (id: string, values: any) => Promise<any>;
};
