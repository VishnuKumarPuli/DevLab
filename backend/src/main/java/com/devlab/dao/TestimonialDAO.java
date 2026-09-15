
package com.devlab.dao;

import com.devlab.model.Testimonial;
import com.devlab.util.DBConnection;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class TestimonialDAO {

    // Get all testimonials
    public List<Testimonial> getAllTestimonials() {

        List<Testimonial> testimonials = new ArrayList<>();

        String sql = "SELECT * FROM testimonials ORDER BY id DESC";

        try (Connection connection = DBConnection.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql);
             ResultSet resultSet = statement.executeQuery()) {

            while (resultSet.next()) {

                Testimonial testimonial = new Testimonial();

                testimonial.setId(resultSet.getInt("id"));

                testimonial.setName(resultSet.getString("name"));

                testimonial.setRole(resultSet.getString("role"));

                testimonial.setMessage(resultSet.getString("message"));

                testimonial.setRating(resultSet.getInt("rating"));

                testimonial.setStatus(resultSet.getString("status"));

                Timestamp createdAt = resultSet.getTimestamp("created_at");

                Timestamp updatedAt = resultSet.getTimestamp("updated_at");

                if (createdAt != null) {

                    testimonial.setCreatedAt(createdAt.toString());

                }

                if (updatedAt != null) {

                    testimonial.setUpdatedAt(updatedAt.toString());

                }

                testimonials.add(testimonial);

            }

        } catch (SQLException e) {

            e.printStackTrace();

        }

        return testimonials;

    }


    // Get testimonial by ID
    public Testimonial getTestimonialById(int id) {

        Testimonial testimonial = null;

        String sql = "SELECT * FROM testimonials WHERE id = ?";

        try (Connection connection = DBConnection.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {

            statement.setInt(1, id);

            try (ResultSet resultSet = statement.executeQuery()) {

                if (resultSet.next()) {

                    testimonial = new Testimonial();

                    testimonial.setId(resultSet.getInt("id"));

                    testimonial.setName(resultSet.getString("name"));

                    testimonial.setRole(resultSet.getString("role"));

                    testimonial.setMessage(resultSet.getString("message"));

                    testimonial.setRating(resultSet.getInt("rating"));

                    testimonial.setStatus(resultSet.getString("status"));

                    Timestamp createdAt = resultSet.getTimestamp("created_at");

                    Timestamp updatedAt = resultSet.getTimestamp("updated_at");

                    if (createdAt != null) {

                        testimonial.setCreatedAt(createdAt.toString());

                    }

                    if (updatedAt != null) {

                        testimonial.setUpdatedAt(updatedAt.toString());

                    }

                }

            }

        } catch (SQLException e) {

            e.printStackTrace();

        }

        return testimonial;

    }


    // Add testimonial
    public boolean addTestimonial(Testimonial testimonial) {

        String sql = "INSERT INTO testimonials "
                   + "(name, role, message, rating, status) "
                   + "VALUES (?, ?, ?, ?, ?)";

        try (Connection connection = DBConnection.getConnection();
             PreparedStatement statement =
                     connection.prepareStatement(
                             sql,
                             Statement.RETURN_GENERATED_KEYS
                     )) {

            statement.setString(1, testimonial.getName());

            statement.setString(2, testimonial.getRole());

            statement.setString(3, testimonial.getMessage());

            statement.setInt(4, testimonial.getRating());

            statement.setString(5, testimonial.getStatus());

            int rowsAffected = statement.executeUpdate();

            if (rowsAffected > 0) {

                // Get generated testimonial ID
                try (ResultSet resultSet =
                             statement.getGeneratedKeys()) {

                    if (resultSet.next()) {

                        testimonial.setId(
                                resultSet.getInt(1)
                        );

                    }

                }

                return true;

            }

        } catch (SQLException e) {

            e.printStackTrace();

        }

        return false;

    }


    // Update testimonial
    public boolean updateTestimonial(Testimonial testimonial) {

        String sql = "UPDATE testimonials SET "
                   + "name = ?, "
                   + "role = ?, "
                   + "message = ?, "
                   + "rating = ?, "
                   + "status = ? "
                   + "WHERE id = ?";

        try (Connection connection = DBConnection.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {

            statement.setString(1, testimonial.getName());

            statement.setString(2, testimonial.getRole());

            statement.setString(3, testimonial.getMessage());

            statement.setInt(4, testimonial.getRating());

            statement.setString(5, testimonial.getStatus());

            statement.setInt(6, testimonial.getId());

            int rowsAffected = statement.executeUpdate();

            return rowsAffected > 0;

        } catch (SQLException e) {

            e.printStackTrace();

        }

        return false;

    }


    // Delete testimonial
    public boolean deleteTestimonial(int id) {

        String sql = "DELETE FROM testimonials WHERE id = ?";

        try (Connection connection = DBConnection.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {

            statement.setInt(1, id);

            int rowsAffected = statement.executeUpdate();

            return rowsAffected > 0;

        } catch (SQLException e) {

            e.printStackTrace();

        }

        return false;

    }


    // Enable / Disable testimonial
    public boolean updateStatus(int id, String status) {

        String sql = "UPDATE testimonials SET status = ? WHERE id = ?";

        try (Connection connection = DBConnection.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {

            statement.setString(1, status);

            statement.setInt(2, id);

            int rowsAffected = statement.executeUpdate();

            return rowsAffected > 0;

        } catch (SQLException e) {

            e.printStackTrace();

        }

        return false;

    }

}
