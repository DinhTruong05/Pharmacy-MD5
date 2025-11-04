import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addProduct, fetchProductTypes } from "../api";

const initialForm = {
  id: "",
  name: "",
  type: "",
  price: "",
  quantity: "",
  manufactureDate: "",
  description: "",
};

const AddProduct = () => {
  const [form, setForm] = useState(initialForm);
  const [types, setTypes] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const fTypes = await fetchProductTypes();
        setTypes(fTypes);
      } catch {
        setError(" Lỗi tải dữ liệu");
      } finally {
        setLoading(false);
      }
    };
    fetchTypes();
  }, []);

  const validate = () => {
    const errors = {};
    const idRegex = /^PROD-\d{4}$/;
    const today = new Date();

    if (!form.id) errors.id = "Mã sản phẩm bắt buộc";
    else if (!idRegex.test(form.id)) errors.id = "Mã sản phẩm phải dạng PROD-XXXX";

    if (!form.name) errors.name = "Tên sản phẩm bắt buộc";
    if (!form.type) errors.type = "Thể loại bắt buộc";
    if (!form.price && form.price !== 0) errors.price = "Giá sản phẩm bắt buộc";
    else if (form.price < 0) errors.price = "Giá phải >= 0";

    if (!form.quantity && form.quantity !== 0) errors.quantity = "Số lượng bắt buộc";
    else if (!Number.isInteger(form.quantity) || form.quantity <= 0)
      errors.quantity = "Số lượng phải là số nguyên > 0";

    if (!form.manufactureDate) errors.manufactureDate = "Ngày nhập bắt buộc";
    else if (new Date(form.manufactureDate) > today)
      errors.manufactureDate = "Ngày nhập không được lớn hơn hôm nay";

    if (!form.description) errors.description = "Mô tả bắt buộc";

    return errors;
  };

  const handleSubmit = async () => {
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setMessage(Object.values(errors).join(" | "));
      return;
    }

    try {
      await addProduct(form);
      setMessage(" Thêm sản phẩm thành công");
      setForm(initialForm);
      // Chuyển về danh sách sản phẩm sau 1s
      setTimeout(() => navigate("/products"), 1000);
    } catch {
      setMessage(" Thêm sản phẩm thất bại");
    }
  };

  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0"> Thêm mới sản phẩm</h2>
        <button className="btn btn-secondary" onClick={() => navigate("/products")}>
          🔙 Quay lại
        </button>
      </div>

      {message && (
        <div className={`alert ${message.includes("✅") ? "alert-success" : "alert-danger"}`} role="alert">
          {message}
        </div>
      )}

      <div className="mb-3">
        <label className="form-label">Mã sản phẩm</label>
        <input
          type="text"
          className="form-control"
          placeholder="PROD-XXXX"
          value={form.id}
          onChange={(e) => setForm({ ...form, id: e.target.value })}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Tên sản phẩm</label>
        <input
          type="text"
          className="form-control"
          placeholder="Nhập tên sản phẩm"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Thể loại</label>
        <select
          className="form-select"
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option value="">-- Chọn thể loại --</option>
          {types.map((t) => (
            <option key={t.id} value={t.name}>{t.name}</option>
          ))}
        </select>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Giá</label>
          <input
            type="number"
            min="0"
            className="form-control"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value === "" ? "" : +e.target.value })}
          />
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label">Số lượng</label>
          <input
            type="number"
            min="1"
            className="form-control"
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: e.target.value === "" ? "" : +e.target.value })}
          />
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Ngày nhập</label>
        <input
          type="date"
          className="form-control"
          value={form.manufactureDate}
          onChange={(e) => setForm({ ...form, manufactureDate: e.target.value })}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Mô tả</label>
        <textarea
          className="form-control"
          rows="3"
          placeholder="Nhập mô tả sản phẩm"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
      </div>

      <div className="d-flex">
        <button className="btn btn-primary me-2" onClick={handleSubmit}>Thêm mới</button>
        <button className="btn btn-secondary" onClick={() => setForm(initialForm)}>Reset</button>
      </div>
    </div>
  );
};

export default AddProduct;
