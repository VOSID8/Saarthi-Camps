export default function ManageDoctor() {
  return (
    <div className="md:w-[100vw] absolute top-0 h-[100vh]">
      <CreateDocForm />
    </div>
  )
}

import CircularProgress from '@mui/material/CircularProgress'
import { useRef, useState, useEffect, useContext } from 'react'
import AuthContext from '../components/AuthProvider2'
import axios from 'axios'
import api_url from '../config'
import { useNavigate } from 'react-router-dom'
import { React, Typography } from 'react'
const url = api_url + 'user/create-doctor'

const CreateDocForm = () => {
  const navigate = useNavigate()
  const userRef = useRef()
  const errRef = useRef()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [spc, setSpc] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    userRef.current.focus()
  }, [])
  useEffect(() => {
    setErrMsg('')
  }, [email, name])

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(email)
    console.log(name)
    const token = localStorage.getItem('accessToken')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    if (email && name) {
      try {
        setIsLoading(true)
        axios
          .post(
            url,
            {
              email: email.trim(),
              name: name.trim(),
              specialization: spc,
            },
            config
          )
          .then((response) => {
            if (!response.data.error) {
              // console.log(response);
              setName('')
              setEmail('')
              setSuccess(true)
              setIsLoading(false)
              setSpc(null)
            }
          })
          .catch((error) => {
            console.log(error)
            setIsLoading(false)
            setErrMsg(error.response.data.message)
          })
      } catch (error) {
        alert(error)
        setIsLoading(false)
      }
    }
  }
  return (
    <div className="w-[100vw] h-[100vh] p-0 flex bg-family bg-cover bg-right md:bg-top ">
      <section className="text-left p-5 w-[350px] h-[70%] mt-[110px]  m-auto md:mr-[10vw] bg-white flex flex-col justify-center ">
        {success ? (
          <div className="text-center">
            <label className="pb-5 font-bold">Docter Added Sucessfully</label>{' '}
            <br />
            <div className="flex mt-6">
              <button
                className="p-2 px-10 w-full font-semibold bg-yellow hover:outline transition-transform rounded-none"
                onClick={() => window.location.reload()}
              >
                Add Another Doctor
              </button>
            </div>
          </div>
        ) : (
          <div>
            <label className="ml-[110px] pb-8 text-center font-bold">
              ADD DOCTOR
            </label>
            <form onSubmit={handleSubmit}>
              <label htmlFor="username" className="font-regular">
                USERNAME
              </label>
              <br />
              <input
                type="username"
                id="username"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
                className=" p-2 w-full border-b-2 mb-8 focus:outline-none"
              />
              <br />

              <label htmlFor="email" className="font-regular">
                EMAIL
              </label>
              <br />
              <input
                type="email"
                id="email"
                ref={userRef}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                className="p-2 w-full border-b-2 mb-8 focus:outline-none"
              />
              <br />

              <label htmlFor="userType" className="font-regular">
                SPECIALIZATION
              </label>
              <br />
              <select
                id="specialization"
                onChange={(e) => setSpc(e.target.value)}
                className="p-2 w-full border-b-2 mb-8 focus:outline-none"
              >
                <option value="General Practitioner">
                  General Practitioner
                </option>
                <option value="Pediatrician">Pediatrician</option>
                <option value="Obstetrician/Gynecologist">
                  Obstetrician/Gynecologist
                </option>
                <option value="Internal Medicine Physician">
                  Internal Medicine Physician
                </option>
                <option value="Infectious Disease Specialist">
                  Infectious Disease Specialist
                </option>
                <option value="Psychiatrist">Psychiatrist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Ophthalmologist">Ophthalmologist</option>
                <option value="Dentist">Dentist</option>
                <option value="other">Other</option>
              </select>
              <br />

              <p
                id="errRef2"
                ref={errRef}
                className={errMsg ? 'errmsg' : 'offscreen'}
                aria-live="assertive"
              >
                {errMsg}
              </p>

              <button
                id="add-doc"
                className="p-2 px-10 w-full bg-yellow font-semibold hover:outline transition-colors duration-150 rounded-none"
              >
                {isLoading ? (
                  <CircularProgress color="inherit" size="25px" />
                ) : (
                  'CREATE DEO'
                )}
              </button>
            </form>
          </div>
        )}
      </section>
    </div>
  )
}
