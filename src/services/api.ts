import { createAlova } from "alova";
import adapterFetch from "alova/fetch";
import NProgress from 'nprogress';
import { useUserStore } from '../stores/user';
import { ElMessage } from 'element-plus';

export interface BaseResponse {
  message: string;
  success: boolean;
  data: any;
}

const alovaInstance = createAlova({
  baseURL: "http://localhost:3000/api",
  requestAdapter: adapterFetch(),
  responded: {
    onSuccess: async response => {
      const data = await response.json();
      if (response.status === 200 && data.success) {
        return data;
      } else {
        ElMessage.error(data.message)
        throw new Error(data.message)
      }
    },
    onError: error => {
      ElMessage.error(error.message)
      throw error;
    },
    onComplete: () => {
      NProgress.done();
    }
  },
  beforeRequest(method) {
    method.config.headers.Authorization = 'Bearer ' + useUserStore().token
    NProgress.start();
  },
  timeout: 5000,
});

export default alovaInstance;