import React, { useEffect, useState } from 'react';
import "../../styles/admindashboard.css";
import { useFormik } from "formik";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import Form from 'react-bootstrap/Form';

export default function Admin() {

  const [show, setShow] = useState(false);
  const [data, setData] = useState();
  const [brands, setBrands] = useState();

  const token = JSON.parse(localStorage.getItem('token'));

  useEffect(() => {
    axios.get("https://localhost:7104/api/User/getall", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => {
        
        setData(res.data);
      }).catch((err) => {
        console.log(err);
      })


    axios.get("https://localhost:7104/api/Admin/allBrands", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }).then((res) => {
      
      setBrands(res.data.result);
    }).catch((err) => {
      console.log(err);
    })

  }, [data]);


  // console.log(brands);
  const validate = values => {
    let errors = {}
    if (!values.model) {
      errors.model= 'Required'
    } else if (!values.brand) {
      errors.brand = 'Required'
    } else if (!values.seats) {
      errors.seats = 'Required'
    } else if (!values.pricePerHour) {
      errors.pricePerHour = 'Required'
    }

    return errors;
  }
  const formik = useFormik({
    initialValues: {
      model: "",
      pricePerHour: "",
      image: "",
      brand: "",
      seats: ""
    },
    onSubmit: (values, { resetForm }) => {
      // console.log(values);
      const formData = new FormData();
      formData.append('CarModel', values.model);
      formData.append('BrandId', values.brand);
      formData.append('PricePerHour', values.pricePerHour);
      formData.append('Seats', values.seats);
      formData.append('Image', values.image);
   

      //axios call
      axios
        .post("https://localhost:7104/api/Admin/add", formData, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        })
        .then((response) => {
        
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
              <th scope="col">Seats</th>
              <th scope="col">Price per hour &#8377;</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {
              data && (
                data.map((item, i) => {
                  return <tr key={i}>
                    <td>
                      <img src={item.image} style={{ height: "120px", width: "200px" }} alt="image" />
                    </td>
                    <td>{item.carModel}</td>

                    <td>{item.brand}</td>
                    <td>{item.seats}</td>
                    <td>{item.pricePerHour}/-</td>
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

                <Form.Select name="brand" onChange={formik.handleChange} aria-label="Default select example">
                  <option>Open this select menu</option>
                  { 
                    brands && brands.map((item, i) => {
                      return <option key={i} value={item.id}>{item.name}</option>
                    })
                  }
                </Form.Select>

                <div className="mb-3">
                  <label htmlFor="model" className="form-label">Model</label>
                  <input type="text" name="model" id="model" className="form-control" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.model} />
                  {formik.touched.model && formik.errors.model ? <div className='form-error'>{formik.errors.model}</div> : null}
                </div>
              
                <div className="mb-3">
                  <label htmlFor="seats" className="form-label">Seats</label>
                  <input type="number" name="seats" id="seats" className="form-control" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.seats} />
                  {formik.touched.seats && formik.errors.seats ? <div className='form-error'>{formik.errors.seats}</div> : null}
                </div>
              
                <div className="mb-3">
                  <label htmlFor="pricePerHour" className="form-label">Price per hour</label>
                  <input type="number" step="0.01" name="pricePerHour" id="pricePerHour" className="form-control" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.pricePerHour} />
                  {formik.touched.pricePerHour && formik.errors.pricePerHour ? <div className='form-error'>{formik.errors.pricePerHour}</div> : null}
                </div>

                <div className="mb-3">
                  <label htmlFor="image" className="form-label">Image</label>
                  <input type="file" name="image" id="image" className="form-control" onChange={(e) => formik.setFieldValue("image", e.currentTarget.files[0])} onBlur={formik.handleBlur} />
                  {formik.touched.image && formik.errors.image ? <div className='form-error'>{formik.errors.image}</div> : null}
                </div>
              
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
