import Link from "@components/UI/Link/Link.jsx";
import {routes} from "@config/routes.js";
import Button from "@components/UI/Button/Button.jsx";
import $api from "@config/http.js";
import {useState} from "react";
import CategoryList from "@components/admin/components/CategoryList";

const Dashboard = () => {
    const onGetUsersClick = async () => {
        const res = await $api.get('/users');
        setUsers(res.data.data ?? []);
    };

    const [users, setUsers] = useState([]);



    return <div className='dashboard'>
        <h1>Dashboard HomePage</h1>

        <CategoryList />
        <hr/>
        <Button url={routes.exampleAdmin}>Example admin page</Button>
        <hr/>
        <br/>
        <Button onClick={onGetUsersClick}>Get users</Button>
        <hr/>
        <br/>
        {users.map(user => (<div key={user.id}>
            <span>{user.name}</span>
        </div>))}
        <hr/>


        <Link url={routes.home}>Home</Link>
    </div>;
};

export default Dashboard;