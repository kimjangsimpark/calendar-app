import React, { ReactNode } from 'react';
import Head from 'next/head';
import { User } from '@/interfaces';
import { useAuthState } from '@/contexts/auth.context';

import headerStyles from '@/styles/header.module.scss';

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = 'This is the default title' }: Props) => {
  const authState: User = useAuthState();

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header className={headerStyles.mainHeader}>
        <aside className={headerStyles.headerToolbar}>
          {authState.isLoggedIn ? (
            // @todo 달력 컨트롤 툴바
            <>
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
