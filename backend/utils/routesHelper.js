export const groupRouters = (router, routes, middleware) => {
    routes.map(routeArray => {
        const [path, entityRouter] = routeArray;

        if (middleware) {
            router.use(path, middleware, entityRouter);
        } else {
            router.use(path, entityRouter);
        }
    });
}