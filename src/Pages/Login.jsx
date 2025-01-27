import { useState } from "react"
import Logo from "../assets/Logo.png"
import ShowCase from "../assets/showcase.jpg"
// import axios from "axios"
import { useNavigate } from "react-router-dom"
import Spinner from "../components/Spinner/Spinner"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Cookies from "js-cookie"
import ForgotPassword from "../components/Modals/ForgotPassword"
import { auth, googleProvider } from "../config/firebase"
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { FcGoogle } from "react-icons/fc"


export default function Login(){

    const [inputs, setInputs] = useState({email: '', password: '', action: ''});
    const [loading, setLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();



    const openModal = () => setIsModalOpen(true);


    const closeModal = () => setIsModalOpen(false);


    const handleCheckBoxChange = () => {
        setRememberMe(!rememberMe);
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true); 
        try{
            await signInWithEmailAndPassword(auth, inputs.email, inputs.password);
            if (rememberMe) {
                
                localStorage.setItem('userEmail', inputs.email);
            }
            navigate("/Nav/Apartments");
        }catch (error) {
            withReactContent(Swal).fire({
                icon: "error",
                title: "Oops...",
                text: "Invalid Credentials",
                confirmButtonColor: "#3085d6",
            })
            console.error("Error signing in:", error);
            setError(error.message); 
        } finally {
            setLoading(false); 
        }
    }

    const signInWithGoogle = async (e) => {
        e.preventDefault();
        setLoading(true)
        try{
            await signInWithPopup(auth, googleProvider);
            if (rememberMe) {
                
                localStorage.setItem('userEmail', auth?.currentUser?.email);
            }
            navigate("/Nav/Apartments");
        }catch(error){
            withReactContent(Swal).fire({
                icon: "error",
                title: "Oops...",
                text: error.message,
                confirmButtonColor: "#3085d6",
            })
            console.error("Error signing in: ", error);
            setError(error.message);
        }finally{
            setLoading(false)
        }
    }

    //WAG MONG ERASEN MASISIRA BUHAY MO
    //HOSTINGER PHP CONNECTION DO NOT TOUCH   
    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     if(event.target.name == 'login_user'){
    //         setLoading(true);
    //         axios.post("https://seafarerdorm.scarlet2.io/Login/signin.php", inputs).then((response) => {
    //             if(response.data.status === "success"){
    //                 Cookies.set('session', inputs.email, { expires: rememberMe ? 7 : null }); 
    //                 navigate('/Nav/Apartments');
    //             }else{
    //                 console.error(response.data.message);
    //                 withReactContent(Swal).fire({
    //                     icon: "error",
    //                     title: "Oops...",
    //                     text: response.data.message,
    //                     confirmButtonColor: "#3085d6",
    //                 })
    //             }
    //         }).catch((error) => {
    //             console.error("There was an error!", error);
    //             withReactContent(Swal).fire({
    //                 icon: "error",
    //                 title: "Oops...",
    //                 text: error.message,
    //                 confirmButtonColor: "#3085d6",
    //             })
    //         }).finally(() => {
    //             setLoading(false);
    //         });
    //         // console.log(inputs)
    //     }   
    // }

    return(
        <div className="flex flex-col lg:flex-row font-serif h-full">
            <div className="flex-none mb-8 lg:w-1/2 lg:mb-0 lg:p-4 p-2">
                <img src={ShowCase} alt="" className="w-full h-36 lg:h-full object-cover lg:rounded-xl rounded-md" loading="lazy"/>
            </div>
            <div className="w-100 block lg:w-1/2 lg:flex lg:justify-center lg:flex-col">
                <img src={Logo} alt="" className="mx-auto"/>
                <h1 className="text-balance text-5xl font-normal font-orelega text-gray-900 sm:text-7xl" >Greetings!</h1>
                <h3 className="font-orelega font-normal text-gray-900 text-balance text-base lg:text-3x1">Welcome Back!</h3>
                <form onSubmit={handleLogin} name="login_user" className="flex flex-col p-5 lg:p-11 lg:w-9/12 mx-auto">
                  <input onChange={handleChange} name="email" className="border-2 p-2 mb-3 rounded font-outfit border-blue-400 outline-none" type="email" placeholder="Email" required/>
                    <input onChange={handleChange} name="password" className="border-2 p-2 rounded font-outfit border-blue-400 outline-none" type="password" placeholder="Password" required/>
                    <div className="flex justify-between p-2 mb-10">
                        <span >
                            <input checked={rememberMe} onChange={handleCheckBoxChange} name="r-me" type="checkbox" className="mr-1"/>
                            <span className="font-outfit">Remember me</span>
                        </span>
                        <button type="button" onClick={openModal} className="font-outfit text-blue-500 underline">Forgot Password</button>
                        {isModalOpen && (<ForgotPassword isOpen={isModalOpen} onClose={closeModal}/>)}
                    </div>
                    <button type="submit" className="bg-blue-400 p-2 rounded text-white font-outfit" onClick={handleChange} name="action" value="Login">
                        {loading ? <Spinner /> : "Login"}
                    </button>
                    <div className="flex w-full items-center font-outfit">
                        <hr className="my-4 flex-grow me-3"/>
                        <p>Or</p>
                        <hr className="my-4 flex-grow ms-3"/>
                    </div>
                    
                    <button onClick={signInWithGoogle} className="p-2 rounded font-outfit border flex justify-center items-center"><FcGoogle className="text-2xl me-2"/> Sign In with Google</button>
                </form>   
            </div>
        </div>
    );
}