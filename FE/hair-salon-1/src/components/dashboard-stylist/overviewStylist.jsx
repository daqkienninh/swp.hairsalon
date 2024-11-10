import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import api from '../../config/axios';
import { toast } from 'react-toastify';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

function OverviewStylist() {
  const user = useSelector((store) => store.user);
  const [stylistID, setStylistID] = useState(null);
  const [data, setData] = useState([]);
  const [stylist, setStylist] = useState([]);

  const fetchStylist = async () => {
    try {
      const response = await api.get("/api/stylist");
      const matchingStylists = response.data.filter(item => item.account.id === user.id);
      const ids = matchingStylists.map(item => item.id);
      if (ids.length > 0) {
        setStylistID(ids[0]);
      }
    } catch (error) {
      toast.error(error.response?.data || "Error fetching stylists");
    }
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      if (stylistID) {
        try {
          const response = await api.get(`/api/dashboard/${stylistID}/kpi`);
          const { totalBookedAppointments, kpiAppointment } = response.data;
          const chartData = [
            {
              totalBooked: totalBookedAppointments,
              kpi: kpiAppointment,
            },
          ];
          setData(chartData);
        } catch (error) {
          toast.error(error.response?.data || "Error fetching appointments");
        }
      }
    };
    fetchAppointments();
  }, [stylistID]);

  useEffect(() => {
    fetchStylist();
  }, []);

  useEffect(() => {
    const fetchStylistbyID = async () => {
      if (stylistID) {
        try {
          const response = await api.get(`/api/stylist/${stylistID}`);
          setStylist(response.data);
        } catch (error) {
          toast.error(error.response?.data || "Error fetching stylist");
        }
      }
    };
    fetchStylistbyID();
  }, [stylistID]);

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">Tổng quan</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="totalBooked" fill="#4A90E2" name="Tổng cuộc hẹn" />
          <Bar dataKey="kpi" fill="#7ED321" name="KPI" />
        </BarChart>
      </ResponsiveContainer>
      <div className="text-right mt-6">
        <p className="text-lg font-semibold">Số dư: <span className="text-blue-600">{user.balance.toLocaleString()}đ</span></p>
        <p className="text-lg font-semibold">Level: <span className="text-green-600">{stylist.level}</span></p>
      </div>
    </div>
  );
}

export default OverviewStylist;
