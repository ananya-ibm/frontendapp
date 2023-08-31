/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { ApplicationConfig, ExtensionNode } from '@exo/frontend-common-app-shell';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { Tools, Close } from '@carbon/react/icons';
import * as S from './DevToolbar.styles';

const KEY = 'exo-dev-visible';

const useLayoutEffectWhenCSR = typeof window !== 'undefined' ? useLayoutEffect : () => {};

export const DevToolbar = ({ config }: Props) => {
  const [visible, setVisible] = useState(
    process.env.DEVMODE_TOOLBAR === 'visible' || window.localStorage.getItem(KEY) === 'true'
  );

  useLayoutEffectWhenCSR(() => {
    document.documentElement.style.setProperty('--top', visible ? '1.5rem' : '0rem');
  }, [visible]);

  // Toggle using option-cmd-shift-i
  useEffect(() => {
    if (process.env.DEVMODE_TOOLBAR !== 'toggle' && process.env.DEVMODE_TOOLBAR !== 'visible')
      return () => {};

    const listener = (event: KeyboardEvent): void => {
      if (
        (event.code === 'KeyI' && event.shiftKey && event.altKey && event.metaKey) ||
        (event.code === 'KeyD' && event.shiftKey && event.altKey && event.metaKey)
      ) {
        setVisible(!visible);
        window.localStorage.setItem(KEY, !visible ? 'true' : 'false');
      }
    };
    document.addEventListener('keydown', listener);
    return () => {
      document.removeEventListener('keydown', listener);
    };
  }, [visible]);

  const render = useCallback(
    ({ children }) => (
      <>
        <S.Delimiter> </S.Delimiter>
        <S.Entry>{children}</S.Entry>
      </>
    ),
    []
  );

  return (
    visible && (
      <S.Toolbar>
        <Tools size={16} />
        <S.Logo>DEV</S.Logo>

        <ExtensionNode extensions={config.featureConfig.devToolbar?.widgets} render={render} />
        <S.Delimiter> </S.Delimiter>

        <S.Close onClick={() => setVisible(false)}>
          <Close size={16} />
        </S.Close>
      </S.Toolbar>
    )
  );
};

type Props = {
  config: ApplicationConfig;
};
