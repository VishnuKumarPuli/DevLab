package com.devlab.controller;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/api/user/auth/check")
public class UserCheckServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;

    @Override
    protected void doGet(
            HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        PrintWriter out = response.getWriter();

        HttpSession session =
                request.getSession(false);

        // ==========================================
        // No session
        // ==========================================

        if (session == null ||
            session.getAttribute("userId") == null) {

            out.print(
                "{"
                + "\"authenticated\":false"
                + "}"
            );

            return;
        }


        // ==========================================
        // User is authenticated
        // ==========================================

        Integer userId =
                (Integer) session.getAttribute("userId");

        String userName =
                (String) session.getAttribute("userName");

        String userEmail =
                (String) session.getAttribute("userEmail");


        out.print(
            "{"
            + "\"authenticated\":true,"
            + "\"id\":" + userId + ","
            + "\"name\":\""
            + escapeJson(userName)
            + "\","
            + "\"email\":\""
            + escapeJson(userEmail)
            + "\""
            + "}"
        );
    }


    // ==========================================
    // Escape JSON
    // ==========================================

    private String escapeJson(String value) {

        if (value == null) {
            return "";
        }

        return value
                .replace("\\", "\\\\")
                .replace("\"", "\\\"");
    }
}