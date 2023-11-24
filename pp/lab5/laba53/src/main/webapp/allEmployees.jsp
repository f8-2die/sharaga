<%@ page import="java.sql.*, javax.naming.*, javax.sql.DataSource" %>
<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head>
    <title>All Employees</title>
    <style>
            body {
                font-family: Arial, sans-serif;
                margin: 20px;
            }
            input[type=text] {
                        width: 200px;
                        padding: 10px;
                        margin: 5px 0;
                        border: 1px solid #ccc;
                        border-radius: 4px;
                        box-sizing: border-box;
                    }
            input[type=text]::placeholder {
                        color: #aaa;
                    }
        </style>
</head>
<body>
    <h1>Работа с базой сотрудников</h1>

    <!-- Форма для поиска сотрудника по ID -->
    <form method="GET">
        Search by ID: <input type="text" name="id">
        <input type="submit" value="Поиск по ID">
    </form>

    <!-- Форма для поиска сотрудника по имени -->
    <form method="GET">
        Search by Name: <input type="text" name="name">
        <input type="submit" value="Поиск по имени">
    </form>

    <!-- Java-код для обработки запросов поиска -->
    <%
        String idParam = request.getParameter("id");
        if (idParam != null && !idParam.isEmpty()) {
            int employeeId = Integer.parseInt(idParam);
            try {
                Context context = new InitialContext();
                DataSource dataSource = (DataSource) context.lookup("java:comp/env/jdbc/employeeDB");
                Connection conn = dataSource.getConnection();
                PreparedStatement pstmt = conn.prepareStatement("SELECT * FROM employee WHERE id = ?");
                pstmt.setInt(1, employeeId);
                ResultSet rs = pstmt.executeQuery();

                out.println("<h2>Сотрудник с ID " + employeeId + ":</h2>");
                out.println("<table border='1'><tr><th>ID</th><th>Name</th><th>Department</th></tr>");
                while(rs.next()) {
                    int id = rs.getInt("id");
                    String name = rs.getString("name");
                    String department = rs.getString("department");
                    out.println("<tr><td>" + id + "</td><td>" + name + "</td><td>" + department + "</td></tr>");
                }
                out.println("</table>");

                rs.close();
                pstmt.close();
                conn.close();
            } catch(Exception e) {
                out.println("Exception: " + e);
            }
        }

        String nameParam = request.getParameter("name");
        if (nameParam != null && !nameParam.isEmpty()) {
            try {
                Context context = new InitialContext();
                DataSource dataSource = (DataSource) context.lookup("java:comp/env/jdbc/employeeDB");
                Connection conn = dataSource.getConnection();
                PreparedStatement pstmt = conn.prepareStatement("SELECT * FROM employee WHERE name LIKE ?");
                pstmt.setString(1, "%" + nameParam + "%");
                ResultSet rs = pstmt.executeQuery();

                out.println("<h2>Сотрудник с именем '" + nameParam + "':</h2>");
                out.println("<table border='1'><tr><th>ID</th><th>Name</th><th>Department</th></tr>");
                while(rs.next()) {
                    int id = rs.getInt("id");
                    String name = rs.getString("name");
                    String department = rs.getString("department");
                    out.println("<tr><td>" + id + "</td><td>" + name + "</td><td>" + department + "</td></tr>");
                }
                out.println("</table>");

                rs.close();
                pstmt.close();
                conn.close();
            } catch(Exception e) {
                out.println("Exception: " + e);
            }
        }

        // Вывод базы данных сотрудников
        try {
            Context context = new InitialContext();
            DataSource dataSource = (DataSource) context.lookup("java:comp/env/jdbc/employeeDB");
            Connection conn = dataSource.getConnection();
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT * FROM employee");

            out.println("<h2>Все сотрудники:</h2>");
            out.println("<table border='1'><tr><th>ID</th><th>Name</th><th>Department</th></tr>");
            while(rs.next()) {
                int id = rs.getInt("id");
                String name = rs.getString("name");
                String department = rs.getString("department");
                out.println("<tr><td>" + id + "</td><td>" + name + "</td><td>" + department + "</td></tr>");
            }
            out.println("</table>");

            rs.close();
            stmt.close();
            conn.close();
        } catch(Exception e) {
            out.println("Exception: " + e);
        }
    %>
</body>
</html>
