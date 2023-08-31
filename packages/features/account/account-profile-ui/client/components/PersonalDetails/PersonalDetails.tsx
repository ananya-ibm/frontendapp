/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { ButtonGroup, Button } from '@exo/frontend-components-base';
import * as yup from 'yup';
import React from 'react';
import { useIntl } from '@exo/frontend-common-i18n';
import { AddressForm } from '@exo/frontend-components-forms';
import { validatorFactory } from '@exo/frontend-common-validator-factory';
import { PersonalDetailsContainerRenderProps } from '@exo/frontend-features-account-profile-logic';
import { useNotificationContext } from '@exo/frontend-common-notification';

export const PersonalDetails = ({
  address,
  countries,
  email,
  onUpdate
}: PersonalDetailsContainerRenderProps) => {
  const { createNotification } = useNotificationContext()!;
  const intl = useIntl('features.account.account-profile-ui.components');
  return (
    <>
      <AddressForm
        fields={[
          'title',
          'firstName',
          'lastName',
          'email',
          'address1',
          'country',
          'city',
          'province',
          'zip',
          'phone'
        ]}
        // TODO: Remove once "Exo"AddressForm supports countryCode
        data={{...address, email, country:address.countryCode }}
        countries={countries}
        disabledFields={['email']}
        schema={yup
          .object()
          .shape(
            validatorFactory(
              [
                'firstName',
                'lastName',
                'address1',
                'province',
                'city',
                'country',
                'email',
                'phone',
                'zip'
              ],
              ['firstName', 'lastName', 'address1', 'city', 'country', 'zip']
            )
          )}
        onSubmit={async values => {
          await onUpdate({
            ...values,
            province: !values.province || values.province === '' ? 'N/A' : values.province
          });
          createNotification({
            kind: 'success',
            title: 'Your details have been updated'
          });
        }}
        renderFooter={() => (
          <ButtonGroup>
            <Button type="submit" label={intl.msg('PersonalDetails.Button.Save', 'Save')} />
          </ButtonGroup>
        )}
      />
    </>
  );
};

PersonalDetails.Skeleton = () => <div>Loading...</div>;
