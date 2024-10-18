import React from "react";
import { Card, Button } from "antd";
import "./index.css";

const { Meta } = Card;

const ServiceCard = ({ title, duration, description, images }) => {
  return (
    <Card
      hoverable
      cover={<img alt="example" src={images[0]} />}
      className="service-card"
    >
      <Meta
        title={title}
        description={
          <div>
            <p>{description}</p>
            <p>{duration} Phút</p>
          </div>
        }
      />
      <Button type="link">Tìm hiểu thêm</Button>
    </Card>
  );
};

export default ServiceCard;
