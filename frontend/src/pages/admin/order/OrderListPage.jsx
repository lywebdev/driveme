import { useState, useEffect } from 'react';
import Button from "@components/UI/Button/Button.jsx";
import OrderService from "../../../services/OrderService.js";

const OrderListPage = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            const response = await OrderService.findAll();
            setOrders(response.data.data);
        };

        fetchOrders();
    }, []);


    return (
        <div style={{padding: '15px'}}>
            <h2 style={{fontWeight:'bold'}}>Orders</h2>
            <br/>
            <br/>
            <br/>
            <ul>
                {orders.map((order) => (
                    <li key={order._id} style={{marginBottom: '10px', borderBottom: '1px solid #ccc', paddingBottom: '5px'}}>
                        <div>
                            <span>Name: </span>
                            <span>{order.name}</span>
                        </div>

                        <div>
                            <span>Email: </span>
                            <span>{order.email}</span>
                        </div>

                        <div>
                            <span>Days: </span>
                            <span>{order.days}</span>
                        </div>

                        <div>
                            <span>TotalPrice: </span>
                            <span>{order.totalPrice}</span>
                        </div>
                    </li>
                ))}
            </ul>

            <br/>
            <Button url='/admin'>Admin</Button>
        </div>
    );
};

export default OrderListPage;
