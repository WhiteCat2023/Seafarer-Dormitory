import React from 'react'
import { BiArrowBack } from 'react-icons/bi'

function EditRoom({isOpen, onClose, item}) {


    const amenities = item.amenities
    .split(/,|\s-/)
    const amenity = Object.values(amenities);
    const images = Object.values(item.files);

    function handleChange(){

    }
    const onSubmitData = () => {

    }
    function handleAmenityChange(){

    }
    function addAmenity(){

    }
    function onAdd(){

    }

    return (
        <div className={`${isOpen ? "block": "hidden"}`}>
            <div className='w-5/6 mx-auto pb-24'>
                <div className='py-4'>
                <BiArrowBack onClick={onClose}/>
                </div>
                <form className='flex gap-2 w-full' onSubmit={onSubmitData}>
                    <div className='flex flex-col w-2/4 gap-2'>
                        <input onChange={handleChange} name='name' type="text" placeholder={item.name} className='rounded-lg'/>
                        <input onChange={handleChange} name='roomNumber' type="number" placeholder={item.roomNumber} className='rounded-lg'/>
                        <input onChange={handleChange} name='price' type="number" placeholder={item.price} className='rounded-lg'/>
                        <input onChange={handleChange} name='pax' type="number" placeholder={item.pax} className='rounded-lg'/>
                        <select onChange={handleChange} name="tower" id="tower" className='rounded-lg p-2'>
                            <option disabled>{item.tower}</option>
                            <option value="tower-1">Tower 1</option>
                            <option value="tower-2">Tower 2</option>
                        </select>
                        <select onChange={handleChange} name="stayType" id="" className='rounded-lg p-2'>
                            <option disabled>{item.stayType}</option>
                            <option value="day">Day</option>
                            <option value="night">Night</option>
                            <option value="week">Week</option>
                            <option value="month">Month</option>
                        </select>
                        <select onChange={handleChange} name="deck" id="" className='rounded-lg p-2'>
                            <option disabled>{item.deck}</option>
                            <option value="upper-deck">Upper Deck</option>
                            <option value="lower-deck">Lower Deck</option>
                        </select>
                        <div className='flex gap-x-2 w-full'>
                            <input onChange={handleAmenityChange} name='amenities' type="text" placeholder={item.amenities} className='rounded-lg w-full'/>
                            <button onClick={addAmenity} className='rounded-lg bg-primary py-2 px-4 text-white w-1/6'>Add</button>
                        </div>
                        <div className='flex gap-4 flex-wrap'>
                        {/* {amenity.map((item, index) => (
                            <p className='py-2 px-4 bg-black text-white rounded-lg block' key={index}>{item}</p>
                        ))} */}
                        </div>
                        <textarea onChange={handleChange} name='description' type="text" placeholder={item.description} className='rounded-lg' rows={6}/>
                    </div>
                    <div className='w-2/4 flex flex-col justify-between items-center'>
                        <div className='w-full'>
                        <input onChange={handleChange} name='imageFiles' type="file" multiple accept='image/*' className='rounded-lg mb-4'/>
                        <div className='flex gap-4 flex-wrap'>
                            {/* {images.map((item, index) => (
                                <div>

                                </div>
                               
                            ))} */}
                        </div>
                        </div>
                        <button onClick={onAdd} type="submit" className='rounded-lg bg-primary p-2 text-white w-full'>Edit Room</button>
                    </div>
                </form>
            </div>
        </div>
  )
}

export default EditRoom