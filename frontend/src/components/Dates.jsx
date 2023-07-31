import React from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Dates() {
    var token = JSON.parse(localStorage.getItem("token"))
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            startDate: '',
            endDate: ''
        },
        onSubmit: values => {
            console.log(values);

            localStorage.setItem('dates', JSON.stringify(values));
            if (token) {
                navigate("/dashboard");
            }
            else {
                navigate("/login");
            }

        }
    });
    return (
        <div >
            <form onSubmit={formik.handleSubmit} className='main'>
                <div className="mb-3">
                    <label htmlFor="startDate">Pick up (Date/Time):</label>
                    <input
                        id="startDate"
                        type="datetime-local"
                        name="startDate"
                        className='form-control' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.startDate} />
                </div>

                <div className="mb-3">
                    <label htmlFor="endDate">Drop off (Date/Time):</label>
                    <input type="datetime-local" id="endDate"
                        name="endDate"
                        min="2018-06-07T00:00" max="2024-06-14T00:00" className='form-control' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.endDate} />
                </div>

                <div>
                    <button className='btn btn-dark'>Search Now</button>
                </div>

            </form>
        </div>
    )
}
