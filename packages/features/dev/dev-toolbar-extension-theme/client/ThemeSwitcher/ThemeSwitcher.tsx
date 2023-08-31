/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { PaintBrush } from '@carbon/react/icons';
import { themeList, setTheme, Theme } from '@exo/frontend-common-theme-proxy';
import { useState } from 'react';
import { useAppShellContext } from '@exo/frontend-common-app-shell';
import { DevWidget, DevMenu } from '@exo/frontend-features-dev-toolbar-ui';
import { Theme as themePrimary } from '@exo-provider/frontend-theme';

export const ThemeSwitcher = () => {
  const [visible, setVisible] = useState(false);
  const context = useAppShellContext();
  const availableThemes = themeList();

  const changeTheme = (idx: number | undefined) => {
    setTheme(idx);
    context.repaint();
    setVisible(false);
  };

  return (
    <>
      <DevWidget
        tooltip="Change theme"
        onClick={() => setVisible(!visible)}
        icon={<PaintBrush size={16} />}
      >
        {Theme.name}
      </DevWidget>

      {visible && (
        <DevMenu>
          <button onClick={() => changeTheme(undefined)}>{themePrimary.name} [default]</button>
          {availableThemes.map((t, idx) => (
            <button key={t.name} onClick={() => changeTheme(idx)}>
              {t.name}
            </button>
          ))}
        </DevMenu>
      )}
    </>
  );
};
