import React, { useEffect, useState } from 'react';
import "../../styles/admindashboard.css";
import { useFormik } from "formik";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';

export default function Admin() {

  const [show, setShow] = useState(false);
  const [data, setData] = useState();
  const [brands, setBrands] = useState();
  const [productId, setProductId] = useState();
  const [deletePopup, setDeletePopup] = useState(false);
  const [editBox, setEditBox] = useState(false);

  const token = JSON.parse(localStorage.getItem('token'));

  useEffect(() => {
    axios.get("https://localhost:7104/api/User/getall", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => {
        // console.log(res.data);
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


  const validate = values => {
    let errors = {}
    if (!values.model) {
      errors.model = 'Required'
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
    setEditBox(false);
  }

  const handleDelete = (id) => {
    console.log(id);
    setProductId(id);
    setDeletePopup(true);
  }

  const handleDeleteSuccess = (productId) => {

    axios
      .delete("https://localhost:7104/api/Admin/delete/" + productId, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      .then((response) => {

        setDeletePopup(false);
      }).catch((error) => {
        console.log(error);
      })
  }

  const EditProduct = (id) => {
    console.log(id);
    setEditBox(true);

    axios
      .get("https://localhost:7104/api/User/getCar/" + id, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }).then((response) => {
        console.log(response.data);
      }).catch((error) => {
        console.log(error);
      })
  }

  const handleDeleteClose = () => {
    setDeletePopup(false);
  }

  const handleEditSumbit = (values, { resetForm }) => {
    console.log(values);
  }
  return (

    <div>

      <div className="mt-3" style={{ textAlign: "center" }}>
        <button className='btn addBtn' onClick={handleAdd}>Add </button>
      </div>
      <div className="mt-3 table-resposive p-3" style={{ overflowX: "auto" }}>
        <table className='table table-hover'>
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
                      
                      {/* <button className="btn btn-info" onClick={() => EditProduct(item.productId)}>
                      <i className="fa-solid fa-pen-to-square" style={{color: "white"}}></i>
                      </button> */}
                      {" "}<button className='btn btn-danger' onClick={() => handleDelete(item.productId)}>
                      <i className="fa-solid fa-trash-can"></i>
                      </button>
                    </td>
                  </tr>
                })
              )
            }

          </tbody>
        </table>
      </div>
      {/* add product */}
      {
        show && (
          <Modal show={show} centered>
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

      {/* edit product */}
      {
        editBox && (
          <Modal show={editBox} centered>
            <Modal.Header>
              <Modal.Title>Edit Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              
              <Formik initialValues={{
                pricePerHour: '',
                image: ''
              }} onSubmit={handleEditSumbit}>
                {({ isSubmitting }) => (
                  <Form>
                    <div className="mb-3">
                      <label htmlFor="pricePerHour" className="form-label">Price per hour</label>
                      <input type="number" step="0.01" name="pricePerHour" id="pricePerHour" className="form-control" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.pricePerHour} />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="image" className="form-label">Image</label>
                      <input type="file" name="image" id="image" className="form-control" onChange={(e) => formik.setFieldValue("image", e.currentTarget.files[0])} onBlur={formik.handleBlur} />
                    </div>
                    <button type="submit" className='btn btn-dark' disabled={isSubmitting}>
                      Edit
                    </button>
                   
                  </Form>
                )}
              </Formik>

              {/* <form onSubmit={formik.handleSubmit} encType="multipart/form-data">

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
                  <button className='btn btn-primary' type='submit'>Edit</button>
                </div>
              </form> */}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>

            </Modal.Footer>
          </Modal>
        )
      }

      {/* delete product */}
      {
        deletePopup && (
          <Modal centered show={deletePopup}>
            <Modal.Header>
              <Modal.Title>Delete Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>are you sure you want to delete?</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={() => handleDeleteSuccess(productId)}>
                Yes
              </Button>
              <Button variant="primary" onClick={handleDeleteClose}>
                No
              </Button>

              <Button variant="secondary" onClick={handleDeleteClose}>
                Close
              </Button>

            </Modal.Footer>
          </Modal>
        )
      }
    </div>
  )
}





// import React from 'react';
// import { Formik, Form, Field } from 'formik';

// const MyComponent = () => {
//   const handleSubmitForm1 = (values, { resetForm }) => {
//     // Handle submission of Form 1 here
//     console.log('Form 1 submitted:', values);
//     resetForm(); // Optionally reset the form after successful submission
//   };

//   const handleSubmitForm2 = (values, { resetForm }) => {
//     // Handle submission of Form 2 here
//     console.log('Form 2 submitted:', values);
//     resetForm(); // Optionally reset the form after successful submission
//   };

//   return (
//     <div>
//       <h2>Form 1</h2>
//       <Formik initialValues={{}} onSubmit={handleSubmitForm1}>
//         {({ isSubmitting }) => (
//           <Form>
//             <Field type="text" name="field1" placeholder="Field 1" />
//             <button type="submit" disabled={isSubmitting}>
//               Submit Form 1
//             </button>
//           </Form>
//         )}
//       </Formik>

//       <h2>Form 2</h2>
//       <Formik initialValues={{}} onSubmit={handleSubmitForm2}>
//         {({ isSubmitting }) => (
//           <Form>
//             <Field type="text" name="field2" placeholder="Field 2" />
//             <button type="submit" disabled={isSubmitting}>
//               Submit Form 2
//             </button>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// };

// export default MyComponent;
