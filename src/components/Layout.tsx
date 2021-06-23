import React, { ReactNode, useEffect } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import {
  useUserState,
  useUserDispatch,
  getUser,
} from '@/contexts/auth.context';

import headerStyles from '@/styles/header.module.scss';

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = 'This is the default title' }: Props) => {
  const state = useUserState();
  const dispatch = useUserDispatch();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken === null) {
      console.log('router.pathname', Router.pathname);

      if (Router.pathname !== '/login') {
        Router.push('/login');
      }
      return;
    }

    // getUser(dispatch, accessToken);
    getUser(dispatch);
  }, [dispatch]);

  const { data: user, loading, error } = state.user;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>!!ERROR!!</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header className={headerStyles.mainHeader}>
        <aside className={headerStyles.headerToolbar}>
          {user ? (
            // @todo 달력 컨트롤 툴바
            <>
              <div>{user.name}님 환영이요</div>
              <div className={headerStyles.yearMonthWrapper}>
                <div>2021</div>
                <div>06</div>
              </div>
              <div className={headerStyles.calendarControllerWrapper}>
                <div>prev</div>
                <div>today</div>
                <div>next</div>
              </div>
            </>
          ) : null}
        </aside>
      </header>
      {children}
    </div>
  );
};

export default Layout;
