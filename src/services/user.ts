import alovaInstance from './api';
import type { BaseResponse } from './api';
import { useUserStore } from '../stores/user';

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
    const response = await alovaInstance.Get<UserListResponse>('/system/user/list', {
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

export const updateUser = async (user: any) => {
  try {
    const response = await alovaInstance.Post<BaseResponse>('/system/user/update', user);
    if (response.success) {
      return response.message;
    }
    throw new Error(response.message || '更新用户失败');
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const deleteUser = async (id: number) => {
  try {
    const response = await alovaInstance.Post<BaseResponse>('/system/user/delete', { id });
    if (response.success) {
      return response.message;
    }
    throw new Error(response.message || '删除用户失败');
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const resetUserPassword = async (id?: number, password?: string) => {
  try {
    id = id || useUserStore().userInfo.id
    password = password || '123456'

    const response = await alovaInstance.Get<BaseResponse>('/user/reset', {
      params: {
        id,
        password
      }
    });

    if (response.success) {
      return response.message;
    }
    throw new Error(response.message || '重置密码失败');
  } catch (error: any) {
    throw new Error(error.message);
  }
};
