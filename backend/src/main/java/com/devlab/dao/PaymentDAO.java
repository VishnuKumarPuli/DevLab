package com.devlab.dao;

import com.devlab.model.Payment;
import com.devlab.util.DBConnection;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class PaymentDAO {


    // =========================================================
    // ADD PAYMENT
    // =========================================================

    public boolean addPayment(Payment payment) {

        String sql =
                "INSERT INTO payments " +
                "(payment_id, project_id, client, type, amount, status, payment_date) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?)";


        try (
                Connection connection =
                        DBConnection.getConnection();

                PreparedStatement statement =
                        connection.prepareStatement(sql)
        ) {

            statement.setString(
                    1,
                    payment.getPaymentId()
            );

            statement.setInt(
                    2,
                    payment.getProjectId()
            );

            statement.setString(
                    3,
                    payment.getClient()
            );

            statement.setString(
                    4,
                    payment.getType()
            );

            statement.setDouble(
                    5,
                    payment.getAmount()
            );

            statement.setString(
                    6,
                    payment.getStatus()
            );


            if (payment.getPaymentDate() == null ||
                    payment.getPaymentDate().isEmpty()) {

                statement.setDate(
                        7,
                        null
                );

            } else {

                statement.setDate(
                        7,
                        Date.valueOf(
                                payment.getPaymentDate()
                        )
                );
            }


            return statement.executeUpdate() > 0;

        } catch (Exception e) {

            e.printStackTrace();

            return false;
        }
    }


    // =========================================================
    // GET ALL PAYMENTS
    // =========================================================

    public List<Payment> getAllPayments() {

        List<Payment> payments =
                new ArrayList<>();


        String sql =
                "SELECT p.*, pr.name AS project_name " +
                "FROM payments p " +
                "LEFT JOIN projects pr " +
                "ON p.project_id = pr.id " +
                "ORDER BY p.id DESC";


        try (
                Connection connection =
                        DBConnection.getConnection();

                PreparedStatement statement =
                        connection.prepareStatement(sql);

                ResultSet rs =
                        statement.executeQuery()
        ) {


            while (rs.next()) {

                Payment payment =
                        new Payment(
                                rs.getInt("id"),
                                rs.getString("payment_id"),
                                rs.getInt("project_id"),
                                rs.getString("project_name"),
                                rs.getString("client"),
                                rs.getString("type"),
                                rs.getDouble("amount"),
                                rs.getString("status"),
                                rs.getString("payment_date"),
                                rs.getString("created_at")
                        );


                payments.add(payment);
            }

        } catch (Exception e) {

            e.printStackTrace();
        }


        return payments;
    }


    // =========================================================
    // GET PAYMENT BY ID
    // =========================================================

    public Payment getPaymentById(int id) {

        String sql =
                "SELECT p.*, pr.name AS project_name " +
                "FROM payments p " +
                "LEFT JOIN projects pr " +
                "ON p.project_id = pr.id " +
                "WHERE p.id = ?";


        try (
                Connection connection =
                        DBConnection.getConnection();

                PreparedStatement statement =
                        connection.prepareStatement(sql)
        ) {

            statement.setInt(
                    1,
                    id
            );


            try (
                    ResultSet rs =
                            statement.executeQuery()
            ) {

                if (rs.next()) {

                    return new Payment(
                            rs.getInt("id"),
                            rs.getString("payment_id"),
                            rs.getInt("project_id"),
                            rs.getString("project_name"),
                            rs.getString("client"),
                            rs.getString("type"),
                            rs.getDouble("amount"),
                            rs.getString("status"),
                            rs.getString("payment_date"),
                            rs.getString("created_at")
                    );
                }
            }

        } catch (Exception e) {

            e.printStackTrace();
        }


        return null;
    }


    // =========================================================
    // UPDATE PAYMENT
    // =========================================================

    public boolean updatePayment(Payment payment) {

        String sql =
                "UPDATE payments SET " +
                "payment_id = ?, " +
                "project_id = ?, " +
                "client = ?, " +
                "type = ?, " +
                "amount = ?, " +
                "status = ?, " +
                "payment_date = ? " +
                "WHERE id = ?";


        try (
                Connection connection =
                        DBConnection.getConnection();

                PreparedStatement statement =
                        connection.prepareStatement(sql)
        ) {

            statement.setString(
                    1,
                    payment.getPaymentId()
            );

            statement.setInt(
                    2,
                    payment.getProjectId()
            );

            statement.setString(
                    3,
                    payment.getClient()
            );

            statement.setString(
                    4,
                    payment.getType()
            );

            statement.setDouble(
                    5,
                    payment.getAmount()
            );

            statement.setString(
                    6,
                    payment.getStatus()
            );


            if (payment.getPaymentDate() == null ||
                    payment.getPaymentDate().isEmpty()) {

                statement.setDate(
                        7,
                        null
                );

            } else {

                statement.setDate(
                        7,
                        Date.valueOf(
                                payment.getPaymentDate()
                        )
                );
            }


            statement.setInt(
                    8,
                    payment.getId()
            );


            return statement.executeUpdate() > 0;

        } catch (Exception e) {

            e.printStackTrace();

            return false;
        }
    }


    // =========================================================
    // DELETE PAYMENT
    // =========================================================

    public boolean deletePayment(int id) {

        String sql =
                "DELETE FROM payments WHERE id = ?";


        try (
                Connection connection =
                        DBConnection.getConnection();

                PreparedStatement statement =
                        connection.prepareStatement(sql)
        ) {

            statement.setInt(
                    1,
                    id
            );


            return statement.executeUpdate() > 0;

        } catch (Exception e) {

            e.printStackTrace();

            return false;
        }
    }
}