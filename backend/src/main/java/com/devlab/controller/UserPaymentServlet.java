package com.devlab.controller;

import com.devlab.dao.UserPaymentDAO;
import com.devlab.model.Payment;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;
import java.util.List;

@WebServlet("/api/user/payments")
public class UserPaymentServlet extends HttpServlet {

    private UserPaymentDAO userPaymentDAO;

    @Override
    public void init() throws ServletException {
        userPaymentDAO = new UserPaymentDAO();
    }

    @Override
    protected void doGet(
            HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        // Check logged-in user
        HttpSession session = request.getSession(false);

        if (session == null ||
            session.getAttribute("userId") == null) {

            response.setStatus(
                    HttpServletResponse.SC_UNAUTHORIZED
            );

            response.getWriter().write(
                    "{\"message\":\"User not logged in\"}"
            );

            return;
        }

        // Get logged-in user's name
        String clientName =
                (String) session.getAttribute("userName");

        if (clientName == null ||
            clientName.trim().isEmpty()) {

            response.setStatus(
                    HttpServletResponse.SC_UNAUTHORIZED
            );

            response.getWriter().write(
                    "{\"message\":\"User information not found\"}"
            );

            return;
        }

        // Get only this client's payments
        List<Payment> payments =
                userPaymentDAO.getPaymentsByClient(clientName);

        StringBuilder json = new StringBuilder();

        json.append("[");

        for (int i = 0; i < payments.size(); i++) {

            Payment payment = payments.get(i);

            json.append("{");

            json.append("\"id\":")
                    .append(payment.getId())
                    .append(",");

            json.append("\"paymentId\":\"")
                    .append(escapeJson(payment.getPaymentId()))
                    .append("\",");

            json.append("\"projectId\":")
                    .append(payment.getProjectId())
                    .append(",");

            json.append("\"client\":\"")
                    .append(escapeJson(payment.getClient()))
                    .append("\",");

            json.append("\"type\":\"")
                    .append(escapeJson(payment.getType()))
                    .append("\",");

            json.append("\"amount\":")
                    .append(payment.getAmount())
                    .append(",");

            json.append("\"status\":\"")
                    .append(escapeJson(payment.getStatus()))
                    .append("\",");

            json.append("\"paymentDate\":\"")
                    .append(escapeJson(payment.getPaymentDate()))
                    .append("\",");

            json.append("\"createdAt\":\"")
                    .append(escapeJson(payment.getCreatedAt()))
                    .append("\"");

            json.append("}");

            if (i < payments.size() - 1) {
                json.append(",");
            }
        }

        json.append("]");

        response.getWriter().write(json.toString());
    }

    private String escapeJson(String value) {

        if (value == null) {
            return "";
        }

        return value
                .replace("\\", "\\\\")
                .replace("\"", "\\\"")
                .replace("\n", "\\n")
                .replace("\r", "\\r");
    }
}