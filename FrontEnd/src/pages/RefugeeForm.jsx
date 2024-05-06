import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress'
import api_url from '../config'
const url = api_url + 'refugee/'

function Registration() {
  const [refugeeID, setRefugeeID] = useState('')
  const [formData, setFormData] = useState({
    image: '',
    name: '',
    gender: 'male',
    dob: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(formData)
    const token = localStorage.getItem('accessToken')

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    }
    if (formData) {
      setIsLoading(true)
      const formData2 = new FormData()
      var imagefile = document.querySelector('#file')
      formData2.append('image', imagefile.files[0])
      formData2.append('name', formData.name)
      formData2.append('gender', formData.gender)
      formData2.append('dob', formData.dob)

      try {
        axios
          .post(url, formData2, config)
          .then((response) => {
            if (!response.data.error) {
              console.log(response)
              setRefugeeID(response.data.refugeeId)
              setIsSubmitted(true)
              setIsLoading(false)
            }
          })
          .catch((error) => {
            alert(`An error occured ${error}`)
            setIsLoading(false)
          })
      } catch {
        alert('An error occurred')
        setIsLoading(false)
      }
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target

    if (name === 'dob') {
      const date = new Date(value)
      const formattedDate = date.toISOString().split('T')[0]
      setFormData({
        ...formData,
        dob: formattedDate,
      })
    } else if (name === 'image') {
      handleFileChange(event)
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  const navigate = useNavigate()
  const handleMeds = () => {
    navigate('/add-medicine')
  }

  const [imagePreview, setImagePreview] = useState(null)
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData({
          ...formData,
          image: reader.result,
        })
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    } else {
      setFormData({
        ...formData,
        image: null,
      })
      setImagePreview(null)
    }
  }

  const handleRemoveImage = () => {
    setFormData({
      ...formData,
      image: null,
    })
    setImagePreview(null)
  }

  const renderForm = (
    <div className="">
      <form onSubmit={handleSubmit} className="justify-items-start">
        <div className="w-[100px] h-[100px] rounded-full outline overflow-hidden m-auto">
          <label className="w-[100%] h-[100%] relative">
            {imagePreview ? (
              <>
                <img src={imagePreview} alt="Cover Photo" className="contain" />
                <button
                  onClick={handleRemoveImage}
                  className="absolute top-0 right-0 mt-2 mr-2 px-2 py-1 rounded-md"
                >
                  Change
                </button>
              </>
            ) : (
              <div className="absolute flex justify-center items-center w-[100%] h-full text-center">
                <div className="">Add a Cover Photo</div>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              name="image"
              id="file"
              className={`opacity-0 w-[100%] h-[100%] ${
                imagePreview ? `hidden` : `block`
              }`}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="">
          <label className="w-full">Name</label>
          <input
            type="text"
            name="name"
            id="name"
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
                id="male"
                checked={formData.gender === 'male'}
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
                id="female"
                checked={formData.gender === 'female'}
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
                id="other"
                checked={formData.gender === 'other'}
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
            id="dob"
            value={formData.dob}
            onChange={handleChange}
            required
            className="w-full p-2 border-b-2 mb-8 focus:outline-none"
          />
        </div>

        <button
          id="submit-form"
          className="p-2 px-10 w-full font-semibold bg-yellow hover:outline transition-transform rounded-none"
          type="submit"
        >
          {isLoading ? (
            <CircularProgress color="inherit" size="22px" />
          ) : (
            'SUBMIT'
          )}
        </button>
      </form>
    </div>
  )

  const confirmation = (
    <div>
      <p>Form submitted successfully.</p> <br />
      <p>
        Your Registration Number is{' '}
        <strong id="refugeeId"> {refugeeID} </strong>
      </p>
      <div className="flex mt-6">
        <button
          className="p-2 px-10 w-full font-semibold bg-yellow hover:outline transition-transform rounded-none mr-2"
          onClick={handleMeds}
        >
          Add Medicine
        </button>
        <button
          className="p-2 mr-2 px-10 w-full font-semibold bg-yellow hover:outline transition-transform rounded-none"
          onClick={() => window.location.reload()}
        >
          Consult a Specialist
        </button>
        <button
          className="p-2 px-10 w-full font-semibold bg-yellow hover:outline transition-transform rounded-none"
          onClick={() => window.location.reload()}
        >
          New Form
        </button>
      </div>
        <button className="p-2 px-10 w-full font-semibold bg-yellow hover:outline transition-transform rounded-none" onClick={() => window.location.reload()}>New Form</button>
    </div>
  )

  return (
    <div className="w-[100vw] absolute top-0 bg-medcamp bg-cover h-[120vh]">
      {/* h-[100vh] m-auto md:pl-300px md:w-[calc(100vw-300px)] */}
      <div className="container p-6 w-[95%] md:w-[40%] shadow-lg bg-white mt-[17vh] m-auto md:absolute md:right-20">
        {/* m-auto h-auto p-5 bg-darkb */}
        <div className="text-2xl pb-8 text-center font-semibold">
          Refugee Registration Form
        </div>
        <div className="text-left">
          {isSubmitted ? confirmation : renderForm}
        </div>
      </div>
    </div>
  )
}

export default Registration
