import Loading from '@/components/Loading';

const Ui = () => {
  return (
    <>
      <div>UI 테스트 페이지 입니다.</div>
      <button
        onClick={() => {
          console.log('cclclclc');
        }}
      >
        aaa
      </button>
      <Loading />
    </>
  );
};

export default Ui;
