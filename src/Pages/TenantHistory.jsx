import React, { useEffect, useState } from "react";
import axios from "axios";
import { Spinner } from "@material-tailwind/react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const TenantHistory = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                `https://seafarerdorm.scarlet2.io/Rooms/fetch_tenant_history.php?search=${searchQuery}`
            );
            setItems(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    const clearHistory = async () => {
        MySwal.fire({
            icon: "warning",
            title: `Clear Tenant History`,
            text: "Are you sure you want to delete all tenant history?",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.post("https://seafarerdorm.scarlet2.io/Rooms/clear_tenant_history.php");
                    setItems([]);
                    MySwal.fire("Deleted!", "Tenant history has been cleared.", "success");
                } catch (error) {
                    console.error("Error clearing tenant history:", error);
                    MySwal.fire("Error", "Failed to clear history. Try again.", "error");
                }
            }
        });
    };

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            fetchData();
        }, 500);

        return () => clearTimeout(delayDebounce);
    }, [searchQuery]);

    return (
        <div className="p-6 border border-blue-500 rounded-xl bg-white">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-5xl font-outfit">Tenant History</h2>
                {items.length > 0 && (
                    <button
                        onClick={clearHistory}
                        className="text-sm text-gray-500 hover:underline"
                    >
                        Clear all history
                    </button>
                )}
            </div>

            {loading ? (
                <div className="w-full h-96 flex justify-center items-center">
                    <Spinner className="w-10 h-10" />
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="text-left bg-white">
                                <th className="p-3 font-outfit font-semibold">Tenant’s Name</th>
                                <th className="p-3 font-outfit font-semibold">Phone#</th>
                                <th className="p-3 font-outfit font-semibold">Tower</th>
                                <th className="p-3 font-outfit font-semibold">Room</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.length > 0 ? (
                                items.map((item, index) => (
                                    <tr key={index} className="border-b border-blue-300">
                                        <td className="p-3 font-outfit font-semibold border-l border-t border-b border-blue-500">{item.name}</td>
                                        <td className="p-3 font-outfit font-semibold border-t border-b border-blue-500">{item.phone}</td>
                                        <td className="p-3 font-outfit font-semibold border-t border-b border-blue-500">{item.tower}</td>
                                        <td className="p-3 font-outfit font-semibold border-t border-b border-r border-blue-500">{item.booking_id}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="p-3 text-center text-gray-500">
                                        No Tenants Available
                                    </td>
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
