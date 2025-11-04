import axios from "axios";

const client = axios.create({
  // In Vite use import.meta.env for env vars in the browser
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3001",
  headers: { "Content-Type": "application/json" },
});

export const fetchProducts = () => client.get("/products").then((r) => r.data);
export const fetchProductTypes = () => client.get("/productTypes").then((r) => r.data);
// productNames in db.json are objects {id, name}; map to string names for existing UI
export const fetchProductNames = () =>
  client.get("/productNames")
    .then((r) => r.data)
    .then((data) => (Array.isArray(data) ? data.map((i) => (typeof i === 'string' ? i : i.name)) : []));

export const addProduct = (product) => client.post("/products", product).then((r) => r.data);
export const addProductType = (type) => client.post("/productTypes", type).then((r) => r.data);

export const deleteProduct = (id) => client.delete(`/products/${id}`).then((r) => r.data);
export const deleteProductType = (id) => client.delete(`/productTypes/${id}`).then((r) => r.data);
