import { useEffect, useState } from 'react';
import {
  useUserState,
  useUserDispatch,
  getUser,
} from '@/contexts/auth.context';
import Layout from '@/components/Layout';
import Link from 'next/link';

const IndexPage = () => {
  const state = useUserState();
  const dispatch = useUserDispatch();

  const handleUserButtonClick = () => {
    localStorage.setItem('accessToken', 'aaa.bbb.ccc1');
  };

  // @todo 회원정보가 없으면 로그인 페이지로 리다이렉트
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      getUser(dispatch, accessToken);
    }
  }, [dispatch]);

  const { data: user, loading, error } = state.user;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>에러가 발생했습니다.</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <Layout title="Home | KJSP Calendar">
      <main>
        <h1>달력이 들어갈 자리</h1>
        <button onClick={handleUserButtonClick}>USER</button>
        <h2>{user.id}</h2>
        <p>name: {user.name}</p>
        <Link href="/login">
          <a>로그인고</a>
        </Link>
      </main>
    </Layout>
  );
};

export default IndexPage;
