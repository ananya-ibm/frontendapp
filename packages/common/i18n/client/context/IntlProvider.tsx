/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React, { useContext } from 'react';
import { IntlProvider as ReactIntl, IntlContext } from 'react-intl';
import { useSessionContext } from '@exo/frontend-common-session-context';

// To be used for quick testing
const FORCED_LOCALE: string | undefined = undefined;

const LAST_RESORT_FALLBACK_LOCALE = 'en';

const flatten = (o: Record<string, any>): string[][] =>
  o.flatMap(([k, v]) =>
    typeof v === 'object'
      ? flatten(Object.entries(v)).map(([k2, v2]) => [`${k}.${k2}`, v2])
      : [[k, v]]
  );

export const IntlProvider = ({ children, translations, onError }: Props) => {
  const session = useSessionContext();

  const intl = useContext(IntlContext);

  const defaultLocale = process.env.DEFAULT_LOCALE ?? LAST_RESORT_FALLBACK_LOCALE;
  const shortDefaultLocale = defaultLocale.split(/[-_]/)[0];

  const locales: string[] = [];

  if (FORCED_LOCALE) {
    locales.push(FORCED_LOCALE);
  } else if (intl?.locale) {
    locales.push(intl?.locale);
  } else if (session?.language) {
    locales.push(session?.language);
  } else if (typeof global.navigator !== 'undefined') {
    if (navigator.languages.length > 0) {
      navigator.languages.forEach(l => locales.push(l));
    } else if (navigator.language) {
      locales.push(navigator.language);
    } else {
      locales.push(defaultLocale);
    }
  } else {
    locales.push(defaultLocale);
  }

  let actualLocale: string | undefined;

  let translation: any;
  for (const locale of locales) {
    let t = translations.find(obj => obj.lang.toLowerCase() === locale.toLowerCase());
    if (t) {
      translation = t;
      actualLocale = locale;
      break;
    }

    const shortLocale = locale.split(/[-_]/)[0];
    t = translations.find(obj => obj.lang.toLowerCase() === shortLocale.toLowerCase());
    if (t) {
      translation = t;
      actualLocale = shortLocale;
      break;
    }

    if (shortLocale === shortDefaultLocale) {
      translation = undefined;
      actualLocale = defaultLocale;
      break;
    }
  }

  if (!actualLocale) {
    actualLocale = defaultLocale;
  }

  if (translation?.messages?.render || typeof translation?.messages === 'function') {
    const Loader = (translation?.messages as unknown) as React.ElementType;
    return (
      <Loader>
        {({ default: messages }) => {
          return (
            <ReactIntl
              locale={actualLocale!}
              defaultLocale={defaultLocale}
              messages={Object.fromEntries(flatten(Object.entries(messages)))}
              onError={onError}
            >
              {children}
            </ReactIntl>
          );
        }}
      </Loader>
    );
  } else {
    return (
      <ReactIntl
        locale={actualLocale!}
        defaultLocale={defaultLocale}
        messages={translation?.messages as Record<string, string>}
        onError={onError}
      >
        {children}
      </ReactIntl>
    );
  }
};

type Props = {
  children: any;
  translations: {
    lang: string;
    messages: Record<string, string | React.ElementType>;
  }[];
  onError?: React.ComponentProps<typeof ReactIntl>['onError'];
};
