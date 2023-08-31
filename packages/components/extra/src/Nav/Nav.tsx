/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React, { useState, useEffect, useRef } from 'react';
import { MegaMenu } from '@exo/frontend-components-core';
import * as S from './Nav.styles';
import { ProfileLink } from '../ProfileLink/ProfileLink';

const useOutsideClick = (ref, callback) => {
  const handleClick = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  });
};

const useDelayedMouseOut = (ref, delay, callback: () => void) => {
  const [delayHandler, setDelayHandler] = useState<NodeJS.Timeout | undefined>();

  const handleEnter = () => delayHandler && clearTimeout(delayHandler);
  const handleLeave = () => setDelayHandler(setTimeout(callback, delay));

  const r = ref.current;
  useEffect(() => {
    if (!r) return () => {};

    r.addEventListener('mouseleave', handleLeave);
    r.addEventListener('mouseenter', handleEnter);

    return () => {
      r.removeEventListener('mouseleave', handleLeave);
      r.removeEventListener('mouseenter', handleEnter);
    };
  });
};

export const Nav = ({
  navItems,
  isMenuOpen,
  onMenuToggle,
  languageSelector,
  userName,
  link,
  megaMenuTrigger = 'none'
}: Props) => {
  const [state, setState] = useState(-1);
  const ref = useRef<HTMLUListElement>(null);

  useOutsideClick(ref, () => setState(-1));
  useDelayedMouseOut(ref, 200, () => setState(-1));

  const showMegaMenu = megaMenuTrigger !== 'none';
  let hover = megaMenuTrigger === 'hover';

  // Only user hover if supported by the browser
  hover &&= typeof window === 'undefined' ? false : window?.matchMedia?.('(hover: hover)').matches;

  // ... and mobile menu is not shown
  hover &&= !isMenuOpen;

  const level1ClickHandler = (i, exists) => (e) => {
    if (state !== i && exists && !isMenuOpen && showMegaMenu) {
      e.preventDefault();
    }
    setState(state !== i ? i : -1);
  };

  return (
    <>
      <S.Nav isMenuOpen={isMenuOpen}>
        <S.Overlay isMenuOpen={isMenuOpen} onClick={() => onMenuToggle(false)} />
        <S.Content isMenuOpen={isMenuOpen}>
          <S.Items ref={ref}>
            {navItems?.map((item, i) => (
              <React.Fragment key={`${i}-${item.text}`}>
                <S.Item>
                  <S.Link
                    href={item.url}
                    onClick={level1ClickHandler(i, !!item.children)}
                    onMouseOver={() => hover && setState(i)}
                  >
                    {item.text}
                  </S.Link>
                </S.Item>
                {showMegaMenu && item.children && item.children.length > 0 && (
                  <MegaMenu
                    onClick={() => setState(-1)}
                    isVisible={state === i}
                    navItems={item.children}
                  />
                )}
              </React.Fragment>
            ))}
          </S.Items>

          <S.Settings>
            {languageSelector && languageSelector}
            <ProfileLink userName={userName} link={link} />
          </S.Settings>
        </S.Content>
      </S.Nav>
    </>
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

type Props = {
  navItems: NavEntry[];
  isMenuOpen?: boolean;
  onMenuToggle: (state: boolean) => void;
  languageSelector?: React.ReactElement;
  userName?: string;
  link: string;
  megaMenuTrigger?: 'hover' | 'click' | 'none';
};
