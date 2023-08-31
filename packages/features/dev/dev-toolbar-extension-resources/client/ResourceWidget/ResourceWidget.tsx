/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable no-plusplus */

import { useState } from 'react';
import { TrashCan, CloudDataOps } from '@carbon/react/icons';
import { DevWidget } from '@exo/frontend-features-dev-toolbar-ui';
import * as S from './ResourceWidget.styles';
import { useEffectOnce } from '@exo/frontend-common-hooks';

const isJs = (name: string) => name.endsWith('.js');
const isGql = (name: string) => name.includes('/graphql');
const isXhr = (name: string, initiatorType: string) =>
  !isJs(name) && !isGql(name) && initiatorType === 'fetch';

const count = (entries: PerformanceEntryList) => {
  let js = 0;
  let xhr = 0;
  let gql = 0;

  for (let i = 0; i < entries.length; i++) {
    if (isJs(entries[i].name)) js++;
    else if (isGql(entries[i].name)) gql++;
    else if (isXhr(entries[i].name, (entries[i] as any).initiatorType)) xhr++;
  }

  return {
    js,
    xhr,
    gql
  };
};

export const ResourceWidget = () => {
  const [jsCount, setJsCount] = useState(0);
  const [xhrCount, setXhrCount] = useState(0);
  const [gqlCount, setGqlCount] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffectOnce(() => {
    const perfObserver = new PerformanceObserver(list => {
      const entries = list.getEntries();

      const { js, xhr, gql } = count(entries);
      setJsCount(old => old + js);
      setXhrCount(old => old + xhr);
      setGqlCount(old => old + gql);
    });

    perfObserver.observe({
      entryTypes: ['resource']
    });

    return () => {
      perfObserver.disconnect();
    };
  });

  useEffectOnce(() => {
    const entries = performance.getEntriesByType('resource');

    const { js, xhr, gql } = count(entries);
    setJsCount(js);
    setXhrCount(xhr);
    setGqlCount(gql);
  });

  const relevantEntries = performance
    .getEntriesByType('resource')
    .filter(e => isGql(e.name) || isXhr(e.name, (e as any).initiatorType) || isJs(e.name));

  const totalSize = relevantEntries.reduce((p, e) => p + (e as any).encodedBodySize, 0);
  const totalTransfer = relevantEntries.reduce((p, e) => p + (e as any).transferSize, 0);

  return (
    <>
      <DevWidget
        tooltip="Network requests"
        onClick={() => setVisible(!visible)}
        icon={<CloudDataOps size={16} />}
        actions={[
          {
            icon: <TrashCan size={16} />,
            onClick: () => {
              performance.clearResourceTimings();
              setGqlCount(0);
              setXhrCount(0);
              setJsCount(0);
            },
            tooltip: 'Clear'
          }
        ]}
      >
        <S.Resources>
          <S.Resource>
            JS
            {jsCount > 0 && <S.Count key={jsCount}>{jsCount}</S.Count>}
          </S.Resource>
          <S.Resource>
            XHR
            {xhrCount > 0 && <S.Count key={xhrCount}>{xhrCount}</S.Count>}
          </S.Resource>
          <S.Resource>
            GQL
            {gqlCount > 0 && <S.Count key={gqlCount}>{gqlCount}</S.Count>}
          </S.Resource>
        </S.Resources>
      </DevWidget>

      {visible && (
        <S.FullDevMenu>
          <S.Table>
            <thead>
              <tr>
                <th>URL</th>
                <th>Duration</th>
                <th>Size</th>
                <th>Transfer</th>
              </tr>
            </thead>
            <tbody>
              {relevantEntries.map(e => (
                <tr key={e.name}>
                  <td>{e.name}</td>
                  <td>{Math.round(e.duration)}</td>
                  <td>{Math.round((e as any).encodedBodySize / 1024)}</td>
                  <td>{Math.round((e as any).transferSize / 1024)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th></th>
                <th></th>
                <th>{Math.round(totalSize / 1024)}</th>
                <th>{Math.round(totalTransfer / 1024)}</th>
              </tr>
            </tfoot>
          </S.Table>
        </S.FullDevMenu>
      )}
    </>
  );
};
