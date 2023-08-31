/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { useWishlists, WishlistContainer } from '@exo/frontend-features-wishlist-logic';
import { useIntl } from '@exo/frontend-common-i18n';
import React from 'react';
import { Grid, Row, Column } from '@exo/frontend-components-base';
import { LayoutSpacing } from '@exo/frontend-components-core';
import * as S from './WishlistPage.styles';
import { WishlistItemList } from '../../components/WishlistItemList/WishlistItemList';

export const WishlistPage = ()=> {
  const intl = useIntl('features.wishlist.wishlist-ui.pages.WishlistPage');
  const { loading, error } = useWishlists();
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{JSON.stringify(error)}</div>;
  return (
    
    <Grid>
      <LayoutSpacing size="sm" />
          <h1>{intl.msg('WishList.header', 'WishList')} </h1>
          <LayoutSpacing size="sm" />
        <LayoutSpacing size="sm" />
          <Row>
            <Column>
              <S.WishlistPage>
                  <WishlistContainer
                    render={args => (
                      <WishlistItemList wishlist={args.wishlist } onItemUpdate={args.onItemUpdate} onAddToCart={args.onAddToCart} onAddAllItemToCart={args.onAddAllItemToCart}/>
                    )}
                    renderLoading={() => <WishlistItemList.Skeleton />}
                  />
              </S.WishlistPage>
            </Column>  
          </Row>
    </Grid>
  );
};