import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addProductType } from "../api";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string().trim().required("Tên thể loại không được để trống"),
});

const AddProductType = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await addProductType({ name: values.name });
      setMessage("✅ Thêm thể loại thành công");
      resetForm();
      setTimeout(() => navigate('/products'), 1000);
    } catch (err) {
      setMessage("❌ Thêm thể loại thất bại");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Thêm mới thể loại</h2>
        <button className="btn btn-secondary" onClick={() => navigate('/products')}>🔙 Quay lại</button>
      </div>

      {message && (
        <div className={`alert ${message.includes("✅") ? "alert-success" : "alert-danger"}`} role="alert">
          {message}
        </div>
      )}

      <Formik initialValues={{ name: "" }} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-3">
              <label className="form-label">Tên thể loại</label>
              <Field name="name" className="form-control" placeholder="Nhập tên thể loại" />
              <div className="text-danger"><ErrorMessage name="name" /></div>
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

export default AddProductType;
