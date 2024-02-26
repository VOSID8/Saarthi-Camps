export default function ManageDEO() {
  return (
    <div className="md:w-[100vw] absolute top-0 h-[100vh]">
      <CreateDEOForm />
    </div>
  )
}

import { useRef, useState, useEffect } from 'react'
// import AuthContext from '../components/AuthProvider2'
import axios from 'axios'
import api_url from '../config'
// import { useNavigate } from 'react-router-dom'

import hidePassword from '../assets/icons/hidePassword.png'
import viewPassword from '../assets/icons/viewPassword.png'
const url = api_url + 'user/create-deo'

const CreateDEOForm = () => {
  // const navigate = useNavigate()
  const userRef = useRef()
  const errRef = useRef()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const [success, setSuccess] = useState(false)
  const [passType, setPassType] = useState('password')

  useEffect(() => {
    userRef.current.focus()
  }, [])
  useEffect(() => {
    setErrMsg('')
  }, [email, name, password])
  const handlePassType = () => {
    if (passType === 'password') {
      setPassType('text')
    } else {
      setPassType('password')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(email)
    console.log(name)
    console.log(password)
    const token = localStorage.getItem('accessToken')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    if (email && name && password) {
      try {
        axios
          .post(
            url,
            {
              email: email.trim(),
              name: name.trim(),
              password: password.trim(),
            },
            config
          )
          .then((response) => {
            if (!response.data.error) {
              console.log(response)
              setName('')
              setEmail('')
              setPassword('')
              setSuccess(true)
            }
          })
          .catch((error) => {
            console.log(error)
            setErrMsg(error.response.data.message)
            console.log(error)
          })
      } catch (error) {
        alert(error)
      }
    }
  }

  return (
    <div className="w-[100vw] h-[100vh] m-0 p-0 flex bg-family bg-cover bg-right md:bg-top">
      {success ? (
        <section className="text-center h-[80px] m-15 outline w-[350px] m-auto  bg-white">
          <h2 className="font-bold">DEO Created Successfully!</h2>
          <br />
        </section>
      ) : (
        <section className="text-left p-10  w-[350px] m-auto md:mr-[10vw] bg-white ">
          <h2 className="pb-5 text-center font-bold">CREATE DEO</h2>
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
            <label htmlFor="email" className="font-regular">
              Create Password
            </label>
            <br />
            <div className="flex">
              {' '}
              <input
                type={passType}
                id="password"
                ref={userRef}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
                className="p-2 w-full border-b-2 mb-8 focus:outline-none"
              />
              <div className="opacity-[80%]" onClick={handlePassType}>
                <img
                  src={passType === 'password' ? hidePassword : viewPassword}
                  className="h-[35px]"
                />
              </div>
            </div>
            <br />

            <p
              id="errRef"
              ref={errRef}
              className={errMsg ? 'errmsg' : 'offscreen'}
              aria-live="assertive"
            >
              {errMsg}
            </p>

            <button
              id="add-deo"
              className="p-2 px-10 bg-yellow font-semibold hover:outline transition-colors duration-150 rounded-none"
            >
              CREATE DEO
            </button>
          </form>
        </section>
      )}
    </div>
  )
}
