
package com.devlab.controller;

import com.devlab.model.Testimonial;
import com.devlab.service.TestimonialService;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

@WebServlet("/api/testimonials")
public class TestimonialServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;

    private TestimonialService testimonialService;

    @Override
    public void init() throws ServletException {
        testimonialService = new TestimonialService();
    }

    // GET
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        PrintWriter out = response.getWriter();

        String idParam = request.getParameter("id");

        // GET BY ID
        if (idParam != null && !idParam.isEmpty()) {

            try {
                int id = Integer.parseInt(idParam);

                Testimonial testimonial =
                        testimonialService.getTestimonialById(id);

                if (testimonial != null) {

                    out.print(testimonial.toJson());

                } else {

                    response.setStatus(
                            HttpServletResponse.SC_NOT_FOUND
                    );

                    out.print(
                            "{\"success\":false,"
                            + "\"message\":\"Testimonial not found.\"}"
                    );
                }

            } catch (NumberFormatException e) {

                response.setStatus(
                        HttpServletResponse.SC_BAD_REQUEST
                );

                out.print(
                        "{\"success\":false,"
                        + "\"message\":\"Invalid testimonial ID.\"}"
                );
            }

            return;
        }

        // GET ALL
        List<Testimonial> testimonials =
                testimonialService.getAllTestimonials();

        StringBuilder json = new StringBuilder("[");

        for (int i = 0; i < testimonials.size(); i++) {

            json.append(testimonials.get(i).toJson());

            if (i < testimonials.size() - 1) {
                json.append(",");
            }
        }

        json.append("]");

        out.print(json.toString());
    }


    // POST
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        PrintWriter out = response.getWriter();

        try {

            String name = request.getParameter("name");

            String role = request.getParameter("role");

            String message = request.getParameter("message");

            int rating =
                    Integer.parseInt(
                            request.getParameter("rating")
                    );

            String status =
                    request.getParameter("status");

            if (status == null || status.isEmpty()) {
                status = "ACTIVE";
            }

            status = status.toUpperCase();


            // Validate rating
            if (rating < 1 || rating > 5) {

                response.setStatus(
                        HttpServletResponse.SC_BAD_REQUEST
                );

                out.print(
                        "{\"success\":false,"
                        + "\"message\":\"Rating must be between 1 and 5.\"}"
                );

                return;
            }


            // Validate status
            if (!status.equals("ACTIVE")
                    && !status.equals("INACTIVE")) {

                response.setStatus(
                        HttpServletResponse.SC_BAD_REQUEST
                );

                out.print(
                        "{\"success\":false,"
                        + "\"message\":\"Invalid status.\"}"
                );

                return;
            }


            Testimonial testimonial =
                    new Testimonial(
                            name,
                            role,
                            message,
                            rating,
                            status
                    );


            boolean success =
                    testimonialService.addTestimonial(
                            testimonial
                    );


            if (success) {

                // Get complete created testimonial
                Testimonial createdTestimonial =
                        testimonialService.getTestimonialById(
                                testimonial.getId()
                        );


                if (createdTestimonial != null) {

                    out.print(
                            "{\"success\":true,"
                            + "\"message\":\"Testimonial added successfully.\","
                            + "\"testimonial\":"
                            + createdTestimonial.toJson()
                            + "}"
                    );

                } else {

                    response.setStatus(
                            HttpServletResponse.SC_BAD_REQUEST
                    );

                    out.print(
                            "{\"success\":false,"
                            + "\"message\":\"Testimonial created but could not be retrieved.\"}"
                    );
                }


            } else {

                response.setStatus(
                        HttpServletResponse.SC_BAD_REQUEST
                );

                out.print(
                        "{\"success\":false,"
                        + "\"message\":\"Unable to add testimonial.\"}"
                );
            }


        } catch (Exception e) {

            e.printStackTrace();

            response.setStatus(
                    HttpServletResponse.SC_BAD_REQUEST
            );

            out.print(
                    "{\"success\":false,"
                    + "\"message\":\"Invalid testimonial data.\"}"
            );
        }
    }


    // PUT
    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        PrintWriter out = response.getWriter();

        try {

            int id =
                    Integer.parseInt(
                            request.getParameter("id")
                    );

            String action =
                    request.getParameter("action");


            // ENABLE / DISABLE
            if ("status".equalsIgnoreCase(action)) {

                String status =
                        request.getParameter("status");

                if (status == null || status.isEmpty()) {

                    response.setStatus(
                            HttpServletResponse.SC_BAD_REQUEST
                    );

                    out.print(
                            "{\"success\":false,"
                            + "\"message\":\"Status is required.\"}"
                    );

                    return;
                }

                status = status.toUpperCase();


                if (!status.equals("ACTIVE")
                        && !status.equals("INACTIVE")) {

                    response.setStatus(
                            HttpServletResponse.SC_BAD_REQUEST
                    );

                    out.print(
                            "{\"success\":false,"
                            + "\"message\":\"Invalid status.\"}"
                    );

                    return;
                }


                boolean success =
                        testimonialService.updateStatus(
                                id,
                                status
                        );


                if (success) {

                    out.print(
                            "{\"success\":true,"
                            + "\"message\":\"Testimonial status updated successfully.\"}"
                    );

                } else {

                    response.setStatus(
                            HttpServletResponse.SC_BAD_REQUEST
                    );

                    out.print(
                            "{\"success\":false,"
                            + "\"message\":\"Unable to update testimonial status.\"}"
                    );
                }

                return;
            }


            // NORMAL UPDATE
            String name =
                    request.getParameter("name");

            String role =
                    request.getParameter("role");

            String message =
                    request.getParameter("message");

            int rating =
                    Integer.parseInt(
                            request.getParameter("rating")
                    );

            String status =
                    request.getParameter("status");


            if (status == null || status.isEmpty()) {
                status = "ACTIVE";
            }

            status = status.toUpperCase();


            // Validate rating
            if (rating < 1 || rating > 5) {

                response.setStatus(
                        HttpServletResponse.SC_BAD_REQUEST
                );

                out.print(
                        "{\"success\":false,"
                        + "\"message\":\"Rating must be between 1 and 5.\"}"
                );

                return;
            }


            // Validate status
            if (!status.equals("ACTIVE")
                    && !status.equals("INACTIVE")) {

                response.setStatus(
                        HttpServletResponse.SC_BAD_REQUEST
                );

                out.print(
                        "{\"success\":false,"
                        + "\"message\":\"Invalid status.\"}"
                );

                return;
            }


            Testimonial testimonial =
                    new Testimonial(
                            name,
                            role,
                            message,
                            rating,
                            status
                    );


            testimonial.setId(id);


            boolean success =
                    testimonialService.updateTestimonial(
                            testimonial
                    );


            if (success) {

                // Get complete updated testimonial
                Testimonial updatedTestimonial =
                        testimonialService.getTestimonialById(id);


                if (updatedTestimonial != null) {

                    out.print(
                            "{\"success\":true,"
                            + "\"message\":\"Testimonial updated successfully.\","
                            + "\"testimonial\":"
                            + updatedTestimonial.toJson()
                            + "}"
                    );

                } else {

                    response.setStatus(
                            HttpServletResponse.SC_BAD_REQUEST
                    );

                    out.print(
                            "{\"success\":false,"
                            + "\"message\":\"Testimonial updated but could not be retrieved.\"}"
                    );
                }


            } else {

                response.setStatus(
                        HttpServletResponse.SC_BAD_REQUEST
                );

                out.print(
                        "{\"success\":false,"
                        + "\"message\":\"Unable to update testimonial.\"}"
                );
            }


        } catch (Exception e) {

            e.printStackTrace();

            response.setStatus(
                    HttpServletResponse.SC_BAD_REQUEST
            );

            out.print(
                    "{\"success\":false,"
                    + "\"message\":\"Invalid testimonial data.\"}"
            );
        }
    }


    // DELETE
    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        PrintWriter out = response.getWriter();

        try {

            int id =
                    Integer.parseInt(
                            request.getParameter("id")
                    );


            boolean success =
                    testimonialService.deleteTestimonial(id);


            if (success) {

                out.print(
                        "{\"success\":true,"
                        + "\"message\":\"Testimonial deleted successfully.\"}"
                );

            } else {

                response.setStatus(
                        HttpServletResponse.SC_BAD_REQUEST
                );

                out.print(
                        "{\"success\":false,"
                        + "\"message\":\"Unable to delete testimonial.\"}"
                );
            }


        } catch (Exception e) {

            e.printStackTrace();

            response.setStatus(
                    HttpServletResponse.SC_BAD_REQUEST
            );

            out.print(
                    "{\"success\":false,"
                    + "\"message\":\"Invalid testimonial ID.\"}"
            );
        }
    }

}
