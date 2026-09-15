package com.devlab.controller;

import com.devlab.model.User;
import com.devlab.service.UserService;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

@WebServlet("/api/users")
public class UserServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;

    private UserService userService;

    @Override
    public void init() throws ServletException {

        userService = new UserService();
    }


    // =========================================
    // GET ALL REGISTERED CLIENTS
    // =========================================

    @Override
    protected void doGet(
            HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        PrintWriter out = response.getWriter();

        try {

            List<User> users =
                    userService.getAllUsers();

            out.print("[");

            for (int i = 0; i < users.size(); i++) {

                User user = users.get(i);

                out.print("{");

                out.print(
                        "\"id\":"
                        + user.getId()
                        + ","
                );

                out.print(
                        "\"name\":\""
                        + escapeJson(user.getName())
                        + "\","
                );

                out.print(
                        "\"email\":\""
                        + escapeJson(user.getEmail())
                        + "\","
                );

                out.print(
                        "\"phone\":\""
                        + escapeJson(user.getPhone())
                        + "\","
                );

                out.print(
                        "\"company\":\""
                        + escapeJson(user.getCompany())
                        + "\""
                );

                out.print("}");

                if (i < users.size() - 1) {
                    out.print(",");
                }
            }

            out.print("]");

        } catch (Exception e) {

            e.printStackTrace();

            response.setStatus(
                    HttpServletResponse.SC_INTERNAL_SERVER_ERROR
            );

            out.print(
                    "{\"message\":\"Unable to load users\"}"
            );
        }
    }


    // =========================================
    // ESCAPE JSON
    // =========================================

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