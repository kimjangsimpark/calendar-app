import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuthState, useAuthDispatch } from '@/contexts/auth.context';
import { User } from '@/interfaces';
import loginStyle from '@/styles/login.module.scss';

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
      <section className={loginStyle.loginContainer}>
        <article>
          <h2 className={loginStyle.title}>로그인</h2>
          <div className={loginStyle.welcomeMessageWrapper}>
            <p>환영합니다.</p>
            <p>로그인을 부탁드려요!</p>
          </div>
        </article>
        <form onSubmit={handleLoginFormSubmit} className={loginStyle.loginForm}>
          <input
            className={loginStyle.input}
            type="text"
            name="id"
            id="id"
            placeholder="ID (email)"
            value={id}
            onChange={handleChange}
          />
          <input
            className={loginStyle.input}
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={handleChange}
          />
          <button className={loginStyle.loginButton}>Login</button>
        </form>
        <Link href="/signup">
          <a className={loginStyle.signupLink}>Sign up</a>
        </Link>
      </section>
    </Layout>
  );
};

export default LoginPage;
