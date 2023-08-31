/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { useSessionContext } from '@exo/frontend-common-session-context';
import { LocaleContainer } from '@exo/frontend-features-locale-selector-logic';
import React from 'react';
import { LocalePreference } from '../../components/LocalePreference/LocalePreference';

export const LocalePreferenceModal = ({ onClose }: Props) => {
  const session = useSessionContext();

  const onSetLocale = (args: { country: string; language: string; currency: string }) => {
    session.set({
      country: args.country,
      language: args.language,
      currency: args.currency
    });
  };

  return (
    <LocaleContainer
      renderLoading={() => <div></div>}
      render={({ locales }) => (
        <LocalePreference
          onClose={onClose}
          countries={locales}
          onSave={(args) => onSetLocale(args)}
          country={session?.country}
          language={session?.language}
          currency={session?.currency}
        />
      )}
    />
  );
};

type Props = {
  onClose: () => void;
};
