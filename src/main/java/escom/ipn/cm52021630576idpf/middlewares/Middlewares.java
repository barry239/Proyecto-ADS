package escom.ipn.cm52021630576idpf.middlewares;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.stream.Collectors;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import org.json.JSONObject;

public class Middlewares {
    
    public static JSONObject getBody(HttpServletRequest req) throws IOException {
        StringBuilder sb = new StringBuilder();
        try (BufferedReader br = new BufferedReader(new InputStreamReader(req.getInputStream()))) {
            sb.append(br.lines().collect(Collectors.joining("\n")));
        }
        
        return new JSONObject(sb.toString());
    }
    
    public static boolean isLogedIn(HttpServletRequest req) {
        HttpSession session = req.getSession(false);
        
        return session != null && session.getAttribute("user") != null;
    }
    
}
