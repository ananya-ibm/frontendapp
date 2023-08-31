/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { Button, TextInput } from '@exo/frontend-components-base';
import React, { useState } from 'react';
import * as S from './Subscribe.styles';

export const Subscribe = ({ buttonText = 'Subscribe', onSubmit = () => {} }: Props) => {
  const [email, setEmail] = useState('');
  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(email);
  };

  return (
    <S.Subscribe onSubmit={handleSubmit}>
      <TextInput
        id="email"
        name="email"
        placeholder="Enter email"
        labelText="Your email"
        hideLabel
        type="email"
        value={email}
        onChange={e => {
          setEmail(e.target.value);
        }}
      />

      <Button type="submit" size="field" label={buttonText} />
    </S.Subscribe>
  );
};

type Props = {
  buttonText?: string | React.ReactNode;
  onSubmit?: (email?: string) => void;
};
