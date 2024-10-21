import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Spin } from "antd";
import api from "../../config/axios";
const ServiceDetailPage = () => {
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await api.get(`/api/service/${id}`);
        setService(response.data);
      } catch (error) {
        console.error("Error fetching service details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (!service) {
    return <div className="text-center text-2xl mt-10">Service not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-[#94B49F]">
        {service.name}
      </h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <img
            src="src/assets/images/spfFour.webp"
            alt={service.name}
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
        <div className="md:w-1/2 flex flex-col justify-between">
          <div>
            <p className="text-lg mb-4">
              <span className="font-semibold">Mô tả:</span>{" "}
              {service.description}
            </p>
            <p className="text-lg mb-2">
              <span className="font-semibold">Loại dịch vụ:</span>{" "}
              {service.type}
            </p>
            <p className="text-lg mb-2">
              <span className="font-semibold">Thời gian:</span>{" "}
              {service.duration} phút
            </p>
            <p className="text-lg mb-2">
              <span className="font-semibold">Giá gốc:</span>{" "}
              {service.price.toLocaleString()}đ
            </p>
            {service.discount > 0 && (
              <p className="text-lg mb-2 text-red-500">
                <span className="font-semibold">Giảm giá:</span>{" "}
                {service.discount}%
              </p>
            )}
            <p className="text-xl font-bold mt-4">
              Tổng giá: {service.totalPrice.toLocaleString()}đ
            </p>
          </div>
          <button
            className="mt-6 bg-[#94B49F] hover:bg-[#CEE5D0] text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
            onClick={() =>
              navigate("/booking", { state: { serviceId: service.id } })
            }
          >
            Đặt lịch ngay
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailPage;
