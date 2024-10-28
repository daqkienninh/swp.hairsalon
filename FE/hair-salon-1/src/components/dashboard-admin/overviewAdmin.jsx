import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
    BarChart, Bar, FunnelChart, Funnel, LabelList,
    CartesianGrid, Tooltip, Legend, XAxis, YAxis
} from 'recharts'; // Update this path as necessary
import api from '../../config/axios';

function OverviewAdmin() {
    const [data, setData] = useState([]);
    const [data2, setData2] = useState([]);

    // Get data for BarChart
    const fetchData = async () => {
        try {
            const response = await api.get("/api/dashboard/admin");
            console.log("Response", response.data);
            // Transform the response data into a format suitable for BarChart
            setData([
                { name: 'Stylists', Account: response.data.stylistCount },
                { name: 'Customers', Account: response.data.customerCount },
                { name: 'Staff', Account: response.data.staffCount },
            ]);
        } catch (error) {
            toast.error(error.response ? error.response.data : error.message);
        }
    };

    // Get data for FunnelChart
    const fetchData2 = async () => {
        try {
            const response = await api.get("/api/dashboard/revenue/monthly");
            console.log("Response2", response.data);
            setData2(response.data.monthlyRevenue); // Assuming monthlyRevenue is an array
        } catch (error) {
            toast.error(error.response ? error.response.data : error.message);
        }
    };

    useEffect(() => {
        fetchData();
        fetchData2();
    }, []);

    return (
        <div className="flex flex-row gap-8 p-4">
            {/* Bar Chart for Admin Overview */}
            <div className="flex-1 bg-white p-4 rounded shadow-md">
                <h2 className="text-center text-lg font-semibold mb-4">Admin Overview</h2>
                <BarChart width={400} height={300} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Account" fill="#8884d8" />
                </BarChart>
            </div>

            {/* Funnel Chart for Monthly Revenue */}
            <div className="flex-1 bg-white p-4 rounded shadow-md">
                <h2 className="text-center text-lg font-semibold mb-4">Monthly Revenue</h2>
                <FunnelChart width={400} height={300}>
                    <Tooltip />
                    <Funnel
                        dataKey="value"
                        data={data2}
                        isAnimationActive
                    >
                        <LabelList position="right" fill="#000" stroke="none" dataKey="name" />
                    </Funnel>
                </FunnelChart>
            </div>
        </div>
    );
}

export default OverviewAdmin;
