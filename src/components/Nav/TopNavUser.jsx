import Logo from "../../assets/Logo.png";

export default function TopNavUser(){

    return(
        <>
            <div className="flex justify-between items-center bg-white z-50 h-16 sticky top-0 left-0 border-b border-[#595BD4]">
                <img src={Logo} alt="" className="w-28 "/>
            </div>
        </>
    ); 
}