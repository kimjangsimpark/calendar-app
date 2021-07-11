import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import accountStyle from '@client/styles/account.module.scss';
import { LoginRequest } from '@src/interfaces';
import Router from 'next/router';
import { NextPage } from 'next';

const LoginPage: NextPage = () => {
  const [email, setEmail] = useState<string>('a@b.c');
  const [password, setPassword] = useState<string>('ab');

  async function handleLoginButtonClick(
    event: React.MouseEvent,
  ): Promise<void> {
    event.preventDefault();
    event.stopPropagation();

    if (!email) {
      alert('이메일을 입력하세요.');
      return;
    }

    if (!password) {
      alert('비밀번호를 입력하세요.');
      return;
    }

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        const body = (await response.json()) as { accessToken: string };
        localStorage.setItem('accessToken', body.accessToken);
        Router.push('/');
      } else if (response.status === 401) {
        alert('아이디 혹은 비밀번호가 올바르지 않습니다.');
      }
    } catch (e) {
      alert('서버 오류 발생');
      return;
    }
  }

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
              name="email"
              id="email"
              placeholder=" "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
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
              onChange={(e) => setPassword(e.target.value)}
              required
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
