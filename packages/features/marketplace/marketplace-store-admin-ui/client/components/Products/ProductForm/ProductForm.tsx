/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Button } from '@exo/frontend-components-base';
import { ArrowLeft } from '@carbon/react/icons';
import { DynamicForm } from '@exo/frontend-components-forms';
import * as S from './ProductForm.styles';

export const ProductForm = ({ onSubmit, onBackClick, title = 'Add Product' }: Props) => {
  return (
    <S.AddProduct>
      <Button icon={<ArrowLeft size={32} />} onClick={onBackClick} />
      <h2 className="heading">{title}</h2>

      <DynamicForm
        form={{
          fields: [
            {
              type: 'group',
              label: 'Product Details',
              presentation: { view: 'group' },
              fields: [
                {
                  type: 'input',
                  id: 'name',
                  label: 'Product Name',
                  validations: [{ type: 'required', message: 'This field is required' }]
                },
                {
                  type: 'textarea',
                  id: 'productDescription',
                  label: 'Product Description',
                  validations: [{ type: 'required', message: 'This field is required' }]
                },
                {
                  type: 'input',
                  id: 'manufacturer',
                  label: 'Manufacturer',
                  validations: [{ type: 'required', message: 'This field is required' }]
                }
              ]
            },

            {
              type: 'group',
              label: 'Price',
              presentation: { view: 'group' },
              fields: [
                {
                  type: 'input',
                  id: 'price',
                  label: 'Price (GBP)',
                  presentation: {
                    placeholder: '£'
                  },
                  validations: [{ type: 'required', message: 'This field is required' }]
                }
              ]
            },

            {
              type: 'group',
              label: 'Inventory',
              presentation: { view: 'group' },
              fields: [
                {
                  type: 'input',
                  id: 'sku',
                  label: 'SKU(Unique product id number)',
                  presentation: {
                    placeholder: '12344999'
                  },
                  validations: [{ type: 'required', message: 'This field is required' }]
                },
                {
                  type: 'input',
                  id: 'inventory',
                  label: 'Inventory(How many of each product do I have)',
                  validations: [{ type: 'required', message: 'This field is required' }]
                }
              ]
            },

            {
              type: 'group',
              label: 'Attributes',
              presentation: { view: 'group' },
              fields: [
                {
                  type: 'input',
                  id: 'color',
                  label: 'Color'
                },
                {
                  type: 'input',
                  id: 'care',
                  label: 'Care'
                },
                {
                  type: 'input',
                  id: 'weight',
                  label: 'Weight'
                }
              ]
            }
          ]
        }}
        onSubmit={onSubmit}
      />
    </S.AddProduct>
  );
};

type Props = {
  onSubmit: (v: any) => void;
  title?: string;
  onBackClick: () => void;
};
