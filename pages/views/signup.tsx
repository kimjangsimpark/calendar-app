import * as React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import { NextPage } from 'next';
import accountStyle from '@client/styles/account.module.scss';

const SignupPage: NextPage = () => {
  const [email, setEmail] = React.useState<string>('a@b.c');
  const [password, setPassword] = React.useState<string>('ab');
  const [passwordConfirm, setPasswordConfirm] = React.useState<string>('ab');
  const [name, setName] = React.useState<string>('ab');

  async function onSignUpButtonClicked(e: React.MouseEvent): Promise<void> {
    e.preventDefault();
    e.stopPropagation();

    if (!email) {
      alert('이메일을 입력하세요.');
      return;
    }

    if (!password) {
      alert('비밀번호를 입력하세요.');
      return;
    }

    if (!passwordConfirm) {
      alert('비밀번호 확인을 입력해주세요.');
      return;
    }

    if (!name) {
      alert('이름을 입력해주세요.');
      return;
    }

    if (password !== passwordConfirm) {
      alert('비밀번호와 비밀번호 확인란이 서로 일치하지 않습니다.');
      return;
    }

    try {
      const response = await fetch(`/api/user/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          name: name,
        }),
      });

      console.log(response);

      if (response.ok) {
        alert('회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.');
        Router.push('/login');
        return;
      } else if (response.status === 406) {
        alert('중복된 계정입니다.');
        return;
      } else {
        throw new Error('Unknown Error');
      }
    } catch (e) {
      alert('서버 오류 발생');
      console.error(e);
      return;
    }
  }

  return (
    <>
      <Head>
        <title>회원가입 | KJSP Calendar</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <main className={accountStyle.accountContainer}>
        <article>
          <h2 className={accountStyle.title}>회원가입</h2>
          <div className={accountStyle.welcomeMessageWrapper}>
            <p>환영합니다.</p>
            <p>사용할 계정 정보를 입력해주세요!</p>
          </div>
        </article>
        <form className={accountStyle.accountForm}>
          <div className={accountStyle.inputWrapper}>
            <input
              className={accountStyle.input}
              autoComplete="off"
              type="email"
              name="email"
              id="email"
              placeholder=" "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="email" className={accountStyle.label}>
              이메일
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
            />
            <label htmlFor="password" className={accountStyle.label}>
              비밀번호
            </label>
          </div>
          <div className={accountStyle.inputWrapper}>
            <input
              className={accountStyle.input}
              type="password"
              name="passwordConfirm"
              id="passwordConfirm"
              placeholder=" "
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
            <label htmlFor="passwordConfirm" className={accountStyle.label}>
              비밀번호 확인
            </label>
          </div>
          <div className={accountStyle.inputWrapper}>
            <input
              className={accountStyle.input}
              type="text"
              name="name"
              id="name"
              placeholder=" "
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <label htmlFor="name" className={accountStyle.label}>
              이름
            </label>
          </div>
          <button
            className={accountStyle.submitButton}
            onClick={onSignUpButtonClicked}
          >
            회원가입
          </button>
          <Link href="/login">
            <a className={accountStyle.link}>로그인</a>
          </Link>
        </form>
      </main>
    </>
  );
};

export default SignupPage;
