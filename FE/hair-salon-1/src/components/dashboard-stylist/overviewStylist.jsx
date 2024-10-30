import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import api from '../../config/axios';
import { toast } from 'react-toastify';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

function OverviewStylist() {
  const user = useSelector((store) => store.user);
  const [stylistID, setStylistID] = useState(null);
  const [data, setData] = useState([]);

  const fetchStylist = async () => {
    try {
      const response = await api.get("/api/stylist");

      // Filter response data to only include stylists where user.id matches account.id
      const matchingStylists = response.data.filter(item => item.account.id === user.id);

      // Extract stylist IDs from matching stylists
      const ids = matchingStylists.map(item => item.id);
      if (ids.length > 0) {
        setStylistID(ids[0]); // Set stylistID if there are matching stylists
      }

      console.log("Matching Stylist IDs: ", ids);
      console.log("User ID: ", user.id);
    } catch (error) {
      toast.error(error.response?.data || "Error fetching stylists");
    }
  };
  console.log("StylistID: ", stylistID)

  useEffect(() => {
    const fetchAppointments = async () => {
      if (stylistID) { // Only fetch if stylistID is not null
        try {
          const response = await api.get(`/api/dashboard/${stylistID}/kpi`);
          console.log("Data: ", response.data);
          const { totalBookedAppointments, kpiMet, kpiAppointment } = response.data;

          // Transform the API response into the format needed for Recharts
          const chartData = [
            {
              name: 'Appointments',
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
  return (
    <div>
      <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="totalBooked" fill="#8884d8" name="Total Booked Appointments" />
        <Bar dataKey="kpi" fill="#82ca9d" name="KPI Appointment" />
      </BarChart>
    </ResponsiveContainer>
    </div>
  )
}

export default OverviewStylist