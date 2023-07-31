import React, { useState } from 'react';
import "../styles/home.css";
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import Dates from './Dates';

export default function Home() {

  return (
    <div className='homeWrapper'>
      <Dates />
    </div>
  )
}
