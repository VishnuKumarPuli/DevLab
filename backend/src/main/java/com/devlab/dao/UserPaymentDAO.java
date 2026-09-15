package com.devlab.dao;

import com.devlab.model.Payment;
import com.devlab.util.DBConnection;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class UserPaymentDAO {

    public List<Payment> getPaymentsByClient(String client) {

        List<Payment> payments = new ArrayList<>();

        String sql =
                "SELECT id, payment_id, project_id, client, type, " +
                "amount, status, payment_date, created_at " +
                "FROM payments " +
                "WHERE client = ? " +
                "ORDER BY payment_date DESC, created_at DESC";

        try (
            Connection connection = DBConnection.getConnection();
            PreparedStatement statement =
                    connection.prepareStatement(sql)
        ) {

            statement.setString(1, client);

            try (ResultSet resultSet = statement.executeQuery()) {

                while (resultSet.next()) {

                    Payment payment = new Payment();

                    payment.setId(resultSet.getInt("id"));

                    payment.setPaymentId(
                            resultSet.getString("payment_id")
                    );

                    payment.setProjectId(
                            resultSet.getInt("project_id")
                    );

                    payment.setClient(
                            resultSet.getString("client")
                    );

                    payment.setType(
                            resultSet.getString("type")
                    );

                    payment.setAmount(
                            resultSet.getDouble("amount")
                    );

                    payment.setStatus(
                            resultSet.getString("status")
                    );

                    Date paymentDate =
                            resultSet.getDate("payment_date");

                    if (paymentDate != null) {
                        payment.setPaymentDate(
                                paymentDate.toString()
                        );
                    }

                    Timestamp createdAt =
                            resultSet.getTimestamp("created_at");

                    if (createdAt != null) {
                        payment.setCreatedAt(
                                createdAt.toString()
                        );
                    }

                    payments.add(payment);
                }
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return payments;
    }
}