// src/services/authService.js
import axios from 'axios';
const API_URL = 'https://token-z.com/api/users/';



const register = (username, phone, password) => {
  return axios.post(API_URL + 'signup', {
    username,
    phone,
    password,
  }).then((response) => {
    if (response.data.accessToken) {
      // Cache the token and user data
      const cacheData = {
        token: response.data.accessToken,
        user: {
          phone: response.data.user.phone,
         
        },
      };
        localStorage.setItem('user', JSON.stringify(cacheData));
     }
    return response.data;
  })
   .catch((error) => {
        console.error('Error during login:', error);
        throw error; // Re-throw the error to be caught in handleLogin
    });
};

const login = async (phone, password) => {
    try {
        const response = await axios.post(API_URL + 'login-user', {
            phone,
            password,
        });

        if (response.status === 200 && response.data.token) {
            const cacheData = {
                token: response.data.token,
                user: {
                    username: response.data.user.username,
                    phone: response.data.user.phone,
                    id: response.data.user.id,
                    coins: response.data.user.coins,
                },
            };
            localStorage.setItem('user', JSON.stringify(cacheData));
            return response.data;
        } else {
            throw new Error('Login failed: Invalid response status or missing token');
        }
    } catch (error) {
        console.error('Error during login:', error);
        throw error; // Re-throw the error to be caught in handleLogin
    }
};


const logout = () => {
  localStorage.removeItem('user');
};
const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};
export default {
  register,
  login,
  logout,
  getCurrentUser,
};
