package com.devlab.controller;

import com.devlab.model.Payment;
import com.devlab.service.PaymentService;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

@WebServlet("/api/payments")
public class PaymentServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;

    private PaymentService paymentService;


    @Override
    public void init() throws ServletException {

        paymentService =
                new PaymentService();
    }


    // =========================================================
    // GET
    // =========================================================

    @Override
    protected void doGet(
            HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        PrintWriter out =
                response.getWriter();


        String idParam =
                request.getParameter("id");


        if (idParam != null &&
                !idParam.isEmpty()) {

            try {

                int id =
                        Integer.parseInt(idParam);


                Payment payment =
                        paymentService
                                .getPaymentById(id);


                if (payment != null) {

                    out.print(
                            payment.toJson()
                    );

                } else {

                    response.setStatus(
                            HttpServletResponse
                                    .SC_NOT_FOUND
                    );

                    out.print(
                            "{\"success\":false,\"message\":\"Payment not found.\"}"
                    );
                }

            } catch (NumberFormatException e) {

                response.setStatus(
                        HttpServletResponse
                                .SC_BAD_REQUEST
                );

                out.print(
                        "{\"success\":false,\"message\":\"Invalid payment ID.\"}"
                );
            }

            return;
        }


        List<Payment> payments =
                paymentService
                        .getAllPayments();


        StringBuilder json =
                new StringBuilder("[");


        for (
                int i = 0;
                i < payments.size();
                i++
        ) {

            json.append(
                    payments
                            .get(i)
                            .toJson()
            );


            if (
                    i <
                    payments.size() - 1
            ) {

                json.append(",");
            }
        }


        json.append("]");


        out.print(
                json.toString()
        );
    }


    // =========================================================
    // POST
    // =========================================================

    @Override
    protected void doPost(
            HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        PrintWriter out =
                response.getWriter();


        try {

            String paymentId =
                    request.getParameter(
                            "paymentId"
                    );


            int projectId =
                    Integer.parseInt(
                            request.getParameter(
                                    "projectId"
                            )
                    );


            String client =
                    request.getParameter(
                            "client"
                    );


            String type =
                    request.getParameter(
                            "type"
                    );


            double amount =
                    Double.parseDouble(
                            request.getParameter(
                                    "amount"
                            )
                    );


            String status =
                    request.getParameter(
                            "status"
                    );


            String paymentDate =
                    request.getParameter(
                            "paymentDate"
                    );


            Payment payment =
                    new Payment(
                            paymentId,
                            projectId,
                            client,
                            type,
                            amount,
                            status,
                            paymentDate
                    );


            boolean success =
                    paymentService
                            .addPayment(
                                    payment
                            );


            if (success) {

                out.print(
                        "{\"success\":true,\"message\":\"Payment added successfully.\"}"
                );

            } else {

                response.setStatus(
                        HttpServletResponse
                                .SC_BAD_REQUEST
                );

                out.print(
                        "{\"success\":false,\"message\":\"Unable to add payment.\"}"
                );
            }

        } catch (Exception e) {

            e.printStackTrace();

            response.setStatus(
                    HttpServletResponse
                            .SC_BAD_REQUEST
            );

            out.print(
                    "{\"success\":false,\"message\":\"Invalid payment data.\"}"
            );
        }
    }


    // =========================================================
    // PUT
    // =========================================================

    @Override
    protected void doPut(
            HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        PrintWriter out =
                response.getWriter();


        try {

            int id =
                    Integer.parseInt(
                            request.getParameter(
                                    "id"
                            )
                    );


            String paymentId =
                    request.getParameter(
                            "paymentId"
                    );


            int projectId =
                    Integer.parseInt(
                            request.getParameter(
                                    "projectId"
                            )
                    );


            String client =
                    request.getParameter(
                            "client"
                    );


            String type =
                    request.getParameter(
                            "type"
                    );


            double amount =
                    Double.parseDouble(
                            request.getParameter(
                                    "amount"
                            )
                    );


            String status =
                    request.getParameter(
                            "status"
                    );


            String paymentDate =
                    request.getParameter(
                            "paymentDate"
                    );


            Payment payment =
                    new Payment(
                            paymentId,
                            projectId,
                            client,
                            type,
                            amount,
                            status,
                            paymentDate
                    );


            payment.setId(id);


            boolean success =
                    paymentService
                            .updatePayment(
                                    payment
                            );


            if (success) {

                out.print(
                        "{\"success\":true,\"message\":\"Payment updated successfully.\"}"
                );

            } else {

                response.setStatus(
                        HttpServletResponse
                                .SC_BAD_REQUEST
                );

                out.print(
                        "{\"success\":false,\"message\":\"Unable to update payment.\"}"
                );
            }

        } catch (Exception e) {

            e.printStackTrace();

            response.setStatus(
                    HttpServletResponse
                            .SC_BAD_REQUEST
            );

            out.print(
                    "{\"success\":false,\"message\":\"Invalid payment data.\"}"
            );
        }
    }


    // =========================================================
    // DELETE
    // =========================================================

    @Override
    protected void doDelete(
            HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        PrintWriter out =
                response.getWriter();


        try {

            int id =
                    Integer.parseInt(
                            request.getParameter(
                                    "id"
                            )
                    );


            boolean success =
                    paymentService
                            .deletePayment(id);


            if (success) {

                out.print(
                        "{\"success\":true,\"message\":\"Payment deleted successfully.\"}"
                );

            } else {

                response.setStatus(
                        HttpServletResponse
                                .SC_BAD_REQUEST
                );

                out.print(
                        "{\"success\":false,\"message\":\"Unable to delete payment.\"}"
                );
            }

        } catch (Exception e) {

            e.printStackTrace();

            response.setStatus(
                    HttpServletResponse
                            .SC_BAD_REQUEST
            );

            out.print(
                    "{\"success\":false,\"message\":\"Invalid payment ID.\"}"
            );
        }
    }
}