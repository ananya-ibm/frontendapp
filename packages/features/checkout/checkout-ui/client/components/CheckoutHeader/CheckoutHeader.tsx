/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { Action } from '@exo/frontend-components-base';
import { Masthead } from '@exo/frontend-components-core';
import { Locked } from '@carbon/react/icons';
import { useTheme } from 'styled-components';

export const CheckoutHeader = () => {
  const currentTheme = useTheme() as any;

  return (
    <Masthead>
      <Masthead.Header
        logo={<Action href="/" icon={<currentTheme.static.Logo />} />}
        title={
          <>
            <div>Secure checkout</div>
            <div>
              <Locked size={20} />
            </div>
          </>
        }
        /* TODO: Maybe something a bit more flexible and global for breakpoints */
        actions={
          <>
            <Action className="hide-mobile" href="/cart/cart" label="Back to shopping bag" />
            <Action className="hide-desktop" href="/cart/cart" label="Back" />
          </>
        }
      />
    </Masthead>
  );
};
