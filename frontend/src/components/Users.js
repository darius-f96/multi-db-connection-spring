import React, { useState, useEffect } from "react";
import { getUsers, createUser, updateUser, deleteUser } from "../services/api";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "" });
  const [editableUsers, setEditableUsers] = useState({});

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data);
      const initialEditableStates = response.data.reduce((acc, user) => {
        acc[user.userId] = { userName: user.userName };
        return acc;
      }, {});
      setEditableUsers(initialEditableStates);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleCreateUser = async () => {
    try {
      await createUser(newUser);
      fetchUsers();
      setNewUser({ name: "" }); // Reset form
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const handleUpdateUser = async (id) => {
    try {
      const name  = editableUsers[id].userName;
      await updateUser(id, { name });
      fetchUsers();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };
  

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div>
      <h2>Users</h2>
      <table border="1">
        <thead>
          <tr>
            <th>User Name</th>
            <th>Number of Orders</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.userId}>
              <td>
                <input
                  type="text"
                  value={editableUsers[user.userId]?.userName || ""}
                  onChange={(e) =>
                    setEditableUsers((prevState) => ({
                      ...prevState,
                      [user.userId]: {
                        ...prevState[user.userId],
                        userName: e.target.value,
                      },
                    }))
                  }
                />
              </td>
              <td>{user.orders.length}</td>
              <td>
              <button onClick={() => handleUpdateUser(user.userId)}>
                  Update
                </button>
                <button onClick={() => handleDeleteUser(user.userId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Create User</h3>
      <div>
        <input
          type="text"
          placeholder="User Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <button onClick={handleCreateUser}>Create User</button>
      </div>
    </div>
  );
};

export default Users;