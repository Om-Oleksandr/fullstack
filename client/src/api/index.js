import qs from 'query-string';
import axios from 'axios';

const httpClient = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export const getUsers = (options = {}) => {
  const defaultOptions = {
    limit: 10,
    offset: 0,
  };
  const finalOptions = {
    ...defaultOptions,
    ...options,
  };
  return httpClient.get(`/users?${qs.stringify(finalOptions)}`);
};

export const getUser = (idUser) => httpClient.get(`/users/${idUser}`);

export const postUser = (values) => httpClient.post('/users', values);

export const postGroup = (values) =>
  httpClient.post('/groups', values, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
