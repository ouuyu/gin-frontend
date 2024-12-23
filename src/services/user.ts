import alovaInstance from './api';
import type { BaseResponse } from './api';

interface LoginResponse extends BaseResponse {
  data: {
    id: number;
    username: string;
    password: string;
    role: number;
    status: number;
    token: string;
    email: string;
    github_id: string;
    verification_code: string;
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
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));
      return response.data;
    }
    throw new Error(response.message || '登录失败');
  } catch (error: any) {
    const message = error.message;
    throw new Error(message);
  }
};

export const register = async (username: string, password: string) => {
  try {
    const response = await alovaInstance.Post<BaseResponse>('/user/register', {
      username,
      password
    });
    
    if (response.success) {
      return response.message;
    }
    throw new Error(response.message || '注册失败');
  } catch (error: any) {
    const message = error.message;
    throw new Error(message);
  }
};

export const getUserList = async (page: number, pageSize: number) => {
  try {
    const response = await alovaInstance.Get<UserListResponse>('/system/users', {
      params: {
        page,
        pageSize
      },
      cacheFor: 0
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
