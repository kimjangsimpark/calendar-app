import Layout from '@/components/Layout';
import Link from 'next/link';
import { useAuthState, useAuthDispatch } from '@/contexts/auth.context';
import React from 'react';

const LoginPage = () => {
  const handleLoginFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <Layout title="calendar - 로그인">
      <section>
        <div>Login</div>
        <form onSubmit={handleLoginFormSubmit}>
          <input type="text" name="id" id="id" />
          <input type="password" name="password" id="password" />
          <button>Login</button>
        </form>
        <Link href="/signup">
          <a>Sign up</a>
        </Link>
      </section>
    </Layout>
  );
};

export default LoginPage;
