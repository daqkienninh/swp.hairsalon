package com.example.demo.service;

import com.example.demo.entity.*;
import com.example.demo.entity.enums.*;
import com.example.demo.exception.EntityNotFoundException;
import com.example.demo.exception.InvalidAppointmentTimeException;
import com.example.demo.exception.StylistUnavailableException;
import com.example.demo.model.AppointmentDetailRequest;
import com.example.demo.model.AppointmentRequest;
import com.example.demo.model.SlotRequest;
import com.example.demo.model.SlotResponse;
import com.example.demo.repository.*;
import jakarta.persistence.NonUniqueResultException;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.sql.Time;
import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class AppointmentService {

    @Autowired
    AuthenticationService authenticationService;

    @Autowired
    ModelMapper modelMapper;

    @Autowired
    ServiceEntityService serviceEntityService;

    @Autowired
    ServiceRepository serviceRepository;

    @Autowired
    AppointmentRepository appointmentRepository;

    @Autowired
    StylistRepository stylistRepository;

    @Autowired
    AppointmentStatusService appointmentStatusService;

    @Autowired
    SlotRepository slotRepository;

    @Autowired
    AccountRepository accountRepository;

    @Autowired
    PaymentRepository   paymentRepository;

    public Appointment createAppointment(AppointmentRequest appointmentRequest) {
        Account customer = authenticationService.getCurrentAccount();
        Appointment appointment = new Appointment();
        List<AppointmentDetail> appointmentDetails = new ArrayList<>();

        float totalPrice = 0;
        //Get current time
        LocalDateTime currentTime = LocalDateTime.now();

        appointment.setCustomer(customer);
        appointment.setDate(new Date());//current date

        for(AppointmentDetailRequest appointmentDetailRequest: appointmentRequest.getDetails()){
            // Validate that the startTime is not in the past
            if (appointmentDetailRequest.getStartTime().isBefore(currentTime)) {
                throw new InvalidAppointmentTimeException("Thời gian không hợp lệ!");
            }

            long stylistId = appointmentDetailRequest.getStylistId();
            Stylist stylist = stylistRepository.findStylistById(stylistId);

            // Calculate the end time based on the service duration
            ServiceEntity serviceEntity = serviceRepository.findServiceById(appointmentDetailRequest.getServiceId());
            int duration = serviceEntity.getDuration(); // Assuming duration is in minutes
            int totalTime = duration + 30; // thời gian cách 30 phút sau mỗi ca làm
            LocalDateTime startTime = appointmentDetailRequest.getStartTime();
            LocalDateTime endTime = startTime.plusMinutes(totalTime);
            //Là có được Stylist và thời gian ở bước này, xong ta xuống hàm check stylist có bận hay không

            // Check if the stylist is available
            if (!checkSlotAvailability(stylistId, startTime, endTime)) {
                throw new StylistUnavailableException("Thợ hiện tại đang bận! Xin vui lòng chọn giờ khác !");
            }

            // Create the appointment detail
            AppointmentDetail appointmentDetail = new AppointmentDetail();
            appointmentDetail.setServiceEntity(serviceEntity);
            appointmentDetail.setNote(appointmentDetailRequest.getNote());
            appointmentDetail.setStartTime(startTime);
            appointmentDetail.setEndTime(endTime);
            appointmentDetail.setStylist(stylist);
            appointmentDetail.setPrice(serviceEntity.getTotalPrice());
            appointmentDetail.setAppointment(appointment);
            appointmentDetails.add(appointmentDetail);

            totalPrice += serviceEntity.getTotalPrice();
        }

        appointment.setAppointmentDetails(appointmentDetails);
        appointment.setTotalPrice(totalPrice);

        // Set the initial status
        appointment.setStatus(AppointmentStatus.APPROVED);

        appointment = appointmentRepository.save(appointment);


        // Now that the appointment is saved, create slots
        for (AppointmentDetail detail : appointmentDetails) {
            createSlotForAppointment(detail.getStylist().getId(), detail.getStartTime(), detail.getEndTime(), detail);
        }

        return appointment;
    }

    private void createSlotForAppointment(Long stylistId, LocalDateTime startTime, LocalDateTime endTime, AppointmentDetail appointmentDetail) {
        // Create a new slot for the stylist during the appointment time
        Slot slot = new Slot();
        slot.setStartTime(startTime);
        slot.setEndTime(endTime);
        slot.setStylistStatus(StylistStatus.BOOKED); // Set the status to BOOKED when booked
        slot.setSlotStylist(stylistRepository.findStylistById(stylistId)); // Link to the stylist
        slot.setAppointmentDetail(appointmentDetail); // Link to the appointment detail

        // Save the new slot
        slotRepository.save(slot);
    }



    // Check if the stylist is available during the requested slot
    private boolean checkSlotAvailability(Long stylistId, LocalDateTime startTime, LocalDateTime endTime) {
        // Giờ được phép đặt: 8:00 ~ 20:00
        LocalDateTime earliestTime = startTime.withHour(8).withMinute(0).withSecond(0).withNano(0);
        LocalDateTime latestTime = startTime.withHour(20).withMinute(0).withSecond(0).withNano(0);

        // Check if startTime is within the allowed range
        if (startTime.isBefore(earliestTime) || startTime.isAfter(latestTime)) {
            throw new InvalidAppointmentTimeException("Xin vui lòng chọn trong khung giờ làm việc: 8:00 ~ 20:00");
        }

        List<Slot> existingSlots = slotRepository.findBySlotStylistIdAndIsDeletedFalse(stylistId);

        for (Slot slot : existingSlots) {
            LocalDateTime existingStartTime = slot.getStartTime();
            LocalDateTime existingEndTime = slot.getEndTime();

            // Check for overlapping or adjacent times
            if ((startTime.isBefore(existingEndTime) && endTime.isAfter(existingStartTime)) ||
                    startTime.isEqual(existingStartTime) || startTime.isEqual(existingEndTime) ||
                    endTime.isEqual(existingStartTime) || endTime.isEqual(existingEndTime)) {
                return false; // Conflict or adjacency, so stylist is not available
            }
        }
        return true; // No conflict or adjacency, stylist is available
    }

    public void completeAppointment(UUID appointmentId) {
        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new EntityNotFoundException("Appointment not found!"));

        appointment.setStatus(AppointmentStatus.DONE);
        appointmentRepository.save(appointment);

        updateSlotStatus(appointment);
    }

    public void updateSlotStatus(Appointment appointment) {
        List<AppointmentDetail> details = appointment.getAppointmentDetails();
        for (AppointmentDetail detail : details) {
            // Get the stylist from the appointment detail
            Stylist stylist = detail.getStylist();
            if (stylist == null) {
                continue;
            }
            // Assuming you have a method to find the slot by stylist and appointment times
            List<Slot> slots = slotRepository.findBySlotStylistIdAndIsDeletedFalse(stylist.getId());
            for (Slot slot : slots) {
                // Check if the slot overlaps with the appointment's time
                if (detail.getStartTime().isBefore(slot.getEndTime()) && detail.getEndTime().isAfter(slot.getStartTime())) {
                    // Update the stylist status in the slot to AVAILABLE
                    slot.setStylistStatus(StylistStatus.AVAILABLE);
                    slot.setDeleted(true);
                    slotRepository.save(slot); // Save the updated slot
                }
            }
        }
    }

    public String createUrl(AppointmentRequest appointmentRequest) throws Exception {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
        LocalDateTime createDate = LocalDateTime.now();
        String formattedCreateDate = createDate.format(formatter);

        //code của mình
        Appointment appointments = createAppointment(appointmentRequest);
        //
        float money = appointments.getTotalPrice() * 100; //Do VNPay sẽ tự xóa 2 số 0
        String amount = String.valueOf((int) money);

        String tmnCode = "ME80UKBD";
        String secretKey = "XIT7V7N01GATX36R6O8OVND0T98G74N6"; //check mail vì có thể thay đổi
        String vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
        String returnUrl = "http://localhost:5173/success?appointmentID=" + appointments.getId(); //để đúng appointmentID để vào đúng trang thanh toán thành công bên frontend
        String currCode = "VND";

        Map<String, String> vnpParams = new TreeMap<>();
        vnpParams.put("vnp_Version", "2.1.0");
        vnpParams.put("vnp_Command", "pay");
        vnpParams.put("vnp_TmnCode", tmnCode);
        vnpParams.put("vnp_Locale", "vn");
        vnpParams.put("vnp_CurrCode", currCode);
        vnpParams.put("vnp_TxnRef", appointments.getId().toString());
        vnpParams.put("vnp_OrderInfo", "Thanh toan cho ma GD: " + appointments.getId());
        vnpParams.put("vnp_OrderType", "other");
        vnpParams.put("vnp_Amount", amount);

        vnpParams.put("vnp_ReturnUrl", returnUrl);
        vnpParams.put("vnp_CreateDate", formattedCreateDate);
        vnpParams.put("vnp_IpAddr", "128.199.178.23");

        StringBuilder signDataBuilder = new StringBuilder();
        for (Map.Entry<String, String> entry: vnpParams.entrySet()) {
            signDataBuilder.append(URLEncoder.encode(entry.getKey(), StandardCharsets.UTF_8.toString()));
            signDataBuilder.append("=");
            signDataBuilder.append(URLEncoder.encode(entry.getValue(), StandardCharsets.UTF_8.toString()));
            signDataBuilder.append("&");
        }
        signDataBuilder.deleteCharAt(signDataBuilder.length()-1); // Remove last '&'
        String signData = signDataBuilder.toString();
        String signed = generateHMAC(secretKey, signData);
        vnpParams.put("vnp_SecureHash", signed);

        StringBuilder urlBuilder = new StringBuilder(vnpUrl);
        urlBuilder.append("?");
        for (Map.Entry<String, String> entry: vnpParams.entrySet()) {
            urlBuilder.append(URLEncoder.encode(entry.getKey(), StandardCharsets.UTF_8.toString()));
            urlBuilder.append("=");
            urlBuilder.append(URLEncoder.encode(entry.getValue(), StandardCharsets.UTF_8.toString()));
            urlBuilder.append("&");
        }
        urlBuilder.deleteCharAt(urlBuilder.length() - 1); // Remove last '&'

        return urlBuilder.toString();
    }

    private String generateHMAC (String secretKey, String signData) throws NoSuchAlgorithmException, InvalidKeyException {
        Mac hmacSha512 = Mac.getInstance("HmacSHA512");
        SecretKeySpec keySpec = new SecretKeySpec(secretKey.getBytes (StandardCharsets.UTF_8), "HmacSHA512");
        hmacSha512.init(keySpec);
        byte[] hmacBytes = hmacSha512.doFinal(signData.getBytes (StandardCharsets.UTF_8));

        StringBuilder result = new StringBuilder();
        for (byte b: hmacBytes) {
            result.append(String.format("%02x", b));
        }
        return result.toString();
    }

    public void createTransactions(UUID uuId ) {
        //tìm cái appointments
        Appointment appointments = appointmentRepository.findById(uuId)
                .orElseThrow(() -> new EntityNotFoundException("Appointment not found!"));


            //tạo payment

            Payment payment = new Payment();
            payment.setAppointments(appointments);
            payment.setCreateAt(new Date());
            payment.setPayment_method(PaymentEnums.BANKING);

            Set<Transactions> setTransactions = new HashSet<>();

            // VNPay to customer transaction
            Account customer = authenticationService.getCurrentAccount();
            Transactions transactions1 = new Transactions();
            transactions1.setFrom(null);
            transactions1.setTo(customer);
            transactions1.setPayment(payment);
            transactions1.setStatus(TransactionsEnums.SUCCESS);
            transactions1.setDescription("VNPay to customer");
            setTransactions.add(transactions1);

            // Customer to manager transaction
            List<Account> managers = accountRepository.findAccountsByRole(Role.MANAGER);
            if (managers.size() != 1) {
                throw new NonUniqueResultException("Manager role must be unique, found: " + managers.size());
            }
            Account manager = managers.get(0);

            Transactions transactions2 = new Transactions();
            transactions2.setFrom(customer);
            transactions2.setTo(manager);
            transactions2.setPayment(payment);
            transactions2.setStatus(TransactionsEnums.SUCCESS);
            transactions2.setDescription("Customer to manager");
            setTransactions.add(transactions2);

            float newBalance = manager.getBalance() + appointments.getTotalPrice();
            manager.setBalance(newBalance);
            accountRepository.save(manager);

            payment.setTransactions(setTransactions);
            paymentRepository.save(payment);
        }





}
