import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function Dashboard() {

  const [data, setData] = useState();
  var token = JSON.parse(localStorage.getItem("token"))

  useEffect(() => {
    axios
      .get("https://localhost:7104/api/User/getall", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      }).catch((error) => {
        console.log(error);
      })
  }, []);

  return (
    <div className='mt-5 container'>
      <div className='row'>
        {
          data && data.map((item, i) => {
           return <div key={i} className="col-lg-4 mb-4">
            <div className="card">
              <img src={item.imageUrl} alt="" className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title"><span>{item.model} </span><span>{item.brand}</span></h5>
                <p>&#x20b9; {item.pricePerHour}</p>
                <p className="card-text">{item.description}</p>
                <button className='btn btn-primary'>Rent Now</button>
              </div>
            </div>
          </div>
          }) 
        }
       
      </div>
    </div>
  )
}
