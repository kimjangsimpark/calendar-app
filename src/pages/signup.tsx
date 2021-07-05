import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import accountStyle from '@/styles/account.module.scss';

const SignupPage = () => {
  const [signupForm, setSignupForm] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
    name: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    const nextForm = {
      ...signupForm,
      [name]: value,
    };

    setSignupForm(nextForm);
  };

  const signup = async () => {
    const signupURL = '/api/user/save';
    const stringifyRequestBody = JSON.stringify({
      email: signupForm.email,
      password: signupForm.password,
      name: signupForm.name,
    });
    const fetchOptions = {
      method: 'POST',
      body: stringifyRequestBody,
    };

    const signupResponse = await fetch(signupURL, fetchOptions);
    // const signupResponseJSON = await signupResponse.json();

    if (signupResponse.ok) {
      alert(`${signupForm.name}님 환영합니다! 로그인을 부탁드려요.`);
      Router.push('/login');
    } else if (signupResponse.status === 400) {
      // @todo 중복이메일 스테이터스 코드 처리 혹은 다른 오류 처리 백엔드와 논의 필요
      console.error('회원가입 요청 오류');
    } else {
      console.error('알 수 없는 오류!');
    }
  };

  const handleSubmitButtonClick = (event: React.MouseEvent) => {
    event.preventDefault();
    console.log('formdata', signupForm);

    // @todo validate input
    signup();
  };

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
              onChange={handleChange}
              value={signupForm.email}
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
              onChange={handleChange}
              value={signupForm.password}
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
              onChange={handleChange}
              value={signupForm.passwordConfirm}
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
              onChange={handleChange}
              value={signupForm.name}
            />
            <label htmlFor="name" className={accountStyle.label}>
              이름
            </label>
          </div>
          <button
            className={accountStyle.submitButton}
            onClick={handleSubmitButtonClick}
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
