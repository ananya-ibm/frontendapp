/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { gql, useQuery } from '@apollo/client';

type Language = {
  isoCode: string;
  name: string;
  native: string;
};

type Currency = {
  isoCode: string;
  name: string;
};

type Country = {
  isoCode: string;
  name: string;
  native: string;
  flag: string;
  phonePrefix: string;
  regions: {
    name: string;
    code: string;
  }[];
  languages: Language[];
  currencies: Currency[];
};

export const useLocales = () => {
  const { loading, error, data } = useQuery<{
    countries: Country[];
  }>(
    gql`
      query GetInternationalizationOptions {
        countries {
          isoCode
          name
          native
          flag
          phonePrefix
          regions {
            code
            name
          }
          languages {
            isoCode
            name
            native
          }
          currencies {
            isoCode
            name
          }
        }
      }
    `
  );

  return {
    loading,
    error,
    data: data?.countries ?? [],

    // TODO: Can we get rid of this
    dataForForm: data?.countries?.map(c => ({
      name: c.name,
      value: c.isoCode,
      phonePrefix: c.phonePrefix,
      states: c.regions?.map(r => ({ name: r.name, value: r.code }))
    }))
  };
};
