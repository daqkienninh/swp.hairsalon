import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Table,
  Tag,
  Spin,
  Alert,
  Button,
  Modal,
  Form,
  Rate,
  Input,
} from "antd";
import api from "./../../config/axios";
import moment from "moment";
import { toast } from "react-toastify";
import "./index.css";
import { useSelector } from "react-redux";
import { useForm } from "antd/es/form/Form";
function AppointmentHistory() {
  const user = useSelector((store) => store.user);
  const [appointments, setAppointments] = useState([]);
  const [customerID, setCustomerID] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { accountId } = useParams();
  const navigate = useNavigate();
  const [form] = useForm();
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  const fetchCustomer = async () => {
    try {
      setLoading(true);
      const response = await api.get("/api/customer");

      // Filter response data to only include stylists where user.id matches account.id
      const matchingCustomer = response.data.filter(
        (item) => item.account.id === user.id
      );

      // Extract stylist IDs from matching stylists
      const ids = matchingCustomer.map((item) => item.id);
      if (ids.length > 0) {
        setCustomerID(ids[0]); // Set stylistID if there are matching stylists
      }

      console.log("Matching IDs: ", ids);
      console.log("User ID: ", user.id);
      setLoading(false); // End loading after setting customer ID
    } catch (error) {
      setLoading(false); // End loading after setting customer ID
      toast.error(error.response?.data || "Error fetching stylists");
    }
  };
  useEffect(() => {
    fetchCustomer();
  }, [customerID]); // Fetch customer ID on component mount

  console.log("CustomerID: ", customerID);

  const fetchAppointments = useCallback(async () => {
    if (customerID) {
      // Only fetch if stylistID is not null
      try {
        setLoading(true);
        const response = await api.get(
          `/api/appointment/customer/${customerID}`
        );

        console.log("Appointment: ", response.data);
        const transformedAppointments = response.data.map((appointment) => {
          const detail = appointment.appointmentDetails[0]; // Assuming each appointment has at least one detail
          console.log("Detail: ", detail);
          return {
            key: appointment.id,
            date: moment(appointment.date).format("YYYY-MM-DD HH:mm"),
            totalPrice: appointment.totalPrice,
            status: appointment.status,
            isPaid: appointment.isPaid,
            serviceName: detail.serviceEntity.name,
            startTime: moment(detail.startTime).format("YYYY-MM-DD HH:mm"),
            stylistName: detail.stylist.fullName,
            stylistId: detail.stylist.id,
            serviceId: detail.serviceEntity.id,
          };
        });
        setAppointments(transformedAppointments);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error(error.response?.data || "Error fetching appointments");
      }
    }
  }, [customerID]);
  // Effect to fetch appointments when stylistID changes
  useEffect(() => {
    fetchAppointments();
  }, [customerID]); // Dependency array with stylistID

  const handleFeedback = async (values) => {
    try {
      const feedbackData = {
        content: values.content,
        rating: values.rating,
        stylistId: selectedFeedback.stylistId,
        serviceId: selectedFeedback.serviceId,
      };
      console.log("Feedback data: ", feedbackData);
      const response = await api.post(`/api/feedback`, feedbackData);
      console.log(response.data);
      fetchAppointments();
      setSelectedFeedback(null);
      form.resetFields();
      toast.success("Feedback thành công.");
    } catch (error) {
      toast.error(error);
    }
  };

  const columns = [
    {
      title: "Thời gian bắt đầu",
      dataIndex: "startTime",
      key: "startTime",
      sorter: (a, b) => moment(a.startTime).unix() - moment(b.startTime).unix(),
    },
    {
      title: "Dịch vụ",
      dataIndex: "serviceName",
      key: "serviceName",
    },
    {
      title: "Tổng giá dịch vụ",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (price) => `${price.toLocaleString()}đ`,
    },
    {
      title: "Stylist",
      dataIndex: "stylistName",
      key: "stylistName",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "DONE" ? "green" : "blue"}>{status}</Tag>
      ),
      filters: [
        { text: "Đã hoàn thành", value: "DONE" },
        { text: "Chấp nhận", value: "APPROVED" },
        { text: "Đang diễn ra", value: "IN_PROGRESS" },
      ],
      onFilter: (value, record) => record.status === value,
    },
    // {
    //   title: "Payment Status",
    //   dataIndex: "isPaid",
    //   key: "isPaid",
    //   render: (isPaid) => (
    //     <Tag color={isPaid ? "green" : "red"}>
    //       {isPaid ? "Paid" : "Unpaid"}
    //     </Tag>
    //   ),
    // },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (value, record) => {
        return (
          <Button
            type="primary"
            onClick={() =>
              setSelectedFeedback({
                id: record.key,
                serviceName: record.serviceName,
                stylistId: record.stylistId,
                serviceId: record.serviceId,
              })
            }
          >
            Feedback
          </Button>
        );
      },
    },
  ];

  if (loading) {
    return <Spin size="large" />;
  }
  if (error) {
    return (
      <Alert
        message="Error"
        description={error}
        type="error"
        showIcon
        action={
          <Button type="primary" onClick={() => navigate(-1)}>
            Go Back
          </Button>
        }
      />
    );
  }
  return (
    <div className="appointment-history">
      <h1>Lịch sử đặt hẹn</h1>
      {appointments.length > 0 ? (
        <Table
          columns={columns}
          dataSource={appointments}
          rowKey="key"
          pagination={{ pageSize: 10 }}
        />
      ) : (
        <Alert
          message="No appointments found for this customer."
          type="info"
          showIcon
        />
      )}
      <Modal
        label="Feedback"
        open={selectedFeedback}
        onOk={() => form.submit()}
        onCancel={() => setSelectedFeedback(null)}
      >
        <p>Feedback cho lịch hẹn này {selectedFeedback?.serviceName}</p>
        <Form labelCol={{ span: 24 }} onFinish={handleFeedback} form={form}>
          <Form.Item
            name="rating"
            rules={[
              {
                required: true,
                message: "Xin hãy đánh giá sao cho chúng tôi.",
              },
            ]}
          >
            <Rate />
          </Form.Item>
          <Form.Item label="Đánh giá" name="content">
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default AppointmentHistory;
