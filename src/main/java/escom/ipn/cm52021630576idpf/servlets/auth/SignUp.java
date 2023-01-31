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
import org.json.JSONException;
import org.json.JSONObject;

public class SignUp extends HttpServlet {

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
                String confirmPassword = body.getString("confirmPassword");
                
                // Comparar contraseñas
                if (!password.equals(confirmPassword)) {
                    res.setStatus(401);
                    msg.put("error", "Passwords do not match");
                    out.print(msg);
                    return;
                }
                
                // Verificar existencia del usuario
                User user = DatabaseManager.getUser(username);
                if (user != null) {
                    res.setStatus(409);
                    msg.put("error", "Username already exists");
                    out.print(msg);
                    return;
                }
                
                // Crear nuevo usuario
                User newUser = new User();
                newUser.setUsername(username);
                newUser.setPassword(password);
                
                // Realizar operación en la base de datos
                DatabaseManager.createUser(newUser);
                
                // Establecer mensaje de éxito
                res.setStatus(200);
                msg.put("msg", "Signed up successfully");
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
