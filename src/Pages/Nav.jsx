import { Outlet} from "react-router-dom";
import TopNavAdmin from "../components/Nav/TopNavAdmin";

export default function Nav(){ 
    
    const navigation = [
        {name: 'Users', href: '/Nav/Tenants'},
        {name: 'Rooms', href: '/Nav/Rooms'},
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