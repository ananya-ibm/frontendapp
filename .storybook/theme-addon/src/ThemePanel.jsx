/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable react/jsx-pascal-case */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-plusplus */
/* eslint-disable react/prop-types */
/* eslint-disable camelcase */

import * as React from 'react';
import styled from 'styled-components';
import { useParameter } from '@storybook/api';
import events from './events';

const S_TitleBar = styled.div`
  padding: 20px 15px 15px 15px;
  background: white;
  font-weight: normal;
`;

const S_TitleBar_Label = styled.span`
  font-weight: bold;
  color: #1EA7FD;
`;

const S_ComponentTheme_Edit = styled.textarea`
  font-family: monospace, Courier;
  resize: none;
  border-width: 0;
  background-color: white;
  width: 100%;
  height: 100%;
`;

const S_ComponentTheme_Edit_RO = styled.pre`
  color: #444444;
  font-family: monospace, Courier;
  resize: none;
  border-width: 0;
  background-color: white;
  width: 100%;
  height: 100%;
  margin: 0;
`;

const S_TabBar = styled('div')`
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  background-color: white;
`;

const S_Tab = styled('div')``;

const S_TabTitle = styled.button`
  cursor: pointer;
  border-width: 0;
  padding: 10px 15px;
  font-weight: bold;
  background-color: transparent;
  color: ${props => (props.active ? '#FF4984' : '#999999')};
  border-bottom-width: ${props => (props.active ? '3px' : '0')};
  border-bottom-color: #FF4984;
  border-bottom-style: solid;
  outline-style: none;
`;

const get = (obj, path) => {
  if (path.length === 1) return obj[path[0]];

  if (obj[path[0]]) {
    return get(obj[path[0]], path.slice(1));
  }
  return undefined;
};

const getThemeText = (componentTheme, theme) => {
  const arr = componentTheme.base.split('.');
  const maxDepth = arr.length - 1;

  let s = '';

  // Resolve vars
  const vars = {};
  Object.entries(componentTheme.vars).forEach(([k, v]) => {
    const value = v
      .map(o => {
        if (o.type === 'ref') {
          return get(theme, o.value.slice(2));
        } else {
          return o.value;
        }
      })
      .join('');
    vars[k] = value;
  });

  // Apply overrides from theme
  Object.entries(componentTheme.vars).forEach(([k, _]) => {
    const v = get(theme, [...arr.slice(2), k]);
    if (v) {
      vars[k] = v;
    }
  });

  s += '{\n';
  arr.slice(2).forEach((e, idx) => {
    s += '  ';
    for (let i = 0; i < idx; i++) s += '  ';
    s += `${e}: {\n`;
  });
  Object.entries(vars).forEach(([k, v], idx, array) => {
    s += arr
      .slice(1)
      .map(_ => '  ')
      .join('');
    s += `${k}: "${v}"`;
    if (idx < array.length - 1) {
      s += ',\n';
    } else {
      s += '\n';
    }
  });
  arr.slice(2).forEach((e, idx) => {
    for (let i = 1; i < maxDepth - idx; i++) s += '  ';
    s += '}\n';
  });
  s += '}';

  return s;
};

