// UpdateEmployee.js
import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';

const UpdateEmployee = ({ employee, closeModal, refreshUsers }) => {
    const [name, setName] = useState(employee.name);
    const [surname, setSurname] = useState(employee.surname);
    const [birthdate, setBirthdate] = useState(employee.birthdate);
    const [salary, setSalary] = useState(employee.salary);
    const [selectedRole, setSelectedRole] = useState(employee.role);
    const [roles] = useState(['Manager', 'Employee', 'CEO']); // Predefined roles
    const [selectedManager, setSelectedManager] = useState(employee.manager);
    const [managers, setManagers] = useState([]);

    useEffect(() => {
        fetchManagers();
    }, []);

    const fetchManagers = () => {
        // Fetch managers from API endpoint for users with manager role
        fetch('http://localhost:8080/api/user/getManagers')
            .then(response => response.json())
            .then(data => setManagers(data))
            .catch(error => console.error('Error fetching managers:', error));
    };

    const handleSubmit = async () => {
        const manager = selectedRole === 'CEO' ? 'none' : selectedManager;

        try {
            const response = await fetch('http://localhost:8080/api/user/update/' + employee.employeeNumber, {
                method: 'PUT',
                body: JSON.stringify({
                    name,
                    surname,
                    birthdate,
                    salary,
                    role: selectedRole,
                    manager: manager
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

    return (
        <div>
            <Modal show={true} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Surname</label>
                        <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Birthdate</label>
                        <input type="date" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Salary</label>
                        <input type="number" value={salary} onChange={(e) => setSalary(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Role</label>
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
                            <label>Reporting Manager</label>
                            <select value={selectedManager} onChange={(e) => setSelectedManager(e.target.value)}>
                                <option value="">Select a manager</option>
                                {managers.map(manager => (
                                    <option key={manager.employeeNumber} value={manager.employeeNumber}>
                                        {manager.name} {manager.surname}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
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
