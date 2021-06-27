import { AppProps } from 'next/app';
import { UserProvider } from '@/contexts/auth.context';
import '@/styles/global.scss';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
};

export default App;
