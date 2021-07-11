import * as React from 'react';
import { AppProps } from 'next/app';
import { UserProvider } from '@client/contexts/auth.context';
import { LoadingProvider } from '@client/contexts/loading.context';
import '@client/styles/global.scss';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <UserProvider>
      <LoadingProvider>
        <Component {...pageProps} />
      </LoadingProvider>
    </UserProvider>
  );
};

export default App;
