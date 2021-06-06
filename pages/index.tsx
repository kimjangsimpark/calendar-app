import Layout from '@/components/Layout';
import { useAuthState } from '@/contexts/auth.context';
import { User } from '@/interfaces';

const IndexPage = () => {
  const authState: User = useAuthState();
  // @todo 회원정보가 없으면 로그인 페이지로 리다이렉트

  return (
    <Layout title="Home | KJSP Calendar">
      <main>
        <h1>달력이 들어갈 자리</h1>
      </main>
    </Layout>
  );
};

export default IndexPage;
