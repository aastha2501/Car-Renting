import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Bookings() {

    var token = JSON.parse(localStorage.getItem("token"));
    const [data, setData] = useState();

    useEffect(() => {
        axios
            .get("https://localhost:7104/api/Admin/allbookings", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then((response) => {
              
                setData(response.data);
            }).catch((error) => {
                console.log(error);
            })
    }, [])
    return (
        <div>
            <div className="mt-3 table-resposive p-3" style={{ overflowX: "auto" }}>
                <table className='table table-hover'>
                    <thead className='table-dark'>
                        <tr>
                            <th scope="col">Username</th>
                            <th scope="col">Model</th>
                            <th scope="col">Brand</th>
                            <th scope='col'>Pickup (date/time) <i class="fa-solid fa-calendar-days"></i></th>
                            <th scope="col">Drop off (date/time) <i class="fa-solid fa-calendar-days"></i></th>
                            <th scope="col">Total Rent &#8377;</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data && data.map((item, i) => {
                                return <tr key={i}>
                                    <td>{item.userName}</td>
                                    <td>{item.model}</td>
                                    <td>{item.brand}</td>
                                    <td>{item.startDate}</td>
                                    <td>{item.endDate}</td>
                                    <td>{item.totalRent}/-</td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div >
    )
}
