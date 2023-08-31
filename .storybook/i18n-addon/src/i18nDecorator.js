import { IntlProvider } from 'react-intl';
import { useGlobals } from '@storybook/client-api';

// NOTE: This code is duplicated in IntlProvider
//       Not sure there is too much to do about it, as we cannot (easily) depend
//       on modules in the project from Storybook addons
const flatten = o =>
  o.flatMap(([k, v]) =>
    typeof v === 'object'
      ? flatten(Object.entries(v)).map(([k2, v2]) => [`${k}.${k2}`, v2])
      : [[k, v]]
  );

export const i18nDecorator = contexts => (story, context) => {
  let [{ locale }] = useGlobals();
  locale = locale ?? 'en';

  let messages = [];
  for (const ctx of contexts) {
    for (const k of ctx.keys()) {
      if (k === `./${locale}`) {
        messages = [...messages, ...flatten(Object.entries(ctx(k).default))];
      }
    }
  }

  return (
    <IntlProvider locale={locale} messages={Object.fromEntries(messages)}>
      {story()}
    </IntlProvider>
  );
};
