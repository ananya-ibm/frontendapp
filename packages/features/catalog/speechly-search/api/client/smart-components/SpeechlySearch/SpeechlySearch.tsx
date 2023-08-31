/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React, { useEffect } from 'react';
import { SpeechProvider, useSpeechContext } from '@speechly/react-client';
import { Microphone, Recording, OverflowMenuHorizontal } from '@carbon/react/icons';
import * as S from './SpeechlySearch.styles';

const SpeechlyInterface = ({ onSearch, onSort, avaliableFacets, setAllFacets }) => {
  const { segment, start, stop, microphoneState, clientState } = useSpeechContext();

  const stateIconMap = {
    Idle: <Microphone size={32} />,
    Ready: <Microphone size={32} />,
    Recording: (
      <S.RecordingWrapper>
        <Recording size={32} />
      </S.RecordingWrapper>
    ),
    Loading: <OverflowMenuHorizontal size={32} />
  };

  const sortMap = {
    PRICE: 'PRICE_ASCENDING'
  };

  useEffect(() => {
    if (segment?.isFinal && segment?.intent?.intent === 'search') {
      onSearch(segment.entities[0].value);
    }
    if (segment?.isFinal && segment?.intent?.intent === 'filter') {
      if (segment?.entities[0]?.type === 'sort') {
        onSort(sortMap[segment.entities[0].value]);
      }
      if (segment?.entities[0]?.type === 'brand') {
        const avaliableBrandFacets = avaliableFacets?.find(
          (element) => element?.name?.toLowerCase() === 'brand'
        );
        const selectedFacet = avaliableBrandFacets?.entries?.find(
          (element) => element?.label?.toUpperCase() === segment?.entities[0]?.value
        );
        if (selectedFacet) setAllFacets([selectedFacet.code]);
      }
    }
  }, [segment, onSearch, onSort]);

  return (
    <div>
      <S.Wrapper className="mic-button">
        {segment ? (
          <S.WordWrapper className="segment">
            <S.Word>"</S.Word>
            {segment.words.map((w) => w.value).join(' ')}
            <S.Word>"</S.Word>
          </S.WordWrapper>
        ) : (
          <div />
        )}
        <S.RecordingToggle
          onClick={() =>
            microphoneState === 'Started' || microphoneState === 'Starting' ? stop() : start()
          }
        >
          {stateIconMap[clientState]}
        </S.RecordingToggle>
      </S.Wrapper>
    </div>
  );
};

export const SpeechlySearch = ({ onSearch, onSort, facets, onReplaceFacets, appId, appLang }) => {
  return appId && appLang ? (
    <div className="App">
      <SpeechProvider appId={appId}>
        <SpeechlyInterface
          onSearch={onSearch}
          onSort={onSort}
          avaliableFacets={facets}
          setAllFacets={onReplaceFacets}
        />
      </SpeechProvider>
    </div>
  ) : (
    <div>Incorrect or missing Speechly Configuration. See .env.example</div>
  );
};
