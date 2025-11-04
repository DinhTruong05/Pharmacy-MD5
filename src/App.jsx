import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";
import AddProductType from "./components/AddProductType";
import "./App.css";

const App = () => {
  return (
    <div className="container my-4">
      <h1> Quản lý sản phẩm Pharmacy</h1>

      <div className="mb-3">
        <Link className="btn btn-primary me-2" to="/add-product">Thêm sản phẩm</Link>
        <Link className="btn btn-secondary" to="/add-type">Thêm thể loại</Link>
      </div>

      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/add-type" element={<AddProductType />} />
      </Routes>
    </div>
  );
};

export default App;
