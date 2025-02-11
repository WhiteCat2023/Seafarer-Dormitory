import { BiClinic, BiSearchAlt, BiTrash, BiMap, BiLoader, BiChevronLeft, BiChevronsLeft, BiChevronsRight, BiChevronRight } from "react-icons/bi";

function Profile() {
  return (
    <div className="container mx-auto sm:pt-10 sm:px-4 h-full">
            <div className={`lg:flex items-center justify-between lg:mb-5 flex-col md:flex-row flex`} >
                <nav className="flex items-center mb-4 md:mb-0 flex-grow md:flex-grow-0 w-full px-3 lg:px-0">
                    <h1 className="md:text-5xl font-outfit font-semibold text-3xl text-gray-600">Profile</h1>
                </nav>
                <div className={`relative w-full md:w-1/4 flex-grow md:flex-grow-0 px-2 lg:px-0 'block'`} >
                    <input className="rounded-full w-full ps-10 border-blue-500 border-2" type="search" placeholder="Search" />
                    <i className='absolute lg:left-3 left-5 top-3 -translate-y-1 text-2xl flex justify-center'><BiSearchAlt/></i>
                </div>
            </div>
            <div className=' relative'>
                <div style={{ display:  'block', height: 'calc(100% - 50px)'}}>
                    <div className='border-b-2 border-blue-500 justify-between flex items-center px-4 pb-1 pt-3 sticky top-0 left-0 bg-white'>
                        <div className='flex items-center gap-x-6'>
                            <input className=' p-2 rounded cursor-pointer' type="checkbox" />
                            <i className='p-1 text-xl rounded-full hover:bg-blue-100 cursor-pointer flex justify-center'  ><BiLoader/></i>
                            <BiTrash className='text-3xl p-1 rounded-full hover:bg-blue-100 cursor-pointer flex justify-center'/>
                        </div>
        
                        <div className='flex items-center'>
                            <BiChevronLeft className='p-1 text-3xl rounded-full hover:bg-blue-100 cursor-pointer flex justify-center'/>
                            <BiChevronsLeft  className='p-1 text-3xl rounded-full hover:bg-blue-100 cursor-pointer flex justify-center'/>
                            <p className='mx-2'>1</p>
                            <BiChevronsRight className='p-1 text-3xl rounded-full hover:bg-blue-100 cursor-pointer flex justify-center'/>
                            <BiChevronRight className='p-1 text-3xl rounded-full hover:bg-blue-100 cursor-pointer flex justify-center'/>
                        </div>
                    </div>
                    <ul className=' w-full' id='apartment-li'>             
      
                    </ul>
                </div>
            </div>
        </div>
  )
}

export default Profile