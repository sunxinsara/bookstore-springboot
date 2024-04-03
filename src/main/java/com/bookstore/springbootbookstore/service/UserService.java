package com.bookstore.springbootbookstore.service;

import com.bookstore.springbootbookstore.dto.UserDto;
import com.bookstore.springbootbookstore.entity.User;

import java.util.List;

public interface UserService {
    void saveUser(UserDto userDto);

    User findUserByEmail(String email);

    List<UserDto> findAllUsers();
}
