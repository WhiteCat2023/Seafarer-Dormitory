import { Outlet} from "react-router-dom";
import TopNavAdmin from "./components/TopNavAdmin";

export default function Nav(){ 
    
    const navigation = [
        {name: 'Users', href: '/Nav/Tenants'},
        {name: 'Apartments', href: '/Nav/Apartments'},
        {name: 'Rooms', href: '/Nav/History'},
        {name: 'Reports', href: '/Nav/Reports'},
    ]

    return(
        <>
            <div className="sm:flex h-dvh">
                <TopNavAdmin navItem={navigation}/>
                <Outlet/>   
            </div>
        </>
    );
}