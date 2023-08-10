import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useFormik } from "formik";
import "../../styles/edit.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EditProduct() {
    const { id } = useParams();
    const token = JSON.parse(localStorage.getItem('token'));
    const [data, setData] = useState();

    useEffect(() => {

        const fetchData = async function () {
            await axios
                .get("https://localhost:7104/api/User/getCar/" + id, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }).then((response) => {
                    // console.log(response.data);
                    setData(response.data);
                    const pricePerHour = response.data.pricePerHour;
                    const seats = response.data.seats;

                    formik.setFieldValue("pricePerHour", pricePerHour);
                    formik.setFieldValue("seats", seats);
                }).catch((error) => {
                    console.log(error);
                })
        }
        fetchData();
    }, []);

    const validate = values => {
        let errors = {}

        if (!values.seats) {
            errors.seats = 'Required';
        } else if (!values.pricePerHour) {
            errors.pricePerHour = 'Required';
        }
        return errors;
    }
    const formik = useFormik({
        initialValues: {
            pricePerHour: "",
            seats: ""
        },
        onSubmit: (values, { resetForm }) => {
            console.log(values);

            //axios call
            axios
                .put("https://localhost:7104/api/Admin/editCarDetails/" + id, values, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })
                .then((response) => {
                    console.log(response.data);
                    toast.success("Updated successfully!!");

                }).catch((error) => {
                    console.log(error);
                })

        },
        validate
    });
    return (
        <div>
            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            {
                data && (
                    <form onSubmit={formik.handleSubmit} className='edit-form' encType="multipart/form-data">
                        <h3>Edit details</h3>
                        <hr />
                        <div className='edit-section1'>
                            <div>
                                <p><b>Brand </b>{data.brand}</p>
                                <p><b>Model </b>{data.carModel}</p>
                            </div>
                            <div>
                                <img src={data.image} style={{ height: "120px", width: "200px" }} alt="image" />
                            </div>
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

                        <div className='mb-3 text-center'>
                            <button className='btn btn-dark' type='submit'>Edit <i class="fa-solid fa-pen-to-square"></i></button>
                        </div>
                    </form>
                )
            }

        </div>
    )
}
