<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>Калькулятор</title>
</head>
<body>
    <%
        String num1 = request.getParameter("num1");
        String num2 = request.getParameter("num2");
        String operation = request.getParameter("operation");
        double result = 0;

        if (num1 != null && num2 != null && operation != null) {
            double n1 = Double.parseDouble(num1);
            double n2 = Double.parseDouble(num2);

            switch (operation) {
                case "+":
                    result = n1 + n2;
                    break;
                case "-":
                    result = n1 - n2;
                    break;
                case "*":
                    result = n1 * n2;
                    break;
                case "/":
                    if (n2 != 0) {
                        result = n1 / n2;
                    } else {
                        response.sendRedirect("error.jsp");
                    }
                    break;
                default:
                    // Handle other cases or errors
                    break;
            }
            out.println("<p>" + num1 + " " + operation + " " + num2 + " = " + result + "</p>");
        }
    %>
    <form action="calculator.jsp" method="post">
        Введите число 1: <input type="text" name="num1" value="<%= (num1 != null) ? num1 : "" %>"><br>
        Введите число 2: <input type="text" name="num2" value="<%= (num2 != null) ? num2 : "" %>"><br>
        <input type="submit" name="operation" value="+" />
        <input type="submit" name="operation" value="-" />
        <input type="submit" name="operation" value="*" />
        <input type="submit" name="operation" value="/" />
    </form>
</body>
</html>
