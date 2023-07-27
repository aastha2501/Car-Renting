import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useFormik } from "formik";
import "../../styles/user.css";
import Spinner from 'react-bootstrap/Spinner';

export default function Dashboard() {

  const [data, setData] = useState();
  const [show, setShow] = useState(false);
  const [productId, setProductId] = useState();
  const [carData, setCarData] = useState();
  const [loading, setLoading] = useState(false);

  var token = JSON.parse(localStorage.getItem("token"))

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://localhost:7104/api/User/getall", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      .then((response) => {
        console.log(response.data);
        setData(response.data);
        setLoading(false);
      }).catch((error) => {
        console.log(error);
        setLoading(false);
      })
  }, []);

  const formik = useFormik({
    initialValues: {
      startDate: '',
      endDate: ''
    },
    onSubmit: (values, {resetForm}) => {
      console.log(values);
      resetForm();
    }
  })

  const handleClose = () => {
    setShow(false);
  }

  const handleRentClick = (productId) => {
    console.log(productId);

    axios.get("https://localhost:7104/api/User/getCar/" + productId, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }).then((response) => {
      console.log(response.data);
      setCarData(response.data);
      setShow(true);
    }).catch((error) => {
      console.log(error);
    })

  }

  const calculateHoursDiff = () => {
    const {startDate, endDate} = formik.values;
    if(!startDate || !endDate) return;

        const startDateTime = new Date(startDate);
        const endDateTime = new Date(endDate);
        const timeDifference = endDateTime - startDateTime;
    
        const hoursDifference = timeDifference / (1000 * 60 * 60);
        return hoursDifference;
  }
  return (
    <>
   
   { 
    loading ? <Spinner animation="grow" variant="secondary" />
: ( <div className='mt-5 container'>
<div className='row'>
  {
    data && data.map((item, i) => {
      return <div key={i} className="col-lg-3 mb-4">
        <div className="card">
          <img src={item.image} alt="" className="card-img-top" />
          <div className="card-body">
            <h5 className="card-title"><span>{item.carModel} </span><span>{item.brand}</span></h5>
            <p>Price per hour: &#x20b9; {item.pricePerHour}</p>
            <p className="card-text">Seats: {item.seats}</p>
            <button className='btn btn-primary' onClick={() => handleRentClick(item.id)}>Rent Now</button>
          </div>
        </div>
      </div>
    })
  }
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
                <img src={carData.imagePath} height="100px" alt='image' />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="startDate">From:</label>

              <input
                id="startDate"
                type="datetime-local"
                name="startDate"
                className='form-control' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.startDate}/>
            </div>
            <div className="mb-5">
              <label htmlFor="endDate">To:</label>

              <input type="datetime-local" id="endDate"
                name="endDate" 
                min="2018-06-07T00:00" max="2024-06-14T00:00" className='form-control' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.endDate}/>
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



// import { useFormik } from 'formik';

// const YourFormComponent = () => {
//   const formik = useFormik({
//     initialValues: {
//       startDate: '', // Assuming your Formik form has a field for the start date with the name "startDate"
//       endDate: '',   // Assuming your Formik form has a field for the end date with the name "endDate"
//     },
//     onSubmit: values => {
//       // Handle form submission here
//     },
//   });

//   const calculateHoursDifference = () => {
//     const { startDate, endDate } = formik.values;
    
//     if (!startDate || !endDate) {
//       // Handle validation here if either startDate or endDate is not selected
//       return;
//     }

//     const startDateTime = new Date(startDate);
//     const endDateTime = new Date(endDate);
//     const timeDifference = endDateTime - startDateTime;

//     const hoursDifference = timeDifference / (1000 * 60 * 60);
//     return hoursDifference;
//   };

//   return (
//     <form onSubmit={formik.handleSubmit}>
//       <label>Start Date:</label>
//       <input
//         type="datetime-local"
//         name="startDate"
//         value={formik.values.startDate}
//         onChange={formik.handleChange}
//       />
//       <br />

//       <label>End Date:</label>
//       <input
//         type="datetime-local"
//         name="endDate"
//         value={formik.values.endDate}
//         onChange={formik.handleChange}
//       />
//       <br />

//       <button type="submit">Submit</button>

//       {/* Display the calculated hours difference */}
//       {formik.values.startDate && formik.values.endDate && (
//         <div>
//           Hours Difference: {calculateHoursDifference()}
//         </div>
//       )}
//     </form>
//   );
// };

// export default YourFormComponent;
