/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { Settings } from '@carbon/react/icons';
import { useState } from 'react';
import { ApplicationConfig, useAppShellContext } from '@exo/frontend-common-app-shell';
import { DevWidget, DevMenu } from '@exo/frontend-features-dev-toolbar-ui';
import { configs } from '@exo-provider/frontend-additional-configs-provider';

export const ConfigSwitcher = () => {
  const [visible, setVisible] = useState(false);
  const context = useAppShellContext();

  const update = (name: undefined | string, cfg: Partial<ApplicationConfig>) => {
    window.localStorage.setItem('sessionContext', '{}');
    context.patchConfig(name, cfg);
    context.repaint();
    setVisible(false);
  };

  return (
    <>
      <DevWidget
        onClick={() => setVisible(!visible)}
        icon={<Settings size={16} />}
        tooltip="Switch session"
      >
        {context.patchName ?? 'Default'}
      </DevWidget>

      {visible && (
        <DevMenu>
          <button onClick={() => update(undefined, {})}>Default [default]</button>
          {configs.map(t => (
            <button key={t.name} onClick={() => update(t.name, t.config)}>
              {t.name}
            </button>
          ))}
        </DevMenu>
      )}
    </>
  );
};
