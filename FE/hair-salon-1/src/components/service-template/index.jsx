import React from "react";
import { Card, Typography, Tag } from "antd";
import { useNavigate } from "react-router-dom";

const { Meta } = Card;
const { Text } = Typography;

function ServiceCard({
  id,
  name,
  description,
  type,
  price,
  duration,
  discount,
  image,
}) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/service-detail/${id}`);
  };

  return (
    <Card
      hoverable
      style={{ height: "100%", display: "flex", flexDirection: "column" }}
      cover={
        <img
          alt={name}
          src={image}
          style={{ height: 200, objectFit: "cover" }}
        />
      }
      actions={[
        <Text key="price" strong>{`${price.toLocaleString()}đ`}</Text>,
        <Text key="duration">{`${duration} phút`}</Text>,
      ]}
      onClick={handleCardClick}
    >
      <Meta
        title={name}
        description={
          <div style={{ height: "100px", overflow: "hidden" }}>
            <Text ellipsis={{ rows: 2 }}>{description}</Text>
            <div style={{ marginTop: "0.5rem" }}>
              <Tag color="blue">{type}</Tag>
              {discount > 0 && <Tag color="red">{`Giảm ${discount}%`}</Tag>}
            </div>
          </div>
        }
      />
    </Card>
  );
}

export default ServiceCard;
