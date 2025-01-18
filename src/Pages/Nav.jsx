import { Outlet} from "react-router-dom";
import TopNavAdmin from "./components/TopNavAdmin";

export default function Nav(){ 
    
    const navigation = [
        {name: 'Apartments', href: '/Nav/Apartments'},
        {name: 'Tenants', href: '/Nav/Tenants'},
        {name: 'History', href: '/Nav/History'},
        {name: 'Reports', href: '/Nav/Reports'},
    ]

    return(
        <>
            <TopNavAdmin navItem={navigation}/>
            <Outlet/>   
        </>
    );
}