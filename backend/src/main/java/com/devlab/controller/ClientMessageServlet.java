package com.devlab.controller;

import com.devlab.dao.ClientMessageDAO;
import com.devlab.dao.NotificationDAO;
import com.devlab.model.ClientMessage;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Timestamp;
import java.util.List;

@WebServlet("/api/client-messages")
public class ClientMessageServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;

    private ClientMessageDAO clientMessageDAO;
    private NotificationDAO notificationDAO;

    @Override
    public void init() throws ServletException {

        clientMessageDAO = new ClientMessageDAO();
        notificationDAO = new NotificationDAO();
    }

    // =========================================================
    // CORS
    // =========================================================

    private void setCorsHeaders(HttpServletResponse response) {

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
                "GET, POST, PUT, OPTIONS"
        );

        response.setHeader(
                "Access-Control-Allow-Headers",
                "Content-Type"
        );
    }

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
    // GET - CLIENT MESSAGES
    // =========================================================

    @Override
    protected void doGet(
            HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {

        setCorsHeaders(response);

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        HttpSession session =
                request.getSession(false);

        if (
                session == null ||
                session.getAttribute("userId") == null
        ) {

            sendError(
                    response,
                    HttpServletResponse.SC_UNAUTHORIZED,
                    "User not logged in"
            );

            return;
        }

        int userId =
                (Integer) session.getAttribute("userId");

        try {

            List<ClientMessage> messages =
                    clientMessageDAO.getMessagesByUser(
                            userId
                    );

            PrintWriter out =
                    response.getWriter();

            out.print("[");

            for (
                    int i = 0;
                    i < messages.size();
                    i++
            ) {

                ClientMessage message =
                        messages.get(i);

                out.print("{");

                out.print(
                        "\"id\":"
                                + message.getId()
                                + ","
                );

                out.print(
                        "\"subject\":\""
                                + escapeJson(
                                        message.getSubject()
                                )
                                + "\","
                );

                out.print(
                        "\"message\":\""
                                + escapeJson(
                                        message.getMessage()
                                )
                                + "\","
                );

                out.print(
                        "\"isRead\":"
                                + message.isRead()
                                + ","
                );

                Timestamp createdAt =
                        message.getCreatedAt();

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

                if (i < messages.size() - 1) {
                    out.print(",");
                }
            }

            out.print("]");

        } catch (Exception e) {

            e.printStackTrace();

            sendError(
                    response,
                    HttpServletResponse.SC_INTERNAL_SERVER_ERROR,
                    "Unable to load messages"
            );
        }
    }

    // =========================================================
    // POST - ADMIN SENDS MESSAGE TO CLIENT
    // =========================================================

    @Override
    protected void doPost(
            HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {

        setCorsHeaders(response);

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        try {

            String userIdParam =
                    request.getParameter("userId");

            String subject =
                    request.getParameter("subject");

            String message =
                    request.getParameter("message");

            // -------------------------------------------------
            // VALIDATE USER ID
            // -------------------------------------------------

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

            // -------------------------------------------------
            // VALIDATE SUBJECT
            // -------------------------------------------------

            if (
                    subject == null ||
                    subject.trim().isEmpty()
            ) {

                sendError(
                        response,
                        HttpServletResponse.SC_BAD_REQUEST,
                        "Subject is required"
                );

                return;
            }

            // -------------------------------------------------
            // VALIDATE MESSAGE
            // -------------------------------------------------

            if (
                    message == null ||
                    message.trim().isEmpty()
            ) {

                sendError(
                        response,
                        HttpServletResponse.SC_BAD_REQUEST,
                        "Message is required"
                );

                return;
            }

            // -------------------------------------------------
            // CONVERT USER ID
            // -------------------------------------------------

            int userId;

            try {

                userId =
                        Integer.parseInt(
                                userIdParam.trim()
                        );

            } catch (NumberFormatException e) {

                sendError(
                        response,
                        HttpServletResponse.SC_BAD_REQUEST,
                        "Invalid user ID"
                );

                return;
            }

            // -------------------------------------------------
            // CREATE CLIENT MESSAGE
            // -------------------------------------------------

            ClientMessage clientMessage =
                    new ClientMessage();

            clientMessage.setUserId(userId);

            clientMessage.setSubject(
                    subject.trim()
            );

            clientMessage.setMessage(
                    message.trim()
            );

            boolean messageCreated =
                    clientMessageDAO.createMessage(
                            clientMessage
                    );

            if (!messageCreated) {

                sendError(
                        response,
                        HttpServletResponse.SC_INTERNAL_SERVER_ERROR,
                        "Unable to send message"
                );

                return;
            }

            // -------------------------------------------------
            // CREATE NOTIFICATION FOR SAME CLIENT
            // -------------------------------------------------

            boolean notificationCreated =
                    notificationDAO.createClientMessageNotification(
                            userId,
                            subject.trim(),
                            message.trim()
                    );

            // -------------------------------------------------
            // BOTH MESSAGE + NOTIFICATION SUCCESS
            // -------------------------------------------------

            if (notificationCreated) {

                sendSuccess(
                        response,
                        "Message sent and notification created successfully"
                );

            } else {

                // Message was created but notification failed
                sendSuccess(
                        response,
                        "Message sent successfully, but notification could not be created"
                );
            }

        } catch (Exception e) {

            e.printStackTrace();

            sendError(
                    response,
                    HttpServletResponse.SC_INTERNAL_SERVER_ERROR,
                    "Unable to send message"
            );
        }
    }

    // =========================================================
    // PUT - MARK MESSAGE AS READ
    // =========================================================

    @Override
    protected void doPut(
            HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {

        setCorsHeaders(response);

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        HttpSession session =
                request.getSession(false);

        if (
                session == null ||
                session.getAttribute("userId") == null
        ) {

            sendError(
                    response,
                    HttpServletResponse.SC_UNAUTHORIZED,
                    "User not logged in"
            );

            return;
        }

        int userId =
                (Integer) session.getAttribute("userId");

        String idParam =
                request.getParameter("id");

        if (
                idParam == null ||
                idParam.trim().isEmpty()
        ) {

            sendError(
                    response,
                    HttpServletResponse.SC_BAD_REQUEST,
                    "Message ID is required"
            );

            return;
        }

        int id;

        try {

            id =
                    Integer.parseInt(
                            idParam.trim()
                    );

        } catch (NumberFormatException e) {

            sendError(
                    response,
                    HttpServletResponse.SC_BAD_REQUEST,
                    "Invalid message ID"
            );

            return;
        }

        boolean success =
                clientMessageDAO.markAsRead(
                        id,
                        userId
                );

        if (success) {

            sendSuccess(
                    response,
                    "Message marked as read"
            );

        } else {

            sendError(
                    response,
                    HttpServletResponse.SC_NOT_FOUND,
                    "Message not found"
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

        PrintWriter out =
                response.getWriter();

        out.print("{");

        out.print(
                "\"success\":true,"
        );

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

        PrintWriter out =
                response.getWriter();

        out.print("{");

        out.print(
                "\"success\":false,"
        );

        out.print(
                "\"message\":\""
                        + escapeJson(message)
                        + "\""
        );

        out.print("}");
    }

    // =========================================================
    // JSON ESCAPE
    // =========================================================

    private String escapeJson(String value) {

        if (value == null) {
            return "";
        }

        return value
                .replace("\\", "\\\\")
                .replace("\"", "\\\"")
                .replace("\n", "\\n")
                .replace("\r", "\\r")
                .replace("\t", "\\t");
    }
}