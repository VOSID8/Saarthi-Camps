import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios"

import api_url from "../config";
const url = api_url + "refugee/" 

function Registration() {
  const [refugeeID, setRefugeeID] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    gender: "male",
    dob: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const token = localStorage.getItem("accessToken")

    const config = {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }

    if(formData) {
      try {
        axios
          .post(url, formData, config)
          .then((response) => {
            if (!response.data.error) {
              console.log(response);
              setRefugeeID(response.data.refugeeId);
              setIsSubmitted(true);
            }
          })
          .catch((error) => {
            alert(`An error occured ${error}`)
          })
      }
      catch {
        alert('An error occurred')
      }
    }
  };

const handleChange = (event) => {
  const { name, value } = event.target;

  if (name === "dob") {
    const date = new Date(value);
    const formattedDate = date.toISOString().split('T')[0];
    setFormData({
      ...formData,
      dob: formattedDate
    });
  } else {
    setFormData({
      ...formData,
      [name]: value
  })}
};

const navigate = useNavigate();
const handleMeds = () => {
  navigate('/add-medicine');
}


const renderForm = (
  <div className="">
    <form onSubmit={handleSubmit} className="justify-items-start">
      <div className="">
        <label className="w-full">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-2 border-b-2 mb-8 focus:outline-none"

        />
      </div>
      <div className="w-full mb-8">
        <label>Gender</label>
        <div className="w-full flex justify-between p-2">
          <label className="">
            <input
              type="radio"
              name="gender"
              value="male"
              checked={formData.gender === "male"}
              onChange={handleChange}
              className="mr-2"
            />
            Male
          </label>
          <label className="">
            <input
              type="radio"
              name="gender"
              value="female"
              checked={formData.gender === "female"}
              onChange={handleChange}
              className="mr-2"
            />
            Female
          </label>
          <label className="">
            <input
              type="radio"
              name="gender"
              value="other"
              checked={formData.gender === "other"}
              onChange={handleChange}
              className="mr-2"
            />
            Other
          </label>
        </div>
      </div>
      <div className="">
        <label className="w-full">DOB</label>
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          required
          className="w-full p-2 border-b-2 mb-8 focus:outline-none"
        />
      </div>
      <div >
        <input className="p-2 px-10 w-full font-semibold bg-yellow hover:outline transition-transform rounded-none" type="submit" value="Submit" />
      </div>
    </form>
  </div>
);

const confirmation = (
  <div>
    <p>Form submitted successfully.</p> <br />
    <p>Your Registration Number is {refugeeID} </p>

    <div className="flex mt-6">
      <button className="p-2 px-10 w-full font-semibold bg-yellow hover:outline transition-transform rounded-none mr-2" onClick={handleMeds}>Add Medicine</button>
      <button className="p-2 px-10 w-full font-semibold bg-yellow hover:outline transition-transform rounded-none" onClick={() => window.location.reload()}>New Form</button>
    </div>
  </div>
)

return (
  <div className="w-[100vw] absolute top-0 bg-medcamp bg-cover h-[100vh]">
    {/* h-[100vh] m-auto md:pl-300px md:w-[calc(100vw-300px)] */}
    <div className="container p-10 w-[95%] md:w-[50%] shadow-lg bg-white mt-[15vh] m-auto md:absolute md:right-20">
      {/* m-auto h-auto p-5 bg-darkb */}
      <div className="text-2xl pb-8 text-center font-semibold">Refugee Registration Form</div>
      <div className="text-left">
        {isSubmitted ? (confirmation) : (renderForm)}
      </div>
    </div>
  </div>
);
}

export default Registration;
