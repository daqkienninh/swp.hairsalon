import { Button, Result } from 'antd'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import useGetParams from '../../hooks/useGetParams';
import api from '../../config/axios';

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

  const postOrderID = async () => {
    try {
      const response = await api.post(`/api/appointment/transaction?uuId=${appointmentID}`) // post transaction
      console.log(response.data);
    } catch (err) {
      console.log(err)
    }
  }

  const confirmbanking = async () => {
    console.log(appointmentID);
    try {
      const response = await api.put(`/api/payment/confirm-banking?appointmentId=${appointmentID}`) // post transaction
      console.log(response.data);
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (vnp_TransactionStatus === "00") {
      postOrderID();
      confirmbanking();
    } else {
      // chuyen qua trang thanh toan that bai
      nav("/fail");
      console.log("Fail")
    }
  }, [])


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <Result
          status="success"
          title="Thanh toán thành công!"
          extra={[
            <Button key="buy" onClick={handleHome}>
              Trang chủ
            </Button>,
          ]}
        />
      </div>
    </div>
  )
}

export default SuccessPage