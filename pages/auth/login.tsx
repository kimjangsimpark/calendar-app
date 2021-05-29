import React, { useEffect, useState, useCallback } from 'react';
import Layout from '@/components/Layout';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuthState, useAuthDispatch } from '@/contexts/auth.context';
import { User } from '@/interfaces';

const LoginPage = () => {
  const router = useRouter();
  const authState: User = useAuthState();
  const authDispatch = useAuthDispatch();
  const [loginForm, setLoginForm] = useState({
    id: '',
    password: '',
  });
  const { id, password } = loginForm;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    const nextForm = {
      ...loginForm,
      [name]: value,
    };

    setLoginForm(nextForm);
  };

  const handleLoginFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    authDispatch({
      type: 'LOGIN',
      id,
      password,
    });
  };

  useEffect(() => {
    if (authState.isLoggedIn) {
      router.push('/');
    }
  }, [authState]);

  return (
    <Layout title="calendar - 로그인">
      <section>
        <div>Login</div>
        <form onSubmit={handleLoginFormSubmit}>
          <input
            type="text"
            name="id"
            id="id"
            placeholder="아이디를 입력하세요"
            value={id}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={handleChange}
          />
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
