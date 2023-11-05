package com.christof.backend_employeemanager.repository;

import com.christof.backend_employeemanager.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User,Integer> {
    @Query("SELECT u FROM User u WHERE u.role = 'Manager' or u.role = 'CEO'")
    List<User> findManagers();

//    @Modifying
//    @Query("DELETE FROM User u WHERE u.employeeNumber = :employeeNumber")
//    void deleteByEmployeeNumber(@Param("employeeNumber") int employeeNumber);
}
