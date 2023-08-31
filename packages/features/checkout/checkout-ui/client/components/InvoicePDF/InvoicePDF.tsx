/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/
import React from 'react';
import { useIntl } from '@exo/frontend-common-i18n';
import { jsPDF } from 'jspdf';
import { Cart } from '@exo/frontend-features-cart-logic';
import { Address } from '@exo/frontend-features-checkout-logic';
import { Button } from '@exo/frontend-components-base';

export const InvoicePDF = ({ cart, shippingAddress, billingAddress }: Props) => {
  const intl = useIntl('features.checkout.checkout-ui.components.InvoicePDF');
  // eslint-disable-next-line new-cap
  const doc = new jsPDF();
  doc.text(`Order ID: ${cart?.id}`, 10, 10);
  doc.text('Shipping Address', 10, 20);
  doc.text(`First Name: ${shippingAddress?.firstName}`, 15, 30);
  doc.text(`Last Name: ${shippingAddress?.lastName}`, 15, 40);
  doc.text(`Address: ${shippingAddress?.address1}`, 15, 50);
  doc.text(`City: ${shippingAddress?.city}`, 15, 60);
  doc.text(`Country: ${shippingAddress?.country}`, 15, 70);
  doc.text(`ZIP: ${shippingAddress?.zip}`, 15, 80);

  doc.text('Billing Address', 10, 90);
  doc.text(`First Name: ${billingAddress?.firstName}`, 15, 100);
  doc.text(`Last Name: ${billingAddress?.lastName}`, 15, 110);
  doc.text(`Address: ${billingAddress?.address1}`, 15, 120);
  doc.text(`City: ${billingAddress?.city}`, 15, 130);
  doc.text(`Country: ${billingAddress?.country}`, 15, 140);
  doc.text(`ZIP: ${billingAddress?.zip}`, 15, 150);

  doc.text(`Grand Total: ${cart?.grandTotal?.value} ${cart?.grandTotal?.currency}`, 10, 170);

  doc.text('Product IDs', 10, 190);

  // eslint-disable-next-line no-unused-expressions
  cart?.lineItems?.map((item, index) => doc.text(`${item.id},`, (index + 1) * 10, 200));

  const blobPDF = new Blob([doc.output('blob')], {
    type: 'application/pdf'
  });
  const blobURL = URL.createObjectURL(blobPDF);

  return (
    <Button
      variant="link"
      href={blobURL}
      label={intl.msg('invoice.generatepdf', 'Download PDF')}
      /* @ts-ignore */
      target="_blank"
      rel="noreferrer"
    />
  );
};

type Props = {
  cart: Cart;
  shippingAddress: Address;
  billingAddress: Address;
};
