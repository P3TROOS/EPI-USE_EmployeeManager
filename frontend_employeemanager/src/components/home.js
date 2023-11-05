// Home.js
import React, { useState, useEffect } from 'react';
import LoginPage from './login';
import CreateEmployee from './createEmployee';

const Home = () => {
    const [users, setUsers] = useState([]);
    const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        return localStorage.getItem('isLoggedIn') === 'true';
    });

    useEffect(() => {
        // Fetch users from the API endpoint when the component mounts
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        // Fetch all users from database via api endpoint
        fetch('http://localhost:8080/api/user/getAll')
            .then(response => response.json())
            .then(data => {
                setUsers(data);
            })
            .catch(error => {
                // Handle error
                console.error('Error fetching user data:', error);
            });
    };

    const handleDelete = (employeeNumber) => {
        // Delete user from database via api endpoint
        const deleteUser = {employeeNumber}
        fetch(`http://localhost:8080/api/user/delete/` + employeeNumber, {
            method: 'POST',
            body: JSON.stringify(deleteUser),
        })
            .then(response => {
                if (response.ok) {
                    // Refresh user list
                    fetchUsers();
                } else {
                    throw new Error('Failed to delete');
                }
            })
            .catch(error => {
                // Handle error
                console.error('Error deleting user:', error);
            });
    };

    const handleEdit = (userId) => {
        // Implement the edit functionality
        console.log(`Editing user with ID ${userId}`);
    };

    const handleCreateUser = () => {
        setIsCreateUserOpen(true);
        console.log('Creating a new user');
    };

    const handleLogout = () => {
        localStorage.setItem('isLoggedIn', 'false');
        setIsLoggedIn(false);
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
                                {user.employeeNumber} : {user.name} {user.surname}
                                <div>
                                    <button className="btn btn-sm btn-danger me-2" onClick={() => handleDelete(user.employeeNumber)}>
                                        Delete
                                    </button>
                                    <button className="btn btn-sm btn-secondary" onClick={() => handleEdit(user.employeeNumber)}>
                                        Edit
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <button className="btn btn-primary mt-3" onClick={handleCreateUser}>
                        Create User
                    </button>
                    {isCreateUserOpen && <CreateEmployee closeModal={() => setIsCreateUserOpen(false)} refreshUsers={fetchUsers} />}
                </div>
            ) : (
                <LoginPage setIsLoggedIn={setIsLoggedIn} />
            )}
        </div>
    );
};

export default Home;
