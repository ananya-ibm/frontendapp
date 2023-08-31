/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { useLocales } from '@exo/frontend-common-i18n';
import { useAuthentication } from '@exo/frontend-features-authentication-logic';
import {
  renderDefaultError,
  renderDefaultLoading,
  SmartComponentProps
} from '@exo/frontend-common-utils';
import { useProfileModification } from '../../hooks/useProfileModification';
import { Address } from '../../model/types';

export const ProfileRegistrationContainer = ({
  render,
  renderLoading = renderDefaultLoading,
  renderError = renderDefaultError
}: Props) => {
  const profileModification = useProfileModification();
  const authentication = useAuthentication();
  const intlQ = useLocales();

  if (intlQ.loading) return renderLoading();
  if (intlQ.error) return renderError(intlQ.error);

  const onRegister = async (values: RegistrationData) => {
    await profileModification.register({
      ...values,
      province: !values.province || values.province === '' ? 'N/A' : values.province
    });
    await authentication.authenticate(values.email, values.password);
  };

  return render({ countries: intlQ.dataForForm, onRegister });
};

type Props = SmartComponentProps<{
  render: (args: ProfileRegistrationContainerRenderProps) => JSX.Element;
}>;

type RegistrationData = Address & { password: string };

export type ProfileRegistrationContainerRenderProps = {
  countries: ReturnType<typeof useLocales>['dataForForm'];
  onRegister: (profile: RegistrationData) => Promise<void>;
};
