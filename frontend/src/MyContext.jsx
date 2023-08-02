import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

const NavbarContext = createContext();

var token = JSON.parse(localStorage.getItem("token"));

const NavbarContextProvider = ({ children }) => {

  const [user, setUser] = useState();

  useEffect(() => {
   if (token) {
      axios
        .get("https://localhost:7104/api/Account/profile", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        })
        .then((response) => {
          setUser(response.data);
        }).catch((error) => {
          console.log(error);
        })
    }
  }, [])

  return <NavbarContext.Provider value={{ user: [user, setUser]}}>
    {children}
  </NavbarContext.Provider>
}

export { NavbarContext, NavbarContextProvider };

