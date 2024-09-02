import React, { useState, useEffect } from 'react';
import './style.css'
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';


const RegisterAccount: React.FC = () => {
    const [username, setName] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null); // State for error messages
    const navigate = useNavigate();

     useEffect(() => {
        const cachedUser = localStorage.getItem('user');
        if (cachedUser) {
            navigate('/Exchange');
        }
    }, [navigate]);

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMessage(null); // Clear previous error messages
        try {
            await authService.register(username, phone, password);
            navigate('/Exchange');
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

                 <label htmlFor="nameInput">Phone:</label>
                <input
                    type="text"
                    id="phoneInput"
                    placeholder="Enter your phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />

                 <label htmlFor="nameInput">Password:</label>
                <input
                    type="password"
                    id="nameInput"
                    placeholder="Enter your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

          

                <button>Save and Play</button>

            <label htmlFor="nameInput">already have an account? <a href="/login">login</a> </label>


            </div>
               </form>
        </div>
        </div>
   
    );
};

export default RegisterAccount;
