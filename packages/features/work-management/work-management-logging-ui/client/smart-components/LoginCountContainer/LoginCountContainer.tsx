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
import { useLoginCount } from '@exo/frontend-features-work-management-logging-logic';

export const LoginCountContainer = ({
  render,
  renderLoading = renderDefaultLoading,
  renderError = renderDefaultError
}: Props) => {
  const { data, loading, error } = useLoginCount();

  if (loading) return renderLoading();
  if (error) return renderError(error);

  return render({ loginsData: data?.loginData });
};

type Props = SmartComponentProps<{
  render: (args: LoginCountContainerRenderProps) => JSX.Element;
}>;

type LoginCountContainerRenderProps = {
  loginsData: LoginDataEntry[];
};

type LoginDataEntry = {
  dateLoaded: string;
  loginCount: {
    user: {
      id: string;
      name: string;
    };
    userLoginCount: string;
    userLastLoginDate: string;
  }[];
};
