package com.devlab.controller;

import com.devlab.dao.UserProjectDAO;
import com.devlab.model.UserProject;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;
import java.util.List;

@WebServlet("/api/user/projects")
public class UserProjectServlet extends HttpServlet {

    private UserProjectDAO userProjectDAO;

    @Override
    public void init() throws ServletException {
        userProjectDAO = new UserProjectDAO();
    }

    @Override
    protected void doGet(
            HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        HttpSession session = request.getSession(false);

        // Check whether user is logged in
        if (session == null || session.getAttribute("userId") == null) {

            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

            response.getWriter().write(
                "{\"message\":\"User not logged in\"}"
            );

            return;
        }

        // Get client name from logged-in session
        String clientName =
                (String) session.getAttribute("userName");

        if (clientName == null || clientName.trim().isEmpty()) {

            response.setStatus(
                HttpServletResponse.SC_UNAUTHORIZED
            );

            response.getWriter().write(
                "{\"message\":\"User information not found\"}"
            );

            return;
        }

        // Get only this client's projects
        List<UserProject> projects =
                userProjectDAO.getProjectsByClient(clientName);

        StringBuilder json = new StringBuilder();

        json.append("[");

        for (int i = 0; i < projects.size(); i++) {

            UserProject project = projects.get(i);

            json.append("{");

            json.append("\"id\":")
                .append(project.getId())
                .append(",");

            json.append("\"name\":\"")
                .append(escapeJson(project.getName()))
                .append("\",");

            json.append("\"client\":\"")
                .append(escapeJson(project.getClient()))
                .append("\",");

            json.append("\"status\":\"")
                .append(escapeJson(project.getStatus()))
                .append("\",");

            json.append("\"progress\":")
                .append(project.getProgress())
                .append(",");

            json.append("\"amount\":\"")
                .append(escapeJson(project.getAmount()))
                .append("\",");

            json.append("\"createdAt\":\"")
                .append(escapeJson(project.getCreatedAt()))
                .append("\"");

            json.append("}");

            if (i < projects.size() - 1) {
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