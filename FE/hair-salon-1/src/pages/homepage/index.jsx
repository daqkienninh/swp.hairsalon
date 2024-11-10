import React, { useEffect, useMemo, useState } from "react";
import Banner from "../../components/banner";
import { Badge, Button } from "antd";
import api from "./../../config/axios";
import { Link } from "react-router-dom";

function HomePage() {
  const [services, setServices] = useState([]);

  const fetchServices = async () => {
    try {
      const response = await api.get("/api/service");
      setServices(response.data);
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const categorizedServices = useMemo(() => {
    const getTop3Expensive = (services) => {
      return services.sort((a, b) => b.price - a.price).slice(0, 3);
    };

    return {
      women: getTop3Expensive(services.filter((service) => service.type === "Nữ")),
      men: getTop3Expensive(services.filter((service) => service.type === "Nam")),
      spa: getTop3Expensive(services.filter((service) => service.type === "Thư giãn")),
    };
  }, [services]);

  const renderServiceSection = (title, services) => (
    <div className="max-w-container mx-auto px-4">
      <div className="text-2xl font-semibold pb-6 mt-10 text-[#1A4D2E] pl-5">
        {title}
      </div>
      <div className="flex items-center justify-between h-full flex-wrap gap-3 w-full pb-16">
        {services.map((service, index) => (
          <div key={index} className="px-2">
            <Service service={service} />
          </div>
        ))}
      </div>
    </div>
  );


  return (
    <div className="w-full mx-auto">
      <Banner />
      {/* Women's services */}
      {/* <div className="max-w-container mx-auto px-4">
        <div className="text-2xl font-semibold pb-6 mt-10 text-[#1A4D2E] pl-5">
          Dịch vụ cho nữ
        </div>
        <div className="flex items-center justify-between h-full flex-wrap gap-3 w-full pb-16">
          {services
            .filter((service) => service.type === "Nữ")
            .map((service, index) => (
              <div key={index} className="px-2">
                <Service service={service} />
              </div>
            ))}
        </div>
      </div>
      {/* Men's services */}
      {/* <div className="max-w-container mx-auto px-4">
        <div className="text-2xl font-semibold pb-6 mt-10 text-[#1A4D2E] pl-5">
          Dịch vụ cho nam
        </div>
        <div className="flex items-center justify-between h-full flex-wrap gap-3 w-full pb-16">
          {services
            .filter((service) => service.type === "Nam")
            .map((service, index) => (
              <div key={index} className="px-2">
                <Service service={service} />
              </div>
            ))}
        </div>
      </div> */}
      {/* Spa services */}
      {/* <div className="max-w-container mx-auto px-4">
        <div className="text-2xl font-semibold pb-6 mt-10 text-[#1A4D2E] pl-5">
          Spa & Thư giãn
        </div>
        <div className="flex items-center justify-between h-full flex-wrap gap-3 w-full pb-16">
          {services
            .filter((service) => service.type === "Thư giãn")
            .map((service, index) => (
              <div key={index} className="px-2">
                <Service service={service} />
              </div>
            ))}
        </div>
      </div>  */}
      {renderServiceSection("Dịch vụ cho nữ", categorizedServices.women)}
      {renderServiceSection("Dịch vụ cho nam", categorizedServices.men)}
      {renderServiceSection("Spa & Thư giãn", categorizedServices.spa)}
    </div>
  );
}


const Service = ({ service }) => {
  return (
    <div className="w-full relative group">
      <div className="w-80 h-60 overflow-hidden relative">
        <div>
          <img
            src={service.image}
            alt={service.name}
            className="w-full h-full object-cover"
            // Set fixed height and object-cover to make images uniform
          />
        </div>
        <div className="absolute top-6 left-8">
          <Badge text="New" />
        </div>
        <div className="w-full h-20 absolute bg-white -bottom-[130px] group-hover:bottom-0 duration-700">
          <ul className="w-full h-full flex flex-col items-end justify-center gap-2 font-titleFont px-2 border-l border-r">
            <li className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full">
              <Link to={`/service-detail/${service.id}`}>Tìm hiểu thêm...</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-80 py-6 flex flex-col gap-1 border-[1px] border-t-0 px-4">
        <div className="flex items-center justify-between font-titleFont">
          <h2 className="text-lg text-primeColor font-bold">{service.name}</h2>
          <p className="text-[#767676] text-[14px]">
            {service.price.toLocaleString()}đ
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
