import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Spinner } from '@material-tailwind/react';

const TenantHistory = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    // Fetch Data Function
    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`https://seafarerdorm.scarlet2.io/Reservations/retrieve-reservations.php?search=${searchQuery}`);
            console.log("API Response:", response.data); // Debugging log
            setItems(response.data.data || []);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    // Fetch data when component mounts & when search changes
    useEffect(() => { 
        fetchData();
    }, [searchQuery]);

    return (
        <div className="p-6 border border-blue-500 rounded-xl bg-white">
            <h2 className="text-5xl font-outfit mb-4">Tenant History</h2>
            {loading ? (
                <div className="w-full h-96 flex justify-center items-center">
                    <Spinner className="w-10 h-10"/>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border-none rounded-lg">
                        <thead>
                            <tr className="bg-white">
                                <th className="p-3 border border-none text-left">Tenant’s Name</th>
                                <th className="p-3 border border-none text-left">Room</th>
                                <th className="p-3 border border-none text-left">Tower</th>
                                <th className="p-3 border border-none text-left">Reservation Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.length > 0 ? (
                                items.map((item, index) => (
                                    <tr key={index} className="border">
                                        <td className="p-3 border-l border-t border-b border-blue-500">{item.cName}</td>
                                        <td className="p-3 border-t border-b border-blue-500">{item.roomNumber}</td>
                                        <td className="p-3 border-t border-b border-blue-500">{item.tower}</td>
                                        <td className="p-3 border-t border-b border-r border-blue-500">{item.reservationStatus}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="p-3 text-center text-gray-500">No Tenants Available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default TenantHistory;
