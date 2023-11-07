export default function ManageDEO () {
    return(
        <div className="md:w-[100vw] absolute top-0 h-[100vh]">
            <CreateDEOForm />
        </div>
    )
}

import { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "../components/AuthProvider";
import axios from "axios"
import api_url from "../config";
import { useNavigate } from "react-router-dom";

const url = api_url + "user/create-deo";

const CreateDEOForm = () => {
    const navigate = useNavigate();
    const userRef = useRef();
    const errRef = useRef();
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);
    useEffect(() => {
        setErrMsg("");
    }, [email, name]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("accessToken");
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
        
        if(email && name) {
            try{
                axios
                    .post(url, {
                        email: email.trim(),
                        name: name.trim(),
                    }, config)
                    .then((response) => {
                        if (!response.data.error) {
                            console.log(response);
                            setName("");
                            setEmail("");
                        }
                    })
                    .catch ((error) => {
                        setErrMsg(error.message);
                        console.log(error)
                    });
            }
            catch (error) {
                alert(error);
            }
        }
    };




    return (
        <div className="w-[100vw] h-[100vh] m-0 p-0 flex bg-family bg-cover bg-right md:bg-top">
            {success ? (
                <section className="text-left p-10 outline w-[350px] m-auto">
                    <h1>DEO Created Successfully!</h1>
                    <br />
                    <p><Link to="/Manage">Add another DEO</Link></p>
                </section>
            ) : (
                <section className="text-left p-10 w-[350px] m-auto md:mr-[10vw] bg-white ">

                    <h1 className="pb-8 text-center font-semibold">CREATE DEO</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="email" className="font-regular">EMAIL</label>
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
                        <label htmlFor="username" className="font-regular">USERNAME</label>
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

                        <p
                            ref={errRef}
                            className={errMsg ? "errmsg" : "offscreen"}
                            aria-live="assertive"
                        >
                            {errMsg}
                        </p>

                        <button className="p-2 px-10 w-full bg-yellow font-semibold hover:outline transition-colors duration-150 rounded-none">CREATE DEO</button>
                    </form>
                </section>
            )}
        </div>
    );
};