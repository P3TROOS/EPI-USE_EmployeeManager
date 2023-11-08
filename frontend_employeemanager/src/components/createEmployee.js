// CreateUser.js
import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import '../styling/createEmployee.css'

const CreateEmployee = ({ closeModal, refreshUsers }) => {
    // Variable declarations
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [salary, setSalary] = useState('');
    const [selectedRole, setSelectedRole] = useState('');
    const [roles] = useState(['Manager', 'Employee', 'Chief']);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [selectedManager, setSelectedManager] = useState('');
    const [managers, setManagers] = useState([]);
    const [ceoExists, setCeoExists] = useState(false);

    useEffect(() => {
        // Fetch users from the API endpoint when the component mounts
        fetchManagers();
    }, []);

    const fetchManagers = () => {
        // Fetch managers from API endpoint for users with manager role
        fetch('http://ec2-16-171-54-80.eu-north-1.compute.amazonaws.com:8080/api/user/getManagers')
          .then(response => response.json())
          .then(data => setManagers(data))
          .catch(error => console.error('Error fetching managers:', error));
    };

    // Function to handle the submission for adding a new user. This sends the new data to the API endpoint
    const handleSubmit = async () => {
        if (!name || !surname || !birthDate || !salary || !selectedRole || !selectedManager || !email || !password) {
            // If any required field is empty, prevent form submission
            alert('Please fill in all required fields.');
            return;
        }
        const manager = selectedRole === 'CEO' ? 'none' : selectedManager;
        const date = new Date(birthDate);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const formattedBirthdate = `${year}-${month}-${day}`;
        console.log(formattedBirthdate);
        try {
            const response = await fetch('http://ec2-16-171-54-80.eu-north-1.compute.amazonaws.com:8080/api/user/add', {
                method: 'POST',
                body: JSON.stringify({
                    name,
                    surname,
                    birthDate: formattedBirthdate,
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
                        <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Salary :</label>
                        <input type="number" value={salary} onChange={(e) => setSalary(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Role :</label>
                        <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)} required>
                            <option value="">Select a role</option>
                            {roles.map((role, index) => (
                                <option key={index} value={role}>
                                    {role}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Reporting Manager :</label>
                        <select value={selectedManager} onChange={(e) => setSelectedManager(e.target.value)} required>
                            <option value="">Select a manager</option>
                            {selectedRole === 'Manager' ? (
                                // Display only 'Chiefs' when 'Manager' role is selected
                                managers.filter(manager => manager.role === 'Chief').map(manager => (
                                    <option key={manager.employeeNumber} value={manager.employeeNumber}>
                                        {manager.name} {manager.surname}
                                    </option>
                                ))
                            ) : (
                                selectedRole === 'Chief' ? (
                                    // Show 'None' only when 'Chief' role is selected
                                    <option value="none">None</option>
                                ) : (
                                    managers.map(manager => (
                                        <option key={manager.employeeNumber} value={manager.employeeNumber}>
                                            {manager.name} {manager.surname}
                                        </option>
                                    ))
                                )
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