const ComponentTheme = ({ title, componentTheme, theme, channel }) => {
  const [state, setState] = React.useState(getThemeText(componentTheme, theme));
  const [baseState, setBaseState] = React.useState(
    getThemeText(componentTheme, theme)
  );
  const arr = componentTheme.base.split('.');

  if (getThemeText(componentTheme, theme) !== baseState) {
    setState(getThemeText(componentTheme, theme));
    setBaseState(getThemeText(componentTheme, theme));
  }

  const onChange = e => {
    setState(e.target.value);
    try {
      const json = e.target.value.replace(
        /(['"])?([a-z0-9A-Z_]+)(['"])?:/g,
        '"$2": '
      );
      const payload = JSON.parse(json);

      const newTheme = JSON.parse(JSON.stringify(theme));
      newTheme.modified = true;
      let obj = newTheme;
      for (let i = 2; i < arr.length - 1; i++) {
        obj[arr[i]] = obj[arr[i]] || {};
        obj = obj[arr[i]];
      }

      obj[arr[arr.length - 1]] = get(payload, arr.slice(2));
      channel.emit(events.updateTheme, newTheme);
    } catch (e) {
      // Ignore
    }
  };

  return (
    <S_ComponentTheme_Edit
      rows={state.split('\n').length}
      value={state}
      onChange={onChange}
    />
  );
};

const BaseComponentTheme = ({ title, componentTheme, theme, source }) => {
  const vars = {};
  if (source === 'theme') {
    const arr = componentTheme.base.split('.');
    Object.entries(componentTheme.vars).forEach(([k, _]) => {
      const v = get(theme, [...arr.slice(2), k]);
      if (v) {
        vars[k] = v;
      }
    });
  } else {
    Object.entries(componentTheme.vars).forEach(([k, v]) => {
      const value = v
        .map(o => {
          if (o.type === 'ref') {
            return '${' + o.value.join('.') + '}';
          } else {
            return o.value;
          }
        })
        .join('');
      vars[k] = '`' + value + '`';
    });
  }

  const s = Object.entries(vars)
    .map(([k, v]) => `${k}: ${v}`)
    .join('\n');

  return <S_ComponentTheme_Edit_RO>{s}</S_ComponentTheme_Edit_RO>;
};

const TabBar = ({ componentTheme, theme, channel }) => {
  const [activeTab, setActiveTab] = React.useState(0);

  return (
    <>
      <S_TabBar>
        <S_TabTitle active={activeTab === 0} onClick={() => setActiveTab(0)}>
          Computed
        </S_TabTitle>
        <S_TabTitle active={activeTab === 1} onClick={() => setActiveTab(1)}>
          Component Theme Definition
        </S_TabTitle>
        <S_TabTitle active={activeTab === 2} onClick={() => setActiveTab(2)}>
          Selected Theme - Component Overrides
        </S_TabTitle>
      </S_TabBar>

      <Tab active={activeTab === 0}>
        <ComponentTheme
          componentTheme={componentTheme}
          theme={theme}
          channel={channel}
        />
      </Tab>
      <Tab active={activeTab === 1}>
        <BaseComponentTheme
          source="component"
          componentTheme={componentTheme}
          theme={theme}
          channel={channel}
        />
      </Tab>
      <Tab active={activeTab === 2}>
        <BaseComponentTheme
          source="theme"
          componentTheme={componentTheme}
          theme={theme}
          channel={channel}
        />
      </Tab>
    </>
  );
};

const Tab = ({ title, onActivate, active, children }) => {
  return <S_Tab>{active && children}</S_Tab>;
};

export const ThemePanel = ({ channel, api, active }) => {
  const [theme, setTheme] = React.useState(null);
  const [modified, setModified] = React.useState(false);

  const componentTheme = useParameter('themeAddon', null);

  const onSelectTheme = th => {
    setTheme(th);
    setModified(th.modified);
  };

  const onUpdateTheme = th => {
    setModified(true);
  };

  React.useLayoutEffect(() => {
    channel.on(events.selectTheme, onSelectTheme);
    channel.on(events.updateTheme, onUpdateTheme);
    return () => {
      channel.removeListener(events.selectTheme, onSelectTheme);
      channel.removeListener(events.updateTheme, onUpdateTheme);
    };
  });

  if (!active) return null;

  return (
    <div>
      <S_TitleBar>
        <S_TitleBar_Label>Theme: </S_TitleBar_Label>
        {theme?.name} {modified ? '(Modified)' : ''}
      </S_TitleBar>

      {theme && componentTheme && componentTheme.base && (
        <TabBar
          componentTheme={componentTheme}
          theme={theme}
          channel={channel}
        />
      )}
    </div>
  );
};
