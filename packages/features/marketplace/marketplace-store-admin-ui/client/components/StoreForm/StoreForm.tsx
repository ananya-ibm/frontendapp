/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/
import React from 'react';
import { DynamicForm } from '@exo/frontend-components-forms';
import { form } from './form';

export const StoreForm = ({ data, onSubmit }: Props) => {
  return (
    <>
      <DynamicForm form={form} data={data ?? {}} onSubmit={onSubmit} />
    </>
  );
};

type Props = {
  onSubmit: (v: any) => void;
  data?: any;
};
