import type { Request, Response } from 'express';
import Mock from 'mockjs';

const waitTime = (time: number = 1000) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default {
  'GET /api/system/user/list': async (req: Request, res: Response) => {
    await waitTime();

    res.send({
      code: 20000,
      message: 'success',
      data: Mock.mock({
        'records|10': [
          {
            id: '@id',
            username: '@first',
            realname: '@cname',
            avatar: '@image',
            sex: '@pick([1,2])',
            birthday: '@date',
            phone: '15011221122',
            status: '@pick([1,2,3])',
          },
        ],
        total: 10,
      }),
    });
  },
};
