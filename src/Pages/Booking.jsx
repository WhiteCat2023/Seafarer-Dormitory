import { Link, useLocation } from 'react-router-dom';
import TopNavUser from '../components/Nav/TopNavUser';
import { useState, useEffect } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'; 
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import Maya from '../assets/maya.png'
import GCash from '../assets/gcash.png'
import { addDays, differenceInDays } from 'date-fns';
import { BiChevronLeft } from 'react-icons/bi';
import axios from 'axios';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

function Booking() {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const location = useLocation();
    const item = location.state;
    const [inputs, setInputs] = useState({
        name: "",
        contactNumber: "",
        email: "",
    })

    const [totalPrice, setTotalPrice] = useState(0);
    const [days, setDays] = useState(0);

    const [dateState, setDateState] = useState([
        {
          startDate: new Date(),
          endDate: addDays(new Date(), 7),
          key: 'selection'
        }
    ]);

    useEffect(() => {
        const start = dateState[0].startDate;
        const end = dateState[0].endDate;

        // Calculate the number of days between start and end date
        const numOfDays = differenceInDays(end, start);
        setDays(numOfDays)
        // Multiply by the price per day to get the total price
        const calculatedPrice = numOfDays * item.price;
        setTotalPrice(calculatedPrice);  // Update the total price state
    }, [dateState]);

    function handleInputChange(e){
        const name = e.target.name;
        const value = e.target.value;
        setInputs(inputs =>({...inputs, [name]: value}))
    }

    //Function for Stripe
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        setLoading(true);

        const cardElement = elements.getElement(CardElement);

        // Create a payment method with Stripe
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            setError(error.message);
            setLoading(false);
            return;
        }

        // Send payment method info to your server to create the payment intent
        const response = await fetch('/create-payment-intent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount: totalPrice,
                payment_method_id: paymentMethod.id,
            }),
        });

        const paymentIntent = await response.json();

        // Confirm the payment with Stripe
        const { error: confirmError } = await stripe.confirmCardPayment(paymentIntent.client_secret, {
            payment_method: paymentMethod.id,
        });

        if (confirmError) {
            setError(confirmError.message);
            setLoading(false);
            return;
        }

        // onSuccess(paymentIntent);
        setLoading(false);
        handleReservation("paid", "Stripe", "Paid", "")
    };

    //Function for Maya
    const handleMayaPayment = async (amount) => {
        setLoading(true);
    
        try {
          const response = await fetch('/api/create-maya-payment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount: amount }), // Example amount
          });
    
          const data = await response.json();
          if (data.paymentUrl) {
            // Redirect to Maya's checkout page
            handleSubmitInfo("paid", "maya", "Paid", "")
            window.location.href = data.paymentUrl;
          }
        } catch (error) {
          console.error('Error initiating Maya payment:', error);
        } finally {
          setLoading(false);
        }
    };

    //Function for GCash payment
    const handleGCashPayment = async (amount) => {
        setLoading(true);
        
        try {
          const response = await fetch('/api/create-gcash-payment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount: amount }), // Example amount
          });
    
          const data = await response.json();
          if (data.paymentUrl) {
            // Redirect to the GCash payment page
            handleSubmitInfo("paid", "gcash", "Paid", "")
            window.location.href = data.paymentUrl;
            
          }
        } catch (error) {
          console.error('Error initiating GCash payment:', error);
        } finally {
          setLoading(false);
        }
    };

    //Function for reservation
    function handleReservation(){
        handleSubmitInfo("reservation", "walkin", "Reserve", item.name + " reserved")
    }

    const handleSubmitInfo = async (status, modeOfPayment, title, message) =>{
        const fd = new FormData()
        fd.append("name", inputs.name);
        fd.append("phone", inputs.contactNumber);
        fd.append("email", inputs.email)
        fd.append("tower", item.tower)
        fd.append("days", days)
        fd.append("totalprice", totalPrice)
        fd.append("roomId", item.id)
        fd.append("paymentStatus", status)
        fd.append("modeOfPayment", modeOfPayment)
        fd.append("startDate", dateState.startDate)
        fd.append("endDate", dateState.endDate)

        try{
            const response = await axios.post("https://seafarerdorm.scarlet2.io/Rooms/book-room.php", fd);
            if(response.data.status == "success"){
                withReactContent(Swal).fire({
                    icon: "success",
                    title: title + " successfully",
                    text: message,
                    confirmButtonColor: "#3085d6",
                })
                console.log(response.data.message)
                window.location.href = "/"
            }else{
                withReactContent(Swal).fire({
                    icon: response.data.status,
                    title: response.data.status,
                    text: response.data.message,
                    confirmButtonColor: "#3085d6",
                })
                console.log(response.data.message)
            }
        }catch(err){
            console.error(err)
            console.log(err)
        }
        // console.log(inputs)
        // console.log(dateState)
    }
    return (
        <div className='pb-24 font-outfit'>
            <div className='w-4/6 mx-auto'>
                <TopNavUser/>
                <Link to="/" className='items-center flex mt-4'><BiChevronLeft/>Back</Link>
                <div>
                    <form className='flex w-full' onSubmit={handleSubmit}>
                        <div className='flex flex-col w-2/4 p-4 gap-y-2'>
                            <p className='font-bold text-2xl'>Application Form</p>
                            <p className='mt-2'>Identification</p>
                            <input onChange={handleInputChange} className='rounded-lg bg-[#D3D3E7] border border-[#595BD4] text-[#1E1E1E8C]' type="text" placeholder='Full Name' name='name' required/>
                            <input onChange={handleInputChange} className='rounded-lg bg-[#D3D3E7] border border-[#595BD4] text-[#1E1E1E8C]' type="number" placeholder='Contact Number' name='contactNumber' required/>
                            <input onChange={handleInputChange} className='rounded-lg bg-[#D3D3E7] border border-[#595BD4] text-[#1E1E1E8C]' type="email" placeholder='Email' name='email' required/>
                            <p className='mt-2 text-lg font-semibold'>Choose how to pay</p>
                            <p><span className='font-bold'>Apartment: </span>{item.name}</p>
                            <p><span className='font-bold'>Tower: </span>{item.tower}</p>
                            {days != 0 && (<p><span className='font-bold'>Total: </span>{days} days X ₱{item.price} = ₱{totalPrice}</p>)}
                            <CardElement className="w-full mb-4 p-2 rounded-lg bg-[#D3D3E7] border border-[#595BD4] text-[#1E1E1E8C]" />
                            <button
                                type="submit"
                                className="rounded-lg bg-primary text-white py-2 w-full"
                                disabled={loading || !stripe}
                            >
                                {loading ? 'Processing...' : 'Pay Now'}
                            </button>
                            <button
                                onClick={handleReservation}
                                type="button"
                                className="rounded-lg bg-primary text-white py-2 w-full"
                            >
                                {loading ? 'Processing...' : 'Reserve'}
                            </button>
                            {error && <p className="text-red-500 mt-2">{error}</p>}
                            <button
                                onClick={handleGCashPayment}
                                type="button"
                                className="rounded-lg bg-white text-black border-primary items-center ps-2 gap-x-2 border py-2 w-full flex"
                            >
                                <img src={GCash} className='w-6 h-6 rounded'/>
                                {loading ? 'Processing...' : 'GCash'}
                            </button>
                            <button
                                onClick={handleMayaPayment}
                                type="button"
                                className="rounded-lg bg-white text-black border-primary items-center ps-2 gap-x-2 border py-2 w-full flex"
                            >
                                <img src={Maya} className='w-6 h-6 rounded'/>
                                {loading ? 'Processing...' : 'Maya'}
                            </button>
                        </div>
                        <div className='w-2/4 flex flex-col items-start justify-center overflow-hidden'>
                            <p className='font-outfit text-2xl font-bold'>Days Duration</p>
                            <p className='font-outfit'>Enter Days how long is your stay</p>
                            <DateRange
                                editableDateInputs={true}
                                onChange={item => setDateState([item.selection])}
                                moveRangeOnFirstSelection={false}
                                ranges={dateState}
                                className="w-full flex justify-center p-2 border border-gray-300 rounded-lg shadow-sm"
                            />
                        </div>
                    </form>
                </div>
                <div></div>
            </div>
        </div>
    )
}

export default Booking