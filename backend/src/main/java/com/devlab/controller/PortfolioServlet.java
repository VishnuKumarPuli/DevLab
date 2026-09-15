
package com.devlab.controller;

import com.devlab.model.Portfolio;
import com.devlab.service.PortfolioService;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.List;

@WebServlet("/api/portfolio/*")
public class PortfolioServlet extends HttpServlet {

    private PortfolioService portfolioService;

    @Override
    public void init() throws ServletException {
        portfolioService = new PortfolioService();
    }

    // =========================
    // GET
    // =========================
    @Override
    protected void doGet(HttpServletRequest request,
                         HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        String pathInfo = request.getPathInfo();

        // GET /api/portfolio
        if (pathInfo == null || pathInfo.equals("/")) {

            List<Portfolio> portfolios =
                    portfolioService.getAllPortfolios();

            StringBuilder json = new StringBuilder("[");

            for (int i = 0; i < portfolios.size(); i++) {

                Portfolio p = portfolios.get(i);

                json.append("{")
                        .append("\"id\":").append(p.getId()).append(",")
                        .append("\"title\":\"")
                        .append(escapeJson(p.getTitle()))
                        .append("\",")
                        .append("\"category\":\"")
                        .append(escapeJson(p.getCategory()))
                        .append("\",")
                        .append("\"description\":\"")
                        .append(escapeJson(p.getDescription()))
                        .append("\",")
                        .append("\"image\":\"")
                        .append(escapeJson(p.getImage()))
                        .append("\",")
                        .append("\"technologies\":\"")
                        .append(escapeJson(p.getTechnologies()))
                        .append("\",")
                        .append("\"projectUrl\":\"")
                        .append(escapeJson(p.getProjectUrl()))
                        .append("\",")
                        .append("\"status\":\"")
                        .append(escapeJson(p.getStatus()))
                        .append("\"")
                        .append("}");

                if (i < portfolios.size() - 1) {
                    json.append(",");
                }
            }

            json.append("]");

            response.getWriter().write(json.toString());
            return;
        }

        // GET /api/portfolio/{id}
        try {

            int id = Integer.parseInt(pathInfo.substring(1));

            Portfolio portfolio =
                    portfolioService.getPortfolioById(id);

            if (portfolio == null) {

                response.setStatus(
                        HttpServletResponse.SC_NOT_FOUND
                );

                response.getWriter().write(
                        "{\"message\":\"Portfolio project not found\"}"
                );

                return;
            }

            String json =
                    "{"
                    + "\"id\":" + portfolio.getId() + ","
                    + "\"title\":\""
                    + escapeJson(portfolio.getTitle())
                    + "\","
                    + "\"category\":\""
                    + escapeJson(portfolio.getCategory())
                    + "\","
                    + "\"description\":\""
                    + escapeJson(portfolio.getDescription())
                    + "\","
                    + "\"image\":\""
                    + escapeJson(portfolio.getImage())
                    + "\","
                    + "\"technologies\":\""
                    + escapeJson(portfolio.getTechnologies())
                    + "\","
                    + "\"projectUrl\":\""
                    + escapeJson(portfolio.getProjectUrl())
                    + "\","
                    + "\"status\":\""
                    + escapeJson(portfolio.getStatus())
                    + "\""
                    + "}";

            response.getWriter().write(json);

        } catch (NumberFormatException e) {

            response.setStatus(
                    HttpServletResponse.SC_BAD_REQUEST
            );

            response.getWriter().write(
                    "{\"message\":\"Invalid portfolio ID\"}"
            );
        }
    }

