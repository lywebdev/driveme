import {createContext, useState} from "react";

export const OrderContext = createContext(null);

const OrderContextProvider = ({ children }) => {
    const [contact, setContact] = useState({
        name: '',
        email: '',
        phone: '',
    });

    const [billing, setBilling] = useState({
        cardNumber: '',
        expirationDate: '',
        cvv: '',

        country: '',
        city: '',
        address: '',
    });


    const valueObjects = {
        contact,
        setContact,

        billing,
        setBilling,
    };


    return <OrderContext.Provider value={valueObjects}>{children}</OrderContext.Provider>;
};


export default OrderContextProvider;