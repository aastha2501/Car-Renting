import React, { useContext, useEffect, useState } from 'react';
import "../../styles/navbar.css";
import { Link, useNavigate } from 'react-router-dom';
import jwt from "jwt-decode";
import axios from 'axios';
import { NavbarContext } from '../../MyContext';

export default function Navbar() {
  const [role, setRole] = useState();
  const [userName, setUserName] = useState();
  const [token, setToken] = useState();
  const [userId, setUserId] = useState();
  const [image, setImage] = useState();

  const { user } = useContext(NavbarContext);
  const [userValue] = user;
//  console.log(user);
  const navigate = useNavigate();
  var t = JSON.parse(localStorage.getItem("token"))
  useEffect(() => {
    if (t) {
   
      setToken(t);
      const claims = jwt(t);

      const role = claims["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      setRole(role);

      const name = claims["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
      setUserName(name);

      const id = claims["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
      setUserId(id);
    }
  }, [t])

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("image");
    localStorage.removeItem("dates");
    navigate("/");
    setToken(null);
  }

  return (
    <>
      <div className="navbar">
        <div className="logo">
          <a href=""
          ><h1>Car Renting<span>.</span></h1></a
          >
        </div>
        <div className="navItems">
          <input type="checkbox" name="onClick" id="onClick" />
          <label className="menuBar" htmlFor="onClick">
            <i style={{ fontSize: "1.5rem" }} className="fa-sharp fa-solid fa-bars"></i>
          </label>


          {
            token && role == "User" ? (
              <ul className="sibling">
                <Link className='link' to="/dashboard">Home</Link>
                <Link className='link' to={`/bookings/${userId}`}>Bookings</Link>
              </ul>

            ) : (token && role == "Admin" ? (
              <ul className="sibling">
                <Link className='link' to="/admin">Home</Link>
                <Link className='link' to='/bookings'>Bookings</Link>
                <Link className='link' to="/brands">Car Brands</Link>
    
              </ul>

            ) : (
              <ul className="sibling">
                <Link className='link' to="/">Home</Link>
              </ul>

            ))
          }

        </div>
        {
          token ? <div className="navBtn">
            {
              role === "User" && userValue?.image !== null ? (
                <Link to={`/profile/${userId}`}>
                  <img src={userValue?.image} className='navbarProfile' alt="User profile" /> <span className='username'>{userValue?.firstName}</span>
                </Link>

              ) : (
                role === "User" && userValue?.image === null ? (
                  <Link to={`/profile/${userId}`}><i className="fa-solid fa-user"></i>  <span className='username'>{userValue?.firstName}</span></Link>
                ) : (
                  <Link className='username'><i className="fa-solid fa-user"></i> Admin</Link>
                )
              )
            }
            <button onClick={handleLogout} className='link loginBtn'>Logout</button>
          </div> :
            <div className="navBtn">
              <Link to="/login" className='link loginBtn'>Login</Link>
              <Link to="/signup" className='link signupBtn'>Sign up</Link>
            </div>
        }

      </div>

    </>
  )
}

