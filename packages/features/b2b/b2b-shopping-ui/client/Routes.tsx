/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { AppShellSwitch } from '@exo/frontend-common-app-shell';
import { PageNotFound } from '@exo/frontend-features-chrome-ui';
import React from 'react';
import { Route } from 'react-router-dom';
import { ShoppingPage } from './pages/ShoppingPage/ShoppingPage';
import { CategoryPanel } from './smart-components/CategoryPanel/CategoryPanel';
import { CategoryProductListPanel } from './smart-components/CategoryProductListPanel/CategoryProductListPanel';
import { SearchProductListPanel } from './smart-components/SearchProductListPanel/SearchProductListPanel';
import { urlFactory } from './urls';

const Routes = () => {
  return (
    <AppShellSwitch prefix="/shop" missing={PageNotFound}>
      <Route path="/shop" exact>
        <ShoppingPage
          renderPanel={pProps => (
            <CategoryPanel id={undefined} {...pProps} urlFactory={urlFactory} />
          )}
        />
      </Route>

      <Route
        path="/shop/category/:id/products"
        render={({ match }) => (
          <ShoppingPage
            renderPanel={pProps => (
              <CategoryProductListPanel id={match.params.id} urlFactory={urlFactory} {...pProps} />
            )}
          />
        )}
      />

      <Route
        path="/shop/category/:id"
        exact
        render={({ match }) => (
          <ShoppingPage
            renderPanel={pProps => (
              <CategoryPanel id={match.params.id} urlFactory={urlFactory} {...pProps} />
            )}
          />
        )}
      />

      <Route
        path="/shop/products/:id"
        exact
        render={({ match }) => (
          <ShoppingPage productId={match.params.id} renderPanel={() => <div />} />
        )}
      />

      <Route
        path="/shop/search/:query"
        exact
        render={({ match }) => (
          <ShoppingPage
            renderPanel={pProps => (
              <SearchProductListPanel
                query={match.params.query}
                urlFactory={urlFactory}
                {...pProps}
              />
            )}
          />
        )}
      />
    </AppShellSwitch>
  );
};

export default Routes;
