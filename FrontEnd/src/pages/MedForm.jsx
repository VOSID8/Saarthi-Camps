import { useState } from 'react'
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress'
import api_url from '../config'

// import { useLocation } from 'react-router-dom';

export default function MedForm() {
  const [formData, setFormData] = useState({
    refugeeId: '',
    medicineName: '',
    urgency: '0',
    quantity: '',
  })
  const [loading, setLoading] = useState(false)

  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()

    if (formData) {
      setLoading(true)
      const token = localStorage.getItem('accessToken')

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

      try {
        axios
          .post(`${api_url}order/${formData.refugeeId}`, formData, config)
          .then((response) => {
            if (!response.data.error) {
              setIsSubmitted(true)
              setLoading(false)
            }
          })
          .catch((error) => {
            alert(`An error occured ${error}`)
            setLoading(false)
          })
      } catch (error) {
        alert(`An error occurred`)
        setLoading(false)
      }
    } else {
      alert('Please fill form')
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  return (
    <div className="md:w-[100vw] absolute top-0 bg-meds bg-cover h-[110vh]">
      <div className="container p-10 w-[95%] md:w-[40%] shadow-lg bg-white mt-[17vh] m-auto md:absolute md:right-20">
        <div className="text-2xl pb-8 text-center font-semibold">
          Refugee Medication Form
        </div>
        <div className="text-left">
          {isSubmitted ? (
            <div>
              <p>Form submitted successfully.</p> <br />
              <p>Your Medicines Will Arive Soon </p>
              <div className="flex mt-6">
                <button
                  className="p-2 px-10 w-full font-semibold bg-yellow hover:outline transition-transform rounded-none"
                  onClick={() => window.location.reload()}
                >
                  New Medicine Form
                </button>
              </div>
            </div>
          ) : (
            <div className="">
              <form onSubmit={handleSubmit} className="justify-items-start">
                <div className="">
                  <label className="w-full font-semibold">REFUGEE ID</label>
                  <input
                    id="refugee_id"
                    type="text"
                    name="refugeeId"
                    value={formData.refugeeId}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border-b-2 mb-8 focus:outline-none"
                  />
                </div>
                <div className="">
                  <label className="w-full  font-semibold">MEDICINE NAME</label>
                  <div className="select-container mb-8">
                    <input
                      id="medicine_name"
                      type="text"
                      onChange={handleChange}
                      name="medicineName"
                      value={formData.medicineName}
                      className="w-full p-2 border-b-2  focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2">
                  <div className="">
                    <label className=" font-semibold">QUANTITY</label>
                    <br />
                    <input
                      id="quantity"
                      type="number"
                      name="medicineQuantity"
                      value={formData.medicineQuantity}
                      onChange={handleChange}
                      required
                      className="w-20 p-2 border-b-2 mb-8 focus:outline-none"
                    />
                  </div>
                  <div className="w-40 mb-8">
                    <label className=" font-semibold">URGENCY</label>
                    <div className="flex flex-col justify-between p-2">
                      <label className="">
                        <input
                          type="radio"
                          name="medicineUrgency"
                          value="0"
                          id="moderate"
                          checked={formData.medicineUrgency === '0'}
                          onChange={handleChange}
                          className="mr-2"
                        />
                        Moderate
                      </label>
                      <label className="">
                        <input
                          type="radio"
                          name="medicineUrgency"
                          value="1"
                          id="high"
                          checked={formData.medicineUrgency === '1'}
                          onChange={handleChange}
                          className="mr-2"
                        />
                        High
                      </label>
                      <label className="">
                        <input
                          type="radio"
                          name="medicineUrgency"
                          value="2"
                          id="critical"
                          checked={formData.medicineUrgency === '2'}
                          onChange={handleChange}
                          className="mr-2"
                        />
                        Critical
                      </label>
                    </div>
                  </div>
                </div>
                <button
                  id="submit_medicine_btn"
                  className="p-2 px-10 w-full bg-yellow font-bold hover:outline transition-transition "
                  type="submit"
                >
                  {loading ? (
                    <CircularProgress color="inherit" size="22px" />
                  ) : (
                    'SUBMIT'
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
