import Layout from '@/components/Layout';

const LoginPage = () => (
  <Layout title="calendar - 로그인">
    <section>
      <div>Login</div>
      <form>
        <input type="text" name="id" id="id" />
        <input type="password" name="password" id="password" />
      </form>
    </section>
  </Layout>
);

export default LoginPage;
