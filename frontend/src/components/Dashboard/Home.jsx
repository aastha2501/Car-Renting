import React, { useState } from 'react';
import Signup from '../Signup';
import Login from '../Login';


export default function Home() {
    const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <div className='homeWrapper'>
        {
            isLoggedIn ? <Login/> : <Signup/>
        }
    </div>
  )
}
