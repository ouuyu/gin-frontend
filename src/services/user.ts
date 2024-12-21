import alovaInstance from './api';

interface LoginResponse {
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

interface RegisterResponse {
  message: string;
  success: boolean;
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
    const message = error.message || '网络错误，请稍后重试';
    throw new Error(message);
  }
};

export const register = async (username: string, password: string) => {
  try {
    const response = await alovaInstance.Post<RegisterResponse>('/user/register', {
      username,
      password
    });
    
    if (response.success) {
      return response.message;
    }
    throw new Error(response.message || '注册失败');
  } catch (error: any) {
    const message = error.message || '网络错误，请稍后重试';
    throw new Error(message);
  }
};
