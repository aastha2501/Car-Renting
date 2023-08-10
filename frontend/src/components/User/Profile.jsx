import React, { useContext, useEffect, useRef, useState } from 'react';
import "../../styles/profile.css";
import jwt from "jwt-decode";
import axios from 'axios';
import { useFormik } from "formik";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavbarContext } from '../../MyContext';

export default function Profile() {
  const { user} = useContext(NavbarContext);
  const [userValue, setUserValue] = user;

  const inputRef = useRef(null);
  const [image, setImage] = useState();

  const [email, setEmail] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();

  const validate = values => {
    let errors = {}

    if (!values.firstName) {
      errors.firstName = "Name is Required"
    }

    if (!values.email) {
      errors.email = "Email is Required"
    } else if (!"^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$") {
      errors.email = "Invalid email format"
    }
    return errors;
  }

  var token = JSON.parse(localStorage.getItem("token"));
  useEffect(() => {
    axios
      .get("https://localhost:7104/api/Account/profile", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      .then((response) => {

        const email = response.data.email;
        const firstName = response.data.firstName;
        const lastName = response.data.lastName;
        const image = response.data.image;

        formik.setFieldValue('email', email);
        formik.setFieldValue('firstName', firstName);
        formik.setFieldValue('lastName', lastName);
        formik.setFieldValue('image', image);

        if (response.data.image != null) {
          setImage(response.data.image);
        }
        setEmail(email);
        setFirstName(firstName);
        setLastName(lastName);

      }).catch((error) => {
        console.log(error);
      })

  }, []);

  const handleImageClick = () => {
    inputRef.current.click();
  }

 
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      image: ''
    },
    onSubmit: values => {
      
      const formData = new FormData();
      formData.append('FirstName', values.firstName);
      formData.append('LastName', values.lastName);
      formData.append('Email', values.email);
      formData.append('Image', values.image);

      axios
        .put("https://localhost:7104/api/User/update", formData, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        })
        .then((response) => {
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setEmail(response.data.email);

          setUserValue(response.data);

          toast.success("Profile updated successfully!!");
        }).catch((error) => {
          console.log(error);
        })
    },
    validate,

  });


  return (
    <div className='profileWrapper'>

      <div className='bottomLine'>
      </div>

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
      <div className='container-fluid'>
        <form onSubmit={formik.handleSubmit} encType="multipart/form-data" className='row mt-4 no-gutter'>
          <div className='sidebar col-lg-3'>
            <div>
              <div onClick={handleImageClick} className='imageWrapper'>
                {
                  image ? <img style={{ height: "100%" }} src={image} /> : <i className="fa-solid fa-user-plus" style={{ fontSize: "5em", cursor: "pointer" }}></i>
                }
                <i className="fa-regular fa-pen-to-square" style={{ fontSize: "1.5rem", bottom: "0", position: "absolute" }}></i>
                <input type='file' name='image' id="image" ref={inputRef} onChange={(event) => {
                  formik.setFieldValue("image", event.currentTarget.files[0]);
                  const imageUrl = URL.createObjectURL(event.currentTarget.files[0]);
                  console.log(imageUrl);
                  setImage(imageUrl);
                }} onBlur={formik.handleBlur} style={{ display: "none" }} />

              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <h5>{`${firstName}`}</h5>
              <p style={{ color: "gray" }}>{email}</p>
            </div>
          </div>
          <div className='main col-lg-9'>
            <h3>Update Profile</h3>
            <hr />

            <div className="row">
              <div className='col-6'>
                <label htmlFor="firstName" className="form-label">First name</label>
                <input type="text" name="firstName" id="firstName" className="form-control" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.firstName} />
              </div>
              <div className="col-6">
                <label htmlFor="lastName" className="form-label">Last name</label>
                <input type="text" name="lastName" id="lastName" className="form-control" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.lastName} />
              </div>
            </div>
            {/* phone number */}
            <div className="mb-3" style={{ display: "none" }}>
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" name="email" id="email" className="form-control" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />

            </div>

          </div>

          <div className="mb-3 text-center">
            <hr />
            <button type="submit" className="btnDarkColor">Save</button>
          </div>
        </form>
      </div>
    </div>

  )
}

