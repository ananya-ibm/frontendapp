/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/
import React from 'react';
import { CmsContainer } from '@exo/frontend-content-api';
import { useEventContext } from '@exo/frontend-features-events-logic';
import { useAppShellContext } from '@exo/frontend-common-app-shell';
import { useTheme } from 'styled-components';
import { Hero } from '@exo/frontend-components-content';
import { useSessionContext } from '@exo/frontend-common-session-context';
import { AdvancedSearch, AdvancedFilterSearch } from '@exo/frontend-features-advanced-search-ui';
import { useHistory } from 'react-router-dom';
import { CartContainer } from '@exo/frontend-features-cart-logic';
import { LoginPaneContainer } from '@exo/frontend-features-authentication-logic';
import { AttributeSearchContainer } from '@exo/frontend-features-advanced-search-logic';
import * as S from './HomePage.styles';
import { OrderPanel } from '../../components/OrderPanel/OrderPanel';
import { LoginPanel } from '../../components/LoginPanel/LoginPanel';
import { useEffectOnce } from '@exo/frontend-common-hooks';

export const HomePage = () => {
  const eventContext = useEventContext();
  const session = useSessionContext();
  const history = useHistory();
  const { featureConfig } = useAppShellContext();

  // TODO: Use the correct useTheme mechanism here
  const currentTheme = useTheme();

  useEffectOnce(() => {
    eventContext?.createEvent({ name: 'page_load', pageName: 'Home page' });
  });
  return (
    <CmsContainer name="homepage">
      <div className="bleed">
        <Hero image={currentTheme.static.tempImg}>
          {session?.type === 'USER' ? (
            <>
              {session?.cartId ? (
                <CartContainer
                  render={({ cart }) => (
                    <S.Panel>
                      <OrderPanel cart={cart} />
                    </S.Panel>
                  )}
                />
              ) : (
                <S.Panel>
                  <OrderPanel />
                </S.Panel>
              )}

              <S.Panel>
                {featureConfig?.['b2b-homepage']?.advancedSearch === 'filtersearch' ? (
                  <AttributeSearchContainer render={props => <AdvancedFilterSearch {...props} />} />
                ) : (
                  <AdvancedSearch
                    basicSearchFunction={term => history.push(`/shop/search/${term}`)}
                  />
                )}
              </S.Panel>
            </>
          ) : (
            <S.Panel>
              <LoginPaneContainer
                onLoggedIn={() => history.push('/home/homepage')}
                render={args => <LoginPanel {...args} />}
              />
            </S.Panel>
          )}
        </Hero>
      </div>
    </CmsContainer>
  );
};
