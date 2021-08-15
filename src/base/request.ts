/* eslint max-classes-per-file: "off" */
import { notification } from 'antd';
import type { RequestConfig } from 'umi';
import type { RequestOptionsInit, ResponseError } from 'umi-request';

class HttpError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

class BizError extends Error {
  data: any;
  constructor(message: string, data: any) {
    super(message);
    this.name = this.constructor.name;
    this.data = data;
  }
}

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  405: '请求方法不被允许。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 * 请求前拦截器，根据业务做对应的调整，通常放一些固定的参数，可根据url做判断
 */
const addParamsInterceptor = (url: string, options: RequestOptionsInit) => {
  const authHeader = { Authorization: 'Bearer xxxxxx' };
  const fixedParams = {
    bizCode: 100,
  };
  return {
    url: `${url}`,
    options: {
      ...options,
      interceptors: true,
      headers: authHeader,
      params: { ...fixedParams, ...options.params },
    },
  };
};

/**
 * 响应拦截器，根据业务的做调整，定义两种基础错误类型，网络异常、业务异常
 */
const errorResponseInterceptors = async (response: Response) => {
  if (response.status === 200) {
    const data = await response.clone().json();
    // { code:500, message:'xxxx' , data:null } 根据业务的数据结构做调整
    if (data.code === 500) {
      throw new BizError(data.message || 'Biz_Error', data);
    }
    return response;
  }

  throw new HttpError(codeMessage[response.status] || 'Http_Error');
};

/**
 * 统一错误处理，根据异常的name做对应的提示
 */
const errorHandler = (error: ResponseError) => {
  // HTTP 错误
  if (error.name === 'HttpError') {
    notification.error({
      message: 'HTTP 错误',
      description: error.message,
    });
    return Promise.reject(error);
  }

  // 业务错误
  if (error.name === 'BizError') {
    notification.error({
      message: '业务错误',
      description: error.message,
    });
    return Promise.reject(error);
  }

  notification.error({
    message: '其他错误',
    description: error.message,
  });
  return Promise.reject(error);
};

/**
 * @see https://pro.ant.design/zh-CN/docs/request
 */
export const request: RequestConfig = {
  requestInterceptors: [addParamsInterceptor],
  responseInterceptors: [errorResponseInterceptors],
  errorHandler,
};
