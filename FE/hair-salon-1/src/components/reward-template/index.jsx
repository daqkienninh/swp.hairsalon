import { Button, Card, Popconfirm, Typography } from 'antd'

const { Meta } = Card;
const { Text } = Typography;

function RewardCard({ name, image, description, loyaltyPointRequire, handleClick }) {
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
              <Text key="loyaltyPointRequire" strong>{`${loyaltyPointRequire} điểm`}</Text>,
              <Popconfirm
                  title="Đổi quà"
                  description="Bạn có chắc muốn đổi phần quà này?"
                  onConfirm={handleClick}
              >
                  <Button type="primary" className='h-8'>
                      Đổi quà
                  </Button>
              </Popconfirm>
          ]}
      >
          <Meta
              title={name}
              description={
                  <div className='h-25'>
                      <p>
                      {description}
                      </p>
                  </div>
              }
          />
      </Card>
  )
}

export default RewardCard