import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

const client = axios.create({ baseURL: 'http://localhost:4000' });

export const request = <T>({ ...options }: AxiosRequestConfig) => {
  client.defaults.headers.common['Authorization'] = 'Bearer token';

  const onSuccess = (response: AxiosResponse<T>) => response;

  const onError = (error: AxiosError<Error>) => {
    // optionally catch errors and add additional logging here
    throw error;
  };

  return client<T>(options).then(onSuccess).catch(onError);
};
