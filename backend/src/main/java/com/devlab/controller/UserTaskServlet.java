package com.devlab.controller;

import com.devlab.dao.UserTaskDAO;
import com.devlab.model.Task;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;
import java.util.List;

@WebServlet("/api/user/tasks")
public class UserTaskServlet extends HttpServlet {

    private UserTaskDAO userTaskDAO;

    @Override
    public void init() throws ServletException {
        userTaskDAO = new UserTaskDAO();
    }

    @Override
    protected void doGet(
            HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        HttpSession session = request.getSession(false);

        // Check login
        if (session == null || session.getAttribute("userId") == null) {

            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

            response.getWriter().write(
                "{\"message\":\"User not logged in\"}"
            );

            return;
        }

        // Get client name from session
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

        // Get only tasks belonging to this client's projects
        List<Task> tasks =
                userTaskDAO.getTasksByClient(clientName);

        StringBuilder json = new StringBuilder();

        json.append("[");

        for (int i = 0; i < tasks.size(); i++) {

            Task task = tasks.get(i);

            json.append("{");

            json.append("\"id\":")
                .append(task.getId())
                .append(",");

            json.append("\"projectId\":")
                .append(task.getProjectId())
                .append(",");

            json.append("\"title\":\"")
                .append(escapeJson(task.getTitle()))
                .append("\",");

            json.append("\"description\":\"")
                .append(escapeJson(task.getDescription()))
                .append("\",");

            json.append("\"assignedTo\":\"")
                .append(escapeJson(task.getAssignedTo()))
                .append("\",");

            json.append("\"status\":\"")
                .append(escapeJson(task.getStatus()))
                .append("\",");

            json.append("\"priority\":\"")
                .append(escapeJson(task.getPriority()))
                .append("\",");

            json.append("\"dueDate\":\"")
                .append(escapeJson(task.getDueDate()))
                .append("\",");

            json.append("\"createdAt\":\"")
                .append(escapeJson(task.getCreatedAt()))
                .append("\"");

            json.append("}");

            if (i < tasks.size() - 1) {
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