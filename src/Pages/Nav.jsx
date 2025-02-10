import { Outlet} from "react-router-dom";
import TopNavAdmin from "../components/Nav/TopNavAdmin";

export default function Nav(){ 
    
    const navigation = [
        {name: 'Rooms', href: '/Nav/Rooms'},
        {name: 'Reservations', href: '/Nav/Reservations'},
    ]

    return(
        <>
            <div className="sm:flex h-screen  overflow-y-scroll">
                <div className="sticky top-0 left-0">
                    <TopNavAdmin navItem={navigation}/>
                </div>
                <Outlet/>   
            </div>
        </>
    );
}