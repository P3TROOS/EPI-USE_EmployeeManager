// CreateUser.js
import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import '../styling/createEmployee.css'

const CreateEmployee = ({ closeModal, refreshUsers }) => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [salary, setSalary] = useState('');
    const [selectedRole, setSelectedRole] = useState('');
    const [rolesWithCeo] = useState(['Manager', 'Employee', 'CEO']);
    const [roles] = useState(['Manager', 'Employee']);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [selectedManager, setSelectedManager] = useState('');
    const [managers, setManagers] = useState([]);
    const [ceoExists, setCeoExists] = useState(false);

    useEffect(() => {
        fetchManagers();
        findCeo();
    }, []);

    const fetchManagers = () => {
        // Fetch managers from API endpoint for users with manager role
        fetch('http://localhost:8080/api/user/getManagers')
          .then(response => response.json())
          .then(data => setManagers(data))
          .catch(error => console.error('Error fetching managers:', error));
    };

    const findCeo = () => {
        managers.forEach(manager => {
            if (manager.role === 'CEO') {
                setCeoExists(true);
            } else {
                setCeoExists(false);
            }
        })
    }

    const handleSubmit = async () => {
        if (!name || !surname || !birthdate || !salary || !selectedRole || !selectedManager || !email || !password) {
            // If any required field is empty, prevent form submission
            alert('Please fill in all required fields.');
            return;
        }
        const manager = selectedRole === 'CEO' ? 'none' : selectedManager;
        try {
            const response = await fetch('http://localhost:8080/api/user/add', {
                method: 'POST',
                body: JSON.stringify({
                    name,
                    surname,
                    birthdate,
                    salary,
                    role: selectedRole,
                    manager: manager,
                    email,
                    password
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                console.log('User created:', data);
                closeModal();
                refreshUsers();
            } else {
                throw new Error('Failed to create user');
            }
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    return (
        <div>
            <Modal show={true} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Create New User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <label>Name :</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Surname :</label>
                        <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Birthdate :</label>
                        <input type="date" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Salary :</label>
                        <input type="number" value={salary} onChange={(e) => setSalary(e.target.value)} required />
                    </div>
                    {ceoExists === true ? (
                        <div className="form-group">
                            <label>Role :</label>
                            <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)} required>
                                <option value="">Select a role</option>
                                {rolesWithCeo.map((role, index) => (
                                    // If CEO does not exist, show all roles
                                    <option key={index} value={role}>
                                        {role}
                                    </option>
                                ))}
                            </select>
                        </div>
                    ) : (
                        <div className="form-group">
                            <label>Role :</label>
                            <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)} required>
                                <option value="">Select a role</option>
                                {roles.map((role, index) => (
                                    // If CEO exists, show all roles except CEO
                                    <option key={index} value={role}>
                                        {role}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                    <div className="form-group">
                        <label>Reporting Manager :</label>
                        <select value={selectedManager} onChange={(e) => setSelectedManager(e.target.value)} required>
                            <option value="">Select a manager</option>
                            {selectedRole === 'Manager' ? (
                                // Display CEOs only when 'Manager' role is selected
                                managers.filter(manager => manager.role === 'CEO').map(manager => (
                                    <option key={manager.employeeNumber} value={manager.employeeNumber}>
                                        {manager.name} {manager.surname}
                                    </option>
                                ))
                            ) : (
                                // Display all managers
                                managers.map(manager => (
                                    <option key={manager.employeeNumber} value={manager.employeeNumber}>
                                        {manager.name} {manager.surname}
                                    </option>
                                ))
                            )}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Email :</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Password :</label>
                        <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default CreateEmployee;
