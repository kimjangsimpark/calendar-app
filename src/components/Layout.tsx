import React, { ReactNode } from 'react';
import Link from 'next/link';
import Head from 'next/head';

import headerStyles from '@/styles/header.module.scss';

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = 'This is the default title' }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header className={headerStyles.mainHeader}>
      <nav className={headerStyles.headerNavigation}>
        <Link href="/">
          <a>Ssabal juck</a>
        </Link>
        <Link href="/">
          <a>Dummy Menu</a>
        </Link>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/auth/login">
          <a className={headerStyles.login}>Login</a>
        </Link>
      </nav>
    </header>
    {children}
  </div>
);

export default Layout;
