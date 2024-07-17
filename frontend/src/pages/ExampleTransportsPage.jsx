import React from "react";
import {useExampleTransportsStore} from "@store/useExampleTransportsStore.js";
import {NavLink} from "react-router-dom";
import {routes} from "@config/routes.js";

const ExampleTransportsPage = () => {
    const [transports] = useExampleTransportsStore(state => [
        state.transports,
    ]);

    return (<div>
        <h1>Example transports page</h1>

        {
            transports.map(transport => (
                <React.Fragment key={transport.id}>
                    <div>transport id: {transport.id}</div>
                    <div>transport name: {transport.name}</div>
                </React.Fragment>
            ))
        }

        <NavLink to={routes.home}>Go home</NavLink>
    </div>);
};

export default ExampleTransportsPage;