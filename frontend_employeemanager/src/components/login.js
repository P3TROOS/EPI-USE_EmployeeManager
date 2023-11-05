// Login.js
import React, { useState } from 'react';

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
        <div className="text-center">
            <h2>Login</h2>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button className="btn btn-primary" onClick={handleLogin}>
                Login
            </button>
        </div>
    );
};

export default LoginPage;
