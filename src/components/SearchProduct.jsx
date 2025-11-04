import React, { useEffect, useState } from "react";
import { fetchProducts, fetchProductTypes } from "../api";

const SearchProduct = () => {
  const [products, setProducts] = useState([]);
  const [types, setTypes] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchType, setSearchType] = useState("");
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchProducts().then(setProducts);
    fetchProductTypes().then(setTypes);
  }, []);

  const handleSearch = () => {
    const filtered = products.filter(p => {
      const matchName = searchName ? p.name.toLowerCase().includes(searchName.toLowerCase()) : true;
      const matchType = searchType ? p.type === searchType : true;
      return matchName && matchType;
    });

    if (filtered.length === 0) {
      setMessage("Không có kết quả");
      setResults([]);
    } else {
      setMessage("");
      setResults(filtered);
    }
  };

  return (
    <div>
      <h2>🔎 Tìm kiếm sản phẩm</h2>
      <input
        type="text"
        placeholder="Nhập tên sản phẩm"
        value={searchName}
        onChange={e => setSearchName(e.target.value)}
      />
      <select value={searchType} onChange={e => setSearchType(e.target.value)}>
        <option value="">-- Chọn thể loại --</option>
        {types.map(t => (
          <option key={t.id} value={t.name}>{t.name}</option>
        ))}
      </select>
      <button onClick={handleSearch}>Tìm kiếm</button>

      {message ? (
        <p style={{ color: "red", fontWeight: "bold" }}>{message}</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Mã</th><th>Tên</th><th>Thể loại</th><th>Giá</th><th>Số lượng</th><th>Mô tả</th>
            </tr>
          </thead>
          <tbody>
            {results.map(p => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.type}</td>
                <td>{p.price.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</td>
                <td>{p.quantity}</td>
                <td>{p.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SearchProduct;
