import logo from '../assets/saarthi.png'
import logout from '../assets/icons/turn-off.png'

import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from './AuthProvider2'

function Seperator() {
  return (
    <div className="w-[0.75px] opacity-20 hidden md:block">
      <div className="h-1/4"></div>
      <div className="bg-black h-1/2"></div>
    </div>
  )
}

function Navbar() {
  const [activePage, setActivePage] = useState('')
  const location = useLocation()
  const authCtx = useContext(AuthContext)

  // Set the active page based on the current route when the component mounts
  useEffect(() => {
    setActivePage(location.pathname)
  }, [location.pathname])

  const handleLogout = async () => {
    authCtx.logout()
  }

  return (
    <div className="flex md:m-10 md:mx-20 relative z-20">
      <div className="w-fit h-fit ">
        <Link to="/home">
          <img
            src={logo}
            alt="Logo"
            className="h-[50px] md:h-[100px] absolute bg-yellow hidden md:block"
          />
        </Link>
        <Link to="/data">
          <img
            src={logo}
            alt="Logo"
            className="h-[50px] md:h-[100px] absolute bg-yellow hidden md:block"
          />
        </Link>
      </div>

      <div className="flex justify-between items-center w-full bg-white shadow-md md:ml-[110px] font-bold">
        <div className="flex">
          <Link
            to="/home"
            id="go-to-home"
            className={`hidden md:block py-3 px-6 hover:bg-yellow ${
              activePage === '/home' ? 'active  border-b-2' : ''
            }`}
          >
            HOW WE WORK
          </Link>

          <Link to="/home" className="md:hidden flex h-full items-center">
            <div className="md:hidden pl-2 text-lg">Saarthi</div>
          </Link>

          <Seperator />
        </div>

        <div className="flex flex-row-reverse">
          <Link to="/" onClick={handleLogout} className="">
            <div
              id="logout-btn"
              className="flex items-center h-[100%] px-3 hover:bg-yellow"
            >
              <img src={logout} alt="Logoout" className="h-[30px]" />
            </div>
          </Link>

          {(authCtx.isAdmin || authCtx.isDoc) && (
            <>
              {/* <Seperator />
              <Link
                to="/add-refugee"
                className={` py-3 px-6 bg-yellow ${
                  activePage === '/add-refugee' ? 'active border-b-2' : ''
                }`}
              >
                ADD REFUGEE
              </Link>
              <Seperator />
              <Link
                to="/add-medicine"
                className={` py-3 px-6 hover:bg-yellow ${
                  activePage === '/add-medicine' ? 'active  border-b-2' : ''
                }`}
              >
                ADD MEDICINE
              </Link> */}
              {/* <Seperator /> */}
              <Link
                id="consult"
                to="/consult"
                className={` py-3 px-6 hover:bg-yellow ${
                  activePage === '/consult' ? 'active  border-b-2' : ''
                }`}
              >
                LIVE CONSULTANCY
              </Link>
              <Seperator />
              <Link
                id="view-details"
                to="/view-details"
                className={`hidden md:block py-3 px-6 hover:bg-yellow ${
                  activePage === '/view-details' ? 'active  border-b-2' : ''
                }`}
              >
                VIEW DETAILS
              </Link>
            </>
          )}

          {authCtx.isAdmin && (
            <>
              <Seperator />
              <Link
                to="/manage-deo"
                id="manage-deo"
                className={`hidden md:block py-3 px-6 hover:bg-yellow ${
                  activePage === '/view-details' ? 'active  border-b-2' : ''
                }`}
              >
                ADD DEO
              </Link>
              <Seperator />
              <Link
                id="add-doctor"
                to="/manage-doctor"
                className={`hidden md:block py-3 px-6 hover:bg-yellow ${
                  activePage === '/view-details' ? 'active  border-b-2' : ''
                }`}
              >
                ADD DOCTOR
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