    // =========================
    // POST
    // =========================
    @Override
    protected void doPost(HttpServletRequest request,
                          HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        try {

            String body = readRequestBody(request);

            Portfolio portfolio = new Portfolio();

            portfolio.setTitle(
                    getJsonValue(body, "title")
            );

            portfolio.setCategory(
                    getJsonValue(body, "category")
            );

            portfolio.setDescription(
                    getJsonValue(body, "description")
            );

            portfolio.setImage(
                    getJsonValue(body, "image")
            );

            portfolio.setTechnologies(
                    getJsonValue(body, "technologies")
            );

            portfolio.setProjectUrl(
                    getJsonValue(body, "projectUrl")
            );

            String status = getJsonValue(body, "status");

            if (status == null || status.isEmpty()) {
                status = "Active";
            }

            portfolio.setStatus(status);

            boolean success =
                    portfolioService.addPortfolio(portfolio);

            if (success) {

                response.setStatus(
                        HttpServletResponse.SC_CREATED
                );

                response.getWriter().write(
                        "{\"message\":\"Portfolio project added successfully\"}"
                );

            } else {

                response.setStatus(
                        HttpServletResponse.SC_INTERNAL_SERVER_ERROR
                );

                response.getWriter().write(
                        "{\"message\":\"Failed to add portfolio project\"}"
                );
            }

        } catch (Exception e) {

            e.printStackTrace();

            response.setStatus(
                    HttpServletResponse.SC_BAD_REQUEST
            );

            response.getWriter().write(
                    "{\"message\":\"Invalid request data\"}"
            );
        }
    }

    // =========================
    // PUT
    // =========================
    @Override
    protected void doPut(HttpServletRequest request,
                         HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        String pathInfo = request.getPathInfo();

        if (pathInfo == null || pathInfo.equals("/")) {

            response.setStatus(
                    HttpServletResponse.SC_BAD_REQUEST
            );

            response.getWriter().write(
                    "{\"message\":\"Portfolio ID is required\"}"
            );

            return;
        }

        try {

            int id = Integer.parseInt(pathInfo.substring(1));

            String body = readRequestBody(request);

            // =========================
            // STATUS UPDATE
            // =========================
            if (isOnlyStatus(body)) {

                String status =
                        getJsonValue(body, "status");

                boolean success =
                        portfolioService.updateStatus(id, status);

                if (success) {

                    response.getWriter().write(
                            "{\"message\":\"Portfolio status updated successfully\"}"
                    );

                } else {

                    response.setStatus(
                            HttpServletResponse.SC_NOT_FOUND
                    );

                    response.getWriter().write(
                            "{\"message\":\"Portfolio project not found\"}"
                    );
                }

                return;
            }

            // =========================
            // FULL UPDATE
            // =========================

            Portfolio portfolio =
                    portfolioService.getPortfolioById(id);

            if (portfolio == null) {

                response.setStatus(
                        HttpServletResponse.SC_NOT_FOUND
                );

                response.getWriter().write(
                        "{\"message\":\"Portfolio project not found\"}"
                );

                return;
            }

            String title = getJsonValue(body, "title");

            if (title != null) {
                portfolio.setTitle(title);
            }

            String category = getJsonValue(body, "category");

            if (category != null) {
                portfolio.setCategory(category);
            }

            String description =
                    getJsonValue(body, "description");

            if (description != null) {
                portfolio.setDescription(description);
            }

            String image =
                    getJsonValue(body, "image");

            if (image != null) {
                portfolio.setImage(image);
            }

            String technologies =
                    getJsonValue(body, "technologies");

            if (technologies != null) {
                portfolio.setTechnologies(technologies);
            }

            String projectUrl =
                    getJsonValue(body, "projectUrl");

            if (projectUrl != null) {
                portfolio.setProjectUrl(projectUrl);
            }

            String status =
                    getJsonValue(body, "status");

            if (status != null) {
                portfolio.setStatus(status);
            }

            portfolio.setId(id);

            boolean success =
                    portfolioService.updatePortfolio(portfolio);

            if (success) {

                response.getWriter().write(
                        "{\"message\":\"Portfolio project updated successfully\"}"
                );

            } else {

                response.setStatus(
                        HttpServletResponse.SC_INTERNAL_SERVER_ERROR
                );

                response.getWriter().write(
                        "{\"message\":\"Failed to update portfolio project\"}"
                );
            }

        } catch (NumberFormatException e) {

            response.setStatus(
                    HttpServletResponse.SC_BAD_REQUEST
            );

            response.getWriter().write(
                    "{\"message\":\"Invalid portfolio ID\"}"
            );

        } catch (Exception e) {

            e.printStackTrace();

            response.setStatus(
                    HttpServletResponse.SC_BAD_REQUEST
            );

            response.getWriter().write(
                    "{\"message\":\"Invalid request data\"}"
            );
        }
    }

