/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable react/boolean-prop-naming */
import React, { useEffect } from 'react';
import { Portal } from 'react-portal';
import { Modal as CarbonModal } from '@carbon/react';
import * as S from './Modal.styles';

export const Modal = ({
  children,
  title,
  buttons,
  onClose = () => {},
  isOpen = true,
  isScrollable,
  isDanger,
  className
}: Props) => {
  if (buttons && buttons.length > 2) throw new Error('Modal only supports up to two buttons');

  // Scroll to top each time a modal is opened
  useEffect(() => {
    if (!isOpen) return;
    document.querySelectorAll('.cds--modal-scroll-content').forEach((e) => e.scrollTo?.(0, 0));
  }, [isOpen]);

  return (
    <Portal>
      {isOpen && 
        <S.Modal isScrollable={!!isScrollable} className={className}>
          <CarbonModal
            hasScrollingContent={!!isScrollable}
            closeButtonLabel="Close"
            aria-label={title ?? 'modal'}
            modalAriaLabel={title ?? 'modal'}
            modalHeading={title}
            onRequestClose={onClose}
            onRequestSubmit={buttons?.[0]?.onClick}
            onSecondarySubmit={buttons?.[1]?.onClick}
            open={isOpen}
            danger={isDanger ?? false}
            passiveModal={!buttons || buttons.length === 0}
            primaryButtonDisabled={buttons?.[0]?.disabled}
            primaryButtonText={buttons?.[0]?.label}
            secondaryButtonText={buttons?.[1]?.label}
          >
            {children}
          </CarbonModal>
        </S.Modal>
      }
      </Portal>
  );
};

type Props = {
  children?: any;
  title?: string;
  onClose?: () => void;
  buttons?: {
    onClick?: () => void;
    label: string;
    disabled?: boolean;
  }[];
  isOpen?: boolean;
  isScrollable?: boolean;
  isDanger?: boolean;
  className?: string;
};
