import React, { Dispatch, createContext, useReducer, useContext } from 'react';
import { User } from '@/interfaces/index';

type State = {
  user: {
    loading: boolean;
    data: User | null;
    error: any;
  };
};

type Action =
  | { type: 'GET_USER' }
  | { type: 'GET_USER_SUCCESS'; data: User }
  | { type: 'GET_USER_ERROR'; error?: any };

type UserDispatch = Dispatch<Action>;

const UserStateContext = createContext<State | null>(null);
const UserDispatchContext = createContext<UserDispatch | null>(null);

// context 에서 사용 할 기본 상태
const initialState = {
  user: {
    loading: false,
    data: null,
    error: null,
  },
};
// 로딩중일 때 바뀔 상태 객체
const loadingState = {
  loading: true,
  data: null,
  error: null,
};
// 성공했을 때의 상태 만들어주는 함수
const success = (data: User) => ({
  loading: false,
  data,
  error: null,
});
// 실패했을 때의 상태 만들어주는 함수
const error = (error: any) => ({
  loading: false,
  data: null,
  error: error,
});

const userReducer = (state: State, action: Action) => {
  console.log('action type', action.type);
  switch (action.type) {
    case 'GET_USER':
      return {
        ...state,
        user: loadingState,
      };
    case 'GET_USER_SUCCESS':
      return {
        ...state,
        user: success(action.data),
      };
    case 'GET_USER_ERROR':
      return {
        ...state,
        user: error(action.error),
      };
    default:
      throw new Error(`Unhanded action type`);
  }
};

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
};

export const useUserState = () => {
  const state = useContext(UserStateContext);

  if (!state) {
    throw new Error('Cannot find UsersProvider');
  }

  return state;
};

export const useUserDispatch = () => {
  const dispatch = useContext(UserDispatchContext);

  if (!dispatch) {
    throw new Error('Cannot find UsersProvider');
  }

  return dispatch;
};

export const getUser = async (dispatch: UserDispatch, accessToken: string) => {
  dispatch({ type: 'GET_USER' });

  try {
    // @todo jwt token 헤더에 담아서 보내기
    const response = await fetch(`/api/auth/${accessToken}`);
    const responseJSON = await response.json();

    dispatch({ type: 'GET_USER_SUCCESS', data: responseJSON.data });
  } catch (error) {
    dispatch({ type: 'GET_USER_ERROR', error });
  }
};
