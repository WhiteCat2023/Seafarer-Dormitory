import React, { useState } from 'react'
import { BiArrowBack } from 'react-icons/bi'
import { db } from '../../config/firebase';
import { addDoc, collection } from 'firebase/firestore';
import axios from 'axios';

export default function AddApartment({isOpen, onBack}) {

    const [inputs, setInputs] = useState({id: "", apartmentName: "", apartmentAddress: "", apartmentCity: "", pax: 0, amenities: [], baths:'', price: 0, description: "", images: []});

    const [amenityInput, setAmenityInput] = useState("");

    const [inputImages, setInputImages] = useState([]);

    const handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        if(name === "pax" || name === "price"){
            setInputs(inputs => ({...inputs, [name]: Number(value)}));

        }else if( name === "amenities"){
            setInputs(inputs => ({...inputs, [name]: [...inputs.amenities, value]}));
        }else{
            setInputs(inputs => ({...inputs, [name]: value}));
        }
    };
    const handleImageChange = (event) => {
        const files = Array.from(event.target.files);
        const imageUrls = files.map(file => URL.createObjectURL(file));
        setInputImages(inputs => ({ ...inputs, images: [...inputs.images, ...imageUrls] }));
    };

    const handleAmenityChange = (e) => {
        setAmenityInput(e.target.value); 
    };

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const fd = FormData();
        inputImages.forEach(image => fd.append('images[]', inputImages));
        try{
            const response = await axios.post("https://seafarerdorm.scarlet2.io/Apartments/apartment_firebase.php", fd);
            if (response.data.status === 'success') {
                try{
                    await addDoc(collection(db, "apartments"), inputs);
                    console.log(inputs) 
                    console.log("apartment added");
                    setInputs({
                        apartmentName: "",
                        apartmentAddress: "",
                        apartmentCity: "",
                        pax: 0,
                        amenities: [],
                        baths: '',
                        price: 0,
                        description: "",
                        images: []
                    });
        
                }catch(error){
                    console.error(error);
                }
            } else if (response.data.status === 'error') {
                withReactContent(Swal).fire({
                    icon: "error",
                    title: "Error",
                    text: response.data.message,
                    confirmButtonColor: "#3085d6",
                });
            }
        }catch (error) {
            console.error(error.message);
            withReactContent(Swal).fire({
                icon: "error",
                title: "Something's not right!",
                text: error.message,
                confirmButtonColor: "#3085d6",
            });
        }
        
    }

    const addAmenity = (e) => {
        e.preventDefault();
        if (amenityInput.trim() !== "") {
            setInputs(inputs => ({
                ...inputs,
                amenities: [...inputs.amenities, amenityInput.trim()]
            }));
            setAmenityInput("");

        }
    };
    return (
        <div className='' style={{display: isOpen ? 'block' : 'none'}}>
            <div className='flex'>
                <BiArrowBack onClick={onBack}/>
            </div>
            <div>
                <form className='flex flex-col' onSubmit={handleSubmit}>
                    <input onChange={handleInputChange} name='apartmentName' type="text" placeholder='Apartment Name' required/>
                    <input onChange={handleInputChange} name='apartmentAddress' type="text" placeholder='Apartment Address' required/>
                    <input onChange={handleInputChange} name='apartmentCity' type="text" placeholder='Apartment City' required/>
                    <input onChange={handleInputChange} name='pax' type="number" placeholder='Pax' required/>
                    <input onChange={handleInputChange} name='baths' type="number" placeholder='No. of Bathrooms'/>

                    <input value={amenityInput} onChange={handleAmenityChange} name='amenities' type="text" placeholder='Amenities'/>
                    <button onClick={addAmenity} type='button'>Add Amenity</button>

                    <input onChange={handleInputChange} name='price' type="number" placeholder='Price' required/>
                    <div name="tags">
                        {inputs.amenities.map((tag, index) => (
                            <p key={index}>{tag}</p>
                        ))}
                    </div>
                    <textarea onChange={handleInputChange} name="description" placeholder='Description'></textarea>
                    <input onChange={handleImageChange} multiple name='images' accept="image/*" type="file" required/>
                    <div className="image-preview">
                        {inputs.images.map((image, index) => (
                            <img key={index} src={image} alt={`Preview ${index}`} style={{ width: '100px', height: '100px', margin: '5px' }} />
                        ))}
                    </div>
                    <button type='submit'>Submit</button>
                </form>
            </div>
        </div>
    )
}