// UpdateEmployee.js
import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import '../styling/readEmployee.css'

const ReadEmployee = ({ employee, closeModal }) => {
    const [managers, setManagers] = useState([]);
    const [name] = useState(employee.name);
    const [surname] = useState(employee.surname);
    const [birthdate] = useState(employee.birthdate);
    const [salary] = useState(employee.salary);
    const [selectedRole] = useState(employee.role);
    const [selectedManager, setSelectedManager] = useState('');
    const [email] = useState(employee.email);
    const [password] = useState(employee.password);

    useEffect(() => {
        fetchManagers();
        getManager();
    }, []);

    const fetchManagers = () => {
        // Fetch managers from API endpoint for users with manager role
        fetch('http://localhost:8080/api/user/getManagers')
            .then(response => response.json())
            .then(data => setManagers(data))
            .catch(error => console.error('Error fetching managers:', error));
    };

    const getManager = () => {
      managers.forEach(manager => {
          if (manager.employeeNumber.toString() === employee.manager) {
              setSelectedManager(manager.name + ' ' + manager.surname);
          }
      })
    };

    return (
        <div>
            <Modal show={true} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>View User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <label>Name :</label>
                        <input type="text" value={name} readOnly={true} />
                    </div>
                    <div className="form-group">
                        <label>Surname :</label>
                        <input type="text" value={surname} readOnly={true} />
                    </div>
                    <div className="form-group">
                        <label>Birthdate :</label>
                        <input type="text" value={birthdate} readOnly={true} />
                    </div>
                    <div className="form-group">
                        <label>Salary :</label>
                        <input type="text" value={salary} readOnly={true} />
                    </div>
                    <div className="form-group">
                        <label>Role :</label>
                        <input type="text" value={selectedRole} readOnly={true} />
                    </div>
                    <div className="form-group">
                        <label>Reporting Manager :</label>
                        <input type="text" value={selectedManager} readOnly={true} />
                    </div>
                    <div className="form-group">
                        <label>Email :</label>
                        <input type="text" value={email} readOnly={true} />
                    </div>
                    <div className="form-group">
                        <label>Password :</label>
                        <input type="text" value={password} readOnly={true} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ReadEmployee;