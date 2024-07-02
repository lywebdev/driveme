import Header from "@layouts/Header.jsx";
import Footer from "@layouts/Footer.jsx";
import {Outlet} from "react-router-dom";

const Layout = () => (
    <>
        <Header />
        <Outlet />
        <Footer />
    </>
);

export default Layout;