/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import ReactPlayer from 'react-player';
import { Button } from '@exo/frontend-components-base';
import * as S from './Video.styles';

export const Video = ({
  title,
  color,
  videoURL,
  accentText,
  buttonText,
  videoWidth = '640px',
  videoHeight = '360px'
}: Props) => {
  return (
    <S.Video color={color}>
      <S.Inner>
        {accentText && <S.Accent color={color}>{accentText}</S.Accent>}
        {title && <S.Title>{title}</S.Title>}
        {videoURL && (
          <S.Media>
            <ReactPlayer
              url={videoURL}
              controls
              style={{ width: videoWidth, height: videoHeight }}
            />
          </S.Media>
        )}
        {buttonText && <Button label={buttonText} />}
      </S.Inner>
    </S.Video>
  );
};

type Props = {
  title?: string;
  color?: string;
  videoURL: string;
  buttonText?: string;
  accentText?: string;
  videoWidth?: string;
  videoHeight?: string;
};
