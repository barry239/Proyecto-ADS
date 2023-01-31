package escom.ipn.cm52021630576idpf.servlets.equations;

import escom.ipn.cm52021630576idpf.dao.DatabaseManager;
import escom.ipn.cm52021630576idpf.middlewares.Middlewares;
import escom.ipn.cm52021630576idpf.models.Equation;
import escom.ipn.cm52021630576idpf.models.User;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.json.JSONObject;

public class GetEquations extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        res.setContentType("application/json");
        
        try (PrintWriter out = res.getWriter()) {
            JSONObject msg = new JSONObject();
            
            try {
                // Verificar sesión activa
                if (!Middlewares.isLogedIn(req)) {
                    res.setStatus(403);
                    msg.put("error", "Forbidden");
                    out.print(msg);
                    return;
                }
                
                // Obtener sesión activa
                HttpSession session = req.getSession();
                User user = (User) session.getAttribute("user");
                
                // Realizar operación en la base de datos
                List<Equation> equations = DatabaseManager.getEquations(user.getId());
                
                // Establecer mensaje de éxito
                res.setStatus(200);
                msg.put("equations", equations);
            } catch (IllegalStateException ex) {
                res.setStatus(401);
                msg.put("error", "Invalid session");
            } catch (ClassNotFoundException | SQLException ex) {
                res.setStatus(500);
                msg.put("error", "Something went wrong, try again later");
            }
            
            out.print(msg);
        }
    }

}
