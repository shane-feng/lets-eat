const axios = require('axios');
const { SERVER_URL } = require('../config');

const apiService = axios.create({ baseURL: SERVER_URL });

export const signupUser = async (userInfo) => {
  const queryPath = '/users/signup';
  const res = await apiService.post(queryPath, userInfo);
  return res;
};
