/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Button, ButtonGroup } from '@exo/frontend-components-base';
import { FooterOpts, InternalSchema } from '../types';

export const getFooter = (schema: InternalSchema, opts: FooterOpts) => {
  if (!schema.footer) return undefined;

  const { actions, intl } = opts;

  return (
    <ButtonGroup>
      {schema.footer.map((e, idx) => {
        if (e.presentation?.view === 'secondary') {
          return (
            <Button
              key={idx}
              variant="secondary"
              type={e.action === 'submit' ? 'submit' : 'button'}
              disabled={actions[e.action] === undefined}
              onClick={actions[e.action]}
              label={intl.msg(e.label_code, e.label)}
            />
          );
        }

        return (
          <Button
            key={idx}
            type={e.action === 'submit' ? 'submit' : 'button'}
            disabled={actions[e.action] === undefined}
            onClick={actions[e.action]}
            label={intl.msg(e.label_code, e.label)}
          />
        );
      })}
    </ButtonGroup>
  );
};
