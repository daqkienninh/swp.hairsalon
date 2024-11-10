import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Area, Bar, CartesianGrid, Cell, ComposedChart, Legend, Line, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import api from '../../config/axios';

function OverviewStaff() {
    const [data, setData] = useState();
    const [data2, setData2] = useState();

    // Fetch data
    const fetchData = async () => {
        try {
            const response = await api.get("/api/dashboard/top3Service");
            setData(response.data);
        } catch (error) {
            toast.error("Error loading service data");
        }
    };

    const fetchData2 = async () => {
        try {
            const response = await api.get("/api/dashboard/staff");
            setData2(response.data);
        } catch (error) {
            toast.error("Error loading staff data");
        }
    };

    useEffect(() => {
        fetchData();
        fetchData2();
    }, []);

    // Prepare data for PieChart and ComposedChart
    const pieData = data?.topServices?.map(item => ({
        name: item.productName,
        value: item.totalBooked
    })) || [];

    const composedData = data2 ? [
        {
            name: '',
            products: data2.totalProducts,
            appointments: data2.totalAppointments,  // Assuming revenue is available in data2
        }
    ] : [];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <div className="w-full">
            <div className="flex flex-col lg:flex-row justify-between gap-4">
                {/* Service Bookings Pie Chart */}
                <div className="w-full bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Thống kê dịch vụ</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                                animationDuration={1500}
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value) => `${value} Bookings`} />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

export default OverviewStaff;
