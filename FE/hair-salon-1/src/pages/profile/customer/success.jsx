import { Button, Result } from 'antd'
import React, { useEffect, useState } from 'react'
import useGetParams from '../../../hooks/useGetParams'
import api from '../../../config/axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function SuccessPage() {

    const params = useGetParams();
    const appointmentID = params("appointmentID"); // get AppointmentID
    console.log(appointmentID);
    const vnp_TranCode = params("vnp_TmnCode")//transaction status
    console.log(vnp_TranCode);
    const vnp_TransactionStatus = params("vnp_TransactionStatus")
    console.log(vnp_TransactionStatus);
    const nav = useNavigate();

    const handleHome = () => {
        nav("/");
    }

    const postOrderID = async() =>{
        try{

            const response = await api.post(`/api/appointment/transaction?appointmentID=${appointmentID}`) // post transaction
            toast.success("Successfully");
            console.log(response.data);
        }catch (err){
            console.log(err)
        }
    }

    useEffect(() => {
        if(vnp_TransactionStatus === "00"){
            postOrderID();
            toast.success("");
        } else {
            // chuyen qua trang thanh toan that bai
            nav("/Fail");
            console.log("Fail")
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
                      History
                  </Button>,
                  <Button key="buy" onClick={handleHome}>Home</Button>,
              ]}
          />
    </div>
  )
}

export default SuccessPage