import React, { useState } from 'react'
import axios from 'axios'
import api_url from '../config'

function RefugeeDetails() {
  const [refugeeId, setRefugeeId] = useState('')
  const [refugeeDetails, setRefugeeDetails] = useState(null)
  const [medDetails, setMedDetails] = useState(null)

  const handleSearch = () => {
    const token = localStorage.getItem('accessToken')

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    axios
      .get(`${api_url}refugee/${refugeeId}`, config)
      .then((response) => {
        console.log(response)
        setRefugeeDetails(response.data)
      })
      .catch((error) => {
        console.error(error)
      })

    axios
      .get(`${api_url}order/refugee/${refugeeId}`, config)
      .then((response) => {
        console.log(response)
        setMedDetails(response.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }

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
        <div className=" pl-3 items-start">
          <section className="flex items-start">
            <img
              src={refugeeDetails.imageURL}
              alt=""
              className="w-[100px] h-[100px] mr-4"
            />
            <div className="panel panel-default p50 uth-panel">
              <h3 style={{ fontWeight: 'bold' }} className="text-left">
                Name: {refugeeDetails.name}
              </h3>
              <p className="text-left">Gender: {refugeeDetails.gender}</p>
              <p className="text-left">
                Date of Birth:{' '}
                {new Date(refugeeDetails.dob).toLocaleDateString()}
              </p>
              <p className="text-left">
                Refugee ID: {refugeeDetails.refugeeId}
              </p>
            </div>
          </section>
          <div className="pl-2 pt-6">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th className="pr-10">Medicine Name</th>
                  <th className="pr-10">Quantity</th>
                  <th>Urgency</th>
                </tr>
              </thead>
              <tbody>
                {medDetails.map((med, index) => (
                  <tr key={index}>
                    <td align="center">{med.medicineName} </td>
                    <td align="center">{med.medicineQuantity}</td>
                    <td align="center">
                      {med.medicineUrgency === 0
                        ? 'Moderate'
                        : med.medicineUrgency === 1
                        ? 'High'
                        : 'Critical'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default RefugeeDetails
