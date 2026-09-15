package com.devlab.controller;

import com.devlab.dao.UserNotificationDAO;
import com.devlab.model.Notification;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;
import java.util.List;

@WebServlet("/api/user/notifications")
public class UserNotificationServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;

    private UserNotificationDAO notificationDAO;

    @Override
    public void init() throws ServletException {

        notificationDAO =
                new UserNotificationDAO();
    }


    // =========================================================
    // CORS
    // =========================================================

    private void setCorsHeaders(
            HttpServletResponse response) {

        response.setHeader(
                "Access-Control-Allow-Origin",
                "http://localhost:5173"
        );

        response.setHeader(
                "Access-Control-Allow-Credentials",
                "true"
        );

        response.setHeader(
                "Access-Control-Allow-Methods",
                "GET, PUT, OPTIONS"
        );

        response.setHeader(
                "Access-Control-Allow-Headers",
                "Content-Type"
        );
    }


    // =========================================================
    // OPTIONS
    // =========================================================

    @Override
    protected void doOptions(
            HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {

        setCorsHeaders(response);

        response.setStatus(
                HttpServletResponse.SC_OK
        );
    }


    // =========================================================
    // GET - USER NOTIFICATIONS
    // =========================================================

    @Override
    protected void doGet(
            HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {

        setCorsHeaders(response);

        response.setContentType(
                "application/json"
        );

        response.setCharacterEncoding(
                "UTF-8"
        );


        // -----------------------------------------------------
        // CHECK LOGIN
        // -----------------------------------------------------

        HttpSession session =
                request.getSession(false);

        if (
                session == null ||
                session.getAttribute("userId") == null
        ) {

            response.setStatus(
                    HttpServletResponse.SC_UNAUTHORIZED
            );

            response.getWriter().write(
                    "{\"success\":false,\"message\":\"User not logged in\"}"
            );

            return;
        }


        // -----------------------------------------------------
        // GET LOGGED-IN USER ID
        // -----------------------------------------------------

        int userId =
                (Integer) session.getAttribute(
                        "userId"
                );


        // -----------------------------------------------------
        // GET ONLY THIS USER'S NOTIFICATIONS
        // -----------------------------------------------------

        List<Notification> notifications =
                notificationDAO.getNotificationsByUser(
                        userId
                );


        // -----------------------------------------------------
        // CREATE JSON
        // -----------------------------------------------------

        StringBuilder json =
                new StringBuilder();

        json.append("[");


        for (
                int i = 0;
                i < notifications.size();
                i++
        ) {

            Notification notification =
                    notifications.get(i);

            json.append("{");


            // ID

            json.append("\"id\":")
                    .append(
                            notification.getId()
                    )
                    .append(",");


            // TITLE

            json.append("\"title\":\"")
                    .append(
                            escapeJson(
                                    notification.getTitle()
                            )
                    )
                    .append("\",");


            // MESSAGE

            json.append("\"message\":\"")
                    .append(
                            escapeJson(
                                    notification.getMessage()
                            )
                    )
                    .append("\",");


            // TYPE

            json.append("\"type\":\"")
                    .append(
                            escapeJson(
                                    notification.getType()
                            )
                    )
                    .append("\",");


            // REFERENCE ID

            if (
                    notification.getReferenceId()
                    != null
            ) {

                json.append("\"referenceId\":")
                        .append(
                                notification.getReferenceId()
                        )
                        .append(",");

            } else {

                json.append(
                        "\"referenceId\":null,"
                );
            }


            // READ STATUS

            json.append("\"isRead\":")
                    .append(
                            notification.isRead()
                    )
                    .append(",");


            // CREATED AT

            if (
                    notification.getCreatedAt()
                    != null
            ) {

                json.append(
                        "\"createdAt\":\""
                );

                json.append(
                        escapeJson(
                                notification
                                        .getCreatedAt()
                                        .toString()
                        )
                );

                json.append("\"");

            } else {

                json.append(
                        "\"createdAt\":null"
                );
            }


            json.append("}");


            if (
                    i <
                    notifications.size() - 1
            ) {

                json.append(",");
            }
        }


        json.append("]");


        response.getWriter().write(
                json.toString()
        );
    }


    // =========================================================
    // PUT - MARK NOTIFICATION AS READ
    // =========================================================

    @Override
    protected void doPut(
            HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {

        setCorsHeaders(response);

        response.setContentType(
                "application/json"
        );

        response.setCharacterEncoding(
                "UTF-8"
        );


        // -----------------------------------------------------
        // CHECK LOGIN
        // -----------------------------------------------------

        HttpSession session =
                request.getSession(false);

        if (
                session == null ||
                session.getAttribute("userId") == null
        ) {

            response.setStatus(
                    HttpServletResponse.SC_UNAUTHORIZED
            );

            response.getWriter().write(
                    "{\"success\":false,\"message\":\"User not logged in\"}"
            );

            return;
        }


        // -----------------------------------------------------
        // GET USER ID
        // -----------------------------------------------------

        int userId =
                (Integer) session.getAttribute(
                        "userId"
                );


        // -----------------------------------------------------
        // GET NOTIFICATION ID
        // -----------------------------------------------------

        String idParameter =
                request.getParameter("id");


        if (
                idParameter == null ||
                idParameter.trim().isEmpty()
        ) {

            response.setStatus(
                    HttpServletResponse.SC_BAD_REQUEST
            );

            response.getWriter().write(
                    "{\"success\":false,\"message\":\"Notification ID is required\"}"
            );

            return;
        }


        int notificationId;

        try {

            notificationId =
                    Integer.parseInt(
                            idParameter
                    );

        } catch (NumberFormatException e) {

            response.setStatus(
                    HttpServletResponse.SC_BAD_REQUEST
            );

            response.getWriter().write(
                    "{\"success\":false,\"message\":\"Invalid notification ID\"}"
            );

            return;
        }


        // -----------------------------------------------------
        // MARK AS READ
        // -----------------------------------------------------

        boolean updated =
                notificationDAO.markAsRead(
                        notificationId,
                        userId
                );


        // -----------------------------------------------------
        // RESPONSE
        // -----------------------------------------------------

        if (updated) {

            response.getWriter().write(
                    "{\"success\":true,\"message\":\"Notification marked as read\"}"
            );

        } else {

            response.setStatus(
                    HttpServletResponse.SC_NOT_FOUND
            );

            response.getWriter().write(
                    "{\"success\":false,\"message\":\"Notification not found or already read\"}"
            );
        }
    }


    // =========================================================
    // JSON ESCAPE
    // =========================================================

    private String escapeJson(String value) {

        if (value == null) {
            return "";
        }

        return value
                .replace(
                        "\\",
                        "\\\\"
                )
                .replace(
                        "\"",
                        "\\\""
                )
                .replace(
                        "\n",
                        "\\n"
                )
                .replace(
                        "\r",
                        "\\r"
                )
                .replace(
                        "\t",
                        "\\t"
                );
    }
}