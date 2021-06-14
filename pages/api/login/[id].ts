import { NextApiRequest, NextApiResponse } from 'next';

const dummyUserData = {
  id: 'test',
  password: '1234',
  name: '심익현',
  accessToken: 'aaa.bbb.ccc',
};

export default (req: NextApiRequest, res: NextApiResponse) => {
  // if (req.method !== 'POST') {
  //   return;
  // }

  const { id, pw } = req.query;

  console.log('login api id', req.query);
  console.log('login api pw', req.query.pw);

  try {
    if (dummyUserData.id === id && dummyUserData.password === pw) {
      res.status(200).json({
        data: dummyUserData,
        success: true,
      });
    } else {
      res.status(401).json({
        data: null,
        success: false,
        message: '회원정보가 없습니다.',
      });
    }
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};
