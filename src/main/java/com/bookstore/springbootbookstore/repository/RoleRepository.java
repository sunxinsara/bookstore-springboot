package com.bookstore.springbootbookstore.repository;

import com.bookstore.springbootbookstore.entity.Role;
import org.springframework.data.repository.CrudRepository;

public interface RoleRepository extends CrudRepository<Role, Integer> {
    Role findByName(String name);
}
