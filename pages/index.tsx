import Layout from '@/components/Layout';
import Link from 'next/link';

const IndexPage = () => {
  return (
    <Layout title="Home | KJSP Calendar">
      <main>
        <h1>달력이 들어갈 자리</h1>

        <Link href="/login">
          <a>
            <button>LOGIN</button>
          </a>
        </Link>
      </main>
    </Layout>
  );
};

export default IndexPage;
