import React, { useState, useEffect } from "react";
import { getProducts, createProduct } from "../services/api";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", price: "" });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response.data);
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

  return (
    <div>
      <h2>Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.productId}>
            {product.productName} - ${product.price}
          </li>
        ))}
      </ul>
      <h3>Create Product</h3>
      <input
        type="text"
        placeholder="Name"
        value={newProduct.name}
        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Price"
        value={newProduct.price}
        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
      />
      <button onClick={handleCreateProduct}>Create Product</button>
    </div>
  );
};

export default Products;
