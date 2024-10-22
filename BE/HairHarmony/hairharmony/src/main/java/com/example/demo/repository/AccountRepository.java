package com.example.demo.repository;

import com.example.demo.entity.Account;
import com.example.demo.entity.enums.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AccountRepository extends JpaRepository<Account, Long> {

    //tim sccount by username
    Account findAccountByPhone(String phone);

    Account findAccountById(long id);

    Account findAccountByEmail(String email);

    Account findAccountByRole(Role role);

    List<Account> findAccountsByRole(Role role);

}
