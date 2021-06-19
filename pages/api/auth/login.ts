import { NextApiRequest, NextApiResponse } from 'next';

const dummyUserData = {
  id: 'test',
  password: '1234q',
  name: '심익현',
  accessToken: 'aaa.bbb.ccc1',
};

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(405);
    return;
  }

  console.log('come in?');

  try {
    if (!req.body.includes(dummyUserData.id)) {
      res.status(401).json({
        data: null,
        success: false,
        message: '아이디를 확인해주세요.',
      });
    } else if (!req.body.includes(dummyUserData.password)) {
      res.status(401).json({
        data: null,
        success: false,
        message: '비밀번호를 확인해주세요.',
      });
    } else {
      res.status(200).json({
        data: {
          accessToken: dummyUserData.accessToken,
        },
        success: true,
        message: '로그인 성공',
      });
    }
  } catch (error) {
    res.status(500).json({
      data: null,
      success: false,
      message: error.message,
    });
  }
};
