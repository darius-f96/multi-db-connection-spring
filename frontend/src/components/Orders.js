import React, { useState, useEffect } from "react";
import { getOrders, createOrder, updateOrderQuantity, deleteOrder } from "../services/api";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState({ userName: "", productName: "", quantity: 0 });
  const [editableOrders, setEditableOrders] = useState({});

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await getOrders();
      setOrders(response.data);
      const initialEditableStates = response.data.reduce((acc, order) => {
        acc[order.orderId] = { quantity: order.quantity };
        return acc;
      }, {});
      setEditableOrders(initialEditableStates);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleCreateOrder = async () => {
    try {
      await createOrder(newOrder);
      fetchOrders();
      setNewOrder({ userName: "", productName: "", quantity: 0 });
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  const handleUpdateOrderQuantity = async (id) => {
    try {
      const { quantity } = editableOrders[id];
      await updateOrderQuantity(id, quantity);
      fetchOrders();
    } catch (error) {
      console.error("Error updating order quantity:", error);
    }
  };

  const handleDeleteOrder = async (id) => {
    try {
      await deleteOrder(id);
      fetchOrders();
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  return (
    <div>
      <h2>Orders</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User Name</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.orderId}>
              <td>Order #{order.orderId}</td>
              <td>{order.userName}</td>
              <td>{order.productName}</td>
              <td>
                <input
                  type="number"
                  value={editableOrders[order.orderId]?.quantity || ""}
                  onChange={(e) =>
                    setEditableOrders((prevState) => ({
                      ...prevState,
                      [order.orderId]: {
                        ...prevState[order.orderId],
                        quantity: parseInt(e.target.value, 10),
                      },
                    }))
                  }
                />
              </td>
              <td>
                <button onClick={() => handleUpdateOrderQuantity(order.orderId)}>
                  Update
                </button>
                <button onClick={() => handleDeleteOrder(order.orderId)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Create Order</h3>
      <div>
        <input
          type="text"
          placeholder="User Name"
          value={newOrder.userName}
          onChange={(e) => setNewOrder({ ...newOrder, userName: e.target.value })}
        />
        <input
          type="text"
          placeholder="Product Name"
          value={newOrder.productName}
          onChange={(e) => setNewOrder({ ...newOrder, productName: e.target.value })}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newOrder.quantity}
          onChange={(e) => setNewOrder({ ...newOrder, quantity: parseInt(e.target.value, 10) })}
        />
        <button onClick={handleCreateOrder}>Create Order</button>
      </div>
    </div>
  );
};

export default Orders;