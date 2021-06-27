import React, { Dispatch, createContext, useReducer, useContext } from 'react';

interface State {
  isLoading: boolean;
}

interface Action {
  type: 'LOADING_START' | 'LOADING_END';
}

interface LoadingDispatch extends Dispatch<Action> {}

const LoadingStateContext = createContext<State | null>(null);
const LoadingDispatchContext = createContext<LoadingDispatch | null>(null);

const initialState = {
  isLoading: false,
};

const loadingReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'LOADING_START':
      return {
        ...state,
        isLoading: true,
      };
    case 'LOADING_END':
      return {
        ...state,
        isLoading: false,
      };
    default:
      throw new Error(`Unhanded action type`);
  }
};

export const LoadingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(loadingReducer, initialState);

  return (
    <LoadingStateContext.Provider value={state}>
      <LoadingDispatchContext.Provider value={dispatch}>
        {children}
      </LoadingDispatchContext.Provider>
    </LoadingStateContext.Provider>
  );
};

export const useLoadingState = () => {
  const state = useContext(LoadingStateContext);

  if (!state) {
    throw new Error('Cannot find LoadingProvider');
  }

  return state;
};

export const useLoadingDispatch = () => {
  const dispatch = useContext(LoadingDispatchContext);

  if (!dispatch) {
    throw new Error('Cannot find LoadingProvider');
  }

  return dispatch;
};
