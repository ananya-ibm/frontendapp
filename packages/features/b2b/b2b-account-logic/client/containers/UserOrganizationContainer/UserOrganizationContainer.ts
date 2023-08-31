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
import { useUserOrganization } from '../../hooks/useUserOrganization';

export const UserOrganizationContainer = ({
  render,
  renderError = renderDefaultError,
  renderLoading = renderDefaultLoading
}: Props) => {
  const { loading, error, data } = useUserOrganization<any>();

  if (loading) return renderLoading();
  if (error) return renderError(error);

  return render({ organization: data?.me?.organization });
};

type Props = SmartComponentProps<{
  render: (props: UserOrganizationContainerRenderProps) => JSX.Element;
}>;

export type UserOrganizationContainerRenderProps = {
  organization?: any;
};
