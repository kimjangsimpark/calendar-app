import { NextApiRequest, NextApiResponse } from 'next';

const dummyUserData = [
  {
    id: 'test',
    password: '1234',
    name: '심익현',
    accessToken: 'aaa.bbb.ccc1',
  },
  {
    id: 'kim',
    password: '1234',
    name: '김두창',
    accessToken: 'aaa.bbb.ccc3',
  },
  {
    id: 'jang',
    password: '1234',
    name: '장수영',
    accessToken: 'aaa.bbb.ccc2',
  },
];

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { accessToken } = req.query;

  try {
    const findResult = dummyUserData.find(
      (user) => user.accessToken === accessToken,
    );

    if (findResult) {
      res.status(200).json({
        data: findResult,
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
