import React, { useState, useEffect } from "react";
import { getProducts, createProduct, updateProduct, deleteProduct } from "../services/api";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", price: "" });
  const [editableProducts, setEditableProducts] = useState({});

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response.data);
      const initialEditableStates = response.data.reduce((acc, product) => {
        acc[product.productId] = { productName: product.productName, price: product.price };
        return acc;
      }, {});
      setEditableProducts(initialEditableStates);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleCreateProduct = async () => {
    try {
      await createProduct(newProduct);
      fetchProducts(); // Refresh products
      setNewProduct({ name: "", price: "" }); // Reset form
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const handleUpdateProduct = async (id) => {
    try {
      const { name, price } = editableProducts[id];
      await updateProduct(id, { name, price });
      fetchProducts(); // Refresh products
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await deleteProduct(id);
      fetchProducts(); // Refresh products
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div>
      <h2>Products</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.productId}>
              <td>
                <input
                  type="text"
                  value={editableProducts[product.productId]?.productName || ""}
                  onChange={(e) =>
                    setEditableProducts((prevState) => ({
                      ...prevState,
                      [product.productId]: {
                        ...prevState[product.productId],
                        productName: e.target.value,
                      },
                    }))
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  value={editableProducts[product.productId]?.price || ""}
                  onChange={(e) =>
                    setEditableProducts((prevState) => ({
                      ...prevState,
                      [product.productId]: {
                        ...prevState[product.productId],
                        price: parseFloat(e.target.value, 10),
                      },
                    }))
                  }
                />
              </td>
              <td>
              <button onClick={() => handleUpdateProduct(product.productId)}>
                  Update
                </button>
                <button onClick={() => handleDeleteProduct(product.productId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Create Product</h3>
      <div>
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
        />
        <button onClick={handleCreateProduct}>Create Product</button>
      </div>
    </div>
  );
};

export default Products;