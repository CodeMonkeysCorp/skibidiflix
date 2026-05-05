package com.skibidiflix.backend.controller;
import org.springframework.web.bind.annotation.*;
import com.skibidiflix.backend.service.AuthService;
import com.skibidiflix.backend.dto.LoginRequest;
import com.skibidiflix.backend.dto.LoginResponse;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {

        boolean success = authService.login(
            request.getEmail(),
            request.getPassword()
        );

        if (success) {
            return new LoginResponse(true, "Login OK");
        } else {
            return new LoginResponse(false, "Credenciais inválidas");
        }
    }
}