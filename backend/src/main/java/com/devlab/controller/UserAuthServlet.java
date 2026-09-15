package com.devlab.controller;

import com.devlab.model.User;
import com.devlab.service.UserService;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/api/user/auth/*")
public class UserAuthServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;

    private UserService userService;

    @Override
    public void init() throws ServletException {
        userService = new UserService();
    }


    // ==========================================
    // POST
    // Login / Register
    // ==========================================

    @Override
    protected void doPost(
            HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        PrintWriter out = response.getWriter();

        String path = request.getPathInfo();

        if (path == null) {
            response.setStatus(
                    HttpServletResponse.SC_BAD_REQUEST
            );

            out.print(
                "{\"message\":\"Invalid request\"}"
            );

            return;
        }


        // ==========================================
        // LOGIN
        // /api/user/auth/login
        // ==========================================

        if (path.equals("/login")) {

            loginUser(request, response, out);

            return;
        }


        // ==========================================
        // REGISTER
        // /api/user/auth/register
        // ==========================================

        if (path.equals("/register")) {

            registerUser(request, response, out);

            return;
        }


        response.setStatus(
                HttpServletResponse.SC_NOT_FOUND
        );

        out.print(
            "{\"message\":\"Endpoint not found\"}"
        );
    }


    // ==========================================
    // USER LOGIN
    // ==========================================

    private void loginUser(
            HttpServletRequest request,
            HttpServletResponse response,
            PrintWriter out)
            throws IOException {

        String requestBody =
                readRequestBody(request);

        String email =
                getJsonValue(requestBody, "email");

        String password =
                getJsonValue(requestBody, "password");


        if (email.isEmpty() || password.isEmpty()) {

            response.setStatus(
                    HttpServletResponse.SC_BAD_REQUEST
            );

            out.print(
                "{\"message\":\"Email and password are required\"}"
            );

            return;
        }


        User user =
                userService.login(email, password);


        if (user != null) {

            HttpSession session =
                    request.getSession();

            session.setAttribute(
                    "userId",
                    user.getId()
            );

            session.setAttribute(
                    "userName",
                    user.getName()
            );

            session.setAttribute(
                    "userEmail",
                    user.getEmail()
            );


            out.print(
                "{"
                + "\"message\":\"Login successful\","
                + "\"id\":" + user.getId() + ","
                + "\"name\":\""
                + escapeJson(user.getName())
                + "\","
                + "\"email\":\""
                + escapeJson(user.getEmail())
                + "\""
                + "}"
            );

        } else {

            response.setStatus(
                    HttpServletResponse.SC_UNAUTHORIZED
            );

            out.print(
                "{\"message\":\"Invalid email or password\"}"
            );
        }
    }


    // ==========================================
    // USER REGISTRATION
    // ==========================================

    private void registerUser(
            HttpServletRequest request,
            HttpServletResponse response,
            PrintWriter out)
            throws IOException {

        String requestBody =
                readRequestBody(request);

        String name =
                getJsonValue(requestBody, "name");

        String email =
                getJsonValue(requestBody, "email");

        String password =
                getJsonValue(requestBody, "password");

        String phone =
                getJsonValue(requestBody, "phone");

        String company =
                getJsonValue(requestBody, "company");


        if (
            name.isEmpty()
            || email.isEmpty()
            || password.isEmpty()
        ) {

            response.setStatus(
                    HttpServletResponse.SC_BAD_REQUEST
            );

            out.print(
                "{\"message\":\"Name, email and password are required\"}"
            );

            return;
        }


        User user = new User(
                name,
                email,
                password,
                phone,
                company
        );


        boolean registered =
                userService.registerUser(user);


        if (registered) {

            out.print(
                "{\"message\":\"Registration successful\"}"
            );

        } else {

            response.setStatus(
                    HttpServletResponse.SC_CONFLICT
            );

            out.print(
                "{\"message\":\"Email already registered\"}"
            );
        }
    }


    // ==========================================
    // READ REQUEST BODY
    // ==========================================

    private String readRequestBody(
            HttpServletRequest request)
            throws IOException {

        StringBuilder json =
                new StringBuilder();

        BufferedReader reader =
                request.getReader();

        String line;

        while ((line = reader.readLine()) != null) {

            json.append(line);
        }

        return json.toString();
    }


    // ==========================================
    // GET JSON VALUE
    // ==========================================

    private String getJsonValue(
            String json,
            String key) {

        String searchKey =
                "\"" + key + "\":";

        int start =
                json.indexOf(searchKey);

        if (start == -1) {
            return "";
        }

        start += searchKey.length();


        while (
            start < json.length()
            && Character.isWhitespace(
                    json.charAt(start))
        ) {

            start++;
        }


        if (
            start < json.length()
            && json.charAt(start) == '"'
        ) {

            start++;

            int end =
                    json.indexOf("\"", start);

            if (end == -1) {
                return "";
            }

            return json.substring(
                    start,
                    end
            );
        }

        return "";
    }


    // ==========================================
    // ESCAPE JSON
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