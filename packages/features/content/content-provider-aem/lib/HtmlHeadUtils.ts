/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable no-plusplus */

export const addStylesheetLink = (link: string) => {
  const $head = document.getElementsByTagName('head')[0];

  for (let i = 0; i < $head.childNodes.length; i++) {
    const $child = $head.childNodes.item(i);
    if ($child.nodeType === Node.ELEMENT_NODE) {
      const $childEl = $child as HTMLElement;
      if (
        $childEl.tagName.toLocaleLowerCase() === 'link' &&
        $childEl.getAttribute('href') === link
      ) {
        return;
      }
    }
  }

  const $link = document.createElement('link');
  $link.href = link;
  $link.rel = 'stylesheet';
  $link.type = 'text/css';
  $head.appendChild($link);
};

export const addStylesheet = (id: string, content: string) => {
  if (document.getElementById(id)) return;

  const $head = document.getElementsByTagName('head')[0];

  const $style = document.createElement('style');
  $style.id = id;
  $style.innerText = content;
  $head.appendChild($style);
};

export const setMetaProperty = (key: string, value: string) => {
  const $head = document.getElementsByTagName('head')[0];

  let found = false;
  for (let i = 0; i < $head.childNodes.length; i++) {
    const $child = $head.childNodes.item(i);
    if ($child.nodeType === Node.ELEMENT_NODE) {
      const $childEl = $child as HTMLElement;
      if (
        $childEl.tagName.toLocaleLowerCase() === 'meta' &&
        $childEl.getAttribute('property') === key
      ) {
        ($childEl as HTMLMetaElement).content = value;
        found = true;
      }
    }
  }

  if (!found) {
    const $meta = document.createElement('meta');
    $meta.setAttribute('property', key);
    $meta.content = value;
    $head.appendChild($meta);
  }
};
