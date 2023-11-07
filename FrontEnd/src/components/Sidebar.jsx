import logo from '../assets/saarthi.png';
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Sidebar() {
    const [activePage, setActivePage] = useState("");
    const location = useLocation();

    // Set the active page based on the current route when the component mounts
    useEffect(() => {
        setActivePage(location.pathname);
    }, [location.pathname]);

    // const handlePageChange = (page) => {
    //     setActivePage(page);
    // };

    return (
        <div className="w-[100vw] md:h-[100vh] md:w-[300px] bg-white shadow-lg text-darkb mb-8 md:mb-0 relative">
            
            {/* flex md:block justify-between content-center */}
            <div>
                <img src={logo} alt="Logo" className="w-[100px] m-auto" />
            </div>
            <div className="flex md:flex-col">
                <Link to="/add-refugee" className={`nav-item w-full md:w-auto py-3 mx-2 my-1 md:my-1 md:mx-2 hover:outline rounded-md ${activePage === "/add-refugee" ? "active text-white bg-darkb" : " bg-lightb"}`}>
                    Add Refugee
                </Link>
                <Link to="/add-medicine" className={`nav-item w-full md:w-auto py-3 mx-0 my-1 md:my-1 md:mx-2 hover:outline rounded-md ${activePage === "/add-medicine" ? "active text-white bg-darkb" : " bg-lightb"}`}>
                    Add Medicine
                </Link>
                <Link to="/view-details" className={`nav-item w-full md:w-auto py-3 mx-2 my-1 md:my-1 md:mx-2 hover:outline rounded-md ${activePage === "/view-details" ? "active text-white bg-darkb" : " bg-lightb"}`}>
                    View Details
                </Link>
            </div>
            <div className="md:absolute bottom-5 right-2 md:p-3 md:bg-green rounded-md p-2 text-right md:text-center">
                <Link to="/home">
                    [i] Get Help
                </Link>
            </div>
        </div>
    );
}

export default Sidebar;
