import Layout from '@/components/Layout';
import IndexComponent from 'kjsp-calendar-core';

import { useRouter } from 'next/router';
import { useLoadingDispatch } from '@/contexts/loading.context';
import React, { useEffect, useRef } from 'react';

const IndexPage = () => {
  useEffect(() => {
    require('kjsp-calendar-core');
  });
  const calendar = useRef();
  // const calendar = React.createElement('kjsp-index');
  console.log('리액트앱', calendar);
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

  // @ts-ignore
  return (
    <Layout title='Home | KJSP Calendar'>
      <main>
        <h1>달력이 들어갈 자리</h1>
        <div style={{ height: '500px', width: '500px' }}>
          {/*{calendar}*/}
          <kjsp-index ref={calendar} />
        </div>
        <h2>로그인한 사용자만 볼 수 있는 화면이다.</h2>
        <br />
        <hr />
        <br />
        <button onClick={handleLogoutButtonClick}>LOGOUT</button>
        <br />
        <br />
        <button onClick={loadingTest}>Loaidng Start</button>
      </main>
    </Layout>
  );
};

export default IndexPage;
