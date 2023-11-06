// Home.js
import React, { useState, useEffect } from 'react';
import LoginPage from './login';
import CreateEmployee from './createEmployee';
import UpdateEmployee from "./updateEmployee";
import ReadEmployee from "./readEmployee";
import '../styling/home.css';
import UserProfile from './userProfile';

const Home = () => {
    // Variable declarations
    const [users, setUsers] = useState([]);
    const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isUpdateUserOpen, setIsUpdateUserOpen] = useState(false);
    const [isViewUserOpen, setIsViewUserOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [loggedInUserEmail, setLoggedInUserEmail] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        return localStorage.getItem('isLoggedIn') === 'true';
    });

    useEffect(() => {
        // Fetch users from the API endpoint when the component mounts
        fetchUsers();
    }, []);

    // Fetch all users from database via api endpoint
    const fetchUsers = () => {
        fetch('http://localhost:8080/api/user/getAll')
            .then(response => response.json())
            .then(data => {
                // Filter out the 'admin' user from the fetched data
                const filteredUsers = data.filter(user => user.role !== 'Admin');
                setUsers(filteredUsers);
            })
            .catch(error => {
                // Handle error
                console.error('Error fetching user data:', error);
            });
    };

    // Delete user from database via api endpoint
    const handleDelete = (employeeNumber) => {
        const deleteUser = {employeeNumber}
        fetch('http://localhost:8080/api/user/delete/' + employeeNumber, {
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

    // Function to handles the viewing of users
    const handleViewUser = (user) => {
        setSelectedUser(user);
        setIsViewUserOpen(true);
    };

    const handleCloseViewModal = () => {
        setSelectedUser(null);
        setIsViewUserOpen(false);
    };

    // Function to handles the user edits
    const handleEditUser = (user) => {
        setSelectedUser(user);
        setIsUpdateUserOpen(true);
    };

    const handleCloseEditModal = () => {
        setSelectedUser(null);
        setIsUpdateUserOpen(false);
    };

    // Function to handles the user creation
    const handleCreateUser = () => {
        setIsCreateUserOpen(true);
        console.log('Creating a new user');
    };

    // Function to handle the user logout and session management
    const handleLogout = () => {
        localStorage.setItem('isLoggedIn', 'false');
        setIsLoggedIn(false);
    };

    // Function to handle the search term changes
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    // Filter users based on the search term
    const filteredUsers = users.filter((user) => {
        return (
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.surname.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.role.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    return (
        <div className="container mt-4">
            {isLoggedIn ? (
                <div>
                    <button className="btn btn-dark mb-3" onClick={handleLogout}>
                        Logout
                    </button>
                    <UserProfile userEmail={loggedInUserEmail} />
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Search by name, surname or role"
                            value={searchTerm}
                            onChange={handleSearch}
                            style={{ width: '300px' }}
                        />
                    </div>
                    <p className="search-bar">Roles: 'Chief', 'Manager', 'Employee'</p>
                    <h2>User List</h2>
                    <ul className="list-group">
                        {filteredUsers.map((user) => (
                            <li key={user.id} className="list-group-item d-flex justify-content-between align-items-center">
                                {user.employeeNumber} : {user.name} {user.surname}
                                <div>
                                    <button className="btn btn-sm btn-danger me-2" onClick={() => handleDelete(user.employeeNumber)}>
                                        Delete
                                    </button>
                                    <button className="btn btn-sm btn-secondary me-2" onClick={() => handleEditUser(user)}>
                                        Edit
                                    </button>
                                    <button className="btn btn-sm btn-success" onClick={() => handleViewUser(user)}>
                                        View
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <button className="btn btn-primary mt-3" onClick={handleCreateUser}>
                        Create User
                    </button>
                    {isCreateUserOpen && <CreateEmployee closeModal={() => setIsCreateUserOpen(false)} refreshUsers={fetchUsers} />}
                    {isUpdateUserOpen && selectedUser && (
                        <UpdateEmployee
                            employee={selectedUser}
                            closeModal={handleCloseEditModal}
                            refreshUsers={fetchUsers}
                        />
                    )}
                    {isViewUserOpen && selectedUser && (
                        <ReadEmployee
                            employee={selectedUser}
                            closeModal={handleCloseViewModal}
                            refreshUsers={fetchUsers}
                        />
                    )}
                    <br/>
                    <br/>
                    <h2>Tree Hierarchy</h2>
                    <br/>
                    <ul className="tree">
                        {users.map(user => {
                            if (user.role === 'Chief') {
                                return (
                                    <li key={user.employeeNumber}>
                                        |-----> {user.role} : {user.name} {user.surname}
                                        <ul>
                                            {users.map(manager => {
                                                if (manager.manager === user.employeeNumber.toString()) {
                                                    return (
                                                        <li key={manager.employeeNumber}>
                                                            |-----> {manager.role} : {manager.name} {manager.surname}
                                                            <ul>
                                                                {users.map(employee => {
                                                                    if (employee.manager === manager.employeeNumber.toString()) {
                                                                        return (
                                                                            <li key={employee.employeeNumber}>
                                                                                |-----> {employee.role} : {employee.name} {employee.surname}
                                                                            </li>
                                                                        );
                                                                    }
                                                                    return null;
                                                                })}
                                                            </ul>
                                                        </li>
                                                    );
                                                }
                                                return null;
                                            })}
                                        </ul>
                                    </li>
                                );
                            }
                            return null;
                        })}
                    </ul>
                </div>
            ) : (
                <LoginPage setIsLoggedIn={setIsLoggedIn} setLoggedInUserEmail={setLoggedInUserEmail} />
            )}
        </div>
    );
};

export default Home;
