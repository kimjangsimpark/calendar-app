import React, { createContext, Dispatch, useReducer, useContext } from 'react';
import { User } from '@/interfaces/index';

export const AuthContext = createContext<User | undefined>(undefined);

type Action =
  | { type: 'LOGIN'; id: string; password: string }
  | { type: 'GET_USER'; accessToken: string }
  | { type: 'LOGOUT'; accessToken: string };

type AuthDispatch = Dispatch<Action>;
const AuthDispatchContext = createContext<AuthDispatch | undefined>(undefined);

const authReducer = (state: User, action: Action): User => {
  const dummyUserInformation = {
    id: 'test',
    password: '1234',
    name: '심익현',
    accessToken: 'aaa.bbb.ccc',
  };

  switch (action.type) {
    case 'LOGIN':
      // @todo 로그인 API 호출 (네스트 서버로)
      if (
        action.id === dummyUserInformation.id &&
        action.password === dummyUserInformation.password
      ) {
        return {
          ...state,
          isLoggedIn: true,
          id: dummyUserInformation.id,
          name: dummyUserInformation.name,
        };
      }

      return {
        isLoggedIn: false,
      };
    case 'GET_USER':
      // @todo JWT로 회원정보 받아오기
      if (
        state.isLoggedIn &&
        action.accessToken === dummyUserInformation.accessToken
      ) {
        return {
          ...state,
          id: dummyUserInformation.id,
          name: dummyUserInformation.name,
        };
      }

      return {
        isLoggedIn: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        isLoggedIn: false,
        id: '',
        name: '',
      };
    default:
      throw new Error('Unhandled action');
  }
};

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, dispatch] = useReducer(authReducer, {
    isLoggedIn: false,
    id: '',
    name: '',
  });

  return (
    <AuthDispatchContext.Provider value={dispatch}>
      <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
    </AuthDispatchContext.Provider>
  );
};

export const useAuthState = (): User => {
  const state = useContext(AuthContext);

  if (!state) {
    throw new Error('AuthProvider not found');
  }

  return state;
};

export const useAuthDispatch = (): AuthDispatch => {
  const dispatch = useContext(AuthDispatchContext);

  if (!dispatch) {
    throw new Error('AuthProvider not found');
  }

  return dispatch;
};
