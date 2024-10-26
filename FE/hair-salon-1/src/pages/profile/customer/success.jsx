import { Button, Result } from 'antd'
import React, { useEffect } from 'react'
import useGetParams from '../../../hooks/useGetParams'
import api from '../../../config/axios';

function SuccessPage() {

    const params = useGetParams();
    const orderID = params(""); // get AppointmentID
    console.log(orderID);
    const vnp_TranCode = params("")//transaction status

    const postOrderID = async() =>{
        try{

            const response = await api.post(``) // post transaction
        }catch (err){
            console.log(err)
        }
    }

    useEffect(() => {
        if(vnp_TranCode === ""){
            postOrderID();
        } else {
            // chuyen qua trang thanh toan that bai
        }
    },[])
  return (
    <div>
          <Result
              status="success"
              title="Successfully Purchased Cloud Server ECS!"
              subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
              extra={[
                  <Button type="primary" key="console">
                      Go Console
                  </Button>,
                  <Button key="buy">Buy Again</Button>,
              ]}
          />
    </div>
  )
}

export default SuccessPage