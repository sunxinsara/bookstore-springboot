package com.bookstore.springbootbookstore.service;

import com.bookstore.springbootbookstore.dto.UserDto;
import com.bookstore.springbootbookstore.entity.User;
import com.bookstore.springbootbookstore.repository.RoleRepository;
import com.bookstore.springbootbookstore.repository.UserRepository;

import java.util.List;

public class UserServiceImpl implements UserService {
    private UserRepository userRepository;
    private RoleRepository roleRepository;

    public User login(){
        return null;
    }

    @Override
    public void saveUser(UserDto userDto) {

    }

    @Override
    public User findUserByEmail(String email) {
        return null;
    }

    @Override
    public List<UserDto> findAllUsers() {
        return null;
    }
}
