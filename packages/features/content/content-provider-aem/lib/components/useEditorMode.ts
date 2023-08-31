/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { AuthoringUtils } from '@adobe/aem-spa-page-model-manager';
import { useEffectOnce } from '@exo/frontend-common-hooks';
import { useState } from 'react';

export type EditorMode = undefined | 'edit' | 'template-structure' | 'template-initial' | 'layout';

const getModeFromDocument = (): EditorMode => {
  const htmlClassList = document.documentElement.classList;

  if (htmlClassList.contains('aem-AuthorLayer-Edit')) return 'edit';
  if (htmlClassList.contains('aem-AuthorLayer-structure')) return 'template-structure';
  if (htmlClassList.contains('aem-AuthorLayer-Layouting')) return 'layout';
  if (htmlClassList.contains('aem-AuthorLayer-initial')) return 'template-initial';

  return undefined;
};

export const useEditorMode = () => {
  const [editorMode, setEditorMode] = useState<EditorMode>(
    AuthoringUtils.isInEditor() ? 'edit' : undefined
  );

  useEffectOnce(() => {
    const observer = new MutationObserver(mutations => {
      if (mutations.find(m => m.attributeName === 'class')) {
        setEditorMode(getModeFromDocument());
      }
    });
    observer.observe(document.documentElement, { attributes: true });
    return () => {
      observer.disconnect();
    };
  });

  return editorMode;
};
