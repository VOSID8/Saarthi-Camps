import React, { useState } from 'react';
import axios from 'axios';
import api_url from '../config';

function RefugeeDetails() {
  const [refugeeId, setRefugeeId] = useState('');
  const [refugeeDetails, setRefugeeDetails] = useState(null);
  const [medDetails, setMedDetails] = useState(null)

  const handleSearch = () => {
    const token = localStorage.getItem("accessToken")

    const config = {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }

    axios.get(`${api_url}refugee/${refugeeId}`, config)
      .then(response => {
        console.log(response);
        setRefugeeDetails(response.data);
      })
      .catch(error => {
        console.error(error);
      });

    axios.get(`${api_url}order/refugee/${refugeeId}`, config)
      .then(response => {
        console.log(response);
        setMedDetails(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div>
      <h2>Refugee Details</h2>
      <input
        type="text"
        placeholder="Enter Refugee ID"
        value={refugeeId}
        onChange={(e) => setRefugeeId(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {refugeeDetails && (
        <div>
          <img src={refugeeDetails.imageURL} alt="" />
          <h3>Name: {refugeeDetails.name}</h3>
          <p>Gender: {refugeeDetails.gender}</p>
          <p>Date of Birth: {new Date(refugeeDetails.dob).toLocaleDateString()}</p>
          <p>Refugee ID: {refugeeDetails.refugeeId}</p>
          {/* <p>Created At: {new Date(refugeeDetails.createdAt).toLocaleString()}</p> */}
          {/* <p>Updated At: {new Date(refugeeDetails.updatedAt).toLocaleString()}</p> */}
          <h3>Medicine Details</h3>
          <div>{medDetails[0].medicineName}</div>
        </div>
      )}
    </div>
  );
}

export default RefugeeDetails;
