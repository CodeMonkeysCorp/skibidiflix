import org.springframework.stereotype.Service;

@Service
public class AuthService {

    public boolean login(String email, String password) {
        if (email.equals("admin@email.com") && password.equals("123")) {
            return true;
        }
        return false;
    }
}