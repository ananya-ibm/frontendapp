/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Breadcrumb } from '@exo/frontend-components-base';
import { StoresContainer } from '@exo/frontend-features-marketplace-logic';
import { useSessionContext } from '@exo/frontend-common-session-context';
import { useHistory } from 'react-router-dom';
import { AllStores } from '../../components/AllStores/AllStores';
import * as S from './StoresPage.styles';

export const StoresPage = () => {
  const session = useSessionContext();
  const history = useHistory();

  const onSelectStore = (id, url) => {
    session.set({ ...session, marketplaceStoreId: id });
    history.push(`/marketplace/store/${url}/${id}`);
  };

  return (
    <S.Stores>
      <S.Header>
        <Breadcrumb path={[{ url: '/marketplace/stores', label: 'Stores' }]} />
      </S.Header>
      <S.Title>Marketplace Stores</S.Title>

      <StoresContainer
        render={({ stores }) => <AllStores stores={stores} onSelectStore={onSelectStore} />}
      />
    </S.Stores>
  );
};
