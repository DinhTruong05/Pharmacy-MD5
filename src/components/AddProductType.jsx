import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addProductType } from "../api";

const AddProductType = () => {
  const [typeName, setTypeName] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!typeName.trim()) {
      setMessage("❌ Tên thể loại không được để trống");
      return;
    }

    try {
      await addProductType({ name: typeName });
      setMessage("✅ Thêm thể loại thành công");
      setTypeName("");
      setTimeout(() => navigate("/products"), 1000);
    } catch {
      setMessage("❌ Thêm thể loại thất bại");
    }
  };

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Thêm mới thể loại</h2>
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
          🔙 Quay lại
        </button>
      </div>

      {message && (
        <div className={`alert ${message.includes("") ? "alert-success" : "alert-danger"}`} role="alert">
          {message}
        </div>
      )}

      <div className="mb-3">
        <label className="form-label">Tên thể loại</label>
        <input
          type="text"
          className="form-control"
          placeholder="Nhập tên thể loại"
          value={typeName}
          onChange={(e) => setTypeName(e.target.value)}
        />
      </div>

      <div className="d-flex">
        <button className="btn btn-primary me-2" onClick={handleSubmit}>Thêm mới</button>
        <button className="btn btn-secondary" onClick={() => setTypeName("")}>Reset</button>
      </div>
    </div>
  );
};

export default AddProductType;
