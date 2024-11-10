import React, { useEffect, useState } from 'react';
import api from '../../config/axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

function OverviewManager() {
    const [monthlyRevenue, setMonthlyRevenue] = useState([]);
    const user = useSelector((store) => store.user);

    // Fetch data for Monthly Revenue (Column Chart)
    const fetchRevenueData = async () => {
        try {
            const response = await api.get("/api/dashboard/revenue/monthly");

            // Map response to chart-friendly format
            const chartData = response.data.monthlyRevenue.map(item => ({
                name: `${item.month}/${item.year}`, // Label for each month
                value: item.totalRevenue // Revenue value
            }));

            setMonthlyRevenue(chartData);
            console.log(chartData); // Log to verify data format
        } catch (error) {
            toast.error(error.response ? error.response.data : error.message);
        }
    };

    useEffect(() => {
        fetchRevenueData();
        user.balance.toLocaleString();
    }, []);

    return (
        <div>
            {/* Monthly Revenue Column Chart */}
            <div className="bg-white p-4 rounded shadow-md">
                <h2 className="text-center text-lg font-semibold mb-4">Doanh thu tháng</h2>
                <BarChart width={500} height={300} data={monthlyRevenue}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" name="Doanh thu" fill="#82ca9d"/>
                </BarChart>
            </div>
            <div className="text-xl font-semibold mt-3 flex justify-end">
                Số dư: {user.balance.toLocaleString()}đ
            </div>
        </div>
    );
}

export default OverviewManager;
