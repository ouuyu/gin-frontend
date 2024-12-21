import { createAlova } from "alova";
import adapterFetch from "alova/fetch";
import NProgress from 'nprogress';

const alovaInstance = createAlova({
  baseURL: "http://localhost:3000/api",
  requestAdapter: adapterFetch(),
  responded: {
    onSuccess: response => {
      NProgress.done();
      return response.json();
    },
    onError: error => {
      NProgress.done();
      throw error;
    }
  },
  beforeRequest(method) {
    method.config.headers.token = localStorage.getItem('token');
    NProgress.start();
  },
});

export default alovaInstance;