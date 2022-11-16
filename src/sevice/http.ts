import axios, { AxiosInstance } from 'axios';

export const http: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 10_0000,
  headers: {
    'Content-Type': 'application/json',
  },
});

http.interceptors.response.use(res => {
  if (res.status === 200 || res.status === 201) return res.data;
  return res;
});
