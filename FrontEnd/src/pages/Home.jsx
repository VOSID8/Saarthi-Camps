import user from "../assets/icons/user.png"
import form from "../assets/icons/form.png"
import meds from "../assets/icons/meds.png"
import logo from "../assets/saarthi.png"
import quot from "../assets/icons/quotation-mark.png"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

function Pop() {
    return (
        <motion.div className="bg-white absolute -top-10 md:-top-32 md:flex w-[90vw] ml-[5vw] md:w-[80vw] md:ml-[10vw] p-4 md:p-10 justify-between overflow-x-hidden"
            initial={{ y:200 }}
            whileInView={{ y:0 }}
            transition={{ ease: "easeOut", duration: 0.25 }}
            viewport={{ once: true }}>
            <div className="md:font-bold text-xl md:text-4xl md:text-left md:w-[50vw] leading-tight md:leading-normal">
                Start helping families living in conflict areas
                <div className="font-normal text-base hidden md:block md:mt-3 leading-loose">From the crisis in the Middle East to the war in Ukraine, violence around the world is forcing families to flee their homes. We are on the ground working with local teams to make sure civilians receive the emergency aid they desperately need.</div>
            </div>
            <div className="md:block justify-evenly mt-4 md:mt-0 text-xl md:text-base">
                <Link to="/add-refugee">
                    <div className=" py-3 mb-2 md:py-3 md:px-6 bg-yellow font-bold hover:outline hover:scale-105 transition-transform">Add Refugee</div>
                </Link>
                <Link to="/add-medicine">
                    <div className=" py-3      md:py-3 md:px-6 bg-yellow font-bold hover:outline hover:scale-105 transition-transform">Add Medicine</div>
                </Link>
            </div>
        </motion.div>
    )
}

const InstructionArr = [
    {
        imgURL: user,
        head: "Login",
        detail: "Enter your credentials and log in to the system."
    },
    {
        imgURL: form,
        head: "Enter Refugee Details",
        detail: `Fill in the refugee's information and click "Submit".`
    },
    {
        imgURL: meds,
        head: "Enter Medicine Details",
        detail: 'If necessary, provide medicine details for the refugee and "Submit".'
    },
]

const renderList = InstructionArr.map((item, index) => (
    <motion.div key={index} className={`flex md:block md:w-[25vw] mb-10 justify-evenly ${index%2 === 1 ? "flex-row-reverse" : ""}`}
        initial={{ y:100 }}
        whileInView={{ y:0 }}
        transition={{ ease: "easeOut", duration: 0.25, delay: index*0.1 }}>
        <div className="bg-yellow rounded-full w-[80px] h-[80px] md:w-[150px] md:h-[150px] md:mb-4">
            <img src={item.imgURL} alt="" srcSet="" className="w-[80%] ml-3 pt-3 hover:scale-105 transition-transform"/>
        </div>
        <div className="w-[60%] md:w-full"
        initial={{ y:200 }}
        whileInView={{ y:0 }}
        transition={{ ease: "easeOut", duration: 0.25, delay: index * 0.1 }}>
            <div className="text-2xl font-bold md:font-semibold ">
                {item.head}
            </div>
            <div className="">
                {item.detail}
            </div>
        </div>
    </motion.div>
));

function Instructions() {
    return (
        <div className="text-left mx-5 pb-1 md:pb-0 md:mx-[10vw] mb-10 md:mb-16 ">
            <div className="flex mb-8">
                <div className="w-[5px] bg-yellow mr-2"></div>
                <div className="text-2xl md:text-4xl font-bold">Instructions</div>
            </div>
            <div className="md:flex justify-between">
                {renderList}
            </div>
        </div>
    )
}

function WhyUS() {
    return (
        <motion.div className="text-left mx-5 md:mb-10 pb-10 md:mx-[10vw]">
            <motion.div className="flex mb-8"
                initial={{ y:100 }}
                whileInView={{ y:0 }}
                transition={{ ease: "easeOut", duration: 0.25 }}
            >
                <div className="w-[5px] bg-yellow mr-2"></div>
                <div className="text-2xl md:text-4xl font-bold">Why Saarthi</div>
            </motion.div>

            <motion.div className="md:flex"
                initial={{ y:100 }}
                whileInView={{ y:0 }}
                transition={{ ease: "easeOut", duration: 0.25 }}
            >
                <img src={logo} alt="Logo" className="md:h-[200px] bg-yellow" />
                <motion.div className="p-4 text-lg bg-grey relative bottom-28 md:bottom-0 md:right-10 md:top-10 md:flex justify-between m-auto md:m-0 w-[90%] md:w-full"
                    initial={{ y:100 }}
                    whileInView={{ y:0 }}
                    transition={{ ease: "easeOut", duration: 0.25 }}
                >
                    <img src={quot} alt="quot" className="w-[50px] h-[50px]" />
                    <div className="w-[90%]  ">
                        <div className="italic">
                            In times of crisis like riots and floods, delivering vital medicines to individuals in refugee camps is a challenge. Saarthi is our solution, streamlining the process to ensure timely access to essential medications.
                        </div>
                        <div className="mt-3">
                            <span className="font-bold">ASKandola</span> <br />
                            <span className="font-light text-sm">Cisco Intern 2024</span>

                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
    )
}

function Footer() {
    return(
        <div className="bg-black h-[40vh]">

        </div>
    )
}


export default function Home() {
    return (
        <div className="absolute left-0 top-0 right-0">
            <div className="bg-camp h-[40vh] bg-cover md:h-[85vh]"></div>
            <div className="bg-grey relative">
                <div className="relative h-56 md:h-56">
                    <Pop />
                </div>
                <Instructions />
            </div>

            <WhyUS />
            {/* Credentials */}
            
            <Footer />
        </div>
    )
}