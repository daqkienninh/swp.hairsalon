import React, { useEffect, useState } from "react";
import { Row, Col, Spin, Typography } from "antd";
import ServiceCard from "../../components/service-template";
import api from "./../../config/axios";
import HeaderBottom from "../../components/header/headerbottom";

const { Title } = Typography;

function ServicePage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch services from API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.get("/api/service");
        setServices(response.data); // Assuming the response data is an array of services
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="container">
      <HeaderBottom />
      <div style={{ padding: "2rem" }}>
        <Title level={2} style={{ textAlign: "center", marginBottom: "2rem" }}>
          Tất cả dịch vụ
        </Title>
        <Row gutter={[16, 16]}>
          {services.map((service) => (
            <Col xs={24} sm={12} md={8} lg={6} key={service.id}>
              <ServiceCard
                id={service.id}
                name={service.name}
                description={service.description}
                type={service.type}
                price={service.price}
                duration={service.duration}
                discount={service.discount}
                image={service.image}
              />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

export default ServicePage;
