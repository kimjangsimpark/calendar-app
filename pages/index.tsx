import Layout from '@/components/Layout';
import { useAuthState } from '@/contexts/auth.context';
import { User } from '@/interfaces';

const IndexPage = () => {
  const authState: User = useAuthState();

  return (
    <Layout title="Home | KJSP Calendar">
      <main>
        <h1>Welcome KJSP Calendar 👋🏿</h1>
        {authState.isLoggedIn ? (
          <div>{authState.name}님 반갑습니다!</div>
        ) : (
          <div>로그인해주세요!</div>
        )}
      </main>
    </Layout>
  );
};

export default IndexPage;
