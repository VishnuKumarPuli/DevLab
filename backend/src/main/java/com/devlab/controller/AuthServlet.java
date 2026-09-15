package com.devlab.controller;

import com.devlab.model.Admin;
import com.devlab.service.AuthService;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/api/auth/login")
public class AuthServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;

    private AuthService authService;

    @Override
    public void init() throws ServletException {
        authService = new AuthService();
    }

    @Override
    protected void doPost(
            HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        PrintWriter out = response.getWriter();

        StringBuilder json = new StringBuilder();

        BufferedReader reader = request.getReader();

        String line;

        while ((line = reader.readLine()) != null) {
            json.append(line);
        }

        String requestBody = json.toString();

        String email = getJsonValue(requestBody, "email");
        String password = getJsonValue(requestBody, "password");

        if (email.isEmpty() || password.isEmpty()) {

            response.setStatus(
                    HttpServletResponse.SC_BAD_REQUEST
            );

            out.print(
                    "{\"message\":\"Email and password are required\"}"
            );

            return;
        }

        Admin admin = authService.login(email, password);

        if (admin != null) {

            HttpSession session = request.getSession();

            session.setAttribute("adminId", admin.getId());
            session.setAttribute("adminName", admin.getName());
            session.setAttribute("adminEmail", admin.getEmail());

            out.print(
                    "{"
                    + "\"message\":\"Login successful\","
                    + "\"id\":" + admin.getId() + ","
                    + "\"name\":\"" + escapeJson(admin.getName()) + "\","
                    + "\"email\":\"" + escapeJson(admin.getEmail()) + "\""
                    + "}"
            );

        } else {

            response.setStatus(
                    HttpServletResponse.SC_UNAUTHORIZED
            );

            out.print(
                    "{\"message\":\"Invalid email or password\"}"
            );
        }
    }

    private String getJsonValue(String json, String key) {

        String searchKey = "\"" + key + "\":";

        int start = json.indexOf(searchKey);

        if (start == -1) {
            return "";
        }

        start += searchKey.length();

        while (
                start < json.length()
                && Character.isWhitespace(json.charAt(start))
        ) {
            start++;
        }

        if (
                start < json.length()
                && json.charAt(start) == '"'
        ) {

            start++;

            int end = json.indexOf("\"", start);

            if (end == -1) {
                return "";
            }

            return json.substring(start, end);
        }

        return "";
    }

    private String escapeJson(String value) {

        if (value == null) {
            return "";
        }

        return value
                .replace("\\", "\\\\")
                .replace("\"", "\\\"");
    }
}