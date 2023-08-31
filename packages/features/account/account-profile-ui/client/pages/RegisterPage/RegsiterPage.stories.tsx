/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { ContainerWrapper } from '@exo/frontend-common-storybook';
import App from '../../App';
import { RegisterPage } from './RegisterPage';
import b2cProfileMock from '../../../mocks/b2c-profile';

export default {
  title: 'Features/Account/Profile/Pages/RegisterPage',
  component: RegisterPage,
  decorators: [
    Story => (
      <div style={{ margin: '-1em' }}>
        <Story />
      </div>
    )
  ]
};

export const Default = args => (
  <ContainerWrapper app={App} mocks={b2cProfileMock.me()}>
    <RegisterPage {...args} />
  </ContainerWrapper>
);
Default.args = {
  config: {
    feature: {}
  }
};

// --------------------------------------------------------------

export const WithCountryRegionDropdown = args => (
  <ContainerWrapper
    app={App}
    mocks={{
      Query: {
        countries: () => [
          { name: 'United Kingdom', isoCode: 'UK', regions: undefined },
          {
            name: 'United States',
            isoCode: 'US',
            regions: [
              { name: 'Alabama', code: 'AL' },
              { name: 'Alaska', code: 'AK' },
              { name: 'Arizona', code: 'AZ' },
              { name: 'Arkansas', code: 'AR' }
            ]
          },
          {
            name: 'Canada',
            isoCode: 'CA',
            regions: [
              { code: 'AB', name: 'Alberta' },
              { code: 'BC', name: 'British Columbia' },
              { code: 'MB', name: 'Manitoba' },
              { code: 'NB', name: 'New Brunswick' },
              { code: 'NF', name: 'Newfoundland' }
            ]
          }
        ],
        languages: () => [],
        currencies: () => []
      }
    }}
  >
    <RegisterPage {...args} />
  </ContainerWrapper>
);
WithCountryRegionDropdown.args = {
  ...Default.args
};
