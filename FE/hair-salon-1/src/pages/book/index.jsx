import React, { useEffect, useState } from "react";
import {
  Card,
  DatePicker,
  Form,
  Select,
  Button,
  Input,
  TimePicker,
  Radio,
  Modal,
} from "antd";
import {
  ScissorOutlined,
  UserOutlined,
  CalendarOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import api from "./../../config/axios";
import "./index.css";
import moment from "moment";
import { toast } from "react-toastify";
const { Option } = Select;

function Booking() {
  const [form] = Form.useForm();
  const [services, setServices] = useState([]);
  const [stylists, setStylists] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [selectedStylist, setSelectedStylist] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const navigate = useNavigate();
  const [isVNPayAllowed, setIsVNPayAllowed] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const fetchServices = async () => {
    try {
      const response = await api.get("/api/service");
      setServices(response.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };
  const fetchStylists = async () => {
    try {
      const response = await api.get("/api/stylist");
      setStylists(response.data);
    } catch (error) {
      console.error("Error fetching stylists:", error);
      toast.error(error.response ? error.response.data : error.message);
    }
  };

  const fetchAvailableTime = async (stylistId, date) => {
    if (!stylistId || !date) return;
    try {
      const response = await api.get(`/api/appointment/available-times?stylistId=${stylistId}&date=${date.format("YYYY-MM-DD")}`);
      setAvailableTimes(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching available times:", error);
    }
  };

  const handleStylistChange = (value) => {
    setSelectedStylist(value);
    fetchAvailableTime(value, selectedDate);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    fetchAvailableTime(selectedStylist, date);
  };


  // Restrict date selection to only the next three days
  const disabledDate = (current) => {
    return (
      current < moment().startOf("day") ||
      current > moment().add(4, "days").endOf("day")
    );
  };

  const handlePaymentMethodChange = (value) => {
    setSelectedPaymentMethod(value);
    if (value === "vnpay") {
      setIsModalVisible(true);
    } else {
      setIsVNPayAllowed(false);
    }
  };

  const handleAgree = () => {
    setIsVNPayAllowed(true);
    setIsModalVisible(false);
  };

  const handleNotAgree = () => {
    setIsVNPayAllowed(false);
    setIsModalVisible(false);
    toast.warning("Vui lòng đọc kỹ và Đồng ý điều khoản trên")
    console.log("is", isVNPayAllowed);
  };

  const handleConfirmation = async (values) => {
    if (selectedPaymentMethod === "vnpay" && !isVNPayAllowed) {
      toast.error("Please allow booking with VNPay by ticking the checkbox");
      return;
    }

    const formattedTime = values.time; // assuming values.time is already in HH:mm format

    const appointmentData = {
      details: values.services.map((serviceId) => ({
        serviceId: serviceId, // Assuming each selected service should be listed separately
        stylistId: values.stylist,
        startTime: `${formattedTime}`,
        note: values.note,
      })),
    };

    if (selectedPaymentMethod === "vnpay") {
      try {
        const response = await api.post(
          "/api/appointment/payment",
          appointmentData
        );
        window.open(response.data);
        navigate("/");
      } catch (error) {
        console.error(
          "Error initiating VNPay payment:",
          error.response?.data || error.message
        );
        toast.error(error.response?.data);
      }
    } else if (selectedPaymentMethod === "card") {
      try {
        const response = await api.post("/api/appointment", appointmentData);
        console.log(response.data)
        const appointmentId = response.data.id; // Assuming the response includes the appointment ID
        navigate(`/confirm-booking/${appointmentId}`);
      } catch (error) {
        console.error("Error:", error.response?.data || error.message);
        toast.error(error.response?.data);
      }
    }
  };
  useEffect(() => {
    fetchServices();
    fetchStylists();
  }, []);
  return (
    <div className="booking-container">
      <div className="max-w-3xl mx-auto">
        <Card
          title={<h1 className="text-2xl font-bold text-center text-green-800">Đặt lịch hẹn tại đây</h1>}
          className="booking-card shadow-lg"
        >
          <Form
            form={form}
            name="booking"
            onFinish={handleConfirmation}
            layout="vertical"
            requiredMark={false}
            className="space-y-6"
          >
            <Form.Item
              name="services"
              label="Dịch vụ"
              rules={[{ required: true, message: "Chọn 1 hoặc nhiều dịch vụ" }]}
            >
              <Select
                placeholder="Bạn có thể chọn một hay nhiều dịch vụ."
                suffixIcon={<ScissorOutlined />}
                mode="multiple"
                tagRender={(props) => {
                  const { value, onClose } = props;
                  const service = services.find((s) => s.id === value);
                  return (
                    <div className="custom-tag">
                      {service?.name}
                      <CloseOutlined
                        className="custom-tag-close"
                        onClick={onClose}
                      />
                    </div>
                  );
                }}
              >
                {services.map((service) => (
                  <Option key={service.id} value={service.id}>
                    <div className="flex justify-between w-full">
                      {service.name}
                      <span className="text-gray-500 text-sm ml-10 font-semibold">
                        {service.price.toLocaleString()}đ
                      </span>
                    </div>
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="stylist"
              label="Stylist"
              rules={[{ required: true, message: "Chọn stylist" }]}
            >
              <Select
                placeholder="Nếu bạn không biết nên chọn ai, bạn có thể chọn ngẫu nhiên."
                suffixIcon={<UserOutlined />}
                onChange={handleStylistChange}
              >
                {stylists.map((stylist) => (
                  <Option key={stylist.id} value={stylist.id}>
                    {stylist.fullName}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            {/* Date Selection */}
            <Form.Item
              name="date"
              label="Ngày"
              rules={[{ required: true, message: "Chọn ngày" }]}
            >
              <DatePicker
                disabledDate={(current) =>
                  current < moment().startOf("day") || current > moment().add(4, "days").endOf("day")
                }
                placeholder="Chọn ngày"
                format="DD/MM/YYYY"
                onChange={handleDateChange}
              />
            </Form.Item>

            {/* Time Selection */}
            <Form.Item
              name="time"
              label="Thời gian"
              rules={[{ required: true, message: "Please select a time range" }]}
            >
              <Radio.Group className="flex flex-wrap gap-2">
                {availableTimes.map((time) => (
                  <Radio.Button
                    key={time}
                    value={time}
                    className="timePicker"
                  >
                    {moment(time).format("HH:mm")} {/* Display in HH:mm format */}
                  </Radio.Button>
                ))}
              </Radio.Group>
            </Form.Item>

            <Form.Item name="note" label="Ghi chú">
              <Input.TextArea rows={4} placeholder="Ghi chú cho cửa hàng" />
            </Form.Item>

            <Form.Item
              label="Thanh toán"
              rules={[
                { required: true, message: "Please select a payment method" },
              ]}
            >
              <Select
                placeholder="Select a payment method"
                suffixIcon={<UserOutlined />}
                onChange={handlePaymentMethodChange}
              >
                <Option value="vnpay">VNPay</Option>
                <Option value="card">Thanh toán trực tiếp</Option>
              </Select>
            </Form.Item>


            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="booking-submit-btn w-full py-3 text-lg font-semibold"
              >
                Đặt lịch hẹn
              </Button>
            </Form.Item>
          </Form>
        </Card>
        <Modal
          title="Điều khoản sử dụng"
          open={isModalVisible}
          footer={[
            <button
              key="ok"
              onClick={handleAgree}
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
            >
              Đồng ý và tiếp tục
            </button>,
          ]}
        >

          <strong>1. Giới thiệu</strong>
          <p> Khi sử dụng dịch vụ đặt lịch hẹn qua ứng dụng HairHarmony và thực hiện giao dịch thanh toán qua VNPay, quý khách đồng ý với các điều khoản và điều kiện dưới đây.</p>

          <strong>2. Đặt Lịch Hẹn</strong>
          <p> Quý khách cần cung cấp thông tin cá nhân và thông tin liên hệ chính xác khi đặt lịch hẹn để đảm bảo dịch vụ được cung cấp một cách tốt nhất.</p>
          <p> Thời gian và dịch vụ đã chọn khi đặt lịch hẹn có thể không thay đổi sau khi xác nhận, trừ trường hợp có hỗ trợ từ bộ phận chăm sóc khách hàng.</p>
          <p> HairHarmony không chịu trách nhiệm về các thông tin không chính xác do khách hàng cung cấp, dẫn đến việc không thể cung cấp dịch vụ đúng thời gian đã hẹn.</p>

          <strong>3. Thanh Toán qua VNPay</strong>
          <p> Khi thực hiện thanh toán qua VNPay, quý khách đồng ý tuân thủ các quy định của VNPay và HairHarmony.</p>
          <p> Tất cả các giao dịch đều được xử lý thông qua hệ thống bảo mật của VNPay, và HairHarmony không lưu trữ các thông tin nhạy cảm liên quan đến thẻ tín dụng hoặc tài khoản ngân hàng.</p>
          <p> Sau khi giao dịch được xác nhận, quý khách sẽ nhận được thông báo về tình trạng thanh toán và lịch hẹn đã đặt.</p>

          <strong>4. Hủy Dịch Vụ và Hoàn Tiền</strong>
          <p> HairHarmony không hỗ trợ hoàn tiền sau khi lịch hẹn đã được xác nhận và thanh toán qua VNPay, trừ trường hợp dịch vụ bị hủy do lỗi từ phía chúng tôi hoặc do các lý do bất khả kháng.</p>
          <p> Trong trường hợp yêu cầu hoàn tiền do hủy lịch hẹn, HairHarmony sẽ hỗ trợ khách hàng liên hệ với VNPay để thực hiện quy trình hoàn tiền, nếu áp dụng.</p>

          <strong>5. Đảm Bảo An Toàn Giao Dịch</strong>
          <p> Quý khách chịu trách nhiệm bảo mật thông tin tài khoản và thông tin giao dịch của mình. HairHarmony không chịu trách nhiệm đối với các trường hợp mất mát hoặc thiệt hại do hành vi gian lận, chiếm đoạt tài khoản do lỗi của khách hàng.</p>
          <p> HairHarmony cam kết không chia sẻ thông tin cá nhân và thông tin giao dịch của khách hàng với bên thứ ba ngoại trừ khi có yêu cầu từ cơ quan chức năng.</p>

          <strong>6. Giới Hạn Trách Nhiệm</strong>
          <p> HairHarmony không chịu trách nhiệm cho bất kỳ thiệt hại nào phát sinh từ lỗi hệ thống, lỗi kết nối mạng hoặc bất kỳ nguyên nhân nào khác nằm ngoài khả năng kiểm soát của chúng tôi trong quá trình thực hiện giao dịch qua VNPay.</p>
          <p> HairHarmony không chịu trách nhiệm đối với các trường hợp lịch hẹn bị hủy hoặc thay đổi do các yếu tố bất khả kháng như thiên tai, dịch bệnh, v.v.</p>

          <strong>7. Điều Khoản Khác</strong>
          <p> HairHarmony có quyền thay đổi, điều chỉnh các điều khoản sử dụng mà không cần báo trước. Khách hàng có trách nhiệm xem lại các điều khoản trước mỗi lần thực hiện đặt lịch hẹn và giao dịch qua VNPay.</p>
          <p> Bằng việc nhấn "Đồng ý" và "Tiếp tục", quý khách xác nhận đã đọc, hiểu và đồng ý với các điều khoản trên.</p>
        </Modal>
      </div>
    </div>
  );
}

export default Booking;
