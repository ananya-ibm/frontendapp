/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable react/require-default-props, import/no-named-as-default, react/boolean-prop-naming */

import { Link as ReactLink } from '@exo/frontend-common-link';
import React from 'react';
import * as S from './Teaser.styles';

export const Teaser = (props: Props) => {
  const {
    pretitle,
    title,
    description,
    titleType,
    linkURL,
    actionsEnabled,
    imageAlt,
    actions,
    imagePath
  } = props;
  const showActions: boolean = actions.length > 0 && actionsEnabled;
  return (
    <div className="cq-dd-image">
      {imagePath && <S.Image src={imagePath} alt={imageAlt} />}
      <div>
        {pretitle && <S.PreTitle>{pretitle}</S.PreTitle>}

        {title && linkURL && (
          <ReactLink to={linkURL}>
            <S.Title as={titleType ?? 'h3'}>{title}</S.Title>
          </ReactLink>
        )}

        {title && !linkURL && <S.Title as={titleType ?? 'h3'}>{title}</S.Title>}

        {description && (
          <S.Description data-rte-editelement>
            <div dangerouslySetInnerHTML={{ __html: description }} />
          </S.Description>
        )}
        {showActions && (
          <S.Actions>
            {actions.map(a => (
              <li key={a.url}>
                <ReactLink to={a.url}>{a.title}</ReactLink>
              </li>
            ))}
          </S.Actions>
        )}
      </div>
    </div>
  );
};

type Props = {
  pretitle?: string;
  title: string;
  description?: string;
  titleType: 'h1' | 'h2' | 'h3' | 'h4';
  linkURL: string;
  actionsEnabled: boolean;
  imageLinkHidden: boolean;
  imageAlt: string;
  titleLinkHidden: boolean;
  actions: Action[];
  imagePath: string;
};

type Action = {
  title: string;
  url: string;
};
