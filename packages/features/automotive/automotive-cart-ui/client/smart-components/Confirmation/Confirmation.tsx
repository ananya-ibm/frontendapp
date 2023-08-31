/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import * as R from 'ramda';
import { useCarts } from '@exo/frontend-features-automotive-cart-automotive-logic';
import { Row, Column } from '@exo/frontend-components-base';
import { addImageExt } from '@exo/frontend-common-utils';
import AutomotiveCheckoutSummary from '../AutomotiveCheckoutSummary/AutomotiveCheckoutSummary';
import { useScrollViewportTo } from '@exo/frontend-common-hooks';
import * as S from './Confirmation.styles';

const Confirmation = ({ isFinanced }: Props) => {
  const carts = useCarts();
  const { data, error, loading } = carts.getCarts();

  useScrollViewportTo(0, 0);

  if (loading) return 'Loading';

  if (error) return `Error: ${error}`;

  // @ts-ignore
  const cartItems = R.pipe(R.propOr([], 'lineItems'), R.pluck('product'))(R.head(data.me.carts));

  // @ts-ignore
  const baseProduct = cartItems.find(item =>
    ['Derivative', 'product'].includes(R.pathOr('', ['parentCategory', 'id'], item))
  );

  return (
    (baseProduct && (
      <S.Confirmation>
        <Row>
          <Column>
            <h2 className="title">Congratulations!</h2>
            <h3 className="title">Your transaction is being processed right now.</h3>
            <p className="copy">
              Please check your e-mail for the order summary. You can login to My Car to review your
              order and manage your car. A representative will be in charge with documentation and
              further steps.
            </p>
            <S.Image src={addImageExt(baseProduct.thumbnail)} className="image" />
          </Column>
        </Row>
        <Row>
          <Column>
            <AutomotiveCheckoutSummary isConfirmation isFinanced={isFinanced} />
          </Column>
        </Row>
      </S.Confirmation>
    )) || <S.Confirmation />
  );
};

type Props = {
  isFinanced?: boolean;
};

export default Confirmation;
