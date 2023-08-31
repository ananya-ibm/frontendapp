/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { LocalePreference } from './LocalePreference';

type Props = React.ComponentProps<typeof LocalePreference>;

export default {
  title: 'Features/Chrome/Components/LocalePreference',
  component: LocalePreference
};

export const Default = (args: Props) => <LocalePreference {...args} />;
Default.args = {
  country: 'GB',
  language: 'en',
  currency: 'GBP',
  countries: [
    {
      name: 'United Kingdom',
      isoCode: 'GB',
      languages: [{ name: 'English', isoCode: 'en' }],
      currencies: [
        { name: 'Pound Sterling', isoCode: 'GBP' },
        { name: 'Euro', isoCode: 'EUR' }
      ]
    },
    {
      name: 'United States',
      isoCode: 'US',
      languages: [
        { name: 'English', isoCode: 'en' },
        { name: 'Spanish', isoCode: 'es' }
      ],
      currencies: [{ name: 'US Dollars', isoCode: 'USD' }]
    }
  ]
} as Props;

// -----------------------------------------

export const Skeleton = () => <LocalePreference.Skeleton />;
