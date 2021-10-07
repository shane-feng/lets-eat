import axios from 'axios';
import { SERVER_URL } from '../config';
import { getSessionData } from '../utils';

const apiService = axios.create({ baseURL: SERVER_URL });

export const signupUser = async (userInfo) => {
  const queryPath = '/users/signup';
  const res = await apiService.post(queryPath, userInfo);
  return res;
};

export const logoutUser = async () => {
  const { session } = getSessionData();
  const queryPath = '/users/logout';
  const res = await apiService.post(queryPath, {}, { headers: { Authorization: `Bearer ${session.token}` } });
  return res;
};
