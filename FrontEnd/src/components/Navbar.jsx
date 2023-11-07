import logo from '../assets/saarthi.png';
import logout from '../assets/icons/turn-off.png'

import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from './AuthProvider';
import { motion } from 'framer-motion';

function Seperator () {
    return (
        <div className="w-[0.75px] opacity-20 hidden md:block">
            <div className="h-1/4"></div>
            <div className="bg-black h-1/2"></div>
        </div>
    )
}

function Navbar() {
    const [activePage, setActivePage] = useState("");
    const location = useLocation();
    const authCtx = useContext(AuthContext)
    const navigate = useNavigate();

    // Set the active page based on the current route when the component mounts
    useEffect(() => {
        setActivePage(location.pathname);
    }, [location.pathname]);

    const handleLogout = async () => {
        authCtx.logout();
    };


    return (
        <div className="flex md:m-10 md:mx-20 relative z-20" >
            <div className="w-fit h-fit ">
                <Link to="/home">
                <img src={logo} alt="Logo" className="h-[50px] md:h-[100px] absolute bg-yellow hidden md:block"/>
                </Link>  
            </div>

            <div className="flex justify-between items-center w-full bg-white shadow-md md:ml-[110px] font-bold">

                <div className="flex">
                    <Link to="/home" className={`hidden md:block py-3 px-6 hover:bg-yellow ${activePage === "/home" ? "active  border-b-2" : ""}`}>
                        HOW WE WORK
                    </Link>

                    <Link to="/home" className='md:hidden flex h-full items-center'>
                        <div className="md:hidden pl-2 text-lg">Saarthi</div>
                    </Link>  
                    
                    <Seperator />
                </div>

                <div className="flex flex-row-reverse">
                    <Link to="/" onClick={handleLogout} className="">
                        <div className="flex items-center h-[100%] md:px-3">
                            <img src={logout} alt="Logoout" className="h-[30px]"/>
                        </div>   
                    </Link>
                    <Link to="/add-refugee" className={` py-3 px-6 bg-yellow ${activePage === "/add-refugee" ? "active border-b-2" : ""}`}>
                        ADD REFUGEE
                    </Link>
                        <Seperator />
                    <Link to="/add-medicine" className={`hidden md:block py-3 px-6 hover:bg-yellow ${activePage === "/add-medicine" ? "active  border-b-2" : ""}`}>
                        ADD MEDICINE
                    </Link>
                        <Seperator />
                    <Link to="/view-details" className={`hidden md:block py-3 px-6 hover:bg-yellow ${activePage === "/view-details" ? "active  border-b-2" : ""}`}>
                        VIEW DETAILS
                    </Link>
                </div>
            </div>
        </div>

    );
}

export default Navbar;
