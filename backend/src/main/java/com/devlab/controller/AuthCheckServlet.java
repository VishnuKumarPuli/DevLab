package com.devlab.controller;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/api/auth/check")
public class AuthCheckServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;

    @Override
    protected void doGet(
            HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        PrintWriter out = response.getWriter();

        HttpSession session = request.getSession(false);

        // No session exists
        if (session == null) {

            response.setStatus(
                    HttpServletResponse.SC_UNAUTHORIZED
            );

            out.print(
                    "{\"authenticated\":false}"
            );

            return;
        }

        Object adminId =
                session.getAttribute("adminId");

        Object adminName =
                session.getAttribute("adminName");

        Object adminEmail =
                session.getAttribute("adminEmail");

        // Session exists but admin is not logged in
        if (adminId == null) {

            response.setStatus(
                    HttpServletResponse.SC_UNAUTHORIZED
            );

            out.print(
                    "{\"authenticated\":false}"
            );

            return;
        }

        // Admin is logged in
        out.print(
                "{"
                + "\"authenticated\":true,"
                + "\"id\":" + adminId + ","
                + "\"name\":\"" + escapeJson(
                    String.valueOf(adminName)
                ) + "\","
                + "\"email\":\"" + escapeJson(
                    String.valueOf(adminEmail)
                ) + "\""
                + "}"
        );
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