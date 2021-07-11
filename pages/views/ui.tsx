import { NextPage } from 'next';
import * as React from 'react';

const Ui: NextPage = () => {
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
    </>
  );
};

export default Ui;
