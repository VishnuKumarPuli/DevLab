package com.devlab.dao;

import com.devlab.model.Notification;
import com.devlab.util.DBConnection;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class NotificationDAO {

    // =========================================
    // CREATE GENERAL NOTIFICATION
    // Used for admin notifications
    // =========================================

    public boolean createNotification(
            Notification notification
    ) {

        String sql =
                "INSERT INTO notifications " +
                "(user_id, title, message, type, reference_id, is_read) " +
                "VALUES (?, ?, ?, ?, ?, ?)";

        try (
                Connection con =
                        DBConnection.getConnection();

                PreparedStatement ps =
                        con.prepareStatement(sql)
        ) {

            // General/admin notification
            ps.setNull(
                    1,
                    java.sql.Types.INTEGER
            );

            ps.setString(
                    2,
                    notification.getTitle()
            );

            ps.setString(
                    3,
                    notification.getMessage()
            );

            ps.setString(
                    4,
                    notification.getType()
            );

            if (
                    notification.getReferenceId()
                    != null
            ) {

                ps.setInt(
                        5,
                        notification.getReferenceId()
                );

            } else {

                ps.setNull(
                        5,
                        java.sql.Types.INTEGER
                );
            }

            ps.setBoolean(
                    6,
                    false
            );

            return ps.executeUpdate() > 0;

        } catch (Exception e) {

            e.printStackTrace();

            return false;
        }
    }


    // =========================================
    // CREATE CLIENT MESSAGE NOTIFICATION
    // =========================================

    public boolean createClientMessageNotification(
            int userId,
            String title,
            String message
    ) {

        String sql =
                "INSERT INTO notifications " +
                "(user_id, title, message, type, reference_id, is_read) " +
                "VALUES (?, ?, ?, ?, ?, ?)";

        try (
                Connection connection =
                        DBConnection.getConnection();

                PreparedStatement statement =
                        connection.prepareStatement(sql)
        ) {

            // Client ID
            statement.setInt(
                    1,
                    userId
            );

            // Notification title
            statement.setString(
                    2,
                    title
            );

            // Notification message
            statement.setString(
                    3,
                    message
            );

            // Notification type
            statement.setString(
                    4,
                    "message"
            );

            // No reference ID
            statement.setNull(
                    5,
                    java.sql.Types.INTEGER
            );

            // New notification = unread
            statement.setBoolean(
                    6,
                    false
            );

            return statement.executeUpdate() > 0;

        } catch (Exception e) {

            e.printStackTrace();

            return false;
        }
    }


    // =========================================
    // CREATE CLIENT-SPECIFIC NOTIFICATION
    // =========================================

    public boolean createNotificationForUser(
            Notification notification,
            int userId
    ) {

        String sql =
                "INSERT INTO notifications " +
                "(user_id, title, message, type, reference_id, is_read) " +
                "VALUES (?, ?, ?, ?, ?, ?)";

        try (
                Connection con =
                        DBConnection.getConnection();

                PreparedStatement ps =
                        con.prepareStatement(sql)
        ) {

            // Client ID
            ps.setInt(
                    1,
                    userId
            );

            // Title
            ps.setString(
                    2,
                    notification.getTitle()
            );

            // Message
            ps.setString(
                    3,
                    notification.getMessage()
            );

            // Type
            ps.setString(
                    4,
                    notification.getType()
            );

            // Reference ID
            if (
                    notification.getReferenceId()
                    != null
            ) {

                ps.setInt(
                        5,
                        notification.getReferenceId()
                );

            } else {

                ps.setNull(
                        5,
                        java.sql.Types.INTEGER
                );
            }

            // Unread
            ps.setBoolean(
                    6,
                    false
            );

            return ps.executeUpdate() > 0;

        } catch (Exception e) {

            e.printStackTrace();

            return false;
        }
    }


    // =========================================
    // GET ALL NOTIFICATIONS
    // Used by ADMIN
    // =========================================

    public List<Notification> getAllNotifications() {

        List<Notification> notifications =
                new ArrayList<>();

        String sql =
                "SELECT * FROM notifications " +
                "ORDER BY id DESC";

        try (
                Connection con =
                        DBConnection.getConnection();

                PreparedStatement ps =
                        con.prepareStatement(sql);

                ResultSet rs =
                        ps.executeQuery()
        ) {

            while (rs.next()) {

                Notification notification =
                        new Notification();

                notification.setId(
                        rs.getInt("id")
                );

                notification.setTitle(
                        rs.getString("title")
                );

                notification.setMessage(
                        rs.getString("message")
                );

                notification.setType(
                        rs.getString("type")
                );

                int referenceId =
                        rs.getInt("reference_id");

                if (!rs.wasNull()) {

                    notification.setReferenceId(
                            referenceId
                    );
                }

                notification.setRead(
                        rs.getBoolean("is_read")
                );

                notification.setCreatedAt(
                        rs.getTimestamp("created_at")
                );

                notifications.add(
                        notification
                );
            }

        } catch (Exception e) {

            e.printStackTrace();
        }

        return notifications;
    }


    // =========================================
    // GET NOTIFICATIONS BY CLIENT
    // Used by CLIENT
    // =========================================

    public List<Notification> getNotificationsByUser(
            int userId
    ) {

        List<Notification> notifications =
                new ArrayList<>();

        String sql =
                "SELECT * FROM notifications " +
                "WHERE user_id = ? " +
                "ORDER BY created_at DESC";

        try (
                Connection con =
                        DBConnection.getConnection();

                PreparedStatement ps =
                        con.prepareStatement(sql)
        ) {

            ps.setInt(
                    1,
                    userId
            );

            try (
                    ResultSet rs =
                            ps.executeQuery()
            ) {

                while (rs.next()) {

                    Notification notification =
                            new Notification();

                    notification.setId(
                            rs.getInt("id")
                    );

                    notification.setTitle(
                            rs.getString("title")
                    );

                    notification.setMessage(
                            rs.getString("message")
                    );

                    notification.setType(
                            rs.getString("type")
                    );

                    int referenceId =
                            rs.getInt("reference_id");

                    if (!rs.wasNull()) {

                        notification.setReferenceId(
                                referenceId
                        );
                    }

                    notification.setRead(
                            rs.getBoolean("is_read")
                    );

                    notification.setCreatedAt(
                            rs.getTimestamp("created_at")
                    );

                    notifications.add(
                            notification
                    );
                }
            }

        } catch (Exception e) {

            e.printStackTrace();
        }

        return notifications;
    }


    // =========================================
    // MARK ONE NOTIFICATION AS READ
    // =========================================

    public boolean markAsRead(int id) {

        String sql =
                "UPDATE notifications " +
                "SET is_read = TRUE " +
                "WHERE id = ?";

        try (
                Connection con =
                        DBConnection.getConnection();

                PreparedStatement ps =
                        con.prepareStatement(sql)
        ) {

            ps.setInt(
                    1,
                    id
            );

            return ps.executeUpdate() > 0;

        } catch (Exception e) {

            e.printStackTrace();

            return false;
        }
    }


    // =========================================
    // MARK ALL NOTIFICATIONS AS READ
    // =========================================

    public boolean markAllAsRead() {

        String sql =
                "UPDATE notifications " +
                "SET is_read = TRUE " +
                "WHERE is_read = FALSE";

        try (
                Connection con =
                        DBConnection.getConnection();

                PreparedStatement ps =
                        con.prepareStatement(sql)
        ) {

            ps.executeUpdate();

            return true;

        } catch (Exception e) {

            e.printStackTrace();

            return false;
        }
    }


    // =========================================
    // DELETE NOTIFICATION
    // =========================================

    public boolean deleteNotification(int id) {

        String sql =
                "DELETE FROM notifications " +
                "WHERE id = ?";

        try (
                Connection con =
                        DBConnection.getConnection();

                PreparedStatement ps =
                        con.prepareStatement(sql)
        ) {

            ps.setInt(
                    1,
                    id
            );

            return ps.executeUpdate() > 0;

        } catch (Exception e) {

            e.printStackTrace();

            return false;
        }
    }
}