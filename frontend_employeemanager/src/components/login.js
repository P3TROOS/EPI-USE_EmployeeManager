// Login.js
import React, { useState } from 'react';
import '../styling/login.css';

const LoginPage = ({ setIsLoggedIn }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Simulating a GET request to fetch user data from an API
        fetch('http://localhost:8080/api/user/getAll')
            .then(response => response.json())
            .then(data => {
                // Check if the email and password match any user in the received data
                const foundUser = data.find(user => user.email === email && user.password === password);
                if (foundUser) {
                    setIsLoggedIn(true);
                } else {
                    alert('Invalid email or password');
                }
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
                alert('An error occurred while trying to log in');
            });
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button className="btn-login" onClick={handleLogin}>
                Login
            </button>
        </div>
    );
};

export default LoginPage;
