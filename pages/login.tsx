import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import Link from 'next/link';
import loginStyle from '@/styles/login.module.scss';

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

  const handleLoginButtonClick = (event: React.MouseEvent) => {
    event.preventDefault();
    if (loginForm.id.length <= 0) {
      alert('아이디를 입력해주세요');
      return;
    }

    if (loginForm.password.length <= 0) {
      alert('비밀번호를 입력해주세요');
      return;
    }
  };

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
    </Layout>
  );
};

export default LoginPage;
