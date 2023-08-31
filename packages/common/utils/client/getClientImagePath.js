/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import addImageExt from './addImageExt';

// TODO: We should remove this
const getClientImagePath = (img, addExt, cdnReplace = true) => {
  const cdnUrl = process.env.CDN_URL;
  // console.log('cdnUrl', cdnUrl);
  // Optionally change the image extension
  const imageWithPath = addExt ? addImageExt(img) : img;

  let imgSrc = imageWithPath;

  // Replace an image's src url from `static` to an absolute  cdn url
  // as defined by the CDN_URL env var
  if (cdnUrl && cdnReplace && imageWithPath.includes('/static/')) {
    imgSrc = imageWithPath.replace(/\/static\//g, `${cdnUrl}/`);
  }

  return imgSrc;
};

export default getClientImagePath;
