import React, { useEffect, useState } from 'react'
import api from '../../config/axios';
import { Funnel, FunnelChart, LabelList, Tooltip } from 'recharts';
import { useSelector } from 'react-redux';

function OverviewManager() {
    const [monthlyRevenue, setMonthlyRevenue] = useState([]);
    const user = useSelector((store) => store.user);
    // Fetch data for Monthly Revenue (Funnel Chart)
    const fetchRevenueData = async () => {
        try {
            const response = await api.get("/api/dashboard/revenue/monthly");
            setMonthlyRevenue(response.data);
            console.log(monthlyRevenue)
        } catch (error) {
            toast.error(error.response ? error.response.data : error.message);
        }
    };

    useEffect(() => {
        fetchRevenueData();
    }, []);
    return (
        <div>
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
            <div className="text-xl font-semibold mt-3 flex justify-end">
                Số dư: {user.balance.toLocaleString()}đ
            </div>
        </div>
    )
}

export default OverviewManager