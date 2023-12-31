import axios from 'axios';
const baseUrl = '/api/blogs';

let token;

const getToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newBlog) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  const request = axios.post(baseUrl, newBlog, config);
  return request.then((response) => response.data);
};

const update = (id, updatedBlog) => {
  const request = axios.put(`${baseUrl}/${id}`, updatedBlog);
  return request.then((response) => response.data);
};

const comment = (id, comment) => {
  const request = axios.post(`${baseUrl}/${id}/comments`, { comment });
  return request.then((response) => response.data);
};

const remove = (id) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  const request = axios.delete(`${baseUrl}/${id}`, config);
  return request.then((response) => response.data);
};

export default { getAll, create, getToken, update, remove, comment };
