import axios from 'axios';
import React, { useState } from 'react'
import { BiArrowBack } from 'react-icons/bi'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export default function AddRoom({isOpen, onClose, onAdd}) {

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

  const onSubmitData = async (e) => {
    e.preventDefault();
    try{
      const response = await axios.post("https://seafarerdorm.scarlet2.io/Rooms/post-rooms.php", fd);
      if(response.data.status === "success"){
        withReactContent(Swal).fire({
          icon: response.data.status,
          title: "Success",
          text: response.data.message,
          confirmButtonColor: "#3085d6",
        });
        console.log(response.data.status);
      }else{
        withReactContent(Swal).fire({
          icon: response.data.status,
          title: "Error",
          text: response.data.message,
          confirmButtonColor: "#3085d6",
        });
      }
    }catch(e){
      console.log(e);
      withReactContent(Swal).fire({
        icon: "error",
        title: "Error",
        text: response.data.message,
        confirmButtonColor: "#3085d6",
      });
    }
    
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
            <input onChange={handleChange} name='name' type="text" placeholder='Name' className='rounded-lg'/>
            <input onChange={handleChange} name='roomNumber' type="number" placeholder='room number' className='rounded-lg'/>
            <input onChange={handleChange} name='price' type="number" placeholder='price' className='rounded-lg'/>
            <input onChange={handleChange} name='pax' type="number" placeholder='pax' className='rounded-lg'/>
            <select onChange={handleChange} name="tower" id="tower" className='rounded-lg p-2'>
              <option value="">Select apartment</option>
              <option value="tower-1">Tower 1</option>
              <option value="tower-2">Tower 2</option>
            </select>
            <select onChange={handleChange} name="stayType" id="" className='rounded-lg p-2'>
              <option value="">Select stay type</option>
              <option value="day">Day</option>
              <option value="night">Night</option>
              <option value="week">Week</option>
              <option value="month">Month</option>
            </select>
            <select onChange={handleChange} name="deck" id="" className='rounded-lg p-2'>
              <option value="">Select which deck</option>
              <option value="upper-deck">Upper Deck</option>
              <option value="lower-deck">Lower Deck</option>
            </select>
            <div className='flex gap-x-2 w-full'>
              <input onChange={handleAmenityChange} name='amenities' type="text" placeholder='amenities' className='rounded-lg w-full' value={amenityInput}/>
              <button onClick={addAmenity} className='rounded-lg bg-primary py-2 px-4 text-white w-1/6'>Add</button>
            </div>
            <div className='flex gap-4 flex-wrap'>
              {inputs.amenities.map((item, index) => (
                <p className='py-2 px-4 bg-black text-white rounded-lg block' key={index}>{item}</p>
              ))}
            </div>
            <textarea onChange={handleChange} name='description' type="text" placeholder='description' className='rounded-lg' rows={6}/>
          </div>
          <div className='w-2/4 flex flex-col justify-between items-center'>
            <div className='w-full'>
              <input onChange={handleChange} name='imageFiles' type="file" multiple accept='image/*' className='rounded-lg mb-4'/>
              <div className='flex gap-4 flex-wrap'>
                {imgObject.map((item, index) => (
                  <img src={item} alt="" key={index} className='w-24 h-24 rounded-lg'/>
                ))}
              </div>
            </div>
            <button onClick={onAdd} type="submit" className='rounded-lg bg-primary p-2 text-white w-full'>Add Room</button>
          </div>
        </form>
      </div>
    </div>
  )
}