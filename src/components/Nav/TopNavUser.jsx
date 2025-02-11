import Logo from "../../assets/Logo.png";

export default function TopNavUser(){

    return(
        <>
            <div className="flex justify-between items-center p-4 bg-white z-50 h-16">
                <img src={Logo} alt="" className="lg:w-34 w-24 "/>
            </div>
        </>
    ); 
}