import React, { useState, useEffect } from "react";
import { getOrders, createOrder } from "../services/api";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState({ userId: "", productId: "", status: "" });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await getOrders();
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleCreateOrder = async () => {
    try {
      await createOrder(newOrder);
      fetchOrders(); // Refresh orders
      setNewOrder({ userId: "", productId: "", status: "" }); // Reset form
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  return (
    <div>
      <h2>Orders</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.orderId}>
            Order #{order.orderId} - {order.userName} ordered {order.productName} ({order.status})
          </li>
        ))}
      </ul>
      <h3>Create Order</h3>
      <input
        type="text"
        placeholder="User ID"
        value={newOrder.userId}
        onChange={(e) => setNewOrder({ ...newOrder, userId: e.target.value })}
      />
      <input
        type="text"
        placeholder="Product ID"
        value={newOrder.productId}
        onChange={(e) => setNewOrder({ ...newOrder, productId: e.target.value })}
      />
      <input
        type="text"
        placeholder="Status"
        value={newOrder.status}
        onChange={(e) => setNewOrder({ ...newOrder, status: e.target.value })}
      />
      <button onClick={handleCreateOrder}>Create Order</button>
    </div>
  );
};

export default Orders;
