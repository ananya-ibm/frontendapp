/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React, { useLayoutEffect } from 'react';
import { useTheme } from 'styled-components';

const useLayoutEffectWhenCSR = typeof window !== 'undefined' ? useLayoutEffect : () => {};

export const ChromeCSS = () => {
  const currentTheme = useTheme();

  // TODO: Exclude when rendering as SSR

  // react-helment doesn't support prepending items in the head
  // this breaks when used in combination with styled-components
  useLayoutEffectWhenCSR(() => {
    // Remove old - when dynamically switch theme
    const childrenToRemove: HTMLElement[] = [];
    for (const child of Array.from(document.head.children)) {
      if (child.nodeType === Node.ELEMENT_NODE && (child as HTMLElement).dataset.type === 'exo-theme') {
        childrenToRemove.push(child as HTMLElement);
      }
    }
    childrenToRemove.forEach(e => document.head.removeChild(e));

    currentTheme.globalStyles.cssUrls?.forEach(url => {
      const $link = document.createElement('link');
      $link.dataset.type = 'exo-theme';
      $link.rel = 'stylesheet';
      $link.href = url;
      document.head.insertBefore($link, document.head.firstChild);
    });

    if (currentTheme.globalStyles.cssRules) {
      const $style = document.createElement('style');
      $style.dataset.type = 'exo-theme';
      $style.type = 'text/css';
      $style.appendChild(document.createTextNode(currentTheme.globalStyles?.cssRules));
      document.head.insertBefore($style, document.head.firstChild);
    }
  }, [currentTheme.name]);

  return <>{currentTheme.globalStyles.cssComponent && <currentTheme.globalStyles.cssComponent />}</>;
};
