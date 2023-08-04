import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useFormik } from "formik";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

export default function Brands() {

    const [data, setData] = useState();
    const [show, setShow] = useState();

    const token = JSON.parse(localStorage.getItem('token'));
    useEffect(() => {
        axios
            .get("https://localhost:7104/api/Admin/allBrands", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then((response) => {
                // console.log(response.data.result);
                setData(response.data.result);

            }).catch((error) => {
                console.log(error);
            })
    }, [data])

    const validate = values => {
        let errors = {}
        if (!values.name) {
          errors.name = 'Required'
        } 
        return errors;
      }
      const formik = useFormik({
        initialValues: {
          name: ""
        },
        onSubmit: (values, { resetForm }) => {
          // console.log(values);
          axios
            .post("https://localhost:7104/api/Admin/addbrand", values, {
              headers: {
                "Authorization": `Bearer ${token}`,
              }
            })
            .then((response) => {
              console.log(response.data);
              setShow(false);
    
            }).catch((error) => {
              console.log(error);
            })
    
          resetForm();
        },
        validate
      });
    const handleClick = () => {
        setShow(true);
    }

    const handleClose = () => {
        setShow(false);
        formik.resetForm();
    }
    return (
        <>
            <div className='row p-4'>
                <div>
                    <button className='btn btn-dark' onClick={handleClick} style={{ float: "right" }}>Add <i class="fa-solid fa-plus"></i></button>
                </div>
                {
                    data && data.map((item, i) => {
                        return <div key={i} className="col-lg-3 mb-4">
                            <div className="card">
                                <div className='card-text' style={{ padding: "1rem" }}>
                                    {item.name}
                                </div>
                            </div>
                        </div>
                    })
                }
               {
        show && (
          <Modal show={show} centered>
            <Modal.Header>
              <Modal.Title>Add Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={formik.handleSubmit} encType="multipart/form-data">

                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Model</label>
                  <input type="text" name="name" id="name" className="form-control" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} />
                  {formik.touched.name && formik.errors.name ? <div className='form-error error'>*{formik.errors.name}</div> : null}
                </div>

                <div className='mb-3 text-center'>
                  <button className='btn btn-dark' type='submit'>Add <i class="fa-solid fa-plus"></i></button>
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
        </>
    )
}
