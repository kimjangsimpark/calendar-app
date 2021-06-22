import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import loginStyle from '@/styles/login.module.scss';
import { LoginRequest } from '@/interfaces';
import Router from 'next/router';

const LoginPage = () => {
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

  const validateLoginInput = (): boolean => {
    if (loginForm.id.length <= 0) {
      alert('아이디를 입력해주세요');
      return false;
    }

    if (loginForm.password.length <= 0) {
      alert('비밀번호를 입력해주세요');
      return false;
    }

    return true;
  };

  const login = async () => {
    const stringifyRequestBody = JSON.stringify(loginForm);
    const fetchOptions = {
      method: 'POST',
      body: stringifyRequestBody,
      headers: {},
    };

    const fetchLoginAPIResult = await fetch('/api/login', fetchOptions);
    const fetchLoginAPIResultJSON: LoginRequest =
      await fetchLoginAPIResult.json();

    if (fetchLoginAPIResult.ok) {
      localStorage.setItem(
        'accessToken',
        fetchLoginAPIResultJSON.data.accessToken,
      );

      Router.push('/');
    } else if (fetchLoginAPIResult.status === 401) {
      // 로그인 실패이유 알려주기
      alert(fetchLoginAPIResultJSON.message);
    } else {
      // 서버오류
      alert('오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    }
  };

  const handleLoginButtonClick = (event: React.MouseEvent) => {
    event.preventDefault();
    if (!validateLoginInput()) {
      return;
    }

    login();
  };

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken !== null) {
      Router.push('/');
      return;
    }
  }, []);

  return (
    <>
      <Head>
        <title>로그인 | KJSP Calendar</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <section className={loginStyle.loginContainer}>
        <article>
          <h2 className={loginStyle.title}>로그인</h2>
          <div className={loginStyle.welcomeMessageWrapper}>
            <p>환영합니다.</p>
            <p>로그인을 부탁드려요!</p>
          </div>
        </article>
        <form className={loginStyle.loginForm}>
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
          <button
            onClick={handleLoginButtonClick}
            className={loginStyle.loginButton}
          >
            Login
          </button>
        </form>
        <Link href="/signup">
          <a className={loginStyle.signupLink}>Sign up</a>
        </Link>
      </section>
    </>
  );
};

export default LoginPage;
