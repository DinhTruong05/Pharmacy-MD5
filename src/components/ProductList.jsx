import React, { useEffect, useState } from "react";
import { fetchProducts, fetchProductTypes } from "../api";
import dayjs from "dayjs";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [types, setTypes] = useState([]);
  const [filterType, setFilterType] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fProducts, fTypes] = await Promise.all([fetchProducts(), fetchProductTypes()]);
        setProducts(fProducts);
        setTypes(fTypes);
      } catch (err) {
        setError(" Lỗi tải dữ liệu");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filtered = products.filter((p) => {
    const matchType = filterType ? p.type === filterType : true;
    const min = priceRange.min === "" ? 0 : +priceRange.min;
    const max = priceRange.max === "" ? Infinity : +priceRange.max;
    const matchPrice = p.price >= min && p.price <= max;
    return matchType && matchPrice;
  });

  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container my-4">
      <h2 className="mb-4"> Danh sách sản phẩm</h2>

      {/* Filters */}
      <div className="row g-3 mb-3">
        <div className="col-md-3">
          <select
            className="form-select"
            onChange={(e) => setFilterType(e.target.value)}
            value={filterType}
          >
            <option value="">-- Thể loại --</option>
            {types.map((t) => (
              <option key={t.id} value={t.name}>{t.name}</option>
            ))}
          </select>
        </div>

        <div className="col-md-3">
          <input
            type="number"
            className="form-control"
            placeholder="Giá từ"
            min="0"
            value={priceRange.min}
            onChange={(e) => setPriceRange((prev) => ({ ...prev, min: e.target.value }))}
          />
        </div>

        <div className="col-md-3">
          <input
            type="number"
            className="form-control"
            placeholder="Giá đến"
            min="0"
            value={priceRange.max}
            onChange={(e) => setPriceRange((prev) => ({ ...prev, max: e.target.value }))}
          />
        </div>

        <div className="col-md-3 d-flex align-items-end">
          <button className="btn btn-secondary w-100" onClick={() => {
            setFilterType(""); setPriceRange({ min: "", max: "" });
          }}>
             Reset Filter
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="table-responsive shadow-sm rounded">
        <table className="table table-striped table-hover align-middle mb-0">
          <thead className="table-dark">
            <tr>
              <th>Mã</th>
              <th>Tên</th>
              <th>Thể loại</th>
              <th>Giá</th>
              <th>Số lượng</th>
              <th>Ngày SX</th>
              <th>Mô tả</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.name}</td>
                  <td>{p.type}</td>
                  <td>{p.price.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</td>
                  <td>{p.quantity}</td>
                  <td>{dayjs(p.manufactureDate).format("DD/MM/YYYY")}</td>
                  <td>{p.description}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center text-muted">Không có sản phẩm phù hợp</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
