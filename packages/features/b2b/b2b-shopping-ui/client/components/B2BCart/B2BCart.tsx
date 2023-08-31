/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import {
  Button,
  Table,
  TableHeaderRow,
  TableHeader,
  TableToolbar,
  TableSection,
  TableBody,
  TableRow,
  TableCell,
  TextInput
} from '@exo/frontend-components-base';
import { Settings, Upload, ShoppingCartPlus, ArrowRight } from '@carbon/react/icons';
import { CartContainerRenderProps, useCartModification } from '@exo/frontend-features-cart-logic';
import { formatMoney } from '@exo/frontend-common-i18n';
import React from 'react';
import { useHistory } from 'react-router-dom';
import * as S from './B2BCart.styles';
import { useQuickOrderAutocomplete } from '../../hooks/useQuickOrderAutocomplete';
import { QuickOrderDropDown } from '../QuickOrderDropDown/QuickOrderDropDown';

export const B2BCart = ({ cart, onItemUpdate, onAddProducts }: Props) => {
  const history = useHistory();
  const cartModification = useCartModification({ guessSkus: true });

  const {
    getInputProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
    isOpen,
    items
  } = useQuickOrderAutocomplete({
    onSelectProduct: ({ id, partnumber }) =>
      cartModification.add([
        {
          id,
          partnumber,
          quantity: 1
        }
      ])
  });

  return (
    <S.Wrapper>
      <S.Header>
        <h2>{cart ? `Order: ${cart.id?.slice(0, 10)}` : 'Empty Cart'}</h2>
        <S.Actions>
          <Button
            size="small"
            label="Add"
            variant="secondary"
            icon={<ShoppingCartPlus size={20} />}
            onClick={() => onAddProducts()}
          />
          <Button
            size="small"
            disabled={!cart || cart?.lineItems?.length === 0}
            label="Checkout"
            variant="primary"
            icon={<ArrowRight size={20} />}
            onClick={() => history.push('/checkout/checkout')}
          />
        </S.Actions>
      </S.Header>

      {cart && (
        <S.Delivery>
          <div>Deliver to: Kista Alleväg 10</div>
          <div>Expected delivery date: 2021-09-16</div>
        </S.Delivery>
      )}

      <TableSection>
        <div style={{ position: 'relative' }}>
          <TableToolbar hasSearch label="Quick Order" searchInputProps={getInputProps()}>
            <div className="icons">
              <Settings size={32} aria-label="Settings" className="icon" />
            </div>
            <Button variant="secondary" icon={<Upload size={20} />} />
          </TableToolbar>

          {isOpen && (
            <QuickOrderDropDown
              items={items}
              highlightedIndex={highlightedIndex}
              getMenuProps={getMenuProps}
              getItemProps={getItemProps}
            />
          )}
        </div>
        <br />

        <Table>
          <TableHeaderRow>
            <TableHeader>Sku</TableHeader>
            <TableHeader>Product Name</TableHeader>
            <TableHeader>Qty</TableHeader>
            <TableHeader>Price</TableHeader>
            <TableHeader>Total</TableHeader>
          </TableHeaderRow>
          <TableBody>
            {(!cart || cart.lineItems.length === 0) && (
              <TableRow>
                <TableCell colSpan={5}>Empty cart</TableCell>
              </TableRow>
            )}
            {cart?.lineItems?.map(li => (
              <TableRow key={li.id}>
                <TableCell>{li.partnumber}</TableCell>
                <TableCell>
                  {li.product.name}
                  <div style={{ fontSize: '75%' }}>
                    {li.product.selection?.[0].criteria.map((cr, idx) => (
                      <React.Fragment key={cr.name}>
                        {idx > 0 && <span>, </span>}
                        <span>
                          {cr.name}: {cr.value.value}
                        </span>
                      </React.Fragment>
                    ))}
                  </div>
                </TableCell>
                <TableCell width="150">
                  <S.Quantity>
                    <TextInput
                      id={`qty_${li.id}`}
                      type="number"
                      onChange={e =>
                        (e as any).imaginaryTarget.value !== '' &&
                        onItemUpdate?.(li.id, (e as any).imaginaryTarget.value)
                      }
                      min={0}
                      size="sm"
                      value={li.quantity}
                    />
                  </S.Quantity>
                </TableCell>
                <TableCell align="right">
                  {formatMoney(li.unitPrice.value, li.unitPrice.currency)}
                </TableCell>
                <TableCell align="right">
                  {formatMoney(li.linePrice.value, li.linePrice.currency)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableSection>
    </S.Wrapper>
  );
};

type Props = CartContainerRenderProps & {
  onAddProducts: () => void;
};
