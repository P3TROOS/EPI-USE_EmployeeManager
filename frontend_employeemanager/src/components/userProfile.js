import React, {useEffect, useState} from 'react';
import gravatar from 'gravatar';

const UserProfile = ({ userEmail }) => {
    const gravatarUrl = gravatar.url(userEmail, { s: '200', r: 'pg', d: 'identicon' });
    const [users, setUsers] = useState([]);

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

    return (
        <div>
            <h2>User Profile</h2>
            <img src={gravatarUrl} alt="User Avatar" />
            {users.map(user => {
                if (user.email === userEmail) {
                    return (
                        <h5>User : {user.name} {user.surname}</h5>
                        // <h4>User Surname: {user.surname}</h4>
                    );
                }
            })}
        </div>
    );
};

export default UserProfile;