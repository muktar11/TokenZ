import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';



import axios from 'axios';
const API_URL = 'https://token-z.com/api/users/';





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

const LoginAccount = () => {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.token;

    if (token) {
        navigate('/Dashboard');
    }


    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            console.log('phone', phone);
            console.log('password', password);
            await login(phone, password);
            navigate('/Dashboard');
        } catch (error) {
            console.error('Login failed:', error);
            setErrorMessage('Invalid phone number or password. Please try again.');
        }
    };

    return (
        <div className="pack">
            <div className="container">
                <form onSubmit={handleLogin}>
                    <h2>Login</h2>
                    <div className="form-container">
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
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="submit">Login</button>
                    </div>
                    
                   <div class="login-link-container">
                        <a href="/register">Already have an account?</a>
                    </div>

                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                </form>
            </div>
        </div>
    );
};

export default LoginAccount;
