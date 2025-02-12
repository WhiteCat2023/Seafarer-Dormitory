import TabLogo from "../assets/TabLogo.png"

export default function ProfileSetting(){

    const profilePic = window.sessionStorage.getItem("profile_pic") || window.localStorage.getItem("profile_pic")
    const name = window.sessionStorage.getItem("name") || window.localStorage.getItem("name")
    const email = window.sessionStorage.getItem("email") || window.localStorage.getItem("email")
    const userType = window.sessionStorage.getItem("user") || window.localStorage.getItem("user")

    return(
        <div className="p-4">
            <img className="rounded-full h-24 w-24" src={`${profilePic ? `https://seafarerdorm.scarlet2.io/Login/${profilePic}`: TabLogo }`}/>
            <h3>Name: {name}</h3>
            <p>Email: {email}</p>
            <p>Role: {userType}</p>
        </div>
    )
}