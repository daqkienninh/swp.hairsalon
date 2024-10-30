import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import api from '../../config/axios';
import { Col, Row, Typography } from 'antd';
import RewardCard from '../../components/reward-template';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const { Title } = Typography;

function RewardPage() {
    const user = useSelector((store) => store.user);
    console.log("User", user);
    const [reward, setReward] = useState([]);
    const navigate = useNavigate();
    const [customerId, setCustomerId] = useState(null);

    const fetchReward = async () => {
        try {
            const response = await api.get("/api/reward");
            setReward(response.data);
            console.log("Reward", response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const response = await api.get("/api/customer");

                // Filter response data to only include stylists where user.id matches account.id
                const matchingCustomer = response.data.filter(item => item.account.id === user.id);

                // Extract stylist IDs from matching stylists
                const ids = matchingCustomer.map(item => item.id);
                if (ids.length > 0) {
                    setCustomerId(ids[0]); // Set stylistID if there are matching stylists
                }

                console.log("Matching Customer IDs: ", ids);
                console.log("User ID: ", user.id);
            } catch (error) {
                console.log(error);
            }
        };

        fetchCustomer();
    }, [customerId]);

    useEffect(() => {
        fetchReward();
    }, []);
    console.log("customerId", customerId);

    const handleClick = async (rewardId) => {
        if (!customerId) {
            console.log("Customer ID is not set.");
            return;
        }

        try {
            const response = await api.post(`/api/reward/claim?customerId=${customerId}&rewardId=${rewardId}`);
            toast(response.data);
        } catch (error) {
            console.log(error);
            toast.error("Failed to claim reward.");
        }
    };

    return (
        <div className="container mt-5">
            <div style={{ padding: "2rem" }}>
                <Title level={2} style={{ textAlign: "center", marginBottom: "2rem" }}>
                    Tất cả Quà thưởng
                </Title>
                <Row gutter={[16, 16]}>
                    {reward.map((reward) => (
                        <Col xs={24} sm={12} md={8} lg={6} key={reward.id}>
                            <RewardCard
                                name={reward.name}
                                description={reward.description}
                                loyaltyPointRequire={reward.loyaltyPointRequire}
                                image={reward.image}
                                handleClick={() => handleClick(reward.id)} // Pass reward.id here
                            />
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
}

export default RewardPage;
