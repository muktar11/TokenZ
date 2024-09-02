// src/services/userService.js
import axios from 'axios';
import authHeader from './authHeader';

const API_URL = 'https://token-z.com/api/users/';

const getUser = (id) => {
  return axios.get(API_URL + id, { headers: authHeader() });
};

export default {
  getUser,
};
