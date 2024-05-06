export default function ManageDEO() {
  return (
    <div className="md:w-[100vw] absolute top-0 h-[100vh]">
      <CreateDEOForm />
    </div>
  )
}

import { useRef, useState, useEffect } from 'react'

import axios from 'axios'
import api_url from '../config'
import CircularProgress from '@mui/material/CircularProgress'
import { Snackbar } from '@mui/joy'
import hidePassword from '../assets/icons/hidePassword.png'
import viewPassword from '../assets/icons/viewPassword.png'
const url = api_url + 'user/create-deo'

const CreateDEOForm = () => {
  const userRef = useRef()
  const errRef = useRef()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const [open, setOpen] = useState(false)
  const [success, setSuccess] = useState(false)
  const [passType, setPassType] = useState('password')
  const [processing, setProcessing] = useState(false)

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
      setOpen(false)
      setProcessing(true)
      try {
        setProcessing(true)
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
              setOpen(false)
              setProcessing(false)
              setSuccess(true)
            }
          })
          .catch((error) => {
            console.log(error)
            setErrMsg(error.response.data.message)
            setOpen(true)
            setProcessing(false)
            console.log(error)
          })
      } catch (error) {
        setErrMsg(error)
        setOpen(true)
        setProcessing(false)
        alert(error)
      }
    }
  }

  return (
    <div className="w-[100vw] h-[100vh] m-0 p-0 flex bg-family bg-cover bg-right md:bg-top">
      <section className="text-left p-10  w-[350px] h-[75%] m-auto mt-[110px] md:mr-[10vw] bg-white flex flex-col justify-center ">
        {success ? (
          <div className="text-center">
            <label className="pb-5 font-bold">
              Data Entry Operator Added Sucessfully
            </label>{' '}
            <br />
            <div className="flex mt-6">
              <button
                className="p-2 px-10 w-full font-semibold bg-yellow hover:outline transition-transform rounded-none"
                onClick={() => window.location.reload()}
              >
                Add Another DEO
              </button>
            </div>
            <div className="flex mt-6"></div>
          </div>
        ) : (
          <div>
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

              <button
                id="add-deo"
                className="p-2 px-10 bg-yellow font-semibold hover:outline transition-colors duration-150 rounded-none"
              >
                {processing ? (
                  <CircularProgress color="inherit" size="25px" />
                ) : (
                  'CREATE DEO'
                )}
              </button>
            </form>
          </div>
        )}
      </section>

      <Snackbar
        autoHideDuration={2000}
        color="danger"
        variant="solid"
        onClose={() => {
          setOpen(false)
          return
        }}
        open={open}
      >
        {errMsg}
      </Snackbar>
    </div>
  )
}
