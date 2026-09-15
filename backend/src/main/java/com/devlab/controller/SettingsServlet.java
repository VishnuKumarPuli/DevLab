
package com.devlab.controller;

import com.devlab.model.Settings;
import com.devlab.service.SettingsService;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/api/settings")
public class SettingsServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;

    private SettingsService settingsService;

    @Override
    public void init() throws ServletException {
        settingsService = new SettingsService();
    }


    // GET /api/settings
    @Override
    protected void doGet(
            HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        PrintWriter out = response.getWriter();

        Settings settings = settingsService.getSettings();

        if (settings == null) {

            response.setStatus(HttpServletResponse.SC_NOT_FOUND);

            out.print("{\"message\":\"Settings not found\"}");

            return;
        }

        out.print(settingsToJson(settings));
    }


    // PUT /api/settings
    @Override
    protected void doPut(
            HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        PrintWriter out = response.getWriter();

        StringBuilder json = new StringBuilder();

        BufferedReader reader = request.getReader();

        String line;

        while ((line = reader.readLine()) != null) {
            json.append(line);
        }

        String requestBody = json.toString();

        String name = getJsonValue(requestBody, "name");
        String email = getJsonValue(requestBody, "email");
        String phone = getJsonValue(requestBody, "phone");
        String notificationsValue =
                getJsonValue(requestBody, "notifications");

        boolean notifications =
                Boolean.parseBoolean(notificationsValue);

        Settings settings = new Settings();

        settings.setName(name);
        settings.setEmail(email);
        settings.setPhone(phone);
        settings.setNotifications(notifications);

        boolean updated =
                settingsService.updateSettings(settings);

        if (updated) {

            out.print(
                "{\"message\":\"Settings updated successfully\"}"
            );

        } else {

            response.setStatus(
                HttpServletResponse.SC_INTERNAL_SERVER_ERROR
            );

            out.print(
                "{\"message\":\"Failed to update settings\"}"
            );
        }
    }


    // Convert Settings object to JSON
    private String settingsToJson(Settings settings) {

        return "{"
                + "\"id\":" + settings.getId() + ","
                + "\"name\":\"" + escapeJson(settings.getName()) + "\","
                + "\"email\":\"" + escapeJson(settings.getEmail()) + "\","
                + "\"phone\":\"" + escapeJson(settings.getPhone()) + "\","
                + "\"notifications\":" + settings.isNotifications()
                + "}";
    }


    // Get value from simple JSON
    private String getJsonValue(String json, String key) {

        String searchKey = "\"" + key + "\":";

        int start = json.indexOf(searchKey);

        if (start == -1) {
            return "";
        }

        start += searchKey.length();

        while (start < json.length()
                && Character.isWhitespace(json.charAt(start))) {
            start++;
        }

        if (start < json.length()
                && json.charAt(start) == '"') {

            start++;

            int end = json.indexOf("\"", start);

            if (end == -1) {
                return "";
            }

            return json.substring(start, end);
        }

        int end = json.indexOf(",", start);

        if (end == -1) {
            end = json.indexOf("}", start);
        }

        if (end == -1) {
            return "";
        }

        return json.substring(start, end).trim();
    }


    // Escape JSON characters
    private String escapeJson(String value) {

        if (value == null) {
            return "";
        }

        return value
                .replace("\\", "\\\\")
                .replace("\"", "\\\"");
    }
}
