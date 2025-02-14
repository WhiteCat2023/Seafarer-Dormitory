import { BiSearchAlt } from "react-icons/bi";
import TabLogo from "../assets/TabLogo.png";


// function Profile() {
//     const settings = [
//         {name: "Profile Setting", href: "/Profile/"},
//         {name: "Account Setting", href: ""},
//         {name: "Setting", href: ""}
//     ]
//     return (
//         <div className="container mx-auto sm:py-10 sm:px-4  h-full">
//                 <div className={`lg:flex items-center justify-between lg:mb-5 flex-col md:flex-row flex`} >
//                     <nav className="flex items-center mb-4 md:mb-0 flex-grow md:flex-grow-0 w-full px-3 lg:px-0">
//                         <h1 className="md:text-5xl font-outfit font-semibold text-3xl text-gray-600">Profile</h1>
//                     </nav>
//                     {/* <div className="relative w-full md:w-1/4 flex-grow md:flex-grow-0 px-2 lg:px-0 block">
//                           <input
//                             className="rounded-full w-full ps-10 border-blue-500 border-2"
//                             type="search"
//                             placeholder="Search"
//                           />
//                           <i className="absolute lg:left-3 left-5 top-3 -translate-y-1 text-2xl flex justify-center">
//                             <BiSearchAlt />
//                           </i>
//                         </div> */}
//                 </div>
//                 <div className="grid grid-cols-8 h-[calc(100%-52px)] gap-4 w-full">
//                     <div className="col-span-2 flex flex-col border-2 border-blue-500 rounded-xl px-2 py-3 gap-y-2">
//                             {
//                                 settings.map((setting, index) => (
//                                     <NavLink 
//                                         to={setting.href}
//                                         key={index}
//                                         className="p-2 hover:bg-blue-50 rounded-lg">
//                                         {setting.name}
//                                     </NavLink>
//                                 ))
//                             }
//                     </div>
//                     <div className="h-full border-2 border-blue-500 col-span-6 rounded-xl">
//                         <Outlet/>
//                     </div>
//                 </div>
//             </div>
//     )
//   }
export default function Profile() {
  const profilePic = window.sessionStorage.getItem("profile_pic") || window.localStorage.getItem("profile_pic");
  const name = window.sessionStorage.getItem("name") || window.localStorage.getItem("name");
  const email = window.sessionStorage.getItem("email") || window.localStorage.getItem("email");
  const userType = window.sessionStorage.getItem("user") || window.localStorage.getItem("user");

  const handleLogout = () => {
    // Add logout functionality here
    console.log("User logged out");
  };

  return (
    <div className="container mx-auto sm:py-10 sm:px-4 h-full ">
      {/* Header with Title and Search Bar */}
      <div className={`lg:flex items-center justify-between lg:mb-5 flex-col md:flex-row flex`}>
        <nav className="flex items-center mb-4 md:mb-0 flex-grow md:flex-grow-0 w-full px-3 lg:px-0">
          <h1 className="md:text-5xl font-outfit font-semibold text-3xl text-gray-600">Profile</h1>
        </nav>
        <div className="relative w-full md:w-1/4 flex-grow md:flex-grow-0 px-2 lg:px-0 block">
          <input
            className="rounded-full w-full ps-10 border-blue-500 border-2"
            type="search"
            placeholder="Search"
          />
          <i className="absolute lg:left-3 left-5 top-3 -translate-y-1 text-2xl flex justify-center">
            <BiSearchAlt />
          </i>
        </div>
      </div>

      {/* Profile Section */}
      <div className="h-[calc(100%-48px)] border-2 border-blue-500 col-span-6 rounded-xl pl-16 pt-8 max-w-full flex flex-col">
        {/* Profile Picture and Name Section */}
        <div className="flex items-center space-x-4 mb-8">
          <img
            className="rounded-full h-24 w-24 bg-gray-300"
            src={`${profilePic ? `https://seafarerdorm.scarlet2.io/Login/${profilePic}` : TabLogo}`}
            alt="Profile"
          />
          <div>
            <h2 className="text-2xl font-bold">{name || "Firstname Lastname"}</h2>
            <p className="text-gray-500">{userType || "Admin"}</p>
          </div>
        </div>

        {/* About Section */}
        <h3 className="text-xl font-semibold font-outfit mb-4">About</h3>
        <div className="space-y-2">
          <p>
            <span className="font-semibold font-outfit text-[#5B5B5B]">Address:</span> Address Street Brgy. Barangay Cebu City
          </p>
          <p>
            <span className="font-semibold font-outfit text-[#5B5B5B]">Phone:</span> 09517865712
          </p>
          <p>
            <span className="font-semibold font-outfit text-[#5B5B5B]">Email:</span> {email || "firstname.lastname@gmail.com"}
          </p>
        </div>
      </div>
    </div>
  );
}
