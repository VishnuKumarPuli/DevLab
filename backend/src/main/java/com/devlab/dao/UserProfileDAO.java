package com.devlab.dao;

import com.devlab.model.User;
import com.devlab.util.DBConnection;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class UserProfileDAO {

    // ==========================================
    // GET USER PROFILE
    // ==========================================

    public User getUserProfile(int userId) {

        User user = null;

        String sql =
                "SELECT id, name, email, phone, company, created_at " +
                "FROM users " +
                "WHERE id = ?";

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

                if (resultSet.next()) {

                    user = new User();

                    user.setId(
                            resultSet.getInt("id")
                    );

                    user.setName(
                            resultSet.getString("name")
                    );

                    user.setEmail(
                            resultSet.getString("email")
                    );

                    user.setPhone(
                            resultSet.getString("phone")
                    );

                    user.setCompany(
                            resultSet.getString("company")
                    );

                    user.setCreatedAt(
                    		  resultSet.getString("created_at")
                    );
                }
            }

        } catch (Exception e) {

            e.printStackTrace();
        }

        return user;
    }


    // ==========================================
    // UPDATE USER PROFILE
    // ==========================================

    public boolean updateUserProfile(
            int userId,
            String name,
            String phone,
            String company
    ) {

        String sql =
                "UPDATE users " +
                "SET name = ?, phone = ?, company = ? " +
                "WHERE id = ?";

        try (
                Connection connection =
                        DBConnection.getConnection();

                PreparedStatement statement =
                        connection.prepareStatement(sql)
        ) {

            statement.setString(1, name);
            statement.setString(2, phone);
            statement.setString(3, company);
            statement.setInt(4, userId);

            return statement.executeUpdate() > 0;

        } catch (Exception e) {

            e.printStackTrace();

            return false;
        }
    }
}