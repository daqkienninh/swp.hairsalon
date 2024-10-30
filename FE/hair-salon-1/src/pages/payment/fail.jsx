import { Button, Result, Typography } from 'antd';
import React from 'react'
import { useNavigate } from 'react-router-dom';

function Fail() {
  const navigate = useNavigate();
  const handleHome = () =>{
    navigate("/")
  }
  return (
    <div>
      <Result
        status="error"
        title="Submission Failed"
        subTitle="Please check and modify the following information before resubmitting."
        extra={[
          <Button type="primary" key="console">
            Go Console
          </Button>,
          <Button onClick={handleHome}>Buy Again</Button>,
        ]}
      >
      </Result>
    </div>
  )
}

export default Fail