import axios from 'axios';
import React, { useState } from 'react'
import { BiArrowBack, BiX } from 'react-icons/bi'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Spinner from '../Spinner/Spinner';

export default function AddRoom({isOpen, onClose, onAdd}) {

  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState({
    name: '', 
    roomNumber: 0, 
    price: 0, 
    pax: 0, 
    tower: '', 
    stayType: '', 
    deck: '', 
    bath: 0,
    amenities: [],
    description: '', 
    imageFiles: []
  });

  const userId = window.sessionStorage.getItem("token")
  const [amenityInput, setAmenityInput] = useState("");
  const [imgObject, setImgObject] = useState([]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if(name == 'pax' || name == 'price' || name == 'roomNumber'){
      setInputs(inputs => ({...inputs, [name]: Number(value)}));
    } else if(name == 'imageFiles'){
      const files = Array.from(e.target.files);
      const imageUrls = files.map(file => URL.createObjectURL(file));
      setInputs(inputs => ({...inputs, [name]: files}));
      setImgObject(image => [...image, ...imageUrls]);
    } else{
      setInputs(inputs => ({...inputs, [name]: value}));
    }
  }

  const handleAmenityChange = (e) => {
    setAmenityInput(e.target.value); 
  };

  const addAmenity = (e) => {
      e.preventDefault();
      if (amenityInput.trim() !== "") {
          setInputs(inputs => ({...inputs, amenities: [...inputs.amenities, amenityInput.trim()]})
        );
          setAmenityInput("");
      }
  };

  const onSubmitData = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    const fd = new FormData();
    fd.append("name", inputs.name);
    fd.append("roomNumber", inputs.roomNumber);
    fd.append("price", inputs.price);
    fd.append("pax", inputs.pax);
    fd.append("tower", inputs.tower);
    fd.append("stayType", inputs.stayType);
    fd.append("deck", inputs.deck);
    fd.append("amenities", inputs.amenities.join(","))
    fd.append("description", inputs.description);
    inputs.imageFiles.forEach(item => fd.append("imageFiles[]", item));
    fd.append("bath", inputs.bath);
    fd.append("action", "add");
    fd.append("userId", userId);
    console.log(inputs)
    try{
      const response = await axios.post("https://seafarerdorm.scarlet2.io/Rooms/post-rooms.php", fd);
      if(response.data.status == "success"){
        setIsLoading(false)
        withReactContent(Swal).fire({
          icon: "success",
          title: "Success",
          text: response.data.message,
          confirmButtonColor: "#3085d6",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/Rooms" 
          }
      });
        console.log(response.data.status);
      }else{
        setIsLoading(false)
        withReactContent(Swal).fire({
          icon: "warning",
          title: "Error",
          text: response.data.message,
          confirmButtonColor: "#3085d6",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/Rooms" 
          }
        });
      }
    }catch(e){
      setIsLoading(false)
      console.log(e);
      withReactContent(Swal).fire({
        icon: "warning",
        title: "Error",
        text: "There was a problem processing your request",
        confirmButtonColor: "#3085d6",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/Rooms" 
        }
      });
    }
    
  }

  function handleRemoveImage(index) {
    setImgObject((prevImages) => prevImages.filter((_, i) => i !== index));
    setInputs((prevInputs) => ({
      ...prevInputs,
      imageFiles: prevInputs.imageFiles.filter((_, i) => i !== index),
    }));
  }
  

  return (
//Note:
    // kani rang mga divs imo hilabtan dong imo rani butangan ug tailwind css

    <div className='' display={{display: isOpen ? 'block' : 'none'}}>
      <div className='w-5/6 mx-auto pb-24'>
        <div className='py-4'>
          <BiArrowBack onClick={onClose} />
        </div>
        <form className='flex gap-2 w-full' onSubmit={onSubmitData}>
          <div className='flex flex-col w-2/4 gap-2'>
          <label htmlFor="name" className='leading-[0.5] text-sm'>Room Name</label>
            <input onChange={handleChange} id='name' name='name' type="text" placeholder='Ex. John Doe' className='rounded-lg border border-[#595BD4] bg-[#D3D3E7]' required/>

            <label htmlFor="Room Number" className='leading-[0.5] text-sm'>Room Number</label>
            <input onChange={handleChange} id='Room Number' name='roomNumber' type="number" placeholder='Ex. 123' className='rounded-lg border border-[#595BD4] bg-[#D3D3E7]' required/>

            <label htmlFor="price" className='leading-[0.5] text-sm'>Price</label>
            <input onChange={handleChange} id='price' name='price' type="number" placeholder='Ex. 1,234' className='rounded-lg border border-[#595BD4] bg-[#D3D3E7]' required/>

            <label htmlFor="pax" className='leading-[0.5] text-sm'>Pax</label>
            <input onChange={handleChange} id='pax' name='pax' type="number" placeholder='Ex. 1 ' className='rounded-lg border border-[#595BD4] bg-[#D3D3E7]' required/>

            <label htmlFor="tower" className='leading-[0.5] text-sm'>Tower</label>
            <select onChange={handleChange} name="tower" id="tower" className='rounded-lg p-2 border border-[#595BD4] bg-[#D3D3E7]' required>
              <option value="">Select apartment</option>
              <option value="tower-1">Tower 1</option>
              <option value="tower-2">Tower 2</option>
            </select>

            <label htmlFor="stay type" className='leading-[0.5] text-sm'>Stay Type</label>
            <select onChange={handleChange} name="stayType" id="stay type" className='rounded-lg p-2 border border-[#595BD4] bg-[#D3D3E7]' required>
              <option value="">Select stay type</option>
              <option value="day">Day</option>
              <option value="night">Night</option>
              <option value="week">Week</option>
              <option value="month">Month</option>
            </select>

            <label htmlFor="deck" className='leading-[0.5] text-sm'>Deck</label>
            <select onChange={handleChange} name="deck" id="deck" className='rounded-lg p-2 border border-[#595BD4] bg-[#D3D3E7]' required>
              <option value="">Select which deck</option>
              <option value="upper-deck">Upper Deck</option>
              <option value="lower-deck">Lower Deck</option>
            </select>

            <label htmlFor="amenities" className='leading-[0.5] text-sm'>Amenities</label>
            <div className='flex gap-x-2 w-full'>
              <input onChange={handleAmenityChange} id='amenities' name='amenities' type="text" placeholder='Ex. free pizza, near SWU, etc.' className='rounded-lg w-full border border-[#595BD4] bg-[#D3D3E7]' value={amenityInput}/>
              <button onClick={addAmenity} className='rounded-lg bg-primary py-2 px-4 text-white w-1/6'>Add</button>
            </div>
            <div className='flex gap-4 flex-wrap'>
              {inputs.amenities.map((item, index) => (
                <p className='py-2 px-4 bg-primary text-white rounded-lg block' key={index}>{item}</p>
              ))}
            </div>

            <label htmlFor="description" className='leading-[0.5] text-sm'>Description</label>
            <textarea onChange={handleChange} id='description' name='description' type="text" placeholder='Apartment details...' className='rounded-lg border border-[#595BD4] bg-[#D3D3E7]' rows={6} required/>
          </div>
          <div className='w-2/4 flex flex-col justify-between items-center'>
            <div className='w-full'>
              {/* <button type='button' className='rounded-lg bg-primary p-2 text-white w-full'>Choose Files</button>
              <input onChange={handleChange} name='imageFiles' type="file" multiple encType="multipart/form-data" accept='image/*' className='rounded-lg mb-4 '/> */}
              <label className="rounded-lg bg-primary p-2 text-white w-full text-center cursor-pointer hover:bg-primary-dark transition-all">
                Choose Files
                <input
                  type="file"
                  name="imageFiles"
                  multiple
                  accept="image/*"
                  onChange={handleChange}
                  className="hidden"
                />
              </label>
              <div className='flex gap-4 flex-wrap mt-6'>
                {imgObject.map((item, index) => (
                  <div className='relative' key={index}>
                    <BiX 
                      className='rounded-full bg-black text-white font-bold absolute -right-2 -top-2 cursor-pointer'
                      onClick={() => handleRemoveImage(index)}/>
                    <img src={item} alt="" className='w-24 h-24 rounded-lg'/>
                  </div>
                ))}
              </div>
            </div>
            <button type="submit" className='rounded-lg bg-primary p-2 text-white w-full'>{isLoading ? <Spinner/> : "Add Room"}</button>
          </div>
        </form>
      </div>
    </div>
  )
}