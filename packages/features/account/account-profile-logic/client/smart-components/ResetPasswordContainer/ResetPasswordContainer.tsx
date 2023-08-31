/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { SmartComponentProps } from '@exo/frontend-common-utils';
import { useProfileModification } from '../../hooks/useProfileModification';

export const ResetPasswordContainer = ({ render, requireOldPassword }: Props) => {
  const profileModification = useProfileModification({ requireOldPassword });

  const onSubmit = async (values: Values) => {
    await profileModification.setPassword(
      values.password,
      requireOldPassword ? values.oldPassword : undefined
    );
  };

  return render({ onSubmit, requireOldPassword });
};

type Props = SmartComponentProps<{
  requireOldPassword: boolean;
  render: (args: ResetPasswordContainerRenderProps) => JSX.Element;
}>;

export type ResetPasswordContainerRenderProps = {
  requireOldPassword: boolean;
  onSubmit: (values: Values) => Promise<void>;
};

type Values = {
  password: string;
  oldPassword?: string;
};
