// Home.js
import React, { useState, useEffect } from 'react';
import LoginPage from './login';
import CreateEmployee from './createEmployee';
import UpdateEmployee from "./updateEmployee";
import '../styling/home.css';
import * as d3 from 'd3';

const Home = () => {
    const [users, setUsers] = useState([]);
    const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isUpdateUserOpen, setIsUpdateUserOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
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
                setUsers(data)
            })
            .catch(error => {
                // Handle error
                console.error('Error fetching user data:', error);
            });
    };

    const handleDelete = (employeeNumber) => {
        // Delete user from database via api endpoint
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

    const handleEditUser = (user) => {
        setSelectedUser(user);
        setIsUpdateUserOpen(true);
    };

    const handleCloseEditModal = () => {
        setSelectedUser(null);
        setIsUpdateUserOpen(false);
    };

    const handleCreateUser = () => {
        setIsCreateUserOpen(true);
        console.log('Creating a new user');
    };

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
        // Filter by name or surname based on the search term
        return (
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.surname.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    const drawGraph = () => {
        fetch('http://localhost:8080/api/user/getAll') // Replace with your actual API endpoint
            .then(response => response.json())
            .then(data => {
                const userMap = {};

                data.forEach(user => {
                    userMap[user.employeeNumber.toString()] = user;
                });

                let hierarchyData;
                data.forEach(user => {
                    if (user.role === 'CEO') {
                        hierarchyData = { name: `${user.name}`, children: [] };
                    }
                })
                //let managerData = userMap;
                let level1 = {};
                let level2;
                let level3;

                // Find CEO, Level 1
                data.forEach(user => {
                    // const manager = user.manager;
                    // const ceo = user.role;
                    // const name = user.name;
                    // if (ceo === 'CEO' || name === 'Admin') {
                    //     managerData = userMap[manager];
                    //     if (managerData) {
                    //         if (!managerData.children) {
                    //             managerData.children = [];
                    //         }
                    //         managerData.children.push({ name: user.name });
                    //         console.log(managerData);
                    //     }
                    // } else {
                    //     hierarchyData.children.push({ name: user.name });
                    // }
                    if (user.role === 'CEO' || user.name === 'Admin') {
                        level1.push(user);
                    } else {
                        console.log("No CEO");
                    }
                });

                // Find CEO as manager, Level 2
                data.forEach(user => {
                    if (parseInt(user.manager) === level1[0].employeeNumber) {
                        level1.children.push(user);
                    }
                });
                console.log(level1)

                const width = 900;
                const height = 600;

                const svg = d3.select('#org-chart').append('svg')
                    .attr('width', width)
                    .attr('height', height)
                    .append('g')
                    .attr('transform', 'translate(20,20)');

                const treeLayout = d3.tree().size([width - 40, height - 40]);

                const root = d3.hierarchy(level1);
                const treeData = treeLayout(root);

                const linkGenerator = d3.linkVertical()
                    .x(d => d.x)
                    .y(d => d.y);

                svg.selectAll('.link')
                    .data(treeData.links())
                    .enter()
                    .append('path')
                    .attr('class', 'link')
                    .attr('d', d => linkGenerator(d));

                const nodesGroup = svg.selectAll('.node')
                    .data(treeData.descendants())
                    .enter()
                    .append('g')
                    .attr('class', 'node')
                    .attr('transform', d => `translate(${d.x},${d.y})`);

                nodesGroup.append('circle')
                    .attr('r', 5);

                nodesGroup.append('text')
                    .attr('dy', '0.31em')
                    .style('text-anchor', 'middle')
                    .text(d => d.data.name);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    };

    // Function to recursively generate the tree structure
    // const generateTree = (managerId, level) => {
    //     const subordinates = users.filter(user => user.manager === managerId);
    //
    //     if (subordinates.length === 0) {
    //         return null;
    //     }
    //
    //     return (
    //         <ul>
    //             {subordinates.map(subordinate => (
    //                 <li key={subordinate.employeeNumber}>
    //                     {subordinate.name} ({subordinate.role})
    //                     {generateTree(subordinate.employeeNumber, level + 1)}
    //                 </li>
    //             ))}
    //         </ul>
    //     );
    // };
    //
    // const ceos = users.filter(user => user.role === "CEO");

    return (
        <div className="container mt-4">
            {isLoggedIn ? (
                <div>
                    <button className="btn btn-danger mb-3" onClick={handleLogout}>
                        Logout
                    </button>
                    <div className="search-bar"> {/* Added a CSS class to style the search bar */}
                        <input
                            type="text"
                            placeholder="Search by name or surname"
                            value={searchTerm}
                            onChange={handleSearch}
                            style={{ width: '300px' }} // Adjust the width of the search bar
                        />
                    </div>
                    <h2>User List</h2>
                    <ul className="list-group">
                        {filteredUsers.map((user) => (
                            <li key={user.id} className="list-group-item d-flex justify-content-between align-items-center">
                                {user.employeeNumber} : {user.name} {user.surname}
                                <div>
                                    <button className="btn btn-sm btn-danger me-2" onClick={() => handleDelete(user.employeeNumber)}>
                                        Delete
                                    </button>
                                    <button className="btn btn-sm btn-secondary" onClick={() => handleEditUser(user)}>
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
                    {isUpdateUserOpen && selectedUser && (
                        <UpdateEmployee
                            employee={selectedUser}
                            closeModal={handleCloseEditModal}
                            refreshUsers={fetchUsers}
                        />
                    )}
                    <br/>
                    <br/>
                    <h2>Tree Hierarchy</h2>
                    <br/>
                    <ul className="tree">
                        {users.map(user => {
                            if (user.role === 'CEO') {
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
                <LoginPage setIsLoggedIn={setIsLoggedIn} />
            )}
        </div>
    );
};

export default Home;
