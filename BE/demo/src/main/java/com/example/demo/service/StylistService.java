package com.example.demo.service;

import com.example.demo.entity.Account;
import com.example.demo.entity.Stylist;
import com.example.demo.exception.DuplicateEntity;
import com.example.demo.exception.EntityNotFoundException;
import com.example.demo.model.StylistRequest;
import com.example.demo.model.StylistUpdateRequest;
import com.example.demo.repository.AccountRepository;
import com.example.demo.repository.StylistRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StylistService {

    @Autowired
    StylistRepository stylistRepository;

    @Autowired
    ModelMapper modelMapper;

    @Autowired
    AuthenticationService authenticationService;

    @Autowired
    AccountRepository accountRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    //C
    public Stylist createStylist(StylistRequest stylistRequest) {
        try {
            Stylist stylist = modelMapper.map(stylistRequest, Stylist.class);
            Account accountRequest = authenticationService.getCurrentAccount();
            stylist.setAccount(accountRequest);
            accountRepository.save(accountRequest);
            Stylist newStylist = stylistRepository.save(stylist);
            return newStylist;
        }catch(Exception e) {
            throw new DuplicateEntity("Duplicate! Fail to create!");
        }
    }

    //R
    public List<Stylist> getAllStylists() {
        List<Stylist> stylists = stylistRepository.findStylistsByIsDeletedFalse();
        return stylists;
    }

    //U
    public Stylist updateStylist(long id, StylistUpdateRequest stylist) {
        Stylist oldStylist =  stylistRepository.findStylistById(id);

        if(oldStylist == null) throw new EntityNotFoundException("Stylist not found!");

        oldStylist.setFullName(stylist.getFullName());
        oldStylist.setDescription(stylist.getDescription());
        oldStylist.setImage(stylist.getImage());
        oldStylist.setSex(stylist.getSex());

        Account account = oldStylist.getAccount();
        if(account != null){
            account.setFullName(stylist.getFullName());
            account.setImage(stylist.getImage());
            account.setSex(stylist.getSex());
            account.setEmail(stylist.getEmail());
            account.setPhone(stylist.getPhone());
            String originalPassword = stylist.getPassword();
            account.setPassword(passwordEncoder.encode(originalPassword));
            accountRepository.save(account);
        }
            return stylistRepository.save(oldStylist);
    }

    //D
    public Stylist deleteStylist(long id) {
        Stylist oldStylist = getStylistById(id);
        oldStylist.setDeleted(true);
        return oldStylist;
    }

    public Stylist getStylistById(long id) {
        Stylist stylist = stylistRepository.findStylistById(id);
        if(stylist == null) throw new EntityNotFoundException("Stylist not found!");
        return stylist;
    }

    public List<Stylist> getStylistsByLevel(int level){
        List<Stylist> stylists = stylistRepository.findStylistsByLevel(level);
        if(stylists == null) throw new EntityNotFoundException("No stylists can be found in this level!");
        return stylists;
    }
}
