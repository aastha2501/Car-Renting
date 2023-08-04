import React, { useContext } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';


export default function Dates({
    setCallBack = () => { }
}) {
    var token = JSON.parse(localStorage.getItem("token"));

    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            startDate: '',
            endDate: ''
        },
        validate: (values) => {
            const errors = {};

            if (!values.startDate) {
                errors.startDate = "Required";
            }
            if (!values.endDate) {
                errors.endDate = "Required";
            }
            if (values.endDate && values.startDate && values.endDate < values.startDate) {
                errors.endDate = 'Choose right drop off date';
            }

            return errors;
        },
        onSubmit: values => {
            localStorage.setItem('dates', JSON.stringify(values));
            // if (token) {
            navigate("/dashboard");
            // }
            // else {
            // navigate("/login");
            // }
            setCallBack(values);

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
                        className='form-control'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.startDate} 
                       // min={new Date().toISOString().split('T')[0]}
                        />
                    {formik.touched.startDate && formik.errors.startDate && (
                        <div style={{ color: 'rgb(225 181 0)', position: "absolute", fontSize: "13px", fontWeight: "bold" }}><i class="fa fa-triangle-exclamation"></i>{formik.errors.startDate}</div>
                    )}
                </div>

                <div className="mb-3">
                    <label htmlFor="endDate">Drop off (Date/Time):</label>
                    <input type="datetime-local" id="endDate"
                        name="endDate"
                        min="2018-06-07T00:00" max="2024-06-14T00:00" className='form-control' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.endDate} />
                    {formik.touched.endDate && formik.errors.endDate && (
                        <div style={{ color: 'rgb(225 181 0)', position: "absolute", fontSize: "13px", fontWeight: "bold" }}><i class="fa fa-triangle-exclamation"></i>{formik.errors.endDate}</div>
                    )}
                </div>

                <div>
                    <button className='btn btn-dark'>Search Now</button>
                </div>

            </form>
        </div>
    )
}
