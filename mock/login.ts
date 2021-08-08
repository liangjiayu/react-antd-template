import { Request, Response } from 'express';

const waitTime = (time: number = 1000) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default {
  'POST /api/user/login': async (req: Request, res: Response) => {
    await waitTime();
    const { password, username, type } = req.body;

    if (password === '123456' && username === 'admin') {
      res.send({
        message: 'success',
        success: true,
      });
      return;
    }

    if (password === '123456' && username === 'user') {
      res.send({
        message: 'success',
        success: true,
      });
      return;
    }

    if (type === 'mobile') {
      res.send({
        message: 'success',
        success: true,
      });
      return;
    }

    res.status(500).send({
      message: 'error',
      success: false,
    });
  },

  'POST /api/user/outLogin': async (req: Request, res: Response) => {
    res.send({
      message: 'success',
      success: true,
    });
  },

  'GET /api/user/getFakeCaptcha': async (req: Request, res: Response) => {
    res.send({
      message: 'success',
      success: true,
    });
  },

  'GET /api/user/getUserInfo': async (req: Request, res: Response) => {
    res.send({
      message: 'success',
      success: true,
      data: {
        name: '切图仔',
        avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
        userid: '007',
        email: '123456@qq.com',
        phone: '10086',
      },
    });
  },
};
