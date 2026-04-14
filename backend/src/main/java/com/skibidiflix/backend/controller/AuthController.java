import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest request) {

        boolean success = authService.login(
                request.getEmail(),
                request.getPassword()
        );

        if (success) {
            return "Login OK";
        } else {
            return "Credenciais inválidas";
        }
    }
}