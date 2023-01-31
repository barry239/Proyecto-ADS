package escom.ipn.cm52021630576idpf.servlets.equations;

import escom.ipn.cm52021630576idpf.dao.DatabaseManager;
import escom.ipn.cm52021630576idpf.middlewares.Middlewares;
import escom.ipn.cm52021630576idpf.models.Equation;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.JSONObject;

public class GetEquation extends HttpServlet {

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
                
                // Obtener el cuerpo de la petición
                JSONObject body = Middlewares.getBody(req);
                
                // Obtener parámetros
                int id = body.getInt("id");
                
                // Realizar operación en la base de datos
                Equation equation = DatabaseManager.getEquation(id);
                
                // Establecer mensaje de éxito
                res.setStatus(200);
                msg.put("equation", equation.toJSON());
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
