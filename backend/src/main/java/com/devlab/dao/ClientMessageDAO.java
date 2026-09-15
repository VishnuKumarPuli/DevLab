
package com.devlab.dao;

import com.devlab.model.ClientMessage;
import com.devlab.util.DBConnection;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class ClientMessageDAO {

    // =========================================================
    // SEND MESSAGE TO CLIENT
    // =========================================================

    public boolean createMessage(ClientMessage clientMessage) {

        String sql =
                "INSERT INTO client_messages " +
                "(user_id, subject, message, is_read) " +
                "VALUES (?, ?, ?, ?)";

        try (
                Connection connection =
                		DBConnection.getConnection();

                PreparedStatement statement =
                        connection.prepareStatement(sql)
        ) {

            statement.setInt(
                    1,
                    clientMessage.getUserId()
            );

            statement.setString(
                    2,
                    clientMessage.getSubject()
            );

            statement.setString(
                    3,
                    clientMessage.getMessage()
            );

            statement.setBoolean(
                    4,
                    false
            );

            return statement.executeUpdate() > 0;

        } catch (Exception e) {

            e.printStackTrace();

            return false;
        }
    }

    // =========================================================
    // GET MESSAGES FOR ONE CLIENT
    // =========================================================

    public List<ClientMessage> getMessagesByUser(int userId) {

        List<ClientMessage> messages =
                new ArrayList<>();

        String sql =
                "SELECT * FROM client_messages " +
                "WHERE user_id = ? " +
                "ORDER BY created_at DESC";

        try (
                Connection connection =
                        DBConnection.getConnection();

                PreparedStatement statement =
                        connection.prepareStatement(sql)
        ) {

            statement.setInt(
                    1,
                    userId
            );

            try (
                    ResultSet resultSet =
                            statement.executeQuery()
            ) {

                while (resultSet.next()) {

                    ClientMessage clientMessage =
                            new ClientMessage();

                    clientMessage.setId(
                            resultSet.getInt("id")
                    );

                    clientMessage.setUserId(
                            resultSet.getInt("user_id")
                    );

                    clientMessage.setSubject(
                            resultSet.getString("subject")
                    );

                    clientMessage.setMessage(
                            resultSet.getString("message")
                    );

                    clientMessage.setRead(
                            resultSet.getBoolean("is_read")
                    );

                    clientMessage.setCreatedAt(
                            resultSet.getTimestamp("created_at")
                    );

                    messages.add(clientMessage);
                }
            }

        } catch (Exception e) {

            e.printStackTrace();
        }

        return messages;
    }

    // =========================================================
    // MARK MESSAGE AS READ
    // =========================================================

    public boolean markAsRead(int id, int userId) {

        String sql =
                "UPDATE client_messages " +
                "SET is_read = TRUE " +
                "WHERE id = ? AND user_id = ?";

        try (
                Connection connection =
                        DBConnection.getConnection();

                PreparedStatement statement =
                        connection.prepareStatement(sql)
        ) {

            statement.setInt(1, id);
            statement.setInt(2, userId);

            return statement.executeUpdate() > 0;

        } catch (Exception e) {

            e.printStackTrace();

            return false;
        }
    }
}
