import TabLogo from "../assets/TabLogo.png";

export default function ProfileSetting() {
  const profilePic = window.sessionStorage.getItem("profile_pic") || window.localStorage.getItem("profile_pic");
  const name = window.sessionStorage.getItem("name") || window.localStorage.getItem("name");
  const email = window.sessionStorage.getItem("email") || window.localStorage.getItem("email");
  const userType = window.sessionStorage.getItem("user") || window.localStorage.getItem("user");

  return (
    <div className="p-8 max-w-4xl mx-auto">
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
  );
}
