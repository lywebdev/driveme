import Link from "@components/UI/Link/Link.jsx";
import {routes} from "@config/routes.js";

const Dashboard = () => {
    return <div className='dashboard' style={{padding: '15px'}}>
        <h1>Dashboard HomePage</h1>

        <br/>
        <Link to='/admin/users'>All users</Link>
        <br/>
        <br/>
        <Link to='/admin/orders'>All orders</Link>
        <br/>

        {/*<hr/>*/}
        {/*<Button url={routes.exampleAdmin}>Example admin page</Button>*/}
        {/*<hr/>*/}
        {/*<br/>*/}
        {/*<Button onClick={onGetUsersClick} style={{marginTop: '10px'}}>Get users</Button>*/}
        {/*{users.map(user => (<div key={user.id}>*/}
        {/*    <span>{user.name}</span>*/}
        {/*</div>))}*/}
        {/*<hr/>*/}


        <hr/>
        <Link to={routes.home}>Home</Link>
    </div>;
};

export default Dashboard;