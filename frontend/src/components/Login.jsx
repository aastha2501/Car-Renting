import React, { useContext, useState } from 'react';
import "../styles/login.css";
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import jwt from "jwt-decode";
import { NavbarContext } from '../MyContext';
import Spinner from 'react-bootstrap/Spinner';

export default function Login() {
    const navigate = useNavigate();
    const { user } = useContext(NavbarContext);
    const [userValue, setUserValue] = user;
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);

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
           
            setLoading(true);
            axios
                .post("https://localhost:7104/api/Account/login", values)
                .then((response) => {

                    const claims = jwt(response.data.token);
                    const token = response.data.token;

                    localStorage.setItem('token', JSON.stringify(response.data.token));

                    const role = claims["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

                    if (token) {
                        axios
                            .get("https://localhost:7104/api/Account/profile", {
                                headers: {
                                    "Authorization": `Bearer ${token}`
                                }
                            })
                            .then((response) => {
                                setUserValue(response.data);
                            }).catch((error) => {
                                console.log(error);
                            })
                    }

                    if (role == "Admin") {
                        navigate("/admin")
                    } else if (role == "User") {
                        if (localStorage.getItem("dates") == null) {
                            navigate("/");
                        }
                        else {
                            navigate(`/dashboard`);
                        }
                    }


                }).catch((error) => {
                    setLoading(false);
                    console.log(error.response.data.errorMessage);
                    setError(error.response.data.errorMessage);
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
                        {error && <div className='error text-center'><b>{error}</b></div>}
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" name="email" id="email" className="form-control" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
                            {formik.touched.email && formik.errors.email ? <div className='form-error error'><i class="fa fa-triangle-exclamation"></i> {formik.errors.email}</div> : null}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" name="password" id="password" className="form-control" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} />
                            {formik.touched.password && formik.errors.password ? <div className='form-error error'><i class="fa fa-triangle-exclamation"></i> {formik.errors.password}</div> : null}
                        </div>
                        <div className="mb-3 text-center">
                            {loading ? <>
                            <span>Loading....</span>
                            </> : <button type="submit" className="btnDarkColor">
                                <>
                                    Login
                                </>
                            </button>
                            }
                        </div>
                        <div style={{ textAlign: "center" }}>
                            <p>Don't have an account? <Link to="/signup" style={{color: "rgb(158, 12, 12)", fontWeight: 600}}>Signup</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
