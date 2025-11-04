import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addProduct, fetchProductTypes } from "../api";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const initialForm = {
  id: "",
  name: "",
  type: "",
  price: "",
  quantity: "",
  manufactureDate: "",
  description: "",
};

const validationSchema = Yup.object({
  id: Yup.string()
    .required("Mã sản phẩm bắt buộc")
    .matches(/^PROD-\d{4}$/, "Mã sản phẩm phải dạng PROD-XXXX"),
  name: Yup.string().required("Tên sản phẩm bắt buộc"),
  type: Yup.string().required("Thể loại bắt buộc"),
  price: Yup.number()
    .typeError("Giá phải là số")
    .required("Giá sản phẩm bắt buộc")
    .min(0, "Giá phải >= 0"),
  quantity: Yup.number()
    .typeError("Số lượng phải là số")
    .required("Số lượng bắt buộc")
    .integer("Số lượng phải là số nguyên")
    .min(1, "Số lượng phải >= 1"),
  manufactureDate: Yup.date()
    .required("Ngày nhập bắt buộc")
    .max(new Date(), "Ngày nhập không được lớn hơn hôm nay"),
  description: Yup.string().required("Mô tả bắt buộc"),
});

const AddProduct = () => {
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const fTypes = await fetchProductTypes();
        setTypes(fTypes);
      } catch (err) {
        setError("Lỗi tải dữ liệu");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const payload = {
        ...values,
        price: Number(values.price),
        quantity: Number(values.quantity),
      };
      await addProduct(payload);
      setMessage("✅ Thêm sản phẩm thành công");
      resetForm();
      setTimeout(() => navigate("/products"), 1000);
    } catch (err) {
      setMessage("❌ Thêm sản phẩm thất bại");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Thêm mới sản phẩm</h2>
        <button className="btn btn-secondary" onClick={() => navigate("/products")}>🔙 Quay lại</button>
      </div>

      {message && (
        <div className={`alert ${message.includes("✅") ? "alert-success" : "alert-danger"}`} role="alert">
          {message}
        </div>
      )}

      <Formik initialValues={initialForm} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-3">
              <label className="form-label">Mã sản phẩm</label>
              <Field name="id" className="form-control" placeholder="PROD-XXXX" />
              <div className="text-danger"><ErrorMessage name="id" /></div>
            </div>

            <div className="mb-3">
              <label className="form-label">Tên sản phẩm</label>
              <Field name="name" className="form-control" placeholder="Nhập tên sản phẩm" />
              <div className="text-danger"><ErrorMessage name="name" /></div>
            </div>

            <div className="mb-3">
              <label className="form-label">Thể loại</label>
              <Field as="select" name="type" className="form-select">
                <option value="">-- Chọn thể loại --</option>
                {types.map((t) => (
                  <option key={t.id} value={t.name}>{t.name}</option>
                ))}
              </Field>
              <div className="text-danger"><ErrorMessage name="type" /></div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Giá</label>
                <Field name="price" type="number" min="0" className="form-control" />
                <div className="text-danger"><ErrorMessage name="price" /></div>
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Số lượng</label>
                <Field name="quantity" type="number" min="1" className="form-control" />
                <div className="text-danger"><ErrorMessage name="quantity" /></div>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Ngày nhập</label>
              <Field name="manufactureDate" type="date" className="form-control" />
              <div className="text-danger"><ErrorMessage name="manufactureDate" /></div>
            </div>

            <div className="mb-3">
              <label className="form-label">Mô tả</label>
              <Field as="textarea" name="description" className="form-control" rows="3" />
              <div className="text-danger"><ErrorMessage name="description" /></div>
            </div>

            <div className="d-flex">
              <button className="btn btn-primary me-2" type="submit" disabled={isSubmitting}>Thêm mới</button>
              <button className="btn btn-secondary" type="reset">Reset</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddProduct;
