import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";

export default function Signup() {
    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState('');
    const validate = values => {
        let errors = {}

        if (!values.firstName) {
            errors.firstName = "Name is Required"
        }
        if (!values.password) {
            errors.password = 'Password is Required'
        }

        if (!values.email) {
            errors.email = "Email is Required"
        } else if (!"^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$") {
            errors.email = "Invalid email format"
        }

        if (!values.confirmPassword) {
            errors.confirmPassword = 'Confirm Password is Required'
        } else if (values.confirmPassword != values.password) {
            errors.confirmPassword = "Confirm password should match password"
        }
        return errors;
    }
    const formik = useFormik({
        initialValues: {
            password: '',
            email: '',
            confirmPassword: '',
            firstName: '',
            lastName: ''
        },
        onSubmit: values => {
            console.log(values);
            axios
                .post("https://localhost:7104/api/Account/signup", values)
                .then((response) => {
                    console.log(response);
                    navigate("/login");
                }).catch((error) => {
                    console.log(error);
                })

        },
        validate
    });
    return (
        <div className="homeWrapper">
            <div className="loginWrapper">
                <form onSubmit={formik.handleSubmit} className="form" >
                    <h4>Signup</h4>
                    {errorMsg && <p className="error"><i class="fa fa-triangle-exclamation"></i>{errorMsg}</p>}

                    <div className="row">
                        <div className='col-6'>
                            <label htmlFor="firstName" className="form-label">First name</label>
                            <input type="text" name="firstName" id="firstName" className="form-control" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.firstName} />
                            {formik.touched.firstName && formik.errors.firstName ? <div className='form-error error'><i class="fa fa-triangle-exclamation"></i>{formik.errors.firstName}</div> : null}
                        </div>
                        <div className="col-6">
                            <label htmlFor="lastName" className="form-label">Last name</label>
                            <input type="text" name="lastName" id="lastName" className="form-control" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.lastName} />
                        </div>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" name="email" id="email" className="form-control" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
                        {formik.touched.email && formik.errors.email ? <div className='form-error error'><i class="fa fa-triangle-exclamation"></i>{formik.errors.email}</div> : null}

                    </div>
                    <div className="mb-2">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" name="password" id="password" className="form-control" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} />
                        {formik.touched.password && formik.errors.password ? <div className='form-error error'><i class="fa fa-triangle-exclamation"></i>{formik.errors.password}</div> : null}

                    </div>
                    <div className="mb-2">
                        <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                        <input type="password" name="confirmPassword" id="confirmPassword" className="form-control" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.confirmPassword} />
                        {formik.touched.confirmPassword && formik.errors.confirmPassword ? <div className='form-error error'><i class="fa fa-triangle-exclamation"></i>{formik.errors.confirmPassword}</div> : null}

                    </div>
                    <div className="mb-2">
                        <button type="submit" className="btnDarkColor">Sign up</button>
                    </div>
                    <div style={{ textAlign: "center" }}>
                        <p>Already have an account? <Link to="/login">Login</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}