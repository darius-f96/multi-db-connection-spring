import React from "react";
import Orders from "./components/Orders";
import Users from "./components/Users";
import Products from "./components/Products";

function App() {
  return (
    <div className="App">
      <h1>Inventory Management</h1>
      <Orders />
      <Users />
      <Products />
    </div>
  );
}

export default App;
