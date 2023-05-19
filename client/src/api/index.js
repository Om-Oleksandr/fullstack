import qs from 'query-string';
import axios from 'axios';

const httpClient = axios.create({
  baseURL: 'http://localhost:3000/api',
});

//user methods

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

export const deleteUser = (idUser) =>
  httpClient.delete(`/users/${idUser}/instance`);

export const postUser = (values) => httpClient.post('/users', values);

export const putUser = (options = {}) => {
  const { idUser, values } = options;
  return httpClient.put(`/users/${idUser}/instance`, values);
};

//group methods

export const postGroup = (values) =>
  httpClient.post('/groups', values, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
export const getGroups = () => httpClient.get('/groups');
export const getGroup = (idGroup) => httpClient.get(`/groups/${idGroup}`);
export const userGroups = (idUser) => httpClient.get(`/groups/users/${idUser}`);

export const addUser = (options = {}) => {
  const { idGroup, idUser, values } = options;
  return httpClient.patch(`/groups/${idGroup}/${idUser}/add`, values);
};

export const removeUser = (options = {}) => {
  const { idGroup, idUser,values } = options;
  return httpClient.patch(`/groups/${idGroup}/${idUser}/remove`, values);
};

export const getAllUserTasks = (idUser) =>
  httpClient.get(`/users/${idUser}/tasks`);

export const postTask = (options = {}) => {
  const { idUser, values } = options;
  // console.log(idUser);
  return httpClient.post(`/users/${idUser}/tasks`, values);
};

export const deleteTask = (options = {}) => {
  const { idUser, idTask } = options;
  // console.log(idUser);
  return httpClient.delete(`/users/${idUser}/tasks/${idTask}`);
};
