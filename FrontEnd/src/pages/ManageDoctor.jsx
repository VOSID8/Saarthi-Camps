export default function ManageDoctor() {
  return (
    <div className="md:w-[100vw] absolute top-0 h-[100vh]">
      <CreateDEOForm />
    </div>
  )
}

import { useRef, useState, useEffect, useContext } from 'react'
import AuthContext from '../components/AuthProvider2'
import axios from 'axios'
import api_url from '../config'
import { useNavigate } from 'react-router-dom'

const url = api_url + 'user/create-doctor'

const CreateDEOForm = () => {
  const navigate = useNavigate()
  const userRef = useRef()
  const errRef = useRef()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [spc, setSpc] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const [success, setSuccess] = useState(false)

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
              setSpc(null)
            }
          })
          .catch((error) => {
            console.log(error)
            setErrMsg(error.response.data.message)
          })
      } catch (error) {
        alert(error)
      }
    }
  }
  return (
    <div className="w-[100vw] h-[100vh] m-0 p-0 flex bg-family bg-cover bg-right md:bg-top">
      {success ? (
        <section className="text-left p-10 outline w-[350px] m-auto bg-white">
          <h1 id="success">Doctor Added Successfully!</h1>
          <br />
        </section>
      ) : (
        <section className="text-left p-10 w-[350px] m-auto md:mr-[10vw] bg-white ">
          <h1 className="pb-8 text-center font-semibold">ADD DOCTOR</h1>
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
              <option value="General Practitioner">General Practitioner</option>
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
              ADD DOCTOR
            </button>
          </form>
        </section>
      )}
    </div>
  )
}
