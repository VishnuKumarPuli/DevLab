
package com.devlab.dao;

import com.devlab.model.User;
import com.devlab.util.DBConnection;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class UserDAO {

    // ==========================================
    // Register User
    // ==========================================

    public boolean registerUser(User user) {

        String sql = "INSERT INTO users " +
                     "(name, email, password, phone, company) " +
                     "VALUES (?, ?, ?, ?, ?)";

        try (
            Connection connection = DBConnection.getConnection();

            PreparedStatement statement =
                    connection.prepareStatement(sql)

        ) {

            statement.setString(1, user.getName());
            statement.setString(2, user.getEmail());
            statement.setString(3, user.getPassword());
            statement.setString(4, user.getPhone());
            statement.setString(5, user.getCompany());

            int rows = statement.executeUpdate();

            return rows > 0;

        } catch (Exception e) {

            e.printStackTrace();

            return false;

        }

    }


    // ==========================================
    // Find User By Email
    // ==========================================

    public User getUserByEmail(String email) {

        String sql = "SELECT * FROM users WHERE email = ?";

        try (
            Connection connection = DBConnection.getConnection();

            PreparedStatement statement =
                    connection.prepareStatement(sql)

        ) {

            statement.setString(1, email);

            ResultSet resultSet =
                    statement.executeQuery();

            if (resultSet.next()) {

                User user = new User();

                user.setId(
                    resultSet.getInt("id")
                );

                user.setName(
                    resultSet.getString("name")
                );

                user.setEmail(
                    resultSet.getString("email")
                );

                user.setPassword(
                    resultSet.getString("password")
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

                return user;

            }

        } catch (Exception e) {

            e.printStackTrace();

        }

        return null;

    }


    // ==========================================
    // Check Email Exists
    // ==========================================

    public boolean emailExists(String email) {

        String sql =
                "SELECT id FROM users WHERE email = ?";

        try (
            Connection connection = DBConnection.getConnection();

            PreparedStatement statement =
                    connection.prepareStatement(sql)

        ) {

            statement.setString(1, email);

            ResultSet resultSet =
                    statement.executeQuery();

            return resultSet.next();

        } catch (Exception e) {

            e.printStackTrace();

            return false;

        }

    }


    // ==========================================
    // Get All Users
    // ==========================================

    public List<User> getAllUsers() {

        List<User> users = new ArrayList<>();

        String sql =
                "SELECT * FROM users ORDER BY id DESC";

        try (
            Connection connection = DBConnection.getConnection();

            PreparedStatement statement =
                    connection.prepareStatement(sql);

            ResultSet resultSet =
                    statement.executeQuery()

        ) {

            while (resultSet.next()) {

                User user = new User();

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

                users.add(user);

            }

        } catch (Exception e) {

            e.printStackTrace();

        }

        return users;

    }

}
