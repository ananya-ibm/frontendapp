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
import { ReactElement } from 'react';
import { useLocales } from '@exo/frontend-common-i18n';

export const LocaleContainer = ({
  render,
  renderError = renderDefaultError,
  renderLoading = renderDefaultLoading
}: Props) => {
  const localesQ = useLocales();

  if (localesQ.loading) return renderLoading();
  if (localesQ.error) return renderError(localesQ.error);

  return render({ locales: localesQ.data });
};

type Props = SmartComponentProps<{
  render: (props: LocaleContainerRenderProps) => ReactElement | null;
}>;

export type LocaleContainerRenderProps = {
  locales: ReturnType<typeof useLocales>['data'];
};
