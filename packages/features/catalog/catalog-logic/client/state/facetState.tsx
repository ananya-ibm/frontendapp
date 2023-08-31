/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable no-else-return */

import React, { useState, useCallback, useContext, useEffect } from 'react';

export const FacetStateContext = React.createContext({});

export const useFacetStateContext = () => {
  return useContext(FacetStateContext);
};

type StateType = {
  displayMode: 'grid' | 'list';
  baseFacets: string[];
  sort: string;
  selectedFacets: string[];
  stagedFacets?: string[];
  selectedFacetDescriptions?: { label: string; id: string}[];
};

export const useFacetState = ({
  key,
  baseFacets,
  baseSort,
  baseSelectedFacets,
  staged = false
}: Args) => {
  const initialState = {
    displayMode: 'grid',
    baseFacets: baseFacets ?? [],
    sort: baseSort,
    selectedFacets: baseSelectedFacets ?? [],
    stagedFacets: baseSelectedFacets ?? [],
    selectedFacetDescriptions: []
  } as StateType;

  const [state, setState] = useState<StateType>(initialState);

  // Ensure new state when switching page
  useEffect(() => {
    setState(initialState);
  }, [key]);

  useEffect(() => {
    if (state.selectedFacets.length > 0) {
      const safeSelected = state.selectedFacets.join('&');
      const pageUrl = `?selectedFilters=${encodeURI(safeSelected)}`;
      window.history.pushState('', '', pageUrl);
    } else {
      window.history.pushState('', '', '?');
    }
  }, [state.selectedFacets]);

  const stateProp = staged ? 'stagedFacets' : 'selectedFacets';

  const toggleFacet = useCallback(
    code => {
      if (state[stateProp]?.includes(code)) {
        setState({
          ...state,
          [stateProp]: state[stateProp]?.filter(f => f !== code) ?? []
        });
      } else {
        setState({
          ...state,
          [stateProp]: [...(state[stateProp] ?? []), code]
        });
      }
    },
    [setState, state]
  );

  const replaceFacets = useCallback(codes => setState({ ...state, [stateProp]: codes }), [
    setState,
    state
  ]);

  const removeFacet = useCallback(
    code =>
      setState({
        ...state,
        [stateProp]: (state[stateProp] ?? []).filter(f => f !== code)
      }),
    [setState, state]
  );

  const setDisplayMode = useCallback(mode => setState({ ...state, displayMode: mode }), [
    setState,
    state
  ]);

  const setSort = useCallback(sort => setState({ ...state, sort }), [setState, state]);

  const clear = useCallback(() => {
    if (staged) {
      setState({ ...state, stagedFacets: [] });
    } else {
      setState(initialState);
      window.history.pushState('', '', '');
    }
  }, [setState, state, staged]);

  const commit = useCallback(() => {
    setState({ ...state, selectedFacets: [...(state.stagedFacets ?? [])] });
  }, [setState, state]);

  const abort = useCallback(() => setState({ ...state, stagedFacets: [...state.selectedFacets] }), [
    setState,
    state
  ]);

  const setSelectedFacetDescriptions = useCallback(newSelectedFacetDescriptions => {
    setState({ ...state, selectedFacetDescriptions: newSelectedFacetDescriptions })
  }, [setState, state]);

  return {
    state,
    ops: {
      toggleFacet,
      replaceFacets,
      removeFacet,
      setDisplayMode,
      setSort,
      clear,
      commit,
      abort,
      setSelectedFacetDescriptions
    }
  };
};

type Args = {
  key?: any;
  baseFacets?: string[];
  baseSort?: string;
  baseSelectedFacets?: string[];
  staged?: boolean;
};

export const FacetStateContextProvider = ({ baseFacets, children }: Props) => {
  const {
    state,
    ops: { toggleFacet, replaceFacets, removeFacet, setDisplayMode, setSort, clear }
  } = useFacetState({ baseFacets });

  const context = {
    state,
    ops: {
      toggleFacet,
      replaceFacets,
      removeFacet,
      setDisplayMode,
      setSort,
      clear
    }
  };

  return <FacetStateContext.Provider value={context}>{children}</FacetStateContext.Provider>;
};

type Props = {
  baseFacets: string[];
  children: any;
};
