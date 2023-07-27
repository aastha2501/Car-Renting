import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';

export default function Home() {
    const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <div className='homeWrapper'>
    {/* {
        isLoggedIn ? <Login/> : <Signup/>
    } */}
    
    </div>
  )
}
