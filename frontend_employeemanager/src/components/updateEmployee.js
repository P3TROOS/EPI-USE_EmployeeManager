// UpdateEmployee.js
import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import '../styling/updateEmployee.css';

const UpdateEmployee = ({ employee, closeModal, refreshUsers }) => {
    // Variable declarations
    const [name, setName] = useState(employee.name);
    const [surname, setSurname] = useState(employee.surname);
    const [birthDate, setBirthDate] = useState(employee.birthDate);
    const [salary, setSalary] = useState(employee.salary);
    const [selectedRole, setSelectedRole] = useState(employee.role);
    const [roles] = useState(['Manager', 'Employee', 'Chief']);
    const [selectedManager, setSelectedManager] = useState(employee.manager);
    const [email, setEmail] = useState(employee.email);
    const [password, setPassword] = useState(employee.password);
    const [managers, setManagers] = useState([]);

    useEffect(() => {
        // Fetch users from the API endpoint when the component mounts
        fetchManagers();
    }, []);

    const fetchManagers = () => {
        // Fetch managers from API endpoint for users with manager role
        fetch('http://localhost:8080/api/user/getManagers')
            .then(response => response.json())
            .then(data => setManagers(data))
            .catch(error => console.error('Error fetching managers:', error));
    };

    // Function to handle the submission for updating a user. This sends the modified data to the API endpoint
    const handleSubmit = async () => {
        if (!name || !surname || !birthDate || !salary || !selectedRole || !selectedManager || !email || !password) {
            // If any required field is empty, prevent form submission
            alert('Please fill in all required fields.');
            return;
        }
        const manager = selectedRole === 'CEO' ? 'none' : selectedManager;
        const formattedBirthdate = new Date(birthDate).toISOString().split('T')[0];
        try {
            const response = await fetch('http://localhost:8080/api/user/update/' + employee.employeeNumber, {
                method: 'PUT',
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
                console.log('User edited:', data);
                closeModal();
                refreshUsers(); // Refresh the user list
            } else {
                throw new Error('Failed to edit user');
            }
        } catch (error) {
            console.error('Error editing user:', error);
        }
    };

    const filterUserFromManagers = () => {
        return managers.filter(manager => manager.employeeNumber !== employee.employeeNumber);
    };

    return (
        <div>
            <Modal show={true} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <label>Name :</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Surname :</label>
                        <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Birthdate :</label>
                        <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Salary :</label>
                        <input type="number" value={salary} onChange={(e) => setSalary(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Role :</label>
                        <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
                            <option value="">Select a role</option>
                            {roles.map((role, index) => (
                                <option key={index} value={role}>
                                    {role}
                                </option>
                            ))}
                        </select>
                    </div>
                    {selectedRole !== 'CEO' && (
                        <div className="form-group">
                            <label>Reporting Manager :</label>
                            <select value={selectedManager} onChange={(e) => setSelectedManager(e.target.value)}>
                                <option value="">Select a manager</option>
                                {selectedRole === 'Manager' ? (
                                    // Display only 'Chiefs' when 'Manager' role is selected
                                    managers
                                        .filter(manager => manager.role === 'Chief' && manager.employeeNumber !== employee.employeeNumber)
                                        .map(manager => (
                                            <option key={manager.employeeNumber} value={manager.employeeNumber}>
                                                {manager.name} {manager.surname}
                                            </option>
                                        ))
                                ) : (
                                    selectedRole === 'Chief' ? (
                                        // Show 'None' only when 'Chief' role is selected
                                        <option value="none">None</option>
                                    ) : (
                                        filterUserFromManagers()
                                            .filter(manager => manager.employeeNumber !== employee.employeeNumber)
                                            .map(manager => (
                                                <option key={manager.employeeNumber} value={manager.employeeNumber}>
                                                    {manager.name} {manager.surname}
                                                </option>
                                            ))
                                    )
                                )}
                            </select>
                        </div>
                    )}
                    <div className="form-group">
                        <label>Email :</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Password :</label>
                        <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
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

export default UpdateEmployee;
