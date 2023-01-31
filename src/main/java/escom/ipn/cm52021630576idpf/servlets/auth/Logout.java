package escom.ipn.cm52021630576idpf.servlets.auth;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class Logout extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        // Invalidar sesión
        HttpSession session = req.getSession();
        session.invalidate();
        
        res.setStatus(205);
    }

}
