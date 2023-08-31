/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

const addImageExt = (imgUrl, ext = process.env.IMAGE_EXTENSION ?? '.jpg') => {
  if (!imgUrl || imgUrl.length === 0) return imgUrl;
  return imgUrl.match(/.(jpg|jpeg|png|gif)/i) ? imgUrl : `${imgUrl}${ext}`;
};

export default addImageExt;
