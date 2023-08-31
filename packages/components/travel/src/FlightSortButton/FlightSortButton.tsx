/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable react/require-default-props, import/no-named-as-default, react/boolean-prop-naming */

import * as S from './FlightSortButton.styles';

const sizeToCarbonSize: Partial<Record<Size, string>> = {
  small: 'sm',
  medium: 'md',
  field: 'md',
  large: 'lg'
};

// TODO: Tooltip is no supported for Carbon

export const FlightSortButton = ({ key, title, size, className, onClick, id }: Props) => {
  return (
    <S.FlightSortButton key={key} size={size && sizeToCarbonSize[size]} className={className} onClick={onClick} id={id}>
      <span>{title}</span>
    </S.FlightSortButton>
  );
};

type Size = 'small' | 'medium' | 'large' | 'field';

type Props = {
  size?: Size;
  title?: string;
  onClick?: (e?: any) => void;
  className?: string;
  key: string;
  id: string;
};
