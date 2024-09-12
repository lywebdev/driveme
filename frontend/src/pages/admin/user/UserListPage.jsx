import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import UserService from "../../../services/UserService.js";

const UserListPage = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await UserService.findAll();
            setUsers(response.data.data);
        };

        fetchUsers();
    }, []);

    const deleteUser = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            await axios.delete(`/api/users/${id}`);
            setUsers(users.filter((user) => user._id !== id));
        }
    };


    return (
        <div>
            <h2>Users</h2>
            <Link to="/admin/users/create">Create New User</Link>
            <ul>
                {users.map((user) => (
                    <li key={user._id}>
                        {user.name} - {user.email} - {user.role}
                        <button onClick={() => deleteUser(user._id)}>Delete</button>
                        <Link to={`/admin/users/${user._id}/edit`}>Edit</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserListPage;
