package escom.ipn.cm52021630576idpf.servlets.auth;

import escom.ipn.cm52021630576idpf.dao.DatabaseManager;
import escom.ipn.cm52021630576idpf.middlewares.Middlewares;
import escom.ipn.cm52021630576idpf.models.User;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.json.JSONException;
import org.json.JSONObject;

public class SignIn extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        res.setContentType("application/json");
        
        try (PrintWriter out = res.getWriter()) {
            JSONObject msg = new JSONObject();
            
            try {
                // Obtener el cuerpo de la petición
                JSONObject body = Middlewares.getBody(req);
                
                // Obtener parámetros
                String username = body.getString("username");
                String password = body.getString("password");
                
                // Verificar existencia del usuario y verificar contraseña
                User user = DatabaseManager.getUser(username);
                if (user == null || !password.equals(user.getPassword())) {
                    res.setStatus(401);
                    msg.put("error", "Incorrect username / password");
                    out.print(msg);
                    return;
                }
                
                // Crear sesión
                HttpSession session = req.getSession();
                session.setMaxInactiveInterval(1800);
                session.setAttribute("user", user);
                
                // Establecer mensaje de éxito
                res.setStatus(200);
                msg.put("msg", "Signed in successfully");
            } catch (IOException ex) {
                res.setStatus(400);
                msg.put("error", "Bad request");
            } catch (JSONException ex) {
                res.setStatus(422);
                msg.put("error", "Missing parameters");
            } catch (ClassNotFoundException | SQLException ex) {
                res.setStatus(500);
                msg.put("error", "Something went wrong, try again later");
            }
            
            out.print(msg);
        }
    }

}
