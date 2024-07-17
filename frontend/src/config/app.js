import {routes} from "@config/routes.js";

const config = {
    appName: 'DriveMe',

    PATH_HOME: '/',
    PATH_AFTER_LOGIN: '/',
    PATH_AFTER_REGISTER: '/',
    PATH_AFTER_LOGOUT: '/',
    PATH_UNAUTHORIZED: routes.login,
};

export default config;