import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { Area, Bar, CartesianGrid, Cell, ComposedChart, Legend, Line, Pie, PieChart, Tooltip, XAxis, YAxis } from 'recharts';
import api from '../../config/axios';

function OverviewStaff() {
    const [data, setData] = useState();
    const [data2, setData2] = useState();

    // Get data
    const fetchData = async () => {
        try {
            const response = await api.get("/api/dashboard/top3Service");
            console.log("Response", response.data);
            setData(response.data);
        } catch (error) {
            toast.error(error.response);
        }
    };

    const fetchData2 = async () => {
        try {
            const response = await api.get("/api/dashboard/staff");
            console.log("Response2", response.data);
            setData2(response.data);
        } catch (error) {
            toast.error(error.response);
        }
    };

    useEffect(() => {
        fetchData();
        fetchData2();
    }, []);

    // Transform data for PieChart
    const pieData = data?.topServices?.map(item => ({
        name: item.productName,
        value: item.totalBooked
    }));

    // Transform data2 for ComposedChart
    const composedData = data2 ? [
        {
            name: 'Overview',
            products: data2.totalProducts,
            appointments: data2.totalAppointments,
        }
    ] : [];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

    return (
        <div className="w-full p-4">
            <div className="flex flex-row justify-between gap-4">
                <div className="w-1/2 bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                        Service Bookings Distribution
                    </h2>
                    <PieChart width={400} height={300}>
                        <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {pieData?.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </div>

                <div className="w-1/2 bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                        Business Overview
                    </h2>
                    <ComposedChart width={400} height={300} data={composedData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <CartesianGrid stroke="#f5f5f5" />
                        <Bar dataKey="products" barSize={20} fill="#413ea0" name="Total Products" />
                        <Bar dataKey="appointments" barSize={20} fill="#82ca9d" name="Total Appointments" />
                    </ComposedChart>
                </div>
            </div>
        </div>
    )
}

export default OverviewStaff
