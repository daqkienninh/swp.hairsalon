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
      cover={
        <img
          alt={name}
          src={image}
          style={{ height: 200, objectFit: "cover" }}
        />
      }
      actions={[
        <Text strong>{`$${price.toFixed(2)}`}</Text>,
        <Text>{`${duration} min`}</Text>,
      ]}
      onClick={handleCardClick}
    >
      <Meta
        title={name}
        description={
          <>
            <Text>{description}</Text>
            <div style={{ marginTop: "0.5rem" }}>
              <Tag color="blue">{type}</Tag>
              {discount > 0 && <Tag color="red">{`${discount}% OFF`}</Tag>}
            </div>
          </>
        }
      />
    </Card>
  );
}

export default ServiceCard;
