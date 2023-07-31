import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function UserBookings() {

    const [data, setData] = useState();

    var token = JSON.parse(localStorage.getItem("token"));
    useEffect(() => {
        axios.get("https://localhost:7104/api/User/getBookings", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then((response) => {
            console.log(response.data);
            setData(response.data);
        }).catch((error) => {
            console.log(error);
        })
    }, []);

    return (
        <div>
            <div className="mt-3 table-resposive p-3">
                <table className='table table-bordered table-hover'>
                    <thead className='table-light'>
                        <tr>
                            <th scope="col">Image</th>
                            <th scope="col">Model</th>
                            <th scope="col">Brand</th>
                            <th scope="col">Pick up(Date/Time)</th>
                            <th scope="col">Drop off(Date/Time)</th>
                            <th scope="col">Price per hour &#8377;</th>
                            <th scope="col">Total Price &#8377;</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data && (
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
                                        {/* <td> */}
                                        {/* <button className='btn btn-danger' onClick={() => handleDelete(item.productId)}>Delete</button>
                      {" "} <button className="btn btn-info" onClick={() => EditProduct(item.productId)}>Edit</button> */}
                                        {/* </td> */}
                                    </tr>
                                })
                            )
                        }

                    </tbody>
                </table>
            </div>
        </div>
    )
}
