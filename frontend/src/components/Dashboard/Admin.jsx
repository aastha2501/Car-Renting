import React, { useEffect, useState } from 'react';
import "../../styles/admindashboard.css";
import { useFormik } from "formik";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

export default function Admin() {

  const [show, setShow] = useState(false);
  const [data, setData] = useState();

  const token = JSON.parse(localStorage.getItem('token'));

  useEffect(() => {
    axios.get("https://localhost:7104/api/User/getall", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => {
        console.log(res);
        setData(res.data);
      }).catch((err) => {
        console.log(err);
      })
  }, []);

  const validate = values => {
    let errors = {}
    if (!values.name) {
      errors.name = 'Required'
    } else if (!values.desc) {
      errors.desc = 'Required'
    } else if (!values.quantity) {
      errors.quantity = 'Required'
    } else if (!values.price) {
      errors.price = 'Required'
    }

    return errors;
  }
  const formik = useFormik({
    initialValues: {
      name: "",
      desc: "",
      price: "",
      quantity: "",
      image: ""
    },
    onSubmit: (values, { resetForm }) => {
      //   debugger;
      console.log(values);
      console.log(values.name);
      console.log(values.image);

      const formData = new FormData();
      formData.append('Name', values.name);
      formData.append('Description', values.desc);
      formData.append('Quantity', values.quantity);
      formData.append('Price', values.price);
      formData.append('Image', values.image);
      formData.append('ImagePath', '');

      //axios call
      axios
        .post("https://localhost:7270/api/Admin/addproduct", formData, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        })
        .then((response) => {
          // console.log(response);
          setShow(false);

        }).catch((error) => {
          console.log(error);
        })

      resetForm();
    },
    validate
  });

  const handleAdd = () => {
    setShow(true);
  }

  const handleClose = () => {
    setShow(false);
  }

  return (
    <div>
      <div className="mt-3" style={{ textAlign: "center" }}>
        <button className='btn addBtn' onClick={handleAdd}>Add</button>
      </div>
      <div className="mt-3 table-resposive p-3">
        <table className='table table-bordered table-hover'>
          <thead className='table-dark'>
            <tr>
              <th scope="col">Image</th>
              <th scope="col">Model</th>
              <th scope="col">Brand</th>
              <th scope="col">Description</th>
              <th scope="col">Price per hour</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {
              data && (
                data.map((item, i) => {
                  return <tr key={i}>
                    <td>
                      <img src={item.imageUrl} style={{height: "120px", width: "200px"}} alt="image"/>  
                    </td>
                    <td>{item.model}</td>
                     
                    <td>{item.brand}</td>
                    <td>{item.description}</td>
                    <td>{item.pricePerHour}</td>
                    <td>
                      {/* <button className='btn btn-danger' onClick={() => handleDelete(item.id)}>Delete</button>
                      {" "} <button className="btn btn-info" onClick={() => EditProduct(item.id)}>Edit</button> */}
                    </td>
                  </tr>
                })
              )
            }

          </tbody>
        </table>
      </div>
      {
        show && (
          <Modal show={show}>
            <Modal.Header>
              <Modal.Title>Add Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Product name</label>
                  <input type="text" name="name" id="name" className="form-control" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} />
                  {formik.touched.name && formik.errors.name ? <div className='form-error'>{formik.errors.name}</div> : null}
                </div>
                <div className="mb-3">
                  <label htmlFor="desc" className="form-label">Product description</label>
                  <input type="text" name="desc" id="desc" className="form-control" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.desc} />
                  {formik.touched.desc && formik.errors.desc ? <div className='form-error'>{formik.errors.desc}</div> : null}
                </div>
                <div className="mb-3">
                  <label htmlFor="quantity" className="form-label">Quantity</label>
                  <input type="number" name="quantity" id="quantity" className="form-control" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.quantity} />
                  {formik.touched.quantity && formik.errors.quantity ? <div className='form-error'>{formik.errors.quantity}</div> : null}
                </div>
                <div className="mb-3">
                  <label htmlFor="price" className="form-label">Price</label>
                  <input type="number" step="0.01" name="price" id="price" className="form-control" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.price} />
                  {formik.touched.price && formik.errors.price ? <div className='form-error'>{formik.errors.price}</div> : null}
                </div>

                <div className="mb-3">
                  <label htmlFor="image" className="form-label">Image</label>
                  <input type="file" name="image" id="image" className="form-control" onChange={(e) => formik.setFieldValue("image", e.currentTarget.files[0])} onBlur={formik.handleBlur} />
                  {formik.touched.image && formik.errors.image ? <div className='form-error'>{formik.errors.image}</div> : null}
                </div>
                {/* onChange={(event) => {
                        setFieldValue("file", event.currentTarget.files[0]);
                      }} */}
                <div className='mb-3 text-center'>
                  <button className='btn btn-primary' type='submit'>Add</button>
                </div>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>

            </Modal.Footer>
          </Modal>
        )
      }
    </div>
  )
}
