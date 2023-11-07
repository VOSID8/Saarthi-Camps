import { useRef, useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const navigate = useNavigate();
    const userRef = useRef();
    const errRef = useRef();
    const [email, setEmail] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);
    useEffect(() => {
        setErrMsg("");
    }, [email]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (email) {
            try {
                axios
                    .post(api_url + "user/forgot-password", { 
                        email: email.trim(),
                    })
                    .then((response) => {
                        if (!response.data.error) {
                            setSuccess(true);
                        }
                    })
                    .catch((error) => {
                        setErrMsg(error);
                        // console.log(error);
                    })
                // For this example, we'll set success to true and show a success message
                
            } catch (error) {
                setErrMsg("Failed to request password reset");
            }
        }
    };

    const handleSignIn = () => navigate('/login');

    return (
        <div className="w-[100vw] h-[100vh] m-0 p-0 flex bg-family bg-cover bg-right md:bg-top">
            {success ? (
                <section className="text-left p-10 w-[350px] m-auto md:mr-[10vw] bg-white ">
                    <h1>Password Reset Requested!</h1>
                    <br />
                    <p>Check your email for further instructions.</p>
                    <p className="underline"><Link to="/login">Go to Login</Link></p>
                </section>
            ) : (
                <section className="text-left p-10 w-[350px] m-auto md:mr-[10vw] bg-white ">

                    <h1 className="pb-8 text-center font-semibold">FORGOT PASSWORD</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username" className="font-regular">EMAIL</label>
                        <br />
                        <input
                            type="email"
                            id="username"
                            ref={userRef}
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                            className="p-2 w-full border-b-2 mb-8 focus:outline-none"
                        />
                        <br />

                        <p
                            ref={errRef}
                            className={errMsg ? "errmsg" : "offscreen"}
                            aria-live="assertive"
                        >
                            {errMsg}
                        </p>

                        <button className="p-2 px-10 w-full bg-yellow font-semibold hover:outline transition-colors duration-150 rounded-none mb-3">RESET PASSWORD</button>
                        <div className="text-right underline" onClick={handleSignIn}>Back to Login</div>
                    </form>
                </section>
            )}
        </div>
    );
};

export default ForgotPassword;
