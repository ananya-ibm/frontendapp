/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';

const DEFAULT_RENDER = ({ children: c }) => <>{c}</>;

export const ExtensionNode = ({ extensions, props, children, render = DEFAULT_RENDER }: Props) => {
  if (!extensions) return null;

  const Wrapper = render;

  if (extensions instanceof Array) {
    if (extensions.length === 0) return null;
    return (
      <React.Fragment>
        {extensions!.map((E, idx) => (
          /* eslint-disable-next-line react/no-array-index-key */
          <Wrapper key={idx}>
            {/* eslint-disable-next-line react/no-array-index-key */}
            <E key={idx} {...props}>
              {children}
            </E>
          </Wrapper>
        ))}
      </React.Fragment>
    );
  } else {
    const E = extensions;
    return (
      <Wrapper>
        <E {...props}>{children}</E>
      </Wrapper>
    );
  }
};

type Props = {
  extensions?: ((props?: any) => React.ReactElement) | ((props: any) => React.ReactElement)[];
  props?: any;
  render?: (props: { children: any }) => React.ReactElement;
  children?: any;
};