    // =========================
    // DELETE
    // =========================
    @Override
    protected void doDelete(HttpServletRequest request,
                            HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        String pathInfo = request.getPathInfo();

        if (pathInfo == null || pathInfo.equals("/")) {

            response.setStatus(
                    HttpServletResponse.SC_BAD_REQUEST
            );

            response.getWriter().write(
                    "{\"message\":\"Portfolio ID is required\"}"
            );

            return;
        }

        try {

            int id = Integer.parseInt(pathInfo.substring(1));

            boolean success =
                    portfolioService.deletePortfolio(id);

            if (success) {

                response.getWriter().write(
                        "{\"message\":\"Portfolio project deleted successfully\"}"
                );

            } else {

                response.setStatus(
                        HttpServletResponse.SC_NOT_FOUND
                );

                response.getWriter().write(
                        "{\"message\":\"Portfolio project not found\"}"
                );
            }

        } catch (NumberFormatException e) {

            response.setStatus(
                    HttpServletResponse.SC_BAD_REQUEST
            );

            response.getWriter().write(
                    "{\"message\":\"Invalid portfolio ID\"}"
            );
        }
    }

    // =========================
    // Read request body
    // =========================
    private String readRequestBody(HttpServletRequest request)
            throws IOException {

        StringBuilder body = new StringBuilder();

        BufferedReader reader = request.getReader();

        String line;

        while ((line = reader.readLine()) != null) {
            body.append(line);
        }

        return body.toString();
    }

    // =========================
    // Get JSON string value
    // =========================
    private String getJsonValue(String json, String key) {

        if (json == null || key == null) {
            return null;
        }

        String searchKey = "\"" + key + "\"";

        int keyIndex = json.indexOf(searchKey);

        if (keyIndex == -1) {
            return null;
        }

        int colonIndex =
                json.indexOf(":", keyIndex + searchKey.length());

        if (colonIndex == -1) {
            return null;
        }

        int startQuote =
                json.indexOf("\"", colonIndex + 1);

        if (startQuote == -1) {
            return null;
        }

        StringBuilder value = new StringBuilder();

        boolean escaped = false;

        for (int i = startQuote + 1; i < json.length(); i++) {

            char ch = json.charAt(i);

            if (escaped) {

                switch (ch) {

                    case '"':
                        value.append('"');
                        break;

                    case '\\':
                        value.append('\\');
                        break;

                    case 'n':
                        value.append('\n');
                        break;

                    case 'r':
                        value.append('\r');
                        break;

                    case 't':
                        value.append('\t');
                        break;

                    default:
                        value.append(ch);
                        break;
                }

                escaped = false;

            } else if (ch == '\\') {

                escaped = true;

            } else if (ch == '"') {

                break;

            } else {

                value.append(ch);
            }
        }

        return value.toString();
    }

    // =========================
    // Check status-only request
    // =========================
    private boolean isOnlyStatus(String json) {

        if (json == null) {
            return false;
        }

        String cleaned =
                json.trim()
                    .replace(" ", "")
                    .replace("\n", "")
                    .replace("\r", "")
                    .replace("\t", "");

        return cleaned.matches(
                "\\{\"status\":\"[^\"]*\"\\}"
        );
    }

    // =========================
    // Escape JSON values
    // =========================
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
