import React, { useState, useEffect } from "react";
import { getUsers, createUser } from "../services/api";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "" });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleCreateUser = async () => {
    try {
      await createUser(newUser);
      fetchUsers(); // Refresh users
      setNewUser({ name: "" }); // Reset form
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.userId}>
            {user.userName} (Orders: {user.orders.length})
          </li>
        ))}
      </ul>
      <h3>Create User</h3>
      <input
        type="text"
        placeholder="Name"
        value={newUser.name}
        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
      />
      <button onClick={handleCreateUser}>Create User</button>
    </div>
  );
};

export default Users;
