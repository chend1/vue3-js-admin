import axios from 'axios';
import { ElMessage } from 'element-plus';

const baseUrl = import.meta.env.MODE === 'development'
  ? '/api'
  : import.meta.env.VITE_BASE_URL;

const request = axios.create({
  baseURL: baseUrl,
  timeout: 35000,
});
// 请求前拦截
request.interceptors.request.use((config) => config);
// 请求成功拦截
const successCallback = (response) => {
  const {
    message, code, data, result,
  } = response.data;
  if (result) {
    return data;
  }
  ElMessage.error(`错误码${code}，${message}`);
  return Promise.reject(response);
};

// 请求失败拦截
const errorCallback = (error) => {
  ElMessage.error(error.message);
};
request.interceptors.response.use(successCallback, errorCallback);
export default request;
