package com.devlab.controller;

import com.devlab.model.Service;
import com.devlab.service.ServiceService;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

@WebServlet("/api/services")
public class ServiceServlet extends HttpServlet {

    private final ServiceService serviceService =
            new ServiceService();


    // GET
    @Override
    protected void doGet(
            HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        PrintWriter out = response.getWriter();

        String idParameter = request.getParameter("id");

        if (idParameter != null) {

            try {

                int id = Integer.parseInt(idParameter);

                Service service =
                        serviceService.getServiceById(id);

                if (service != null) {
                    out.print(serviceToJson(service));
                } else {
                    response.setStatus(
                            HttpServletResponse.SC_NOT_FOUND
                    );

                    out.print(
                            "{\"message\":\"Service not found\"}"
                    );
                }

            } catch (NumberFormatException e) {

                response.setStatus(
                        HttpServletResponse.SC_BAD_REQUEST
                );

                out.print(
                        "{\"message\":\"Invalid service ID\"}"
                );
            }

        } else {

            List<Service> services =
                    serviceService.getAllServices();

            StringBuilder json = new StringBuilder();

            json.append("[");

            for (int i = 0; i < services.size(); i++) {

                json.append(
                        serviceToJson(services.get(i))
                );

                if (i < services.size() - 1) {
                    json.append(",");
                }
            }

            json.append("]");

            out.print(json);
        }
    }


    // POST
    @Override
    protected void doPost(
            HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        PrintWriter out = response.getWriter();

        try {

            String name = request.getParameter("name");
            String priceParameter = request.getParameter("price");
            String activeParameter = request.getParameter("active");

            if (name == null ||
                    name.trim().isEmpty() ||
                    priceParameter == null) {

                response.setStatus(
                        HttpServletResponse.SC_BAD_REQUEST
                );

                out.print(
                        "{\"message\":\"Name and price are required\"}"
                );

                return;
            }

            double price =
                    Double.parseDouble(priceParameter);

            boolean active =
                    activeParameter == null ||
                    Boolean.parseBoolean(activeParameter);

            Service service =
                    new Service(name, price, active);

            boolean success =
                    serviceService.addService(service);

            if (success) {

                response.setStatus(
                        HttpServletResponse.SC_CREATED
                );

                out.print(
                        "{\"message\":\"Service added successfully\"}"
                );

            } else {

                response.setStatus(
                        HttpServletResponse.SC_INTERNAL_SERVER_ERROR
                );

                out.print(
                        "{\"message\":\"Failed to add service\"}"
                );
            }

        } catch (NumberFormatException e) {

            response.setStatus(
                    HttpServletResponse.SC_BAD_REQUEST
            );

            out.print(
                    "{\"message\":\"Invalid price\"}"
            );
        }
    }


    // PUT
    @Override
    protected void doPut(
            HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        PrintWriter out = response.getWriter();

        try {

            String idParameter =
                    request.getParameter("id");

            String name =
                    request.getParameter("name");

            String priceParameter =
                    request.getParameter("price");

            String activeParameter =
                    request.getParameter("active");

            if (idParameter == null ||
                    name == null ||
                    priceParameter == null ||
                    activeParameter == null) {

                response.setStatus(
                        HttpServletResponse.SC_BAD_REQUEST
                );

                out.print(
                        "{\"message\":\"All fields are required\"}"
                );

                return;
            }

            int id =
                    Integer.parseInt(idParameter);

            double price =
                    Double.parseDouble(priceParameter);

            boolean active =
                    Boolean.parseBoolean(activeParameter);

            Service service =
                    new Service(
                            id,
                            name,
                            price,
                            active
                    );

            boolean success =
                    serviceService.updateService(service);

            if (success) {

                out.print(
                        "{\"message\":\"Service updated successfully\"}"
                );

            } else {

                response.setStatus(
                        HttpServletResponse.SC_NOT_FOUND
                );

                out.print(
                        "{\"message\":\"Service not found\"}"
                );
            }

        } catch (NumberFormatException e) {

            response.setStatus(
                    HttpServletResponse.SC_BAD_REQUEST
            );

            out.print(
                    "{\"message\":\"Invalid service data\"}"
            );
        }
    }


    // DELETE
    @Override
    protected void doDelete(
            HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        PrintWriter out = response.getWriter();

        try {

            String idParameter =
                    request.getParameter("id");

            if (idParameter == null) {

                response.setStatus(
                        HttpServletResponse.SC_BAD_REQUEST
                );

                out.print(
                        "{\"message\":\"Service ID is required\"}"
                );

                return;
            }

            int id =
                    Integer.parseInt(idParameter);

            boolean success =
                    serviceService.deleteService(id);

            if (success) {

                out.print(
                        "{\"message\":\"Service deleted successfully\"}"
                );

            } else {

                response.setStatus(
                        HttpServletResponse.SC_NOT_FOUND
                );

                out.print(
                        "{\"message\":\"Service not found\"}"
                );
            }

        } catch (NumberFormatException e) {

            response.setStatus(
                    HttpServletResponse.SC_BAD_REQUEST
            );

            out.print(
                    "{\"message\":\"Invalid service ID\"}"
            );
        }
    }


    private String serviceToJson(Service service) {

        return "{"
                + "\"id\":" + service.getId() + ","
                + "\"name\":\"" + escapeJson(service.getName()) + "\","
                + "\"price\":" + service.getPrice() + ","
                + "\"active\":" + service.isActive()
                + "}";
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