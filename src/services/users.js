import axios from 'axios';
const baseUrl = '/api/users';

let token;

const getToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => {
    return response.data;
  });
};

export default { getAll, getToken };
