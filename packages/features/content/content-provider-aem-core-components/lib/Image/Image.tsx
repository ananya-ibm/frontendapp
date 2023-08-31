/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable react/require-default-props, import/no-named-as-default, react/boolean-prop-naming */

import React from 'react';

export const Image = ({ src, alt, title, displayPopupTitle }: Props) => {
  return (
    <div className="cq-dd-image">
      <img src={src} alt={alt} title={displayPopupTitle && title ? title : ''} />
      {title && title.length && (
        <span
          itemProp="caption"
          style={{ display: 'block', fontSize: '90%', marginTop: '0.5rem', fontStyle: 'italic' }}
        >
          {title}
        </span>
      )}
      {displayPopupTitle && title && title.length && <meta itemProp="caption" content={title} />}
    </div>
  );
};

type Props = {
  src: string;
  alt?: string;
  displayPopupTitle?: boolean;
  title?: string;
};
