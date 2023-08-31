/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { useIntl } from '@exo/frontend-common-i18n';
import { Button, Checkbox } from '@exo/frontend-components-base';
import * as S from './Preferences.styles';

export const Preferences = () => {
  const intl = useIntl('features.account.account-profile-ui.components');
  const emailAddress = 'yourname@email.com';
  const preferenceData = {
    emailPreferences: [
      {
        name: 'SMS',
        checked: false
      },
      {
        name: 'Email',
        checked: true
      },
      {
        name: 'Post',
        checked: false
      }
    ],
    marketingPreferences: [
      {
        id: 1,
        name:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer risus nulla, lobortis id pharetra.',
        toggleStatus: false
      },
      {
        id: 2,
        name:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer risus nulla, lobortis id pharetra.',
        toggleStatus: true
      },
      {
        id: 3,
        name:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer risus nulla, lobortis id pharetra.',
        toggleStatus: true
      },
      {
        id: 4,
        name:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer risus nulla, lobortis id pharetra.',
        toggleStatus: false
      }
    ]
  };

  return (
    <div>
      <S.Preferences>
        <S.Field>
          <h5>{intl.msg('Preferences.EmailPreferences', 'Email Preferences')}</h5>
        </S.Field>
        <S.Text>
          {intl.msg('Preferences.EmailAddress', 'Your email address is')}{' '}
          <S.Email> {emailAddress}</S.Email>.{' '}
          {intl.msg('Preferences.Wanttochange', 'If you want to change it')},{' '}
          <Button
            variant="link"
            label={intl.msg('Preferences.clickhere', 'click here.')}
            onClick={() => {}}
          />
        </S.Text>
        <S.Field>
          <h5>{intl.msg('Preferences.Marketing', 'Marketing')}</h5>
        </S.Field>
        <S.Text>
          {preferenceData &&
            preferenceData.marketingPreferences.map(data => (
              <Checkbox
                key={`checkbox-${data.id}`}
                defaultChecked={data.toggleStatus}
                id={`checkbox-label-${data.name}`}
                labelText={data.name}
                onChange={() => {}}
              />
            ))}
        </S.Text>
        <S.Field>
          <h5>{intl.msg('Preferences.Contacby', 'I want to be contacted by')}</h5>
          <S.Text> {intl.msg('Preferences.SelectOption', 'Select an option')} </S.Text>
          {preferenceData &&
            preferenceData.emailPreferences.map(data => (
              <Checkbox
                key={`checkbox-${data.name}`}
                defaultChecked={data.checked}
                id={`checkbox-label-${data.name}`}
                labelText={data.name}
                onChange={() => {}}
              />
            ))}
        </S.Field>
        <S.Field>
          <Button label={intl.msg('Preferences.SavePreferences', 'Save Preferences')} />
        </S.Field>
      </S.Preferences>
    </div>
  );
};

Preferences.Skeleton = () => <div>Loading...</div>;
