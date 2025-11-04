const API_URL = "http://localhost:3001";

// Products
export const fetchProducts = () => fetch(`${API_URL}/products`).then(res => res.json());
export const fetchProductTypes = () => fetch(`${API_URL}/productTypes`).then(res => res.json());
export const fetchProductNames = () => fetch(`${API_URL}/productNames`).then(res => res.json());

export const addProduct = (product) =>
  fetch(`${API_URL}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product)
  });

// DELETE product by id
export const deleteProduct = (id) =>
  fetch(`${API_URL}/products/${id}`, {
    method: "DELETE"
  });

// Product Types
export const addProductType = (type) =>
  fetch(`${API_URL}/productTypes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(type)
  });

// DELETE product type by id
export const deleteProductType = (id) =>
  fetch(`${API_URL}/productTypes/${id}`, {
    method: "DELETE"
  });
