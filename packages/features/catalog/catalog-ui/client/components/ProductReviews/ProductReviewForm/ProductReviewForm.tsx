/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Rating } from 'react-simple-star-rating';
import * as yup from 'yup';
import { ProductReviewForm as ExoProductReviewForm } from '@exo/frontend-components-forms';
import { removeNull } from '@exo/frontend-common-utils';
import { ProductRef, useProductReviewModification } from '@exo/frontend-features-catalog-logic';
import * as S from './ProductReviewForm.styles';
import { useScrollViewportTo } from '@exo/frontend-common-hooks';

export const ProductReviewForm = React.forwardRef<HTMLFormElement>(
  ({ onClose, hideButtons, product }: Props, ref) => {
    const productreviewmodification = useProductReviewModification();

    const [rating, setRating] = React.useState(0);

    useScrollViewportTo(0, 0);
    const handleRating = rate => {
      setRating(rate);
    };
    const onSubmit = async formValues => {
      const values = removeNull(formValues);
      values.productpartnumber = product.partnumber;
      values.rating = rating * 20;

      values.text = !values.text || values.text === '' ? 'N/A' : values.text;
      values.rating = !values.rating || values.rating === '' ? 'N/A' : values.rating;
      values.name = !values.name || values.name === '' ? 'N/A' : values.name;

      await productreviewmodification.add(
        values.productpartnumber,
        values.text,
        values.name,
        Number(values.rating)
      );
    };

    return (
      <S.AddressForm>
        <div className="App">
          <Rating onClick={handleRating} ratingValue={rating} /* Rating Props */ />
        </div>
        <ExoProductReviewForm
          dataId={product.partnumber}
          idPrefix="addReview"
          fields={['productpartnumber', 'name', 'text', 'rating']}
          data={product}
          schema={yup.object()}
          saveLabel="Add"
          renderFooter={hideButtons ? () => undefined : undefined}
          onCancel={onClose}
          onSubmit={onSubmit}
          ref={ref}
        />
      </S.AddressForm>
    );
  }
);

type Props = {
  product: ProductRef;
  hideButtons?: boolean;
  onClose: () => void;
  render;
  renderLoading;
  renderError;
};
