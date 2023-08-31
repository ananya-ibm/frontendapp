/* eslint-disable react/jsx-props-no-spreading */
/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import * as R from 'ramda';
import { Card, CardFooter, CardTitle, CardSection } from '@exo/frontend-components-base';
import { slugify } from '../../utils/slugify';
import * as S from './AllStores.styles';

export const AllStores = ({ stores, onSelectStore }) => {
  const getStoreCards = () => {
    const storesByName = R.uniq(stores.map(s => s.name)).map(n => stores.filter(s => s.name === n));

    const storesWithUrl = storesByName.reduce((acc, storeArr) => {
      if (storeArr.length === 1) {
        acc.push({ ...storeArr[0], url: slugify(storeArr[0].name) });
      } else {
        for (const [i, entry] of storeArr.entries()) {
          if (i === 0) {
            acc.push({ ...storeArr[0], url: slugify(`${entry.name}`) });
          } else {
            acc.push({ ...storeArr[0], url: slugify(`${entry.name}-${i}`) });
          }
        }
      }
      return acc;
    }, []);

    return (
      <>
        {storesWithUrl.map(store => (
          <React.Fragment key={store.id}>
            <Card interactive>
              <CardSection type="media">
                <img style={{ width: '100%' }} src={store.logo} />
              </CardSection>
              <CardTitle>{store.name}</CardTitle>
              {store.announcement && <CardSection>{store.announcement}</CardSection>}
              <CardSection type="secondary">
                {store?.addresses[0]?.address1 && <div>{store?.addresses[0]?.address1}</div>}
                {store?.addresses[0]?.address2 && <div>{store?.addresses[0]?.address2}</div>}
                {store?.addresses[0]?.city && <div>{store?.addresses[0]?.city}</div>}
                {store?.addresses[0]?.county && <div>{store?.addresses[0]?.county}</div>}
                {store?.addresses[0]?.zip && <div>{store?.addresses[0]?.zip}</div>}
                {store?.addresses[0]?.country && <div>{store?.addresses[0]?.country}</div>}
                {store?.addresses[0]?.email && <div>{store?.addresses[0]?.email}</div>}
                {store?.addresses[0]?.phone && <div>{store?.addresses[0]?.phone}</div>}
                {store?.addresses[0]?.vatNo && <div>{store?.addresses[0]?.vatNo}</div>}
              </CardSection>
              <CardFooter
                primaryActions={[
                  { label: 'Go to store', onClick: () => onSelectStore(store.id, store.url) }
                ]}
              />
            </Card>
          </React.Fragment>
        ))}
      </>
    );
  };

  const Stores = getStoreCards() ?? <div />;

  return (
    <S.AllStores>
      <S.Grid>{Stores}</S.Grid>
    </S.AllStores>
  );
};
