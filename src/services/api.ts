import { createAlova } from "alova";
import adapterFetch from "alova/fetch";

const alovaInstance = createAlova({
  baseURL: "http://localhost:3000/api",
  requestAdapter: adapterFetch(),
  responded: response => response.json(),
  beforeRequest(method) {
    method.config.headers.token = localStorage.getItem('token');
  }
});

export default alovaInstance;