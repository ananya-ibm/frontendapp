/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { useSessionContext } from '@exo/frontend-common-session-context';
import { useAvailability, useCarts } from '@exo/frontend-features-automotive-cart-automotive-logic';
import { gql } from '@apollo/client';
import React, { useState, useEffect } from 'react';
import { pathOr, propOr, pluck, pipe } from 'ramda';
import { Button, Dropdown, TextInput } from '@exo/frontend-components-base';
import * as S from './CheckoutStoreLocator.styles';

type Country = {
  code: string;
  label: string;
};

// TODO: Remove hardcoding of countries
const COUNTRIES: Country[] = [{ code: 'GB', label: 'Great Britain' }];

const getBaseProduct = cartItems =>
  cartItems.find(item =>
    ['Derivative', 'product'].includes(pathOr('', ['parentCategory', 'id'], item))
  );

// @ts-ignore
const getCartItems = pipe(propOr([], 'lineItems'), pluck('product'));

const CheckoutStoreLocator = () => {
  const session = useSessionContext();
  const [country, setCountry] = useState(session.country || COUNTRIES[0].code);
  const [zip, setZip] = useState<string | undefined>();
  const [search, setSearch] = useState(false);
  const [skuId, setSkuId] = useState();
  const { data, loading } = useAvailability(
    // @ts-ignore
    search ? { skuId, zip, country } : {},
    CheckoutStoreLocator.fragment
  );

  const { data: cartsData, loading: cartsLoading } = useCarts().getCarts();

  useEffect(() => {
    if (!cartsLoading && cartsData.me.carts.length > 0) {
      const cart = cartsData?.me?.carts[0];
      // @ts-ignore
      const cartItems = getCartItems(cart);
      const baseProduct = getBaseProduct(cartItems);
      setSkuId(baseProduct.id);
    }
  }, [cartsLoading, cartsData?.me?.carts]);

  return (
    <>
      <h3>Select dealership</h3>
      {COUNTRIES.length > 1 && (
        <Dropdown<Country>
          labelText="Countries"
          dropdownLabel="Country"
          id="country"
          selectedItem={COUNTRIES.find(c => c.code === country)}
          initialSelectedItem={COUNTRIES.find(c => c.code === country)}
          items={COUNTRIES}
          itemToString={item => (item ? item.label : '')}
          onChange={e => {
            // @ts-ignore
            setCountry(e.code);
          }}
        />
      )}

      {country && (
        <>
          <div style={{ float: 'right', marginTop: '24px', paddingLeft: '5px' }}>
            <Button
              variant="secondary"
              size="field"
              onClick={() => {
                setSearch(true);
              }}
              label="Find"
            />
          </div>

          <TextInput
            id="zip"
            labelText="Zip code"
            onChange={e => setZip(e.currentTarget.value)}
          />

          <div style={{ height: '400px', overflowY: 'auto' }}>
            {loading && <span>Loading...</span>}
            {!loading &&
              data &&
              data.availability[0].availability
                .filter(a => a.shipNode)
                .map(a => (
                  <S.Entry key={a.shipNode.id}>
                    <S.Radio>
                      <input
                        name="store"
                        value={a.shipNode.id}
                        type="radio"
                        onClick={e => {
                          session.set({
                            country,
                            // @ts-ignore
                            storeId: e.target.value,
                            storeName: a.shipNode.name
                          });
                        }}
                        disabled={a.status === 'outOfStock'}
                      />
                    </S.Radio>
                    <S.Status type={a.status === 'inStock' ? 'available' : 'not_available'}>
                      {a.status === 'inStock' ? 'In stock' : 'Out of stock'}
                    </S.Status>
                    {a.shipNode.name}
                    <S.Distance as="div">{a.shipNode.distance || 'Unknown distance'}</S.Distance>
                  </S.Entry>
                ))}
            {!loading && !data && session.storeId && (
              <S.Entry key={session.storeId}>
                <S.Radio>
                  <input name="store" value={session.storeId} type="radio" />
                </S.Radio>
                <S.Status type="available">In Stock</S.Status>
                {session.storeName}
                <S.Distance as="div">Unknown distance</S.Distance>
              </S.Entry>
            )}
          </div>
        </>
      )}
    </>
  );
};

CheckoutStoreLocator.fragment = gql`
  fragment CheckoutStoreLocator_StoreAvailability on AvItemAvailability {
    partnumber
    availability {
      status
      shipNode {
        id
        name
        distance
      }
      distributionGroup {
        id
        name
      }
    }
  }
`;

export default CheckoutStoreLocator;
