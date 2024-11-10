import { Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import api from '../../config/axios';

function RecievedPage() {
    const user = useSelector((store) => store.user);
    const [recived, setRecived] = useState([]);
    const [customerId, setCustomerId] = useState(null);

    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const response = await api.get("/api/customer");
                const matchingCustomer = response.data.filter(item => item.account.id === user.id);
                const ids = matchingCustomer.map(item => item.id);
                if (ids.length > 0) {
                    setCustomerId(ids[0]);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchCustomer();
    }, [user.id]);

    const fetchRecived = async () => {
        try {
            if (!customerId) return;
            const response = await api.get(`api/reward/by-customer?customerId=${customerId}`);
            setRecived(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchRecived();
    }, [customerId]);

    const tableColumns = [
        {
            title: "Tên",
            dataIndex: "name",
            key: "name",
            className: "px-4 py-2 font-semibold text-gray-700", // Table column styling
        },
        {
            title: "Mô tả",
            dataIndex: "description",
            key: "description",
            className: "px-4 py-2 text-gray-600",
        },
        {
            title: "Hình ảnh",
            dataIndex: "image",
            key: "image",
            render: (image) => <img src={image} alt="" className="w-24 h-24 object-cover rounded-md shadow-sm" />,
            className: "px-4 py-2",
        },
    ];

    return (
        <div className="p-4 bg-white shadow-md rounded-lg">
            <Table
                columns={tableColumns}
                dataSource={recived}
                rowKey="id"
                pagination={{ pageSize: 10 }}
            />
        </div>
    );
}

export default RecievedPage;
