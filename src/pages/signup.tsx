import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import accountStyle from '@/styles/account.module.scss';

const SignupPage = () => {
  const [signupForm, setSignupForm] = useState({
    id: '',
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

  const printFormData = (event: React.MouseEvent) => {
    event.preventDefault();
    console.log('formdata', signupForm);
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
              name="id"
              id="id"
              placeholder=" "
              onChange={handleChange}
              value={signupForm.id}
            />
            <label htmlFor="id" className={accountStyle.label}>
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
          <button className={accountStyle.submitButton} onClick={printFormData}>
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
