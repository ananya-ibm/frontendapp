/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/
import { Action } from '@exo/frontend-components-base';
import React, { useState } from 'react';
import * as S from './MegaMenu.styles';

export const MegaMenu = ({ isVisible, navItems, onClick = () => {}, top }: Props) => {
  return (
    <S.MegaMenu visible={isVisible} top={top}>
      <S.Content count={navItems.length}>
        {navItems.map((ni) => (
          <S.SubCategory key={`${ni.url}__${ni.text}`}>
            <S.SubCategoryLink href={ni.url} onclick={onClick}>
              <S.Thumbnail src={ni.thumbnail} loading="lazy" />
            </S.SubCategoryLink>
            <S.Title>
              <S.SubCategoryLink href={ni.url} onclick={onClick}>
                {ni.text}
              </S.SubCategoryLink>
            </S.Title>
            <S.SubSubCategoryList>
              {ni.children?.map((c) => (
                <S.SubSubCategoryListEntry key={c.url}>
                  <S.SubSubCategoryLink href={c.url} onclick={onClick}>
                    {c.text}
                  </S.SubSubCategoryLink>
                </S.SubSubCategoryListEntry>
              ))}
            </S.SubSubCategoryList>
          </S.SubCategory>
        ))}
      </S.Content>
    </S.MegaMenu>
  );
};

type NavEntry = {
  text?: string;
  url?: string;
  type?: string;
  title?: string;
  description?: string;
  thumbnail?: string;
  isDelimiter: boolean;
  children?: NavEntry[];
};

export type Props = {
  navItems: NavEntry[];
  isVisible: boolean;
  onClick?: () => void;
  top?: string;
};

export const MegaMenuTrigger = (props: TriggerProps) => {
  const [top, setTop] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Action
        label={props.label}
        href="#"
        onClick={(e) => {
          setTop(e.target.getBoundingClientRect().bottom);
          setIsOpen(!isOpen);
          e.preventDefault();
          return false;
        }}
      />
      {props.render(isOpen, `${top}px`, () => {
        setIsOpen(false);
      })}
    </>
  );
};

type TriggerProps = {
  label: string;
  render: (isOpen: boolean, top: string, hide: () => void) => React.ReactElement;
};
