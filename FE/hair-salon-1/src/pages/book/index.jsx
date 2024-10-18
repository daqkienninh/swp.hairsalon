import React, { useState } from "react";
import {
  Form,
  Button,
  Select,
  DatePicker,
  TimePicker,
  Card,
  Steps,
  Progress,
  Tooltip,
} from "antd";
import {
  ScissorOutlined,
  UserOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import "antd/dist/reset.css";
import { useNavigate } from "react-router-dom";
import "./index.css";

const { Option } = Select;
const { Step } = Steps;

const Booking = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedStylist, setSelectedStylist] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const navigate = useNavigate();

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
    const bookingDetails = {
      service: selectedService,
      stylist: selectedStylist,
      date: selectedDate?.format("DD/MM/YYYY"),
      time: selectedTime?.format("HH:mm"),
    };
    navigate("/confirm-booking", { state: { bookingDetails } });
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
      title: "Choose services",
      icon: <ScissorOutlined style={{ color: "#94B49F" }} />,
      content: (
        <Form.Item label="Service">
          <Tooltip title="Select the service you want">
            <Select
              placeholder="Select the service you want"
              onChange={setSelectedService}
              className="custom-select"
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
      title: "Choose stylist ",
      icon: <UserOutlined style={{ color: "#94B49F" }} />,
      content: (
        <Form.Item label="Stylist">
          <Tooltip title="Select the stylish you want">
            <Select
              placeholder="Select the stylish you want"
              onChange={setSelectedStylist}
              className="custom-select"
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
      title: "Choose time",
      icon: <CalendarOutlined style={{ color: "#94B49F" }} />,
      content: (
        <Form.Item label="Time">
          <Tooltip title="Select your preferred date">
            <DatePicker
              style={{
                width: "100%",
                marginBottom: 16,
                borderColor: "#94B49F",
              }}
              placeholder="Select date"
              onChange={setSelectedDate}
            />
          </Tooltip>
          <Tooltip title="Select your preferred time">
            <TimePicker
              style={{ width: "100%", borderColor: "#94B49F" }}
              placeholder="Select time"
              onChange={setSelectedTime}
            />
          </Tooltip>
        </Form.Item>
      ),
    },
    {
      title: "Confirm Date Picker",
      icon: <CheckCircleOutlined style={{ color: "#94B49F" }} />,
      content: (
        <div>
          <h3>Your appointment information: </h3>
          <br />
          <Card>
            <p>
              <strong>Service:</strong> {selectedService}
            </p>
            <p>
              <strong>Stylist:</strong> {selectedStylist}
            </p>
            <p>
              <strong>Date:</strong> {selectedDate?.format("DD/MM/YYYY")}
            </p>
            <p>
              <strong>Time:</strong> {selectedTime?.format("HH:mm")}
            </p>
          </Card>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div style={{ maxWidth: 650, margin: "40px auto", padding: "20px" }}>
        <Card
          bordered={false}
          style={{ boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}
        >
          <Steps current={currentStep} style={{ marginBottom: 24 }}>
            {steps.map((item) => (
              <Step
                key={item.title}
                title={
                  <span style={{ fontSize: "13px", color: "#000" }}>
                    {item.title}
                  </span>
                }
                icon={item.icon}
              />
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
            <div>
              {currentStep > 0 && (
                <Button
                  onClick={handlePrev}
                  style={{ color: "#94B49F", borderColor: "#94B49F" }}
                >
                  Back
                </Button>
              )}
            </div>
            <div style={{ marginLeft: "auto" }}>
              {currentStep < steps.length - 1 && (
                <Button
                  type="primary"
                  onClick={handleNext}
                  disabled={!canProceed()}
                  style={{ backgroundColor: "#94B49F" }}
                >
                  Next
                </Button>
              )}
              {currentStep === steps.length - 1 && (
                <Button
                  type="primary"
                  onClick={handleSubmit}
                  icon={<CheckCircleOutlined />}
                >
                  Confirm booking
                </Button>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Booking;
