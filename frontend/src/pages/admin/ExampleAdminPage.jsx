import {routes} from "@config/routes.js";
import Button from "@components/UI/Button/Button.jsx";
import Dashboard from "./Dashboard";

const ExampleAdminPage = () => {
    return <div>
        example admin
        <Dashboard />
        <Button url={routes.dashboard}>Go to dashboard</Button>
        <Button url={routes.home}>Go to home</Button>
    </div>;
};

export default ExampleAdminPage;