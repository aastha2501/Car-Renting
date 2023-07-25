import React, { forwardRef } from 'react';
import "../styles/login.css";
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import jwt from "jwt-decode";

export default function Login() {
    const navigate = useNavigate();
    const validate = values => {
        let errors = {}
        if (!values.password) {
            errors.password = 'Password is Required'
        }
        if (!values.email) {
            errors.email = "Email is Required"
        } else if (!"^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$") {
            errors.email = "Invalid email format"
        }
        return errors;
    }
    const formik = useFormik({
        initialValues: {
            password: '',
            email: ''
        },
        onSubmit: values => {
            axios
                .post("https://localhost:7104/api/Account/login", values)
                .then((response) => {
               
                    const claims = jwt(response.data.token);

                    localStorage.setItem('token', JSON.stringify(response.data.token));

                    const role = claims["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

                    if(role == "Admin") {
                        navigate("/admin")
                    } else if(role == "User") {
                        navigate(`/dashboard`);
                    }

                }).catch((error) => {
                    console.log(error);
                })
        },
        validate
    })

    return (
        <>
        <div className='homeWrapper'>
            <div className='loginWrapper'>
                <form className='form' onSubmit={formik.handleSubmit}>
                    <h4 className='textAlign'>Login</h4>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" name="email" id="email" className="form-control" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
                        {formik.touched.email && formik.errors.email ? <div className='form-error'>{formik.errors.email}</div> : null}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" name="password" id="password" className="form-control" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} />
                        {formik.touched.password && formik.errors.password ? <div className='form-error'>{formik.errors.password}</div> : null}
                    </div>
                    <div className="mb-3 text-center">
                        <button type="submit" className="btnDarkColor">Login</button>
                    </div>
                    <div style={{ textAlign: "center" }}>
                        <p>Don't have an account? <Link to="/signup">Signup</Link></p>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}


{/* <div className="row">
<div className='col-6'>
    <label htmlFor="firstName" className="form-label">First name</label>
    <input type="text" name="firstName" id="firstName" className="form-control" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.firstName} />
    {formik.touched.firstName && formik.errors.firstName ? <div className='form-error'>{formik.errors.firstName}</div> : null}
</div>
<div className="col-6">
    <label htmlFor="lastName" className="form-label">Last name</label>
    <input type="text" name="lastName" id="lastName" className="form-control" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.lastName} />
</div>
</div> */}