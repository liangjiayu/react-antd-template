import { request } from 'umi';

export async function getUserList(params: any) {
  return request('/api/system/user/list', { method: 'GET', params });
}
