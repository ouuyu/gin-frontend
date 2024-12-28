import alovaInstance from './api';
import type { BaseResponse } from './api';
import { useUserStore } from '@/stores/user';
import type { Group } from './group';


export interface User {
  id: number;
  username: string;
  password?: string;
  role: number;
  status: number;
  token?: string;
  email?: string;
  github_id?: string;
  group_id?: number;
  group?: Group;
}

interface LoginResponse extends BaseResponse {
  data: {
    user: User;
    token: string;
  };
  message: string;
  success: boolean;
}

interface UserListResponse extends BaseResponse {
  data: {
    list: [];
    total: number;
  };
}

export const login = async (username: string, password: string) => {
  try {
    const response = await alovaInstance.Post<LoginResponse>('/user/login', {
      username,
      password,
    });
    
    if (response.success) {
      localStorage.setItem('token', response.data.token || '');
      localStorage.setItem('user', JSON.stringify(response.data));
      return response.data;
    }
    throw new Error(response.message || '登录失败');
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const register = async (username: string, password: string) => {
  const response = await alovaInstance.Post<BaseResponse>('/user/register', {
    username,
    password
  });
  return response.data
};

export const getUserList = async (page: number, pageSize: number) => {
  const response = await alovaInstance.Get<UserListResponse>('/system/user/list', {
    params: {
      page,
      pageSize
    },
    cacheFor: 0
  });
  return response.data;
};

export const updateUser = async (user: any) => {
  const response = await alovaInstance.Post<BaseResponse>('/system/user/update', user)
  return response.data
};

export const deleteUser = async (id: number) => {
  const response = await alovaInstance.Delete<BaseResponse>('/system/user/delete/' + id)
  return response.data
};

export const createUser = async (user: any) => {
  const response = await alovaInstance.Post<BaseResponse>('/system/user/create', user)
  return response.data
}

export const resetUserPassword = async (id?: number, password?: string) => {
  id = id || useUserStore().userInfo.id
  password = password || '123456'

  const response = await alovaInstance.Get<BaseResponse>('/user/reset', {
    params: {
      id,
      password
    }
  });
  return response.data
};

export const getUserInfo = async () => {
  const response = await alovaInstance.Get<BaseResponse>('/user/info')
  return response.data
}
