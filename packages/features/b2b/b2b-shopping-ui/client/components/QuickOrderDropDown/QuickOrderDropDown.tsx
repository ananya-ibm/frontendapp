/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import * as S from './QuickOrderDropDown.styles';

export const QuickOrderDropDown = ({ items, highlightedIndex, getMenuProps, getItemProps }) => {
  return (
    <S.Select {...getMenuProps()}>
      {items.map((item, index) => (
        <S.Item
          key={item.id}
          isHighlighted={highlightedIndex === index}
          {...getItemProps({ item, index })}
        >
          <S.Thumbnail src={item.thumbnail} />
          <S.Title>{item.name}</S.Title>
        </S.Item>
      ))}
    </S.Select>
  );
};
