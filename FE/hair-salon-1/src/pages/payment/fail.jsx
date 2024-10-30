
import { Button, Result, Typography } from 'antd';
import React from 'react'
import { useNavigate } from 'react-router-dom';

function Fail() {
  const navigate = useNavigate();
  const handleHome = () => {
    navigate("/")
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <Result
          status="error"
          title="Thanh toán thất bại!"
          extra={[
            <Button onClick={handleHome}>Trang chủ</Button>,
          ]}
        >
        </Result>
      </div>
    </div>
  )
}

export default Fail