/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { useCallback, useEffect, useReducer, useRef } from 'react';

export type Action = { type: string };

type ActionResponse<S, C> = { state?: S; context?: Partial<C> | undefined } | string | void;

type ActionMethod<S extends string, C, T extends Action, K> = (args: {
  event: T extends { type: K } ? T : never;
  context: C;
  state: S;
  dispatch: (ev: T) => void;
}) => ActionResponse<S, C> | Promise<ActionResponse<S, C>>;

type EventMap<S extends string, C, T extends Action> = Partial<
  {
    [K in T['type']]: ActionMethod<S, C, T, K>;
  }
>;

export type StateMachine<S extends string, C, E extends Action> = Partial<
  Record<S | '*', EventMap<S | '*', C, E>>
>;

type StateAction<C, S> = { type: 'setState'; state: S } | { type: 'updateContext'; context: C };

type State<C, S> = {
  state: S;
  context: C;
};

const machineStateReducer = <C, S>(state: State<C, S>, action: StateAction<C, S>): State<C, S> => {
  switch (action.type) {
    case 'setState':
      return { state: action.state, context: state.context };
    case 'updateContext':
      return { state: state.state, context: { ...state.context, ...action.context } };
    default:
      throw new Error('Unknown action');
  }
};

export const useMachine = <S extends string, C, E extends Action>(
  machine: StateMachine<S, C, E>,
  initial: S,
  initialContext: C
): [State<C, S>, (action: E) => void] => {
  const [state, dispatchState] = useReducer(machineStateReducer, {
    state: initial,
    context: initialContext
  });

  const stateRef = useRef<State<C, S>>(state as State<C, S>);
  useEffect(() => {
    stateRef.current = state as State<C, S>;
  }, [state]);

  const dispatch = useCallback(
    (event: E) => {
      const handleResponse = (res: any) => {
        if (!res) return;
        if (typeof res === 'string') {
          dispatchState({ type: 'setState', state: res });
        } else {
          if (res?.state) dispatchState({ type: 'setState', state: res.state });
          if (res?.context) dispatchState({ type: 'updateContext', context: res.context });
        }
      };

      const action = machine[stateRef.current.state]?.[event.type] ?? machine['*']?.[event.type];

      if (!action)
        throw new Error(`No action named ${event.type} in state ${stateRef.current.state}`);

      const res: ActionResponse<S, C> | Promise<ActionResponse<S, C>> = action({
        event,
        context: stateRef.current.context,
        state: stateRef.current.state,
        dispatch
      });
      if (res instanceof Promise) {
        res.then(r => {
          handleResponse(r);
        });
      } else if (res) {
        handleResponse(res);
      }
    },
    [state, machine]
  );

  return [state as State<C, S>, dispatch];
};
