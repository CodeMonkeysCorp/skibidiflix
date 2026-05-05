package com.skibidiflix.backend.controller;
import org.springframework.web.bind.annotation.*;
import com.skibidiflix.backend.service.AuthService;
import com.skibidiflix.backend.dto.LoginRequest;
import com.skibidiflix.backend.dto.LoginResponse;
import com.skibidiflix.backend.dto.RegisterRequest;
import com.skibidiflix.backend.dto.RegisterResponse;

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
            return new LoginResponse(true, "Login OK!!");
        } else {
            return new LoginResponse(false, "Credenciais inválidas 💀🥀");
        }
    }

    @PostMapping("/register")
    public RegisterResponse register(@RequestBody RegisterRequest request) {
        boolean success = authService.RequestRegister(
            request.getEmail(),
            request.getPassword(),
            request.getName()
        );

        if (success) {
            return new RegisterResponse(true, "Cadastro realizado com sucesso!!");
        } else {
            return new RegisterResponse(false, "Email já cadastrado 💀🥀");
        }

    }
}