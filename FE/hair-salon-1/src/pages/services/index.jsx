import React, { useEffect, useState } from "react";
import { Row, Col, Button, Spin } from "antd";
import ServiceCard from "../../components/service-template";
import api from "./../../config/axios";

function ServicePage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch services from API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.get("/api/service"); // Replace with your API endpoint
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <div className="container">
      <h2>CẮT TÓC</h2>
      <p>
        Trải nghiệm cắt tóc phong cách dành riêng cho bạn, vừa tiện lợi vừa thư
        giãn tại đây
      </p>
      <Row gutter={[16, 16]}>
        {services.map((service, index) => (
          <Col key={index} xs={24} sm={12} lg={8}>
            <ServiceCard {...service} />
          </Col>
        ))}
      </Row>
      <div className="button-container">
        <Button type="primary" size="large">
          ĐẶT LỊCH NGAY
        </Button>
      </div>
    </div>
  );
}

export default ServicePage;
