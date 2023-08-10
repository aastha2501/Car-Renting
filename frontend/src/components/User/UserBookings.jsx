import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';

export default function UserBookings() {

    const [data, setData] = useState();
    const [cancelPopup, setCancelPopup] = useState();
    const [productId, setProductId] = useState();

    var token = JSON.parse(localStorage.getItem("token"));
    useEffect(() => {
        axios.get("https://localhost:7104/api/User/getBookings", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then((response) => {
         
            setData(response.data);

        }).catch((error) => {
            console.log(error);
        })
    }, [data]);

    const handleCancel = (id) => {
        setProductId(id);
        setCancelPopup(true);
    }

    const handleCancelSuccess = (productId) => {
        axios
        .delete("https://localhost:7104/CancelBooking/" + productId, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then((response) => {
            setCancelPopup(false);
            toast.error("Cancelled!!");
        }).catch((error) => {
            console.log(error);
        })
    }   

    const handleDeleteClose = () => {
        setCancelPopup(false);
    }
    return (
        <div>
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
            <div className="mt-3 table-resposive p-3">
                <table className='table table-hover'>
                    <thead className='table-light'>
                        <tr>
                            <th scope="col">Image</th>
                            <th scope="col">Model</th>
                            <th scope="col">Brand</th>
                            <th scope="col">Pick up(Date/Time) <i class="fa-solid fa-calendar-days"></i></th>
                            <th scope="col">Drop off(Date/Time) <i class="fa-solid fa-calendar-days"></i></th>
                            <th scope="col">Price per hour &#8377;</th>
                            <th scope="col">Total Price &#8377;</th>
                            <th scope="col">Cancel</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data ? (
                                data.map((item, i) => {
                                    return <tr key={i}>
                                        <td>
                                            <img src={item.image} style={{ height: "120px", width: "200px" }} alt="image" />
                                        </td>
                                        <td>{item.carModel}</td>
                                        <td>{item.brand}</td>
                                        <td>{item.startDate}</td>
                                        <td>{item.endDate}</td>
                                        <td>{item.pricePerHour}/-</td>
                                        <td>{item.totalPrice}/-</td>
                                        <td>
                                            {
                                                item.isCancelled == true ? <button className='btn' disabled style={{ backgroundColor: "tomato", color: "white" }}>Cancel</button> :  <button className='btn' onClick={() => handleCancel(item.id)} style={{ backgroundColor: "tomato", color: "white" }}>Cancel</button>
                                            }
                                           
                                        </td>
                                    </tr>
                                })
                            ) : <div>no bookings</div>
                        }
                   </tbody>
                </table>
            </div>

            {
        cancelPopup && (
          <Modal centered show={cancelPopup}>
            <Modal.Header>
              <Modal.Title>Cancel Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>are you sure you want to cancel?</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={() => handleCancelSuccess(productId)}>
                Yes
              </Button>
              <Button variant="primary" onClick={handleDeleteClose}>
                No
              </Button>

              <Button variant="secondary" onClick={handleDeleteClose}>
                Close
              </Button>

            </Modal.Footer>
          </Modal>
        )
      }
        </div>
    )
}
