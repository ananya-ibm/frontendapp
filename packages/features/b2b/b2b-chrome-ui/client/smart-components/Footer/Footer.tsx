/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/
import { useSessionContext } from '@exo/frontend-common-session-context';
import { Flag } from '@exo/frontend-components-core';
import { Action } from '@exo/frontend-components-base';
import { ChromeConfig } from '@exo/frontend-features-chrome-ui';
import loadable from '@loadable/component';
import React, { useState } from 'react';
import * as S from './Footer.styles';

// TODO: The contents should be brought in from the config or navigation
export const Footer = ({ config }: { config: ChromeConfig }) => {
  const session = useSessionContext();
  const [open, setOpen] = useState(false);

  const language = session.language ?? 'en'
  const country = session.country ?? 'US'

  const LocalePreferenceModal = loadable(() => import('@exo/frontend-features-locale-selector-ui'), {
    resolveComponent: loaded => loaded.LocalePreferenceModal,
    fallback: <div></div>
  })

  return (
    <S.Footer>
      <S.Copyright>{config?.footer?.copyright}</S.Copyright>
      <S.Locale>
        <Action
          label={language.replace(/[-_][a-z]+$/i, '').toUpperCase()}
          icon={<Flag locale={country} />}
          onClick={() => setOpen(!open)}
        />
        {open && <LocalePreferenceModal onClose={() => setOpen(false)} />}
      </S.Locale>
    </S.Footer>
  );
};
