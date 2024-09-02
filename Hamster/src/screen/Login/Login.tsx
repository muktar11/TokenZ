import React, { useEffect, useState } from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';

const LoginAccount: React.FC = () => {
    
    const [phone, setPhone] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const cachedUser = localStorage.getItem('user');
        if (cachedUser) {
            navigate('/Exchange');
        }
    }, [navigate]);
    
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            console.log('phone', phone);
            console.log('password', password);
            await authService.login(phone, password);
            navigate('/Exchange');
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
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            </form>
        </div>
        </div>
     
    );
};

export default LoginAccount;
