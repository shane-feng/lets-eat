import axios from 'axios';
import { SERVER_URL } from '../constants';
import { getSessionData } from '../utils';

const apiService = axios.create({ baseURL: SERVER_URL });

export const signupUser = async (userInfo) => {
  const queryPath = '/users/signup';
  const res = await apiService.post(queryPath, userInfo);
  return res;
};

export const loginUser = async (email, password) => {
  const queryPath = '/users/login';
  const res = await apiService.post(queryPath, {
    email,
    password,
  });
  return res;
};

export const logoutUser = async () => {
  const { session } = getSessionData();
  const queryPath = '/users/logout';
  const res = await apiService.post(
    queryPath,
    {},
    {
      headers: {
        Authorization: `Bearer ${session.token}`,
      },
    }
  );
  return res;
};

export const createFood = async (food) => {
  const { session } = getSessionData();
  const res = await apiService.post('/foods', food, {
    headers: {
      Authorization: `Bearer ${session.token}`,
    },
  });
  return res;
};

// fetch all foods
export const getFoods = async () => {
  const { session } = getSessionData();
  const res = await apiService.get('/foods', {
    headers: {
      Authorization: `Bearer ${session.token}`,
    },
  });
  return res;
};

// fetch foods to be eaten today
export const getFoodsToEat = async () => {
  const { session } = getSessionData();
  const date = new Date();
  const res = await apiService.get('/foods', {
    params: { date },
    headers: {
      Authorization: `Bearer ${session.token}`,
    },
  });
  return res;
};

export const updateFood = async ({ _id, name, picture }) => {
  const data = { name, picture };
  const { session } = getSessionData();
  const queryPath = `/foods/${_id}`;
  const res = await apiService.patch(queryPath, data, {
    headers: {
      Authorization: `Bearer ${session.token}`,
    },
  });
  return res;
};

// update food to eat date to today
export const updateFoodToEatDate = async (foodId, date) => {
  const { session } = getSessionData();
  const queryPath = `/foods/${foodId}`;
  const res = await apiService.patch(
    queryPath,
    { dateToEat: date },
    { headers: { Authorization: `Bearer ${session.token}` } }
  );
  return res;
};

export const deleteFood = async (foodId) => {
  const { session } = getSessionData();
  const queryPath = `/foods/${foodId}`;
  const res = await apiService.delete(queryPath, {
    headers: {
      Authorization: `Bearer ${session.token}`,
    },
  });
  return res;
};
