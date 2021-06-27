import { AppProps } from 'next/app';
import { UserProvider } from '@/contexts/auth.context';
import { LoadingProvider } from '@/contexts/loading.context';
import '@/styles/global.scss';

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
