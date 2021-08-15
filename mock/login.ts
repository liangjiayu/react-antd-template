import { Request, Response } from 'express';

const waitTime = (time: number = 1000) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

let access = '';

const getAccess = () => {
  return access;
};

export default {
  'POST /api/post/test': async (req: Request, res: Response) => {
    const { flag } = req.body;

    if (flag === 'http_error') {
      return res.status(500).send({
        message: 'http_error',
        code: 9999,
      });
    }

    if (flag === 'biz_error') {
      return res.send({
        message: '业务错误，如订单已经被删除',
        code: 500,
      });
    }

    if (flag === 'success') {
      return res.send({
        message: 'success',
        code: 200,
        data: { list: [] },
      });
    }

    return res.send({
      message: 'success',
      success: true,
      data: req.body,
    });
  },

  'POST /api/user/login': async (req: Request, res: Response) => {
    await waitTime();
    const { password, username, type } = req.body;

    if (password === '123456' && username === 'admin') {
      res.send({
        message: 'success',
        success: true,
      });
      access = 'admin';
      return;
    }

    if (password === '123456' && username === 'user') {
      res.send({
        message: 'success',
        success: true,
      });
      access = 'user';
      return;
    }

    if (type === 'mobile') {
      res.send({
        message: 'success',
        success: true,
      });
      access = 'admin';
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
    if (!getAccess()) {
      res.status(401).send({
        message: '请先登录！',
        success: true,
      });
      return;
    }

    res.send({
      message: 'success',
      success: true,
      data: {
        name: '切图仔',
        avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
        userid: '007',
        email: '123456@qq.com',
        phone: '10086',
        access: getAccess(),
      },
    });
  },
};
