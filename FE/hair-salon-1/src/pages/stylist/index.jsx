import { Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import api from '../../config/axios';

function StylistPage() {
  const user = useSelector((store) => store.user);
  const [stylist, setStylist] = useState([]);
  const [stylistID, setStylistID] = useState(null);

  const fetchStylist = async () => {
    try {
      const response = await api.get("/api/stylist");

      // Filter response data to only include stylists where user.id matches account.id
      const matchingStylists = response.data.filter(item => item.account.id === user.id);

      // Extract stylist IDs from matching stylists
      const ids = matchingStylists.map(item => item.id);
      setStylistID(ids[0]);

      console.log("Matching Stylist IDs: ", ids);
      console.log("User ID: ", user.id);
      console.log("stylistID state: ", stylistID);
    } catch (error) {
      toast.error(error.response?.data || "Error fetching stylists");
    }
  };


  useEffect(() => {
    fetchStylist();
  }, []);

  return (
    <div>
    </div>
  );
}

export default StylistPage;
