
package com.devlab.controller;

import com.devlab.dao.NotificationDAO;
import com.devlab.model.Notification;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Timestamp;
import java.util.List;

@WebServlet("/api/notifications")
public class NotificationServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;

    private NotificationDAO notificationDAO;

    @Override
    public void init() throws ServletException {

        notificationDAO = new NotificationDAO();

    }


    // =========================================================
    // GET ALL NOTIFICATIONS
    // =========================================================

    @Override
    protected void doGet(
            HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        try {

            List<Notification> notifications =
                    notificationDAO.getAllNotifications();

            PrintWriter out = response.getWriter();

            out.print("[");

            for (int i = 0; i < notifications.size(); i++) {

                Notification notification =
                        notifications.get(i);

                out.print("{");

                out.print(
                        "\"id\":"
                        + notification.getId()
                        + ","
                );

                out.print(
                        "\"title\":\""
                        + escapeJson(notification.getTitle())
                        + "\","
                );

                out.print(
                        "\"message\":\""
                        + escapeJson(notification.getMessage())
                        + "\","
                );

                out.print(
                        "\"type\":\""
                        + escapeJson(notification.getType())
                        + "\","
                );

                if (notification.getReferenceId() != null) {

                    out.print(
                            "\"referenceId\":"
                            + notification.getReferenceId()
                            + ","
                    );

                } else {

                    out.print(
                            "\"referenceId\":null,"
                    );

                }

                out.print(
                        "\"read\":"
                        + notification.isRead()
                        + ","
                );

                Timestamp createdAt =
                        notification.getCreatedAt();

                if (createdAt != null) {

                    out.print(
                            "\"createdAt\":\""
                            + escapeJson(
                                    createdAt.toString()
                            )
                            + "\""
                    );

                } else {

                    out.print(
                            "\"createdAt\":null"
                    );

                }

                out.print("}");

                if (i < notifications.size() - 1) {

                    out.print(",");

                }

            }

            out.print("]");

        } catch (Exception e) {

            e.printStackTrace();

            sendError(
                    response,
                    HttpServletResponse.SC_INTERNAL_SERVER_ERROR,
                    "Unable to load notifications"
            );

        }

    }


    // =========================================================
    // CREATE CLIENT-SPECIFIC NOTIFICATION
    // =========================================================

    @Override
    protected void doPost(
            HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        try {

            // Get client ID
            String userIdParam =
                    request.getParameter("userId");

            // Get notification details
            String title =
                    request.getParameter("title");

            String message =
                    request.getParameter("message");

            String type =
                    request.getParameter("type");

            String referenceIdParam =
                    request.getParameter("referenceId");


            // ==========================================
            // Validate User ID
            // ==========================================

            if (
                    userIdParam == null ||
                    userIdParam.trim().isEmpty()
            ) {

                sendError(
                        response,
                        HttpServletResponse.SC_BAD_REQUEST,
                        "User ID is required"
                );

                return;

            }


            // ==========================================
            // Validate Title
            // ==========================================

            if (
                    title == null ||
                    title.trim().isEmpty()
            ) {

                sendError(
                        response,
                        HttpServletResponse.SC_BAD_REQUEST,
                        "Notification title is required"
                );

                return;

            }


            // ==========================================
            // Validate Message
            // ==========================================

            if (
                    message == null ||
                    message.trim().isEmpty()
            ) {

                sendError(
                        response,
                        HttpServletResponse.SC_BAD_REQUEST,
                        "Notification message is required"
                );

                return;

            }


            // ==========================================
            // Convert User ID
            // ==========================================

            int userId;

            try {

                userId =
                        Integer.parseInt(
                                userIdParam
                        );

            } catch (NumberFormatException e) {

                sendError(
                        response,
                        HttpServletResponse.SC_BAD_REQUEST,
                        "Invalid user ID"
                );

                return;

            }


            // ==========================================
            // Create Notification Object
            // ==========================================

            Notification notification =
                    new Notification();

            notification.setTitle(
                    title.trim()
            );

            notification.setMessage(
                    message.trim()
            );


            // ==========================================
            // Notification Type
            // ==========================================

            if (
                    type == null ||
                    type.trim().isEmpty()
            ) {

                notification.setType(
                        "general"
                );

            } else {

                notification.setType(
                        type.trim()
                );

            }


            // ==========================================
            // Reference ID
            // ==========================================

            if (
                    referenceIdParam != null &&
                    !referenceIdParam.trim().isEmpty()
            ) {

                try {

                    notification.setReferenceId(
                            Integer.parseInt(
                                    referenceIdParam
                            )
                    );

                } catch (NumberFormatException e) {

                    sendError(
                            response,
                            HttpServletResponse.SC_BAD_REQUEST,
                            "Invalid reference ID"
                    );

                    return;

                }

            }


            // ==========================================
            // SEND NOTIFICATION TO SELECTED CLIENT
            // ==========================================

            boolean success =
                    notificationDAO
                            .createNotificationForUser(
                                    notification,
                                    userId
                            );


            // ==========================================
            // Response
            // ==========================================

            if (success) {

                sendSuccess(
                        response,
                        "Notification sent to client successfully"
                );

            } else {

                sendError(
                        response,
                        HttpServletResponse.SC_INTERNAL_SERVER_ERROR,
                        "Unable to send notification"
                );

            }


        } catch (Exception e) {

            e.printStackTrace();

            sendError(
                    response,
                    HttpServletResponse.SC_INTERNAL_SERVER_ERROR,
                    "Unable to send notification"
            );

        }

    }


    // =========================================================
    // UPDATE NOTIFICATION
    // =========================================================

    @Override
    protected void doPut(
            HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        try {

            String action =
                    request.getParameter("action");


            // ==========================================
            // Mark All As Read
            // ==========================================

            if ("readAll".equalsIgnoreCase(action)) {

                boolean success =
                        notificationDAO.markAllAsRead();

                if (success) {

                    sendSuccess(
                            response,
                            "All notifications marked as read"
                    );

                } else {

                    sendError(
                            response,
                            HttpServletResponse.SC_BAD_REQUEST,
                            "Unable to mark all notifications as read"
                    );

                }

                return;

            }


            // ==========================================
            // Get Notification ID
            // ==========================================

            String id =
                    request.getParameter("id");


            if (
                    id == null ||
                    id.isEmpty()
            ) {

                sendError(
                        response,
                        HttpServletResponse.SC_BAD_REQUEST,
                        "Notification ID is required"
                );

                return;

            }


            int notificationId;

            try {

                notificationId =
                        Integer.parseInt(id);

            } catch (NumberFormatException e) {

                sendError(
                        response,
                        HttpServletResponse.SC_BAD_REQUEST,
                        "Invalid notification ID"
                );

                return;

            }


            // ==========================================
            // Mark As Read
            // ==========================================

            boolean success =
                    notificationDAO.markAsRead(
                            notificationId
                    );


            if (success) {

                sendSuccess(
                        response,
                        "Notification marked as read"
                );

            } else {

                sendError(
                        response,
                        HttpServletResponse.SC_NOT_FOUND,
                        "Notification not found"
                );

            }


        } catch (Exception e) {

            e.printStackTrace();

            sendError(
                    response,
                    HttpServletResponse.SC_INTERNAL_SERVER_ERROR,
                    "Unable to update notification"
            );

        }

    }


    // =========================================================
    // DELETE NOTIFICATION
    // =========================================================

    @Override
    protected void doDelete(
            HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        try {

            String id =
                    request.getParameter("id");


            if (
                    id == null ||
                    id.isEmpty()
            ) {

                sendError(
                        response,
                        HttpServletResponse.SC_BAD_REQUEST,
                        "Notification ID is required"
                );

                return;

            }


            int notificationId;

            try {

                notificationId =
                        Integer.parseInt(id);

            } catch (NumberFormatException e) {

                sendError(
                        response,
                        HttpServletResponse.SC_BAD_REQUEST,
                        "Invalid notification ID"
                );

                return;

            }


            boolean success =
                    notificationDAO.deleteNotification(
                            notificationId
                    );


            if (success) {

                sendSuccess(
                        response,
                        "Notification deleted successfully"
                );

            } else {

                sendError(
                        response,
                        HttpServletResponse.SC_NOT_FOUND,
                        "Notification not found"
                );

            }


        } catch (Exception e) {

            e.printStackTrace();

            sendError(
                    response,
                    HttpServletResponse.SC_INTERNAL_SERVER_ERROR,
                    "Unable to delete notification"
            );

        }

    }


    // =========================================================
    // SUCCESS RESPONSE
    // =========================================================

    private void sendSuccess(
            HttpServletResponse response,
            String message)
            throws IOException {

        response.setStatus(
                HttpServletResponse.SC_OK
        );

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        PrintWriter out =
                response.getWriter();

        out.print("{");

        out.print("\"success\":true,");

        out.print(
                "\"message\":\""
                + escapeJson(message)
                + "\""
        );

        out.print("}");

    }


    // =========================================================
    // ERROR RESPONSE
    // =========================================================

    private void sendError(
            HttpServletResponse response,
            int status,
            String message)
            throws IOException {

        response.setStatus(status);

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        PrintWriter out =
                response.getWriter();

        out.print("{");

        out.print("\"success\":false,");

        out.print(
                "\"message\":\""
                + escapeJson(message)
                + "\""
        );

        out.print("}");

    }


    // =========================================================
    // ESCAPE JSON
    // =========================================================

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
