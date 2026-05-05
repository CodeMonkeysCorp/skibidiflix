package com.skibidiflix.backend.service;

import org.springframework.stereotype.Service;
import com.skibidiflix.backend.repository.UserRepository;
import com.skibidiflix.backend.model.User;


@Service
public class AuthService {

    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public boolean login(String email, String password) {
        
        User user = userRepository.findByEmail(email);

        if (user == null) {
            return false;
        }

        return user.getPassword().equals(password);
        // if (email.equals("admin@email.com") && password.equals("123")) {
        //     return true;
        // }
        // return false;
    }
}