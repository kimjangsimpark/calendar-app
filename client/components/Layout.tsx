import React, { ReactNode, useEffect } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import {
  useUserState,
  useUserDispatch,
  getUser,
} from '@client/contexts/auth.context';
import { useLoadingState } from '@client/contexts/loading.context';
import pageStyles from '@client/styles/page.module.scss';
import headerStyles from '@client/styles/header.module.scss';
import Loading from './Loading';

type Props = {
  children?: ReactNode;
  title?: string;
};

export const Layout = ({
  children,
  title = 'This is the default title',
}: Props) => {
  const state = useUserState();
  const dispatch = useUserDispatch();
  const loadingState = useLoadingState();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken === null) {
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
    return <Loading />;
  }

  if (error) {
    return <div>!!ERROR!!</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className={pageStyles.body}>
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
              <div className={headerStyles.yearMonthWrapper}>
                <div>2021</div>
                <div>07</div>
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
      {loadingState.isLoading ? <Loading /> : null}
    </div>
  );
};
