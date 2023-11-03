import React, {useEffect, useState} from 'react';
import '../../styling/CreateUserPopup.css';

export const CreateEmployee = ({popupOpen, popupClose, onUserAdded}) => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [employeeNumber, setEmployeeNumber] = useState('');
    const [salary, setSalary] = useState('');
    const [selectedRole, setSelectedRole] = useState('Select Role');
    const [managerNames, setManagerNames] = useState('')
    const [selectedManager, setSelectedManager] = useState('Select Manager');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const emailRegex = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
    const [errMsg, setErrMsg] = useState("");

    const handleRoleSelect = (role) => {
        // Update state with the selected role
        setSelectedRole(role);
    };

    const useHandleClick = (e) => {
        e.preventDefault();
        if (document.getElementById("nameInput").value === '' || document.getElementById("surnameInput").value === '' || document.getElementById("emailInput").value === '' || selectedRole === '') {
            setErrMsg("Please ensure that all fields are completed.");
            return;
        } else if (!emailRegex.test(email)) {
            setErrMsg("Invalid email format");
            return;
        }
        popupClose();
        const user = {name, surname, email, password, role: {role_name: selectedRole}};
        console.log(user);
        fetch("http://localhost:8080/api/user/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + sessionStorage.getItem('accessToken'),
            },
            body: JSON.stringify(user),
        }).then((response) => {
            if (response.ok) {
                console.log("New User added");
                onUserAdded();
            }
        }).catch((error) => {
            console.error("Error adding new user:", error);
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/randPass/generate", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + sessionStorage.getItem('accessToken')
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    const randomP = data.password.toString();
                    setPassword(randomP);
                } else {
                    console.error('Error fetching string from the server.');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        fetch("http://localhost:8080/api/user/getManagerNames", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + sessionStorage.getItem('accessToken')
            },
        }).then((res) => res.json())
            .then((result) => {
                setManagerNames(result);
            });
    }, []);

    return (
        <Modal show={popupOpen} onHide={popupClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Create User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Surname</label>
                        <input
                            type="text"
                            className="form-control"
                            value={surnameame}
                            onChange={(e) => setSurname(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Birth Day</label>
                        <input
                            type="text"
                            className="form-control"
                            value={birthDate}
                            onChange={(e) => setBirthDate(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Employee Number</label>
                        <input
                            type="text"
                            className="form-control"
                            value={employeeNumber}
                            onChange={(e) => setEmployeeNumber(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Salary</label>
                        <input
                            type="text"
                            className="form-control"
                            value={salary}
                            onChange={(e) => setSalary(e.target.value)}
                            required
                        />
                    </div>
                    <p className="createUserRoleLabel">User Role</p>
                    <Dropdown>
                        <Dropdown.Toggle variant="primary" id="roleDropdown">
                            Select Role
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => handleRoleSelect('Admin')}>Admin</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleRoleSelect('Manager')}>Manager</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleRoleSelect('Employee')}>Employee</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleRoleSelect('Customer')}>CEO</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <p className="createUserRoleLabel">Reporting Line Manager</p>
                    {managerNames && managerNames.length > 0 ? (
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                Select Reporting Line Manager
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {managerNames.map((managerName) => (
                                    <Dropdown.Item
                                        key={managerName}
                                        onClick={() => setSelectedRole(managerName)}
                                    >
                                        {managerName}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                    ) : (
                        <p className="createUserLoadTitle">Loading...</p>
                    )}
                    <p className="createUserError">{errMsg}</p>
                    <button className="btn btn-primary" onClick={useHandleClick}>
                        Submit
                    </button>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default CreateEmployee;