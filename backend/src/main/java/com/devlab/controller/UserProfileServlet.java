package com.devlab.controller;

import com.devlab.dao.UserProfileDAO;
import com.devlab.model.User;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.BufferedReader;
import java.io.IOException;

@WebServlet("/api/user/profile")
public class UserProfileServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;

    private UserProfileDAO userProfileDAO;


    // ==========================================
    // INIT
    // ==========================================

    @Override
    public void init() throws ServletException {

        userProfileDAO =
                new UserProfileDAO();
    }


    // ==========================================
    // GET PROFILE
    // ==========================================

    @Override
    protected void doGet(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws ServletException, IOException {

        response.setContentType(
                "application/json"
        );

        response.setCharacterEncoding(
                "UTF-8"
        );

        response.setHeader(
                "Access-Control-Allow-Origin",
                "http://localhost:5173"
        );

        response.setHeader(
                "Access-Control-Allow-Credentials",
                "true"
        );


        // Get existing session
        HttpSession session =
                request.getSession(false);


        // Check login
        if (
                session == null ||
                session.getAttribute("userId") == null
        ) {

            sendResponse(
                    response,
                    401,
                    "{\"success\":false,\"message\":\"User not logged in\"}"
            );

            return;
        }


        // Get userId from session
        int userId =
                (Integer) session.getAttribute(
                        "userId"
                );


        // Get profile
        User user =
                userProfileDAO.getUserProfile(
                        userId
                );


        if (user == null) {

            sendResponse(
                    response,
                    404,
                    "{\"success\":false,\"message\":\"User profile not found\"}"
            );

            return;
        }


        // Return profile
        String json =
                "{"
                + "\"success\":true,"
                + "\"id\":" + user.getId() + ","
                + "\"name\":\"" + escapeJson(user.getName()) + "\","
                + "\"email\":\"" + escapeJson(user.getEmail()) + "\","
                + "\"phone\":\"" + escapeJson(user.getPhone()) + "\","
                + "\"company\":\"" + escapeJson(user.getCompany()) + "\","
                + "\"createdAt\":\"" +
                escapeJson(
                        user.getCreatedAt() != null
                                ? user.getCreatedAt().toString()
                                : ""
                ) +
                "\""
                + "}";


        sendResponse(
                response,
                200,
                json
        );
    }


    // ==========================================
    // UPDATE PROFILE
    // ==========================================

    @Override
    protected void doPut(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws ServletException, IOException {

        response.setContentType(
                "application/json"
        );

        response.setCharacterEncoding(
                "UTF-8"
        );

        response.setHeader(
                "Access-Control-Allow-Origin",
                "http://localhost:5173"
        );

        response.setHeader(
                "Access-Control-Allow-Credentials",
                "true"
        );


        // Get existing session
        HttpSession session =
                request.getSession(false);


        // Check login
        if (
                session == null ||
                session.getAttribute("userId") == null
        ) {

            sendResponse(
                    response,
                    401,
                    "{\"success\":false,\"message\":\"User not logged in\"}"
            );

            return;
        }


        // Get userId from session
        int userId =
                (Integer) session.getAttribute(
                        "userId"
                );


        // Read request body
        String requestBody =
                readRequestBody(request);


        String name =
                getJsonValue(
                        requestBody,
                        "name"
                );

        String phone =
                getJsonValue(
                        requestBody,
                        "phone"
                );

        String company =
                getJsonValue(
                        requestBody,
                        "company"
                );


        // Validate name
        if (
                name == null ||
                name.trim().isEmpty()
        ) {

            sendResponse(
                    response,
                    400,
                    "{\"success\":false,\"message\":\"Name is required\"}"
            );

            return;
        }


        // Update profile
        boolean updated =
                userProfileDAO.updateUserProfile(
                        userId,
                        name.trim(),
                        phone != null
                                ? phone.trim()
                                : "",
                        company != null
                                ? company.trim()
                                : ""
                );


        if (!updated) {

            sendResponse(
                    response,
                    400,
                    "{\"success\":false,\"message\":\"Unable to update profile\"}"
            );

            return;
        }


        sendResponse(
                response,
                200,
                "{\"success\":true,\"message\":\"Profile updated successfully\"}"
        );
    }


    // ==========================================
    // OPTIONS - CORS
    // ==========================================

    @Override
    protected void doOptions(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws IOException {

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

        response.setStatus(
                HttpServletResponse.SC_OK
        );
    }


    // ==========================================
    // READ REQUEST BODY
    // ==========================================

    private String readRequestBody(
            HttpServletRequest request
    ) throws IOException {

        StringBuilder body =
                new StringBuilder();

        BufferedReader reader =
                request.getReader();

        String line;

        while (
                (line = reader.readLine()) != null
        ) {

            body.append(line);
        }

        return body.toString();
    }


    // ==========================================
    // GET JSON VALUE
    // ==========================================

    private String getJsonValue(
            String json,
            String key
    ) {

        String search =
                "\"" + key + "\"";

        int keyIndex =
                json.indexOf(search);

        if (keyIndex == -1) {
            return null;
        }

        int colonIndex =
                json.indexOf(
                        ":",
                        keyIndex
                );

        if (colonIndex == -1) {
            return null;
        }

        int firstQuote =
                json.indexOf(
                        "\"",
                        colonIndex
                );

        if (firstQuote == -1) {
            return null;
        }

        int secondQuote =
                json.indexOf(
                        "\"",
                        firstQuote + 1
                );

        if (secondQuote == -1) {
            return null;
        }

        return json.substring(
                firstQuote + 1,
                secondQuote
        );
    }


    // ==========================================
    // ESCAPE JSON
    // ==========================================

    private String escapeJson(
            String value
    ) {

        if (value == null) {
            return "";
        }

        return value
                .replace("\\", "\\\\")
                .replace("\"", "\\\"")
                .replace("\n", "\\n")
                .replace("\r", "\\r");
    }


    // ==========================================
    // SEND RESPONSE
    // ==========================================

    private void sendResponse(
            HttpServletResponse response,
            int status,
            String json
    ) throws IOException {

        response.setStatus(status);

        response.getWriter().write(json);
    }
}