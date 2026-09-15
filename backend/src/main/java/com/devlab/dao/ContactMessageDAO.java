package com.devlab.dao;

import com.devlab.model.ContactMessage;
import com.devlab.util.DBConnection;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class ContactMessageDAO {

    // Save a new message
    public boolean saveMessage(ContactMessage message) {

        String sql = "INSERT INTO contact_messages " +
                     "(name, email, subject, message, status) " +
                     "VALUES (?, ?, ?, ?, ?)";

        try (Connection con = DBConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setString(1, message.getName());
            ps.setString(2, message.getEmail());
            ps.setString(3, message.getSubject());
            ps.setString(4, message.getMessage());
            ps.setString(5, message.getStatus());

            int rows = ps.executeUpdate();

            return rows > 0;

        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }


    // Fetch all messages
    public List<ContactMessage> getAllMessages() {

        List<ContactMessage> messages = new ArrayList<>();

        String sql = "SELECT * FROM contact_messages ORDER BY created_at DESC";

        try (Connection con = DBConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {

                ContactMessage message = new ContactMessage();

                message.setId(rs.getInt("id"));
                message.setName(rs.getString("name"));
                message.setEmail(rs.getString("email"));
                message.setSubject(rs.getString("subject"));
                message.setMessage(rs.getString("message"));
                message.setStatus(rs.getString("status"));
                message.setCreatedAt(rs.getTimestamp("created_at"));

                messages.add(message);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return messages;
    }


    // Fetch message by ID
    public ContactMessage getMessageById(int id) {

        String sql = "SELECT * FROM contact_messages WHERE id = ?";

        try (Connection con = DBConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setInt(1, id);

            try (ResultSet rs = ps.executeQuery()) {

                if (rs.next()) {

                    ContactMessage message = new ContactMessage();

                    message.setId(rs.getInt("id"));
                    message.setName(rs.getString("name"));
                    message.setEmail(rs.getString("email"));
                    message.setSubject(rs.getString("subject"));
                    message.setMessage(rs.getString("message"));
                    message.setStatus(rs.getString("status"));
                    message.setCreatedAt(rs.getTimestamp("created_at"));

                    return message;
                }
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return null;
    }


    // Update message status
    public boolean updateStatus(int id, String status) {

        String sql = "UPDATE contact_messages SET status = ? WHERE id = ?";

        try (Connection con = DBConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setString(1, status);
            ps.setInt(2, id);

            int rows = ps.executeUpdate();

            return rows > 0;

        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }


    // Delete message
    public boolean deleteMessage(int id) {

        String sql = "DELETE FROM contact_messages WHERE id = ?";

        try (Connection con = DBConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setInt(1, id);

            int rows = ps.executeUpdate();

            return rows > 0;

        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }
}