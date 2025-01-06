import 'boxicons'
import NewApartments from './components/Modals/NewApartments';

export default function Apartments(){

 

    return(
        <>
            <div className="container mx-auto mt-10 h-5/6">
                <div className="flex items-center justify-between mb-5">
                    <nav className="flex items-center">
                        <h1 className="text-5xl font-outfit font-semibold">Apartments</h1>
                        <button data-modal-target="crud-modal" data-modal-toggle="crud-modal" className="bg-purple px-3 py-2 rounded-xl text-white ms-4 hover:bg-transparent hover:border-2 hover:border-blue-500 hover:text-blue-500 border-2 border-transparent">New Apartment</button>
                    </nav>
                    <div className="relative w-1/4">
                        <input className="rounded-full w-full ps-10 border-blue-500 border-2" type="search" placeholder="Search"/>
                        <i className='absolute left-3 top-3 -translate-y-1'><box-icon name='search-alt'></box-icon></i>
                    </div>
                </div>
                <div className='border-2 h-3/4 rounded-3xl border-blue-500'>
                    <div className='border-b-2 border-blue-500 justify-between flex items-center px-4 pb-1 pt-3'>
                        <i className='p-1 rounded-full hover:bg-blue-100 cursor-pointer flex justify-center'><box-icon name='loader'></box-icon></i>
                        <div className='flex items-center'>
                            <i className='p-1 rounded-full hover:bg-blue-100 cursor-pointer flex justify-center'><box-icon type='solid' name='chevron-left'></box-icon></i>
                            <i className='p-1 rounded-full hover:bg-blue-100 cursor-pointer flex justify-center'><box-icon name='chevrons-left' ></box-icon></i>
                            <p className='mx-2'>1</p>
                            <i className='p-1 rounded-full hover:bg-blue-100 cursor-pointer flex justify-center'><box-icon name='chevrons-right' ></box-icon></i>
                            <i className='p-1 rounded-full hover:bg-blue-100 cursor-pointer flex justify-center'><box-icon name='chevron-right' type='solid' ></box-icon></i>
                        </div>
                    </div>
                </div>
            </div>
            <NewApartments/>
        </>      
    );
}
