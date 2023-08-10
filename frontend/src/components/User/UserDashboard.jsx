import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useFormik } from "formik";
import "../../styles/user.css";
import Spinner from 'react-bootstrap/Spinner';
import Dates from '../DatePicker';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { Pagination } from '@mui/material';

export default function Dashboard() {

  const navigate = useNavigate();
  const [data, setData] = useState();
  const [show, setShow] = useState(false);
  const [productId, setProductId] = useState();
  const [carData, setCarData] = useState();
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [totalPages, setTotalPages] = useState();


  const d = JSON.parse(localStorage.getItem("dates"));
  const [date, setDate] = useState({
    startDate: '',
    endDate: ''
  });
  if (d != null) {
    date.startDate = d.startDate;
    date.endDate = d.endDate;
  } 


  var token = JSON.parse(localStorage.getItem("token"))

  const calculateHoursDiff = () => {
    const { startDate, endDate } = formik.values;
    if (!startDate || !endDate) return;

    const startDateTime = new Date(startDate);
    const endDateTime = new Date(endDate);
    const timeDifference = endDateTime - startDateTime;

    const hoursDifference = timeDifference / (1000 * 60 * 60);

    return hoursDifference;
  }

  useEffect(() => {
    setLoading(true);
    if(d == null) {
      navigate("/");
    }
    axios
      .post(`https://localhost:7104/api/User/findCars?pageNumber=${pageNumber}&pageSize=${pageSize}`, date)
      .then((response) => {
        setTotalPages(response.data.totalPages);
        setData(response.data.data);
        setLoading(false);
      }).catch((error) => {
        console.log(error);
        setLoading(false);
      })
  }, [date, pageNumber]);

  // book now
  const formik = useFormik({
    initialValues: {
      startDate: '',
      endDate: ''
    },

    onSubmit: (values, { resetForm }) => {
      const price = carData.pricePerHour;
      const hours = calculateHoursDiff();
      const total = price * hours;

      var data = {
        ProductId: productId,
        StartDate: values.startDate,
        EndDate: values.endDate,
        TotalPrice: total
      }
      console.log(data);



      axios
        .post("https://localhost:7104/api/User/bookCar", data, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }).then((response) => {
          setShow(false);
          toast.success("Car Booked successfully!!");
        }).catch((error) => {
          console.log(error);
        })
    },
  })

  useEffect(() => {
    const storedData = localStorage.getItem('dates');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      formik.setValues(parsedData);
    }
  }, []);
  const handleClose = () => {
    setShow(false);
  }

  const handleRentClick = (productId) => {
    if (token) {
      setProductId(productId);

      axios.get("https://localhost:7104/api/User/getCar/" + productId, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }).then((response) => {
        setCarData(response.data);

        setShow(true);
      }).catch((error) => {
        console.log(error);
      })
    } else {
      navigate("/login");
    }
  }
  const handleChange = (event, value) => {
    setPageNumber(value);
  }
  return (
    <>
      {
        loading ? <Spinner className="spinner" animation="grow" variant="secondary" />
          : (<div className='user-home-wrapper container'>
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
            <div className='pickup-date mt-4'>
              <Dates
                setCallBack={(values) => {
                  setDate(values);
                }}
              />

            </div>
      
            <div className='row mt-4'>
              {
                data && data.map((item, i) => {
                  return <div key={i} className="col-lg-3 mb-4">
                    <div className="card">
                      <img src={item.image} alt="" className="card-img-top img" />
                      <div className="card-body">
                        <h5 className="card-title"><span>{item.carModel} </span><span>{item.brand}</span></h5>
                        <p><b>Price per hour:</b> &#x20b9; {item.pricePerHour}</p>
                        <p className="card-text"><b>Seats:</b> {item.seats}</p>
                        <button className='btn btn-dark' onClick={() => handleRentClick(item.productId)}><span>Rent Now</span></button>
                      </div>
                    </div>
                  </div>
                })
              }
            </div>

            <div className="pager">
            <Pagination count={totalPages} page = {pageNumber} onChange={handleChange}/>
        </div>
            <div>
              {
                show && (
                  <Modal show={show}>
                    <Modal.Header>
                      <Modal.Title>Book now</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <form onSubmit={formik.handleSubmit} className=''>
                        <div className="mb-3 d-flex justify-content-between">
                          <div>
                            <p><b>Model: </b>{carData.carModel}</p>
                            <p><b>Brand: </b>{carData.brand}</p>
                            <p><b>Price per hour: </b>&#x20b9;{carData.pricePerHour}</p>
                          </div>
                          <div>
                            <img src={carData.image} height="100px" alt='image' />
                          </div>
                        </div>
                        <div className="mb-3">
                          <label htmlFor="startDate">From:</label>

                          <input
                            id="startDate"
                            type="datetime-local"
                            name="startDate"
                            className='form-control' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.startDate} readOnly />
                        </div>
                        <div className="mb-5">
                          <label htmlFor="endDate">To:</label>
                          <input type="datetime-local" id="endDate"
                            name="endDate"
                            min="2018-06-07T00:00" max="2024-06-14T00:00" className='form-control' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.endDate} readOnly />
                        </div>

                        <div className="mb-3">
                          <label htmlFor="total-rent">Total Rent: </label>
                          {
                            formik.values.startDate && formik.values.endDate && (
                              <span className='rent'> &#x20b9;
                                {calculateHoursDiff() * carData.pricePerHour}
                              </span>
                            )
                          }
                        </div>
                        <div className='mb-3 text-center'>
                          <button className='btn bookBtn' type='submit'>Book Now</button>
                        </div>
                      </form>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>

                    </Modal.Footer>
                  </Modal>
                )
              }
            </div>
          </div>)
      }
    </>
  )
}


