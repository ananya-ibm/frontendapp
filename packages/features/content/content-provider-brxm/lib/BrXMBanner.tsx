/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Link } from 'react-router-dom';
import { Document, ImageSet } from '@bloomreach/spa-sdk';
import { BrManageContentButton, BrProps } from '@bloomreach/react-sdk';

export function Banner(props: BrProps) {
  const { document: documentRef } = props.component.getModels();
  const document = documentRef && props.page.getContent(documentRef);

  if (!document) {
    return null;
  }

  // @ts-ignore
  const { content, image: imageRef, link: linkRef, title } = document.getData<DocumentData >();
  const image = imageRef && props.page.getContent<ImageSet>(imageRef);
  const link = linkRef && props.page.getContent<Document>(linkRef);

  return (
    <div className={`jumbotron mb-3 ${props.page.isPreview() ? 'has-edit-button' : ''}`}>
      <BrManageContentButton
        content={document}
        documentTemplateQuery="new-banner-document"
        folderTemplateQuery="new-banner-folder"
        parameter="document"
        root="banners"
        relative
      />
      { title && <h1>{title}</h1> }
      { image && <img className="img-fluid" src={image.getOriginal()?.getUrl()} alt={title} /> }
      { content && <div dangerouslySetInnerHTML={{ __html: props.page.rewriteLinks(content.value) }} /> }
      { link && (
        <p className="lead">
          <Link to={link.getUrl()!} className="btn btn-primary btn-lg" role="button">Learn more</Link>
        </p>
      ) }
    </div>
  );
}
