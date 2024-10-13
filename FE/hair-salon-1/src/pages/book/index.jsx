import React, { useState } from "react";
import {
  Form,
  Button,
  Select,
  DatePicker,
  TimePicker,
  Card,
  Steps,
  message,
  Progress,
  Tooltip,
} from "antd";
import {
  HomeOutlined,
  ScissorOutlined,
  UserOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import "antd/dist/reset.css";
import Footer from "../../components/footer";
import Header from "./../../components/header/index";

const { Option } = Select;
const { Step } = Steps;

const Booking = () => {
  const [services, setServices] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedStylist, setSelectedStylist] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const handleNext = () => {
    if (currentStep < 4 && canProceed()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log({
      service: selectedService,
      stylist: selectedStylist,
      date: selectedDate,
      time: selectedTime,
    });
    message.success("Đặt lịch thành công!");
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return !!selectedService;
      case 1:
        return !!selectedStylist;
      case 2:
        return !!selectedDate && !!selectedTime;
      default:
        return true;
    }
  };

  const steps = [
    {
      title: "Chọn dịch vụ",
      icon: <ScissorOutlined />,
      content: (
        <Form.Item label="Dịch vụ">
          <Tooltip title="Select the service you want">
            <Select
              placeholder="Xem tất cả dịch vụ hấp dẫn"
              onChange={setSelectedService}
              style={{ width: "100%" }}
            >
              <Option value="cut">Cắt tóc</Option>
              <Option value="wash">Gội đầu</Option>
            </Select>
          </Tooltip>
        </Form.Item>
      ),
    },
    {
      title: "Chọn stylist",
      icon: <UserOutlined />,
      content: (
        <Form.Item label="Stylist">
          <Tooltip title="Choose your preferred stylist">
            <Select
              placeholder="Chọn stylist"
              onChange={setSelectedStylist}
              style={{ width: "100%" }}
            >
              <Option value="stylist1">Stylist 1</Option>
              <Option value="stylist2">Stylist 2</Option>
            </Select>
          </Tooltip>
        </Form.Item>
      ),
    },
    {
      title: "Chọn thời gian",
      icon: <CalendarOutlined />,
      content: (
        <Form.Item label="Thời gian">
          <Tooltip title="Select your preferred date">
            <DatePicker
              style={{ width: "100%", marginBottom: 16 }}
              placeholder="Chọn ngày"
              onChange={setSelectedDate}
            />
          </Tooltip>
          <Tooltip title="Select your preferred time">
            <TimePicker
              style={{ width: "100%" }}
              placeholder="Chọn giờ"
              onChange={setSelectedTime}
            />
          </Tooltip>
        </Form.Item>
      ),
    },
    {
      title: "Xác nhận",
      icon: <CheckCircleOutlined />,
      content: (
        <div>
          <h3>Thông tin đặt lịch của bạn:</h3>
          <Card>
            <p>
              <strong>Dịch vụ:</strong> {selectedService}
            </p>
            <p>
              <strong>Stylist:</strong> {selectedStylist}
            </p>
            <p>
              <strong>Ngày:</strong> {selectedDate?.format("DD/MM/YYYY")}
            </p>
            <p>
              <strong>Giờ:</strong> {selectedTime?.format("HH:mm")}
            </p>
          </Card>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div style={{ maxWidth: 600, margin: "40px auto", padding: "20px" }}>
        <Card
          bordered={false}
          style={{ boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}
        >
          <Steps current={currentStep} style={{ marginBottom: 24 }}>
            {steps.map((item) => (
              <Step key={item.title} title={item.title} icon={item.icon} />
            ))}
          </Steps>
          <Progress
            percent={(currentStep / (steps.length - 1)) * 100}
            showInfo={false}
            style={{ marginBottom: 24 }}
          />
          <Form layout="vertical">
            <SwitchTransition>
              <CSSTransition key={currentStep} classNames="fade" timeout={300}>
                <div style={{ minHeight: 200, marginBottom: 24 }}>
                  {steps[currentStep].content}
                </div>
              </CSSTransition>
            </SwitchTransition>
          </Form>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {currentStep > 0 && <Button onClick={handlePrev}>Quay lại</Button>}
            {currentStep < steps.length - 1 && (
              <Button
                type="primary"
                onClick={handleNext}
                disabled={!canProceed()}
              >
                Tiếp tục
              </Button>
            )}
            {currentStep === steps.length - 1 && (
              <Button
                type="primary"
                onClick={handleSubmit}
                icon={<CheckCircleOutlined />}
              >
                Xác nhận đặt lịch
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Booking;
