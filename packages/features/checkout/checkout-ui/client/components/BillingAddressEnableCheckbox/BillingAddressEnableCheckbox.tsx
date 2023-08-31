/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/
import React from 'react';
import { useIntl } from '@exo/frontend-common-i18n';
import { Checkbox } from '@exo/frontend-components-base';

export const BillingAddressEnableCheckbox = ({ isBillingEnabled, onCheck }: Props) => {
  const intl = useIntl('features.checkout.checkout-ui.component.BillingAddressEnableCheckbox');
  return (
    <div>
      <Checkbox
        id="addressStep-billingAddressEnable"
        labelText={
          intl.msg('checkbox.usediffbillingadd', 'Use a different billing address?') as string
        }
        checked={isBillingEnabled}
        onChange={onCheck}
      />
    </div>
  );
};

type Props = {
  isBillingEnabled: boolean;
  onCheck: (v: boolean) => void;
};
