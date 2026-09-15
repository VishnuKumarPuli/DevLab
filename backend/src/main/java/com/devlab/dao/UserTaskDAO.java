package com.devlab.dao;

import com.devlab.model.Task;
import com.devlab.util.DBConnection;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class UserTaskDAO {

    public List<Task> getTasksByClient(String client) {

        List<Task> tasks = new ArrayList<>();

        String sql =
                "SELECT t.id, t.project_id, t.title, t.description, " +
                "t.assigned_to, t.status, t.priority, t.due_date, " +
                "t.created_at " +
                "FROM tasks t " +
                "INNER JOIN projects p ON t.project_id = p.id " +
                "WHERE p.client = ? " +
                "ORDER BY t.due_date ASC";

        try (
            Connection connection = DBConnection.getConnection();
            PreparedStatement statement =
                    connection.prepareStatement(sql)
        ) {

            statement.setString(1, client);

            try (ResultSet resultSet = statement.executeQuery()) {

                while (resultSet.next()) {

                    Task task = new Task();

                    task.setId(resultSet.getInt("id"));
                    task.setProjectId(resultSet.getInt("project_id"));
                    task.setTitle(resultSet.getString("title"));
                    task.setDescription(
                            resultSet.getString("description")
                    );
                    task.setAssignedTo(
                            resultSet.getString("assigned_to")
                    );
                    task.setStatus(
                            resultSet.getString("status")
                    );
                    task.setPriority(
                            resultSet.getString("priority")
                    );

                    Date dueDate = resultSet.getDate("due_date");

                    if (dueDate != null) {
                        task.setDueDate(dueDate.toString());
                    }

                    Timestamp createdAt =
                            resultSet.getTimestamp("created_at");

                    if (createdAt != null) {
                        task.setCreatedAt(createdAt.toString());
                    }

                    tasks.add(task);
                }
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return tasks;
    }
}