package com.devlab.controller;

import com.devlab.model.ContactMessage;
import com.devlab.service.ContactMessageService;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Timestamp;
import java.util.List;

@WebServlet("/api/messages/*")
public class ContactMessageServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;

    private ContactMessageService messageService;

    @Override
    public void init() throws ServletException {
        messageService = new ContactMessageService();
    }

    // GET
    @Override
    protected void doGet(HttpServletRequest request,
                         HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        PrintWriter out = response.getWriter();

        String pathInfo = request.getPathInfo();

        // GET /api/messages
        if (pathInfo == null || pathInfo.equals("/")) {

            List<ContactMessage> messages =
                    messageService.getAllMessages();

            out.print("[");
            
            for (int i = 0; i < messages.size(); i++) {

                ContactMessage message = messages.get(i);

                out.print(messageToJson(message));

                if (i < messages.size() - 1) {
                    out.print(",");
                }
            }

            out.print("]");

        }

        // GET /api/messages/{id}
        else {

            try {

                int id = Integer.parseInt(pathInfo.substring(1));

                ContactMessage message =
                        messageService.getMessageById(id);

                if (message != null) {

                    out.print(messageToJson(message));

                } else {

                    response.setStatus(HttpServletResponse.SC_NOT_FOUND);

                    out.print("{\"error\":\"Message not found\"}");
                }

            } catch (NumberFormatException e) {

                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);

                out.print("{\"error\":\"Invalid message ID\"}");
            }
        }
    }


    // POST
    @Override
    protected void doPost(HttpServletRequest request,
                          HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        PrintWriter out = response.getWriter();

        String json = readRequestBody(request);

        try {

            String name = getJsonValue(json, "name");
            String email = getJsonValue(json, "email");
            String subject = getJsonValue(json, "subject");
            String messageText = getJsonValue(json, "message");

            ContactMessage message = new ContactMessage();

            message.setName(name);
            message.setEmail(email);
            message.setSubject(subject);
            message.setMessage(messageText);

            // New messages are unread by default
            message.setStatus("Unread");

            boolean saved = messageService.saveMessage(message);

            if (saved) {

                response.setStatus(HttpServletResponse.SC_CREATED);

                out.print("{\"message\":\"Message saved successfully\"}");

            } else {

                response.setStatus(
                        HttpServletResponse.SC_INTERNAL_SERVER_ERROR
                );

                out.print("{\"error\":\"Failed to save message\"}");
            }

        } catch (Exception e) {

            e.printStackTrace();

            response.setStatus(
                    HttpServletResponse.SC_BAD_REQUEST
            );

            out.print("{\"error\":\"Invalid request data\"}");
        }
    }


    // PUT
    @Override
    protected void doPut(HttpServletRequest request,
                         HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        PrintWriter out = response.getWriter();

        String pathInfo = request.getPathInfo();

        if (pathInfo == null || pathInfo.equals("/")) {

            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);

            out.print("{\"error\":\"Message ID is required\"}");

            return;
        }

        try {

            int id = Integer.parseInt(pathInfo.substring(1));

            String json = readRequestBody(request);

            String status = getJsonValue(json, "status");

            if (!status.equals("Read") && !status.equals("Unread")) {

                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);

                out.print(
                        "{\"error\":\"Status must be Read or Unread\"}"
                );

                return;
            }

            boolean updated =
                    messageService.updateStatus(id, status);

            if (updated) {

                out.print(
                        "{\"message\":\"Message status updated successfully\"}"
                );

            } else {

                response.setStatus(HttpServletResponse.SC_NOT_FOUND);

                out.print(
                        "{\"error\":\"Message not found\"}"
                );
            }

        } catch (NumberFormatException e) {

            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);

            out.print("{\"error\":\"Invalid message ID\"}");

        } catch (Exception e) {

            e.printStackTrace();

            response.setStatus(
                    HttpServletResponse.SC_INTERNAL_SERVER_ERROR
            );

            out.print(
                    "{\"error\":\"Failed to update message status\"}"
            );
        }
    }


    // DELETE
    @Override
    protected void doDelete(HttpServletRequest request,
                            HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        PrintWriter out = response.getWriter();

        String pathInfo = request.getPathInfo();

        if (pathInfo == null || pathInfo.equals("/")) {

            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);

            out.print("{\"error\":\"Message ID is required\"}");

            return;
        }

        try {

            int id = Integer.parseInt(pathInfo.substring(1));

            boolean deleted =
                    messageService.deleteMessage(id);

            if (deleted) {

                out.print(
                        "{\"message\":\"Message deleted successfully\"}"
                );

            } else {

                response.setStatus(HttpServletResponse.SC_NOT_FOUND);

                out.print(
                        "{\"error\":\"Message not found\"}"
                );
            }

        } catch (NumberFormatException e) {

            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);

            out.print("{\"error\":\"Invalid message ID\"}");

        } catch (Exception e) {

            e.printStackTrace();

            response.setStatus(
                    HttpServletResponse.SC_INTERNAL_SERVER_ERROR
            );

            out.print(
                    "{\"error\":\"Failed to delete message\"}"
            );
        }
    }


    // Read JSON request body
    private String readRequestBody(HttpServletRequest request)
            throws IOException {

        StringBuilder json = new StringBuilder();

        BufferedReader reader = request.getReader();

        String line;

        while ((line = reader.readLine()) != null) {
            json.append(line);
        }

        return json.toString();
    }


    // Simple JSON value extractor
    private String getJsonValue(String json, String key) {

        String searchKey = "\"" + key + "\"";

        int keyIndex = json.indexOf(searchKey);

        if (keyIndex == -1) {
            return "";
        }

        int colonIndex = json.indexOf(":", keyIndex);

        if (colonIndex == -1) {
            return "";
        }

        int firstQuote = json.indexOf("\"", colonIndex + 1);

        if (firstQuote == -1) {
            return "";
        }

        int secondQuote = json.indexOf("\"", firstQuote + 1);

        if (secondQuote == -1) {
            return "";
        }

        return json.substring(
                firstQuote + 1,
                secondQuote
        );
    }


    // Convert ContactMessage object to JSON
    private String messageToJson(ContactMessage message) {

        String createdAt = "";

        Timestamp timestamp = message.getCreatedAt();

        if (timestamp != null) {
            createdAt = timestamp.toString();
        }

        return "{"
                + "\"id\":" + message.getId() + ","
                + "\"name\":\"" + escapeJson(message.getName()) + "\","
                + "\"email\":\"" + escapeJson(message.getEmail()) + "\","
                + "\"subject\":\"" + escapeJson(message.getSubject()) + "\","
                + "\"message\":\"" + escapeJson(message.getMessage()) + "\","
                + "\"status\":\"" + escapeJson(message.getStatus()) + "\","
                + "\"createdAt\":\"" + escapeJson(createdAt) + "\""
                + "}";
    }


    // Escape special JSON characters
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