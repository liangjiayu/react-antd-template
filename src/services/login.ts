import { request } from 'umi';

export async function login(data: any) {
  return request('/api/user/login', {
    method: 'POST',
    data,
  });
}

export async function outLogin(data: any) {
  return request('/api/user/outLogin', {
    method: 'POST',
    data,
  });
}

export async function getUserInfo(params: any) {
  return request('/api/user/getUserInfo', {
    method: 'GET',
    params,
  });
}

export async function getFakeCaptcha(params: any) {
  return request('/api/user/getFakeCaptcha', {
    method: 'GET',
    params,
  });
}
