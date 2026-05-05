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
    }

    public boolean RequestRegister(String email, String password, String name) {
        
        User ExistingUser = userRepository.findByEmail(email);

        if (ExistingUser != null) {
            return false;
        }

        User newUser = new User();
        newUser.setName(name); // Usando o email como nome temporariamente <-- Cala a boca vs code
        newUser.setEmail(email);
        newUser.setPassword(password);

        userRepository.save(newUser);

        return true;
    }
}