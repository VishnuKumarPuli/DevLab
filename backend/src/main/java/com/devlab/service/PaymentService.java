package com.devlab.service;

import com.devlab.dao.PaymentDAO;
import com.devlab.model.Payment;

import java.util.List;

public class PaymentService {

    private final PaymentDAO paymentDAO;


    public PaymentService() {

        paymentDAO = new PaymentDAO();
    }


    public boolean addPayment(Payment payment) {

        return paymentDAO.addPayment(payment);
    }


    public List<Payment> getAllPayments() {

        return paymentDAO.getAllPayments();
    }


    public Payment getPaymentById(int id) {

        return paymentDAO.getPaymentById(id);
    }


    public boolean updatePayment(Payment payment) {

        return paymentDAO.updatePayment(payment);
    }


    public boolean deletePayment(int id) {

        return paymentDAO.deletePayment(id);
    }
}