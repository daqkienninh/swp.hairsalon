import React, { useState, useEffect } from "react";
import {
  Table,
  Tag,
  Select,
  DatePicker,
  Space,
  Card,
  Typography,
  Empty,
  Spin,
} from "antd";
import {
  CalendarOutlined,
  ClockCircleOutlined,
  UserOutlined,
  ScissorOutlined,
} from "@ant-design/icons";
import moment from "moment";
import api from "../../config/axios";

const { Option } = Select;
const { RangePicker } = DatePicker;
const { Title, Text } = Typography;

function HistoryBooking() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [dateRange, setDateRange] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, [filter, dateRange]);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      let url = "/api/appointment/customer";
      if (filter !== "all") {
        url += `?status=${filter}`;
      }
      if (dateRange) {
        const [start, end] = dateRange;
        url += `${filter !== "all" ? "&" : "?"}startDate=${start.format(
          "YYYY-MM-DD"
        )}&endDate=${end.format("YYYY-MM-DD")}`;
      }
      const response = await api.get(url);
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Service",
      dataIndex: ["details", "service", "name"],
      key: "service",
      render: (text) => (
        <Space>
          <ScissorOutlined />
          <Text>{text}</Text>
        </Space>
      ),
    },
    {
      title: "Stylist",
      dataIndex: ["details", "stylist", "full_name"],
      key: "stylist",
      render: (text) => (
        <Space>
          <UserOutlined />
          <Text>{text}</Text>
        </Space>
      ),
    },
    {
      title: "Date & Time",
      dataIndex: ["details", "startTime"],
      key: "dateTime",
      render: (text) => (
        <Space direction="vertical" size={0}>
          <Space>
            <CalendarOutlined />
            <Text>{moment(text).format("MMMM D, YYYY")}</Text>
          </Space>
          <Space>
            <ClockCircleOutlined />
            <Text>{moment(text).format("h:mm A")}</Text>
          </Space>
        </Space>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={getStatusColor(status)}>{status.toUpperCase()}</Tag>
      ),
    },
    {
      title: "Note",
      dataIndex: ["details", "note"],
      key: "note",
      render: (text) => <Text italic>{text || "No note"}</Text>,
    },
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "green";
      case "cancelled":
        return "red";
      case "completed":
        return "blue";
      default:
        return "default";
    }
  };

  const handleFilterChange = (value) => {
    setFilter(value);
  };

  const handleDateRangeChange = (dates) => {
    setDateRange(dates);
  };

  return (
    <Card style={{ margin: "20px" }}>
      <Title level={2}>Booking History</Title>
      <Space style={{ marginBottom: "20px" }}>
        <Select
          defaultValue="all"
          style={{ width: 120 }}
          onChange={handleFilterChange}
        >
          <Option value="all">All</Option>
          <Option value="confirmed">Confirmed</Option>
          <Option value="cancelled">Cancelled</Option>
          <Option value="completed">Completed</Option>
        </Select>
        <RangePicker onChange={handleDateRangeChange} />
      </Space>
      <Spin spinning={loading}>
        {bookings.length > 0 ? (
          <Table
            columns={columns}
            dataSource={bookings}
            rowKey={(record) => record.id}
            pagination={{ pageSize: 10 }}
            style={{ backgroundColor: "white" }}
          />
        ) : (
          <Empty
            description={
              <span>
                No bookings found. Try adjusting your filters or date range.
              </span>
            }
          />
        )}
      </Spin>
    </Card>
  );
}

export default HistoryBooking;
