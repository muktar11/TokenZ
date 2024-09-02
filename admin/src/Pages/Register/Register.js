import React, { useState } from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';
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

const logout = () => {
  localStorage.removeItem('user');
};

const RegisterAccount = () => {
    const [username, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null); // State for error messages
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.token;

    if (token) {
        navigate('/Dashboard');
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        setErrorMessage(null); // Clear previous error messages
        try {
            await register(username, phone, password);
            navigate('/Dashboard');
        } catch (error) {
            // Handle login failure
            console.error('Register failed:', error);
            setErrorMessage('Invalid phone number or password. Please try again.');
        }
    };

    return (
        <div className='pack'>
            <div className="container">
                <form onSubmit={handleRegister}>
                    <h2>Create Account</h2>
                    <div className="form-container">
                        <label htmlFor="nameInput">Name:</label>
                        <input
                            type="text"
                            id="nameInput"
                            placeholder="Enter your name"
                            value={username}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <label htmlFor="phoneInput">Phone:</label>
                        <input
                            type="text"
                            id="phoneInput"
                            placeholder="Enter your phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />

                        <label htmlFor="passwordInput">Password:</label>
                        <input
                            type="password"
                            id="passwordInput"
                            placeholder="Enter your Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        {errorMessage && <p className="error">{errorMessage}</p>}

                        <button type="submit">Save and Play</button>

                        <div class="login-link-container">
                        <a href="/login">Don't have an account?</a>
                    </div>

                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterAccount;