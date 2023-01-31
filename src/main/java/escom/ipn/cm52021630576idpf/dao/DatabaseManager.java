package escom.ipn.cm52021630576idpf.dao;

import escom.ipn.cm52021630576idpf.models.Equation;
import escom.ipn.cm52021630576idpf.models.User;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class DatabaseManager {
    private static final String DB_SERVER = "localhost:3306";
    private static final String DB_NAME = "proyads";
    private static final String DB_URL = "jdbc:mysql://" + DB_SERVER + "/" + DB_NAME;
    private static final String DB_USER = "root";
    private static final String DB_PASSWORD = "1234";
    
    private static Connection getConnection() throws ClassNotFoundException, SQLException {
        Class.forName("com.mysql.jdbc.Driver");
        Connection conn = (Connection) DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD);
        
        return conn;
    }
    
    public static void createUser(User user) throws ClassNotFoundException, SQLException {
        try (Connection conn = getConnection()) {
            String query = "INSERT INTO users(username, password) VALUES (?, ?)";
            PreparedStatement ps = conn.prepareStatement(query);
            ps.setString(1, user.getUsername());
            ps.setString(2, user.getPassword());
            
            ps.executeUpdate();
        }
    }
    
    public static User getUser(String username) throws ClassNotFoundException, SQLException {
        User user = null;
        
        try (Connection conn = getConnection()) {
            String query = "SELECT * FROM users WHERE username=?";
            PreparedStatement ps = conn.prepareStatement(query);
            ps.setString(1, username);
            
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                user = new User();
                user.setId(rs.getInt("id"));
                user.setUsername(rs.getString("username"));
                user.setPassword(rs.getString("password"));
            }
        }
        
        return user;
    }
    
    public static void createEquation(Equation equation) throws ClassNotFoundException, SQLException {
        try (Connection conn = getConnection()) {
            String query = "INSERT INTO equations(a, b, c, userId) VALUES (?, ?, ?, ?)";
            PreparedStatement ps = conn.prepareStatement(query);
            ps.setFloat(1, equation.getA());
            ps.setFloat(2, equation.getB());
            ps.setFloat(3, equation.getC());
            ps.setInt(4, equation.getUserId());
            
            ps.executeUpdate();
        }
    }
    
    public static List<Equation> getEquations(int userId) throws ClassNotFoundException, SQLException {
        List<Equation> equations = new ArrayList<>();
        
        try (Connection conn = getConnection()) {
            String query = "SELECT * FROM equations WHERE userId=?";
            PreparedStatement ps = conn.prepareStatement(query);
            ps.setInt(1, userId);
            
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                Equation equation = new Equation();
                equation.setId(rs.getInt("id"));
                equation.setA(rs.getFloat("a"));
                equation.setB(rs.getFloat("b"));
                equation.setC(rs.getFloat("c"));
                equation.setCreated(rs.getTimestamp("created"));
                equation.setUserId(rs.getInt("userId"));
                equations.add(equation);
            }
        }
        
        return equations;
    }
    
    public static Equation getEquation(int id) throws ClassNotFoundException, SQLException {
        Equation equation = null;
        
        try (Connection conn = getConnection()) {
            String query = "SELECT * FROM equations WHERE id=?";
            PreparedStatement ps = conn.prepareStatement(query);
            ps.setInt(1, id);
            
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                equation = new Equation();
                equation.setId(rs.getInt("id"));
                equation.setA(rs.getFloat("a"));
                equation.setB(rs.getFloat("b"));
                equation.setC(rs.getFloat("c"));
                equation.setCreated(rs.getTimestamp("created"));
                equation.setUserId(rs.getInt("userId"));
            }
        }
        
        return equation;
    }
    
    public static void updateEquation(int id, Equation equation) throws ClassNotFoundException, SQLException {
        try (Connection conn = getConnection()) {
            String query = "UPDATE equations SET a=?, b=?, c=? WHERE id=?";
            PreparedStatement ps = conn.prepareStatement(query);
            ps.setFloat(1, equation.getA());
            ps.setFloat(2, equation.getB());
            ps.setFloat(3, equation.getC());
            ps.setInt(4, id);
            
            ps.executeUpdate();
        }
    }
    
    public static void deleteEquation(int id) throws ClassNotFoundException, SQLException {
        try (Connection conn = getConnection()) {
            String query = "DELETE FROM equations WHERE id=?";
            PreparedStatement ps = conn.prepareStatement(query);
            ps.setInt(1, id);
            
            ps.executeUpdate();
        }
    }
    
}
