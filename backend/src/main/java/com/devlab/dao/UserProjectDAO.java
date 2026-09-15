package com.devlab.dao;

import com.devlab.model.UserProject;
import com.devlab.util.DBConnection;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class UserProjectDAO {

    public List<UserProject> getProjectsByClient(String client) {

        List<UserProject> projects = new ArrayList<>();

        String sql = "SELECT id, name, client, status, progress, amount, created_at " +
                     "FROM projects " +
                     "WHERE client = ? " +
                     "ORDER BY created_at DESC";

        try (
            Connection connection = DBConnection.getConnection();
            PreparedStatement statement = connection.prepareStatement(sql)
        ) {

            statement.setString(1, client);

            try (ResultSet resultSet = statement.executeQuery()) {

                while (resultSet.next()) {

                    UserProject project = new UserProject();

                    project.setId(resultSet.getInt("id"));
                    project.setName(resultSet.getString("name"));
                    project.setClient(resultSet.getString("client"));
                    project.setStatus(resultSet.getString("status"));
                    project.setProgress(resultSet.getInt("progress"));
                    project.setAmount(resultSet.getString("amount"));

                    Timestamp createdAt =
                            resultSet.getTimestamp("created_at");

                    if (createdAt != null) {
                        project.setCreatedAt(createdAt.toString());
                    }

                    projects.add(project);
                }
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return projects;
    }
}