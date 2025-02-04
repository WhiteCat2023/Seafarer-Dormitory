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
      <div>
        <BiArrowBack onClick={onClose} />
      </div>
      <form className='flex flex-col' onSubmit={onSubmitData}>
        <input onChange={handleChange} name='name' type="text" placeholder='Name'/>
        <input onChange={handleChange} name='roomNumber' type="number" placeholder='room number'/>
        <input onChange={handleChange} name='price' type="number" placeholder='price'/>
        <input onChange={handleChange} name='pax' type="number" placeholder='pax'/>
        <select onChange={handleChange} name="tower" id="tower">
          <option value="">Select apartment</option>
          <option value="tower-1">Tower 1</option>
          <option value="tower-2">Tower 2</option>
        </select>
        <select onChange={handleChange} name="stayType" id="">
          <option value="">Select stay type</option>
          <option value="day">Day</option>
          <option value="night">Night</option>
          <option value="week">Week</option>
          <option value="month">Month</option>
        </select>
        <select onChange={handleChange} name="deck" id="">
          <option value="">Select which deck</option>
          <option value="upper-deck">Upper Deck</option>
          <option value="lower-deck">Lower Deck</option>
        </select>
        <input onChange={handleAmenityChange} name='amenities' type="text" placeholder='amenities'/>
        <button onClick={addAmenity}>Add Amenity</button>
        <div>
          {inputs.amenities.map((item, index) => (
            <p key={index}>{item}</p>
          ))}
        </div>
        <input onChange={handleChange} name='description' type="text" placeholder='description'/>
        <input onChange={handleChange} name='imageFiles' type="file" multiple accept='image/*'/>
        <div>
          {imgObject.map((item, index) => (
            <img src={item} alt="" key={index}/>
          ))}
        </div>
        <button onClick={onAdd} type="submit">Add</button>
      </form>
    </div>
  )
}