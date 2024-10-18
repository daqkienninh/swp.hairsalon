package com.example.demo.service;

import com.example.demo.config.SecurityConfig;
import com.example.demo.entity.Account;
import com.example.demo.entity.Customer;
import com.example.demo.entity.enums.Role;
import com.example.demo.exception.DuplicateEntity;
import com.example.demo.exception.EntityNotFoundException;
import com.example.demo.model.*;
import com.example.demo.repository.AccountRepository;
import com.example.demo.repository.CustomerRepository;
import com.example.demo.repository.StylistRepository;
import javassist.NotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.Security;
import java.util.List;

@Service // đánh dấu cho Spring Boot biết đây là lớp Service
public class AuthenticationService implements UserDetailsService {

    // sử lí logic, nghiệp vụ,...

    @Autowired
    AccountRepository accountRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    ModelMapper modelMapper;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    TokenService tokenService;

    @Autowired
    EmailService emailService;

    @Autowired
    CustomerRepository customerRepository;

    @Autowired
    StylistRepository stylistRepository;

    public AccountResponse register(RegisterRequest registerRequest) {
        Account account = modelMapper.map(registerRequest, Account.class);
        try {
            // new Date(): get current time
//            account.setCreateAt(new Date());
            String originalPassword = account.getPassword();
            account.setPassword(passwordEncoder.encode(originalPassword));

            // Initially, set image and sex to null since they will be updated later
            account.setImage(null);
            account.setSex(null);

            Account newAccount = accountRepository.save(account);

            // Create a new customer only if the role is CUSTOMER
            if (newAccount.getRole().equals(Role.CUSTOMER)) {
                Customer customer = new Customer();
                customer.setFullName(newAccount.getFullName());
                customer.setAccount(newAccount);
                customerRepository.save(customer);
            }
            //gửi mail về cho người dùng
            EmailDetail emailDetail = new EmailDetail();
            emailDetail.setReceiver(newAccount);
            emailDetail.setSubject("Welcome "+ newAccount.getFullName() +" to HairHarmony! ");
            emailDetail.setLink("https://www.google.com/");
            emailService.sendEmail(emailDetail);

            return modelMapper.map(newAccount, AccountResponse.class);
        } catch (Exception e) {
            e.printStackTrace();
            if (e.getMessage().contains(account.getPhone())) {
                throw new DuplicateEntity("Duplicate Phone");
            } else if (e.getMessage().contains(account.getEmail())) {
                throw new DuplicateEntity("Duplicate Email");
            }else{
                throw new DuplicateEntity("Checking Authentication Service");
            }
        }
    }

    public AccountResponse login(LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    loginRequest.getPhone(),
                    loginRequest.getPassword()
            ));

            // => tài khoản có tồn tại
            Account account = (Account) authentication.getPrincipal();
            AccountResponse accountResponse = modelMapper.map(account, AccountResponse.class);
            accountResponse.setToken(tokenService.generateToken(account));
            return accountResponse;
        }catch(Exception e) {
            throw new EntityNotFoundException("Username or password failed!");
        }
    }

//    public Account login(LoginRequest loginRequest) {
//        // xử lí logic login
//        // 2 trường hợp xảy ra
//        /*
//         *  1. Tồn tại
//         *  2. Không tồn tại
//         * */
//        boolean isValid = true;
//
//        if (isValid) {
//            // trả về thông tin của account
//        } else {
//            // error
//            throw new AccountNotFoundException("Account not found");
//        }
//        return null;
//    }
    public List<Account> getAllAccount(){
        List<Account> accounts = accountRepository.findAll();
        return accounts;
    }

    public Account login() {
        return null;
    }


    @Override
    public UserDetails loadUserByUsername(String phone) throws UsernameNotFoundException {
        return accountRepository.findAccountByPhone(phone);
    }

    public Account getCurrentAccount(){
        Account account = (Account) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return accountRepository.findAccountById(account.getId());
    }

    public void forgotPassword(ForgotPasswordRequest forgotPasswordRequest) {
        Account account = accountRepository.findAccountByEmail(forgotPasswordRequest.getEmail());

        if(account==null){
            throw new EntityNotFoundException("Account not found");
        }else {
            EmailDetail emailDetail = new EmailDetail();
            emailDetail.setReceiver(account);
            emailDetail.setSubject("Reset Password");
            emailDetail.setLink("https://www.google.com/?token=" + tokenService.generateToken(account));
            emailService.sendEmail(emailDetail);
        }
    }

    public void resetPassword(ResetPasswordRequest resetPasswordRequest) {
        Account account = getCurrentAccount();
        account.setPassword(passwordEncoder.encode(resetPasswordRequest.getPassword()));
        accountRepository.save(account);
    }
}
