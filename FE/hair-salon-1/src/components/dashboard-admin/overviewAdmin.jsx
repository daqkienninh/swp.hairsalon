import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
    BarChart, Bar, FunnelChart, Funnel, LabelList,
    CartesianGrid, Tooltip, Legend, XAxis, YAxis
} from 'recharts';
import api from '../../config/axios';

function OverviewAdmin() {
    const [accountData, setAccountData] = useState([]);
    const [monthlyRevenue, setMonthlyRevenue] = useState([]);

    // Fetch data for Account Overview (Bar Chart)
    const fetchAccountData = async () => {
        try {
            const response = await api.get("/api/dashboard/admin");
            setAccountData([
                { name: 'Stylist', Account: response.data.stylistCount },
                { name: 'Khách hàng', Account: response.data.customerCount },
                { name: 'Nhân viên', Account: response.data.staffCount },
            ]);
        } catch (error) {
            toast.error(error.response ? error.response.data : error.message);
        }
    };

    // Fetch data for Monthly Revenue (Funnel Chart)
    const fetchRevenueData = async () => {
        try {
            const response = await api.get("/api/dashboard/revenue/monthly");
            setMonthlyRevenue(response.data.monthlyRevenue);
        } catch (error) {
            toast.error(error.response ? error.response.data : error.message);
        }
    };

    useEffect(() => {
        fetchAccountData();
        fetchRevenueData();
    }, []);

    return (
        <div className="grid grid-cols-2 gap-8 p-4">
            {/* Account Overview Bar Chart */}
            <div className="bg-white p-4 rounded shadow-md">
                <h2 className="text-center text-lg font-semibold mb-4">Tổng quan</h2>
                <BarChart width={400} height={300} data={accountData} barCategoryGap="20%">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis type="number" allowDecimals={false} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Account" fill="#6A9C89" />
                </BarChart>
            </div>

            {/* Monthly Revenue Funnel Chart */}
            <div className="bg-white p-4 rounded shadow-md">
                <h2 className="text-center text-lg font-semibold mb-4">Doanh thu tháng</h2>
                <FunnelChart width={400} height={300}>
                    <Tooltip />
                    <Funnel dataKey="value" data={monthlyRevenue} isAnimationActive>
                        <LabelList position="right" fill="#000" stroke="none" dataKey="name" />
                    </Funnel>
                </FunnelChart>
            </div>
        </div>
    );
}

export default OverviewAdmin;
