import React, { useEffect, useState } from 'react';
import "../../styles/navbar.css";
import { Link, useNavigate } from 'react-router-dom';
import jwt from "jwt-decode";
import axios from 'axios';

export default function Navbar() {
  const [role, setRole] = useState();
  const [userName, setUserName] = useState();
  const [token, setToken] = useState();
  const [userId, setUserId] = useState();
  const [image, setImage] = useState();

  const navigate = useNavigate();
  var t = JSON.parse(localStorage.getItem("token"))
  useEffect(() => {
    if (t) {
      //get the user data
      axios
        .get("https://localhost:7104/api/User/profile", {
          headers: {
            "Authorization": `Bearer ${t}`
          }
        })
        .then((response) => {
          setImage(response.data.image);
        }).catch((error) => {
          console.log(error);
        })

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
    navigate("/login");
    setToken(null);
  }
  return (
    <>
      <div className="navbar">
        <div className="logo">
          <a href=""
          ><h1>Logo<span>.</span></h1></a
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
                <li><a href="" className="">Home</a></li>
                <li><a href="">Bookings</a></li>
              </ul>

            ) : (token && role == "Admin" ? (
              <ul className="sibling">
                <li><a href="" className="">Home</a></li>
                <li><a href="">Bookings</a></li>
                <li><a href="">All Brands</a></li>
              </ul>

            ) : (
              <ul className="sibling">
                <li><a href="" className="">Home</a></li>
              </ul>

            ))
          }

        </div>
        {
          token ? <div className="navBtn">
            {
              role === "User" && image !== null ? (
                <Link to={`/profile/${userId}`}>
                  <img src={image} className='navbarProfile' alt="User profile" /> <span className='username'>{userName}</span>
                </Link>

              ) : (
                role === "User" && image === null ? (
                  <Link to={`/profile/${userId}`}><i className="fa-solid fa-user"></i>  <span className='username'>{userName}</span></Link>
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

{/* 

import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [userRole, setUserRole] = useState(null);
  const [userToken, setUserToken] = useState(null);

  // Assume you have a function to check the user's role and token, and it returns a Promise
  const checkUserRoleAndToken = async () => {
    // Your logic to get the user's role and token
    // For example, you can fetch it from the server using the token
    // const response = await fetch('/api/getUserRoleAndToken', {
    //   headers: {
    //     Authorization: `Bearer ${userToken}`,
    //   },
    // });
    // const data = await response.json();
    // setUserRole(data.role);
  };

  useEffect(() => {
    // Call the function to check the user's role and token when the component mounts
    checkUserRoleAndToken();
  }, []);

  // List of navbar items for different roles
  const guestItems = [
    { text: 'Home', link: '/' },
    { text: 'Login', link: '/login' },
    { text: 'Register', link: '/register' },
  ];

  const userItems = [
    { text: 'Home', link: '/' },
    { text: 'Profile', link: '/profile' },
    { text: 'Logout', link: '/logout' },
  ];

  const adminItems = [
    { text: 'Home', link: '/' },
    { text: 'Admin Dashboard', link: '/admin' },
    { text: 'Logout', link: '/logout' },
  ];

  // Function to render the list items based on the user's role
  const renderNavItems = () => {
    if (!userRole) {
      // If userRole is not available yet (e.g., still loading), show nothing
      return null;
    }

    if (userRole === 'guest') {
      return guestItems.map((item, index) => (
        <li key={index}>
          <a href={item.link}>{item.text}</a>
        </li>
      ));
    } else if (userRole === 'user') {
      return userItems.map((item, index) => (
        <li key={index}>
          <a href={item.link}>{item.text}</a>
        </li>
      ));
    } else if (userRole === 'admin') {
      return adminItems.map((item, index) => (
        <li key={index}>
          <a href={item.link}>{item.text}</a>
        </li>
      ));
    }

    // Handle other roles or unknown roles here
    return null;
  };

  return (
    <nav>
      <ul>
        {renderNavItems()}
      </ul>
    </nav>
  );
};

export default Navbar; */}
