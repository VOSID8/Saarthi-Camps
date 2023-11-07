import { useState } from "react";
import axios from "axios"

import api_url from "../config";

// import { useLocation } from 'react-router-dom';


export default function MedForm() {

    const [formData, setFormData] = useState({
        refugeeId: "",
        medicineName: "",
        // urgency: "0",
        // quantity: ""
    });

    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (formData) {
            const token = localStorage.getItem("accessToken");
            
            const config = {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }

            try {
                axios
                    .post(`${api_url}order/${formData.refugeeId}`, formData, config)
                    .then((response) => {
                        if (!response.data.error) {
                            setIsSubmitted(true);
                        }
                    })
                    .catch((error) => {
                        alert(`An error occured ${error}`)
                    })
            }
            catch(error) {
                alert(`An error occurred`)
            }
        }
    };


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const medicineOptions = [
        "Medicine 1",
        "Medicine 2",
        "Medicine 3",
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

                <div className="">
                    {/* <label className="w-full">Name</label>
                    <input
                        type="text"
                        name="medicineName"
                        value={formData.medicineName}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border-b-2 mb-8 focus:outline-none"
                    /> */}


                    <label className="w-full  font-semibold">MEDICINE NAME</label>
                    <div className="select-container mb-8">
                        <input
                            type="text"
                            onChange={handleChange}
                            name="medicineName"
                            value={formData.medicineName}
                            className="w-full p-2 border-b-2  focus:outline-none"
                            required
                        />
                        {/* <select
                            name="medicineName"
                            value={formData.medicineName}
                            onChange={handlemedicineNameChange}
                            className="w-full "
                            required
                        >
                            {medicineOptions.map((option, index) => (
                                <option key={index} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select> */}
                    </div>
                </div>



                <div className="grid grid-cols-2">

                    <div className="">
                        <label className=" font-semibold">QUANTITY</label>
                        <br />
                        <input
                            type="number"
                            name="quantity"
                            value={formData.quantity}
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
                                    name="urgency"
                                    value="0"
                                    checked={formData.urgency === "0"}
                                    onChange={handleChange}
                                    className="mr-2"
                                />
                                Moderate
                            </label>
                            <label className="">
                                <input
                                    type="radio"
                                    name="urgency"
                                    value="1"
                                    checked={formData.urgency === "1"}
                                    onChange={handleChange}
                                    className="mr-2"
                                />
                                High
                            </label>
                            <label className="">
                                <input
                                    type="radio"
                                    name="urgency"
                                    value="2"
                                    checked={formData.urgency === "2"}
                                    onChange={handleChange}
                                    className="mr-2"
                                />
                                Critical
                            </label>
                        </div>
                    </div>
                </div>
                <div >
                    <input className="p-2 px-10 w-full bg-yellow font-bold hover:outline transition-transition " type="submit" value="SUBMIT" />
                </div>
            </form>
        </div>
    );

    // const location = useLocation();
    // const { valueToPass } = location.state;
    // console.log(location);

    const confirmation = (
        <div>
            <p>Form submitted successfully.</p> <br />
            <p>Your Medicines Will Arive Soon </p>

            <div className="flex mt-6">
                <button className="p-2 px-10 w-full font-semibold bg-yellow hover:outline transition-transform rounded-none" onClick={() => window.location.reload()}>New Medicine Form</button>
            </div>
        </div>
    )

    return (
        <div className="md:w-[100vw] absolute top-0 bg-meds bg-cover h-[100vh]">
            <div className="container p-10 w-[95%] md:w-[50%] shadow-lg bg-white mt-[15vh] m-auto md:absolute md:right-20">
                {/* m-auto h-auto p-5 bg-darkb w-[calc(100vw-300px)]*/}
                <div className="text-2xl pb-8 text-center font-semibold">Refugee Medication Form</div>
                <div className="text-left">
                    {isSubmitted ? (confirmation) : (renderForm)}
                </div>
            </div>
        </div>
    )
}