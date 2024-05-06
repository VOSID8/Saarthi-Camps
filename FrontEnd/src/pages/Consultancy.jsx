import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import api_url from "../config";



function Consultancy() {
    const [formData, setFormData] = useState({
        refugeeId: "",
        service: "",
    });

    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const navigate = useNavigate();

    const handleRadio = (event) => {
        const { value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            service: value,
        }));
    };
    const [videoLink, setVideoLink] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData);

        const token = localStorage.getItem("accessToken");
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        if (formData.refugeeId && formData.service) {
            try {
                axios
                    .post(`${api_url}consultancy/${formData.refugeeId}`, formData, config)
                    .then((response) => {
                        if (!response.data.error) {
                            setVideoLink(response.data);
                            console.log(response);
                            console.log(videoLink);
                            setIsSubmitted(true);
                        }
                    })
                    .catch((error) => {
                        alert(`An error occurred ${error}`);
                    });
            } catch {
                alert('An error occurred');
            }
        }

    };

    const doctorservices = [
        "General Practitioner",
        "Pediatrician",
        "Obstetrician/Gynecologist",
        "Internal Medicine Physician",
        "Infectious Disease Specialist",
        "Psychiatrist",
        "Dermatologist",
        "Ophthalmologist",
        "Dentist",
        "Other",
    ];

    const renderForm = (
        <div className="">
            <form onSubmit={handleSubmit} className="justify-items-start">
                <div className="">
                    <label className="w-full font-semibold">REFUGEE ID</label>
                    <input
                        type="text"
                        name="refugeeId"
                        value={formData.refugeeId}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border-b-2 mb-8 focus:outline-none"
                    />
                </div>

                <div className="mb-4">
                    <label className="w-full flex font-semibold">SERVICE</label>
                    {doctorservices.map((service, index) => (
                        <div key={index} className="m-2 inline-block">
                            <input
                                type="radio"
                                id={`service_${index}`}
                                name="service"
                                value={service}
                                onChange={handleRadio}
                                required
                                checked={formData.service === service}
                                className="hidden"
                            />
                            <label
                                htmlFor={`service_${index}`}
                                className={`hover:cursor-pointer hover:bg-grey rounded-sm p-2 ${formData.service === service ? "bg-yellow" : ""}`}
                            >
                                {service}
                            </label>
                        </div>
                    ))}
                </div>

                <div>
                    <input
                        className="p-2 px-10 w-full font-semibold bg-yellow hover:outline transition-transform rounded-none"
                        type="submit"
                        value="Submit"
                    />
                </div>
            </form>
        </div>
    );

    const confirmation = (
        <button
            className="p-2 px-10 w-full font-semibold bg-yellow hover:outline transition-transform rounded-none"
            onClick={() => {
                window.open(videoLink);
            }}
        >
            START VIDEO CALL
        </button>
    );

    return (
        <div className="w-[100vw] absolute top-0 bg-doc bg-cover h-[100vh]">
            <div className="container p-10 w-[95%] md:w-[50%] shadow-lg bg-white mt-[15vh] m-auto md:absolute md:right-20">
                <div className="text-2xl pb-8 text-center font-semibold">Live Consultancy</div>
                <div className="text-left">{isSubmitted ? confirmation : renderForm}</div>
            </div>
        </div>
    );
}

export default Consultancy;

