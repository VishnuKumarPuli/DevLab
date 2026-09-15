package com.devlab.dao;

import com.devlab.model.Admin;
import com.devlab.util.DBConnection;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class AuthDAO {

    public Admin login(String email, String password) {

        Admin admin = null;

        String sql =
                "SELECT id, name, email, password " +
                "FROM admins " +
                "WHERE email = ? AND password = ?";

        try (
            Connection connection = DBConnection.getConnection();
            PreparedStatement statement =
                    connection.prepareStatement(sql)
        ) {

            statement.setString(1, email);
            statement.setString(2, password);

            ResultSet resultSet = statement.executeQuery();

            if (resultSet.next()) {

                admin = new Admin();

                admin.setId(resultSet.getInt("id"));
                admin.setName(resultSet.getString("name"));
                admin.setEmail(resultSet.getString("email"));
                admin.setPassword(resultSet.getString("password"));
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return admin;
    }
}