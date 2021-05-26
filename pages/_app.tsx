import { AppProps } from 'next/app';
import { AuthContextProvider } from '@/contexts/auth.context';
import '@/styles/global.scss';

const App = ({ Component, pageProps }: AppProps) => (
  <AuthContextProvider>
    <Component {...pageProps} />
  </AuthContextProvider>
);

export default App;
