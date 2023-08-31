/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React, { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp } from '@carbon/react/icons';
import * as S from './RangeDropdown.styles';

export const RangeDropdown = ({ label = 'Budget', isExpanded = false, children }: Props) => {
  const [expanded, setExpanded] = useState(isExpanded);
  const componentRef = React.createRef<HTMLDivElement>();
  const containerRef = React.createRef<HTMLDivElement>();

  const onClickOutside = evt => {
    // ignore clicks on the component itself
    if (componentRef.current?.contains(evt.target)) {
      return;
    }
    setExpanded(false);
  };

  useEffect(() => {
    document.addEventListener('click', onClickOutside, false);
    return () => {
      document.removeEventListener('click', onClickOutside, false);
    };
  });

  const onClick = () => {
    setExpanded(!expanded);
    containerRef.current?.focus();
  };

  return (
    <S.RangeDropdown ref={componentRef}>
      <div
        className={
          expanded
            ? 'cds--dropdown cds--list-box cds--dropdown--light cds--list-box--light cds--dropdown--xl cds--list-box--xl cds--dropdown--open cds--list-box--expanded'
            : 'cds--dropdown cds--list-box cds--dropdown--light cds--list-box--light cds--dropdown--xl cds--list-box--xl'
        }
      >
        <button
          type="button"
          className="cds--list-box__field"
          aria-haspopup="listbox"
          aria-expanded={expanded}
          onClick={onClick}
        >
          <span className="cds--list-box__label">{label}</span>
          <div className="cds--list-box__menu-icon">
            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
        </button>
      </div>

      <S.RangeContainer
        role="listbox"
        ref={containerRef}
        aria-label="Range Container"
        title="range container"
      >
        {expanded && <S.RangeChildren>{children}</S.RangeChildren>}
      </S.RangeContainer>
    </S.RangeDropdown>
  );
};

type Props = {
  children?: any;
  label: string;
  className?: string;
  isExpanded?: boolean;
};
