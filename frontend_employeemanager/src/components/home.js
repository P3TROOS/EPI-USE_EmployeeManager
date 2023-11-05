// Home.js
import React, { useState } from 'react';
import LoginPage from "./login";

const Home = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [users, setUsers] = useState([
        { id: 1, name: 'User 1' },
        { id: 2, name: 'User 2' },
        // Add more users as needed
    ]);

    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    const handleDelete = (userId) => {
        setUsers(users.filter(user => user.id !== userId));
    };

    const handleEdit = (userId) => {
        // Implement edit functionality
        console.log(`Editing user with ID ${userId}`);
    };

    const handleCreateUser = () => {
        // Implement create user functionality
        console.log('Creating a new user');
    };

    return (
        <div className="container mt-4">
            {isLoggedIn ? (
                <div>
                    <button className="btn btn-danger mb-3" onClick={handleLogout}>
                        Logout
                    </button>
                    <h2>User List</h2>
                    <ul className="list-group">
                        {users.map(user => (
                            <li key={user.id} className="list-group-item d-flex justify-content-between align-items-center">
                                {user.name}
                                <div>
                                    <button className="btn btn-sm btn-danger me-2" onClick={() => handleDelete(user.id)}>Delete</button>
                                    <button className="btn btn-sm btn-secondary" onClick={() => handleEdit(user.id)}>Edit</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <button className="btn btn-primary mt-3" onClick={handleCreateUser}>
                        Create User
                    </button>
                </div>
            ) : (
                <LoginPage setIsLoggedIn={setIsLoggedIn} />
            )}
        </div>
    );
};

export default Home;
