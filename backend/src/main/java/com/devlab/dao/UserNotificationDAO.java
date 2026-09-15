package com.devlab.dao;

import com.devlab.model.Notification;
import com.devlab.util.DBConnection;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class UserNotificationDAO {


    // =========================================================
    // GET NOTIFICATIONS FOR LOGGED-IN USER
    // =========================================================

    public List<Notification> getNotificationsByUser(int userId) {

        List<Notification> notifications =
                new ArrayList<>();

        String sql =
                "SELECT id, user_id, title, message, type, reference_id, " +
                "is_read, created_at " +
                "FROM notifications " +
                "WHERE user_id = ? " +
                "ORDER BY created_at DESC";

        try (
                Connection connection =
                        DBConnection.getConnection();

                PreparedStatement statement =
                        connection.prepareStatement(sql)
        ) {

            statement.setInt(1, userId);

            try (
                    ResultSet resultSet =
                            statement.executeQuery()
            ) {

                while (resultSet.next()) {

                    Notification notification =
                            new Notification();

                    notification.setId(
                            resultSet.getInt("id")
                    );

                    notification.setTitle(
                            resultSet.getString("title")
                    );

                    notification.setMessage(
                            resultSet.getString("message")
                    );

                    notification.setType(
                            resultSet.getString("type")
                    );


                    // Handle NULL reference_id correctly

                    int referenceId =
                            resultSet.getInt("reference_id");

                    if (!resultSet.wasNull()) {

                        notification.setReferenceId(
                                referenceId
                        );
                    }


                    notification.setRead(
                            resultSet.getBoolean("is_read")
                    );

                    notification.setCreatedAt(
                            resultSet.getTimestamp(
                                    "created_at"
                            )
                    );

                    notifications.add(
                            notification
                    );
                }
            }

        } catch (SQLException e) {

            e.printStackTrace();
        }

        return notifications;
    }


    // =========================================================
    // MARK NOTIFICATION AS READ
    // =========================================================

    public boolean markAsRead(
            int notificationId,
            int userId
    ) {

        String sql =
                "UPDATE notifications " +
                "SET is_read = TRUE " +
                "WHERE id = ? " +
                "AND user_id = ? " +
                "AND is_read = FALSE";

        try (
                Connection connection =
                        DBConnection.getConnection();

                PreparedStatement statement =
                        connection.prepareStatement(sql)
        ) {

            statement.setInt(
                    1,
                    notificationId
            );

            statement.setInt(
                    2,
                    userId
            );

            int rowsUpdated =
                    statement.executeUpdate();

            return rowsUpdated > 0;

        } catch (SQLException e) {

            e.printStackTrace();

            return false;
        }
    }
}