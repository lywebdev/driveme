import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import UserService from "../../../services/UserService.js";
import Button from "@components/UI/Button/Button.jsx";

const UserListPage = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await UserService.findAll();
            setUsers(response.data.data);
        };

        fetchUsers();
    }, []);

    // const deleteUser = async (id) => {
    //     if (window.confirm('Are you sure you want to delete this user?')) {
    //         await axios.delete(`/api/users/${id}`);
    //         setUsers(users.filter((user) => user._id !== id));
    //     }
    // };


    return (
        <div style={{padding: '15px'}}>
            <h2 style={{fontWeight:'bold'}}>Users</h2>
            <br/>
            <Link to="/admin/users/create">Create New User</Link>
            <br/>
            <br/>
            <ul>
                {users.map((user) => (
                    <li key={user._id} style={{marginBottom: '5px'}}>
                        {user.name} - {user.email} - <span style={{fontWeight: 'bold'}}>{user.role}</span>
                        {/*<button onClick={() => deleteUser(user._id)} style={{marginLeft: '15px'}}>Delete</button>*/}
                        {/*<Link to={`/admin/users/${user._id}/edit`} style={{marginLeft: '15px'}}>Edit</Link>*/}
                    </li>
                ))}
            </ul>

            <br/>
            <Button url='/admin'>Admin</Button>
        </div>
    );
};

export default UserListPage;
