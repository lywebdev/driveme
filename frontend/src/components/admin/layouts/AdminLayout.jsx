import {NavLink, Outlet} from "react-router-dom";

const AdminLayout = () => {
    return <>
        <nav>
            <ul>
                <li><NavLink to={'/'}>Dashboard</NavLink></li>
                <li><NavLink to={'/'}>Users</NavLink></li>
                <li><NavLink to={'/'}>Settings</NavLink></li>
            </ul>
        </nav>
        <Outlet/>
    </>;
};

export default AdminLayout;