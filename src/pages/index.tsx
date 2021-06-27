import Layout from '@/components/Layout';
import { useRouter } from 'next/router';

const IndexPage = () => {
  const router = useRouter();

  const handleLogoutButtonClick = () => {
    localStorage.removeItem('accessToken');

    router.reload();
  };
  return (
    <Layout title="Home | KJSP Calendar">
      <main>
        <h1>달력이 들어갈 자리</h1>
        <h2>로그인한 사용자만 볼 수 있는 화면이다.</h2>
        <br />
        <hr />
        <br />
        <button onClick={handleLogoutButtonClick}>LOGOUT</button>
      </main>
    </Layout>
  );
};

export default IndexPage;
