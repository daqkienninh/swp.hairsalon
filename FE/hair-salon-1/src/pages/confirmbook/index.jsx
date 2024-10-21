import React from "react";
import { CheckCircle, Calendar, Clock, Scissors, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "antd";
import moment from "moment";

function ConfirmBooking() {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingDetails = location.state?.bookingDetails || {};

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-sm w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div className="text-center mb-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <CheckCircle className="mx-auto text-green-500 w-20 h-20 mb-3" />
          </motion.div>
          <h2 className="mt-2 text-2xl font-bold text-gray-900">
            Booking Confirmed!
          </h2>
        </div>
        <motion.div className="space-y-3" variants={itemVariants}>
          <BookingDetail
            icon={<Scissors className="h-4 w-4 text-green-500" />}
            label="Service"
            value={bookingDetails.service}
          />
          <BookingDetail
            icon={<User className="h-4 w-4 text-green-500" />}
            label="Stylist"
            value={bookingDetails.stylist}
          />
          <BookingDetail
            icon={<Calendar className="h-4 w-4 text-green-500" />}
            label="Date and Time"
            value={moment(bookingDetails.dateTime).format(
              "MMMM D, YYYY h:mm A"
            )}
          />
          {bookingDetails.note && (
            <BookingDetail
              icon={<Clock className="h-4 w-4 text-green-500" />}
              label="Additional Notes"
              value={bookingDetails.note}
            />
          )}
        </motion.div>

        <motion.p
          className="text-center text-xs text-gray-500 mt-4"
          variants={itemVariants}
        >
          You can see your appointment in history.
          <br /> See you soon!
        </motion.p>

        <motion.div variants={itemVariants} className="mt-6">
          <Button
            type="primary"
            onClick={handleBackToHome}
            style={{ width: "100%" }}
          >
            Back to Home
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}

function BookingDetail({ icon, label, value }) {
  return (
    <div className="flex items-center space-x-2 text-sm">
      {icon}
      <span className="font-medium text-gray-700">{label}:</span>
      <span className="text-gray-600">{value}</span>
    </div>
  );
}

export default ConfirmBooking;
