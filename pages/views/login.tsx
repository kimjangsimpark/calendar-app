import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import accountStyle from '@client/styles/account.module.scss';
import { LoginRequest } from '@src/interfaces';
import Router from 'next/router';
import { NextPage } from 'next';

const LoginPage: NextPage = () => {
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
      <section className={accountStyle.accountContainer}>
        <article>
          <h2 className={accountStyle.title}>로그인</h2>
          <div className={accountStyle.welcomeMessageWrapper}>
            <p>환영합니다.</p>
            <p>로그인을 부탁드려요!</p>
          </div>
        </article>
        <form className={accountStyle.accountForm}>
          <div className={accountStyle.inputWrapper}>
            <input
              className={accountStyle.input}
              type="email"
              name="id"
              id="id"
              placeholder=" "
              value={id}
              onChange={handleChange}
            />
            <label htmlFor="id" className={accountStyle.label}>
              아이디
            </label>
          </div>
          <div className={accountStyle.inputWrapper}>
            <input
              className={accountStyle.input}
              type="password"
              name="password"
              id="password"
              placeholder=" "
              value={password}
              onChange={handleChange}
            />
            <label htmlFor="password" className={accountStyle.label}>
              비밀번호
            </label>
          </div>
          <button
            onClick={handleLoginButtonClick}
            className={accountStyle.submitButton}
          >
            로그인
          </button>
        </form>
        <Link href="/signup">
          <a className={accountStyle.link}>회원가입</a>
        </Link>
      </section>
    </>
  );
};

export default LoginPage;
