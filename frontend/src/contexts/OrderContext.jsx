import {createContext, useState} from "react";

export const OrderContext = createContext(null);

const OrderContextProvider = ({ children, transport, calculated }) => {
    const [contact, setContact] = useState({
        name: '',
        email: '',
        phone: '',
    });


    const valueObjects = {
        contact,
        setContact,
        transport,
        calculated,
    };


    return <OrderContext.Provider value={valueObjects}>{children}</OrderContext.Provider>;
};


export default OrderContextProvider;