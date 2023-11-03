import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styling/login.css';

const Login = () => {
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")

    // const handleLogin = (e) => {
    //     e.preventDefault();
    //     // Perform login authentication here
    //     console.log('Username:', username);
    //     console.log('Password:', password);
    //     // You can add your authentication logic here
    // };

    const handleLogin = (e) => {
        e.preventDefault()
        const login = {email, password}
        fetch("http://localhost:8080/api/auth/login", {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(login)
        }).then((response) => {
            console.log(response);
            if (response.ok) {
                response.json().then((data) => {
                    const { access_token } = data;
                    sessionStorage.setItem("accessToken", access_token);
                    console.log("Login successful!");
                    window.location.href = "/home";
                });
            } else {
                window.alert("Incorrect Login Details");
            }
        })
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title text-center">Login</h3>
                            <form onSubmit={handleLogin}>
                                <div className="form-group">
                                    <label htmlFor="username">User Email</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="username"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">User Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary btn-block" onClick={handleLogin}>Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
