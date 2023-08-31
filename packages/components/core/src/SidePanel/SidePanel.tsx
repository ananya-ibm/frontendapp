/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React, { useLayoutEffect } from 'react';
import { Close } from '@carbon/react/icons';
import { Button } from '@exo/frontend-components-base';
import * as S from './SidePanel.styles';


const useLayoutEffectWhenCSR = typeof window !== 'undefined' ? useLayoutEffect : () => {};

export const SidePanel = ({
  children,
  isOpen = false,
  size = 'm',
  position = 'left',
  mode = 'onTop',
  isClosable = true,
  onClose = () => {},
  title,
  hasOverlay = true,
  isCloseOnOverlayClick = true,
  isDanger = false,
  elevation,
  buttons = [],
  className
}: Props) => {
  useLayoutEffectWhenCSR(() => {
    // eslint-disable-next-line prefer-destructuring
    const overflow = document.body.style.overflow;
    if (isOpen && hasOverlay) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [hasOverlay, isOpen]);

  const primaryBtnVariant = isDanger ? 'danger' : 'primary';

  return (
    <>
      <S.SidePanel
        className={className}
        size={size}
        position={position}
        mode={mode}
        isOpen={isOpen}
        elevation={elevation}
      >
        {(title || isClosable) && (
          <S.Header>
            <S.Title>{title ?? ''}</S.Title>
            <S.Close aria-label="Close" show={isClosable} onClick={() => onClose()}>
              <Close size={24} />
            </S.Close>
          </S.Header>
        )}
        {children}
        {buttons.length > 0 && (
          <S.Buttons isCompact>
            {buttons.map((btn) => (
              <Button
                key={btn.label}
                disabled={btn.disabled}
                variant={btn.isPrimary ? primaryBtnVariant : 'secondary'}
                label={btn.label}
              />
            ))}
          </S.Buttons>
        )}
      </S.SidePanel>
      {hasOverlay && isOpen && (
        <S.Overlay
          isVisible={hasOverlay && isOpen}
          onClick={() => isCloseOnOverlayClick && onClose()}
        ></S.Overlay>
      )}
    </>
  );
};

SidePanel.Body = ({ children, isScrolling = true }) => {
  return <S.Body isScrolling={isScrolling}>{children}</S.Body>;
};

SidePanel.Section = ({ children }) => {
  return <S.Section>{children}</S.Section>;
};

SidePanel.Footer = ({ children }) => {
  return <S.Footer>{children}</S.Footer>;
};

SidePanel.Main = ({ children }) => {
  return <S.SidePanelMain>{children}</S.SidePanelMain>;
};

type Props = {
  isOpen?: boolean;
  mode?: 'push' | 'compress' | 'onTop';
  size?: 's' | 'm' | 'l' | 'xl';
  position?: 'left' | 'right';
  hasOverlay?: boolean;
  isCloseOnOverlayClick?: boolean;
  title?: string | React.ReactElement;
  isClosable?: boolean;
  buttons?: {
    onClick?: () => void;
    label: string;
    disabled?: boolean;
    isPrimary?: boolean;
  }[];
  onClose?: () => void;
  isDanger?: boolean;
  className?: string;
  elevation?: number;
  children: any;
};
