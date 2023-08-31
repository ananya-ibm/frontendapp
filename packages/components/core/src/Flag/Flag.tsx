/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import * as S from './Flag.styles';

export const Flag = ({ locale = 'GB' }: Props) => {
  const flagBlack = '#000';
  const flagWhite = '#fff';
  const flagBlue = '#181854';
  const flagRed = '#A50020';
  const flagYellow = '#FFC300';
  const flagGreen = '#00963B';
  return (
    <S.Flag viewBox="0 0 52 52">
      <rect fill={flagWhite} width="52" height="52" />
      {
        {
          GB: (
            <>
              <rect width="52" height="52" fill={flagBlue} />
              <path fill="none" stroke={flagWhite} strokeWidth="8" d="M52 52L0 0m52 0L0 52" />
              <path fill="none" stroke={flagWhite} strokeWidth="16" d="M0 26h52M26 0v52" />
              <path fill="none" stroke={flagRed} strokeWidth="10" d="M0 26h52M26 0v52" />
            </>
          ),
          SE: (
            <>
              <rect width="52" height="52" fill={flagBlue} />
              <path fill="none" stroke={flagYellow} strokeWidth="10" d="M0 26h52M26 0v52" />
            </>
          ),
          SP: (
            <>
              <path fill={flagRed} d="M0 0h52v52H0z" />
              <path fill="none" stroke={flagYellow} strokeWidth="26" d="M0 26h52" />
            </>
          ),
          IT: (
            <>
              <path fill="none" stroke={flagGreen} strokeWidth="18" d="M8 0v52" />
              <path fill="none" stroke={flagRed} strokeWidth="18" d="M44 0v52" />
            </>
          ),
          DE: (
            <>
              <path fill="none" stroke={flagBlack} strokeWidth="18" d="M0 8 h52" />
              <path fill="none" stroke={flagRed} strokeWidth="18" d="M0 26h52" />
              <path fill="none" stroke={flagYellow} strokeWidth="18" d="M0 44h52" />
            </>
          ),
          US: (
            <>
              <line
                fill="none"
                stroke={flagRed}
                strokeWidth="52"
                strokeDasharray="4"
                x1="26"
                x2="26"
                y2="52"
              />
              <rect fill={flagBlue} width="26" height="28" />
            </>
          ),
          CA: (
            <path
              fill={flagRed}
              d="M36 35l12-8-3-2 2-6-7 1-2-3-6 5 3-12-5 2-4-8-4 8-5-2 3 12-6-5-2 3-7-1 2 6-3 2 12 8-2 5 11-3-1 11h4l-1-11 11 3z"
            />
          )
        }[locale]
      }
    </S.Flag>
  );
};

Flag.Skeleton = () => {
  return (
    <S.Flag viewBox="0 0 52 52">
      <rect fill="#dddddd" width="52" height="52" />
    </S.Flag>
  );
};

type Props = {
  locale?: string;
};
