/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import ReactPlayer from 'react-player';
import * as S from './VideoWithText.styles';

export const VideoWithText = ({
  title,
  videoURL,
  text,
  videoWidth = '640px',
  videoHeight = '360px'
}: Props) => {
  return (
    <S.Video>
      {title && <S.Title>{title}</S.Title>}
      <S.Inner>
        {videoURL && (
          <S.Media width={videoWidth}>
            <ReactPlayer
              url={videoURL}
              loop
              playing
              controls={false}
              style={{ width: videoWidth, height: videoHeight }}
            />
          </S.Media>
        )}
        <S.Text dangerouslySetInnerHTML={{ __html: text }} />
      </S.Inner>
    </S.Video>
  );
};

type Props = {
  title?: string;
  videoURL: string;
  text: string;
  videoWidth?: string;
  videoHeight?: string;
};
