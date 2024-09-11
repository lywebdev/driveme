import {useContext} from "react";
import {OrderContext} from "../../contexts/OrderContext.jsx";

const useOrderContext = () => {
    const context = useContext(OrderContext);
    if (!context) throw new Error('useOrderContext is not inside of OrderContextProvider tag');

    return context;
};

export default useOrderContext;