import Layout from '@/components/Layout';
import Calendar from '@/components/Calendar';

import { useRouter } from 'next/router';
import { useLoadingDispatch } from '@/contexts/loading.context';
import React from 'react';

const IndexPage = () => {
  const router = useRouter();
  const loadingDispatch = useLoadingDispatch();

  const handleLogoutButtonClick = () => {
    localStorage.removeItem('accessToken');

    router.reload();
  };

  const loadingTest = () => {
    loadingDispatch({ type: 'LOADING_START' });

    const timeoutRef = setTimeout(() => {
      loadingDispatch({ type: 'LOADING_END' });
      clearTimeout(timeoutRef);
    }, 2000);
  };

  return (
    <Layout title="Home | KJSP Calendar">
      <Calendar />
      <button onClick={handleLogoutButtonClick}>LOGOUT</button>
      <button onClick={loadingTest}>Loaidng Start</button>
    </Layout>
  );
};

export default IndexPage;
