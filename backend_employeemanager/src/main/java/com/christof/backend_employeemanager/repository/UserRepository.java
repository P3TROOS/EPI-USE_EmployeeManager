package com.christof.backend_employeemanager.repository;

import com.christof.backend_employeemanager.model.User;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

}
