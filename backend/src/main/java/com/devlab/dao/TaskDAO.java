package com.devlab.dao;

import com.devlab.model.Task;
import com.devlab.util.DBConnection;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class TaskDAO {


    // =========================================================
    // ADD TASK
    // =========================================================

    public boolean addTask(Task task) {

        String sql =
                "INSERT INTO tasks " +
                "(project_id, title, description, assigned_to, status, priority, due_date) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?)";


        try (
                Connection connection =
                        DBConnection.getConnection();

                PreparedStatement statement =
                        connection.prepareStatement(sql)
        ) {

            statement.setInt(
                    1,
                    task.getProjectId()
            );

            statement.setString(
                    2,
                    task.getTitle()
            );

            statement.setString(
                    3,
                    task.getDescription()
            );

            statement.setString(
                    4,
                    task.getAssignedTo()
            );

            statement.setString(
                    5,
                    task.getStatus()
            );

            statement.setString(
                    6,
                    task.getPriority()
            );

            if (task.getDueDate() == null ||
                    task.getDueDate().isEmpty()) {

                statement.setDate(
                        7,
                        null
                );

            } else {

                statement.setDate(
                        7,
                        Date.valueOf(
                                task.getDueDate()
                        )
                );
            }


            return statement.executeUpdate() > 0;

        } catch (Exception e) {

            e.printStackTrace();

            return false;
        }
    }


    // =========================================================
    // GET ALL TASKS
    // =========================================================

    public List<Task> getAllTasks() {

        List<Task> tasks =
                new ArrayList<>();


        String sql =
                "SELECT t.*, p.name AS project_name " +
                "FROM tasks t " +
                "LEFT JOIN projects p " +
                "ON t.project_id = p.id " +
                "ORDER BY t.id DESC";


        try (
                Connection connection =
                        DBConnection.getConnection();

                PreparedStatement statement =
                        connection.prepareStatement(sql);

                ResultSet rs =
                        statement.executeQuery()
        ) {


            while (rs.next()) {

                Task task =
                        new Task(
                                rs.getInt("id"),
                                rs.getInt("project_id"),
                                rs.getString("project_name"),
                                rs.getString("title"),
                                rs.getString("description"),
                                rs.getString("assigned_to"),
                                rs.getString("status"),
                                rs.getString("priority"),
                                rs.getString("due_date"),
                                rs.getString("created_at")
                        );


                tasks.add(task);
            }

        } catch (Exception e) {

            e.printStackTrace();
        }


        return tasks;
    }


    // =========================================================
    // GET TASK BY ID
    // =========================================================

    public Task getTaskById(int id) {

        String sql =
                "SELECT t.*, p.name AS project_name " +
                "FROM tasks t " +
                "LEFT JOIN projects p " +
                "ON t.project_id = p.id " +
                "WHERE t.id = ?";


        try (
                Connection connection =
                        DBConnection.getConnection();

                PreparedStatement statement =
                        connection.prepareStatement(sql)
        ) {

            statement.setInt(
                    1,
                    id
            );


            try (
                    ResultSet rs =
                            statement.executeQuery()
            ) {

                if (rs.next()) {

                    return new Task(
                            rs.getInt("id"),
                            rs.getInt("project_id"),
                            rs.getString("project_name"),
                            rs.getString("title"),
                            rs.getString("description"),
                            rs.getString("assigned_to"),
                            rs.getString("status"),
                            rs.getString("priority"),
                            rs.getString("due_date"),
                            rs.getString("created_at")
                    );
                }
            }

        } catch (Exception e) {

            e.printStackTrace();
        }


        return null;
    }


    // =========================================================
    // UPDATE TASK
    // =========================================================

    public boolean updateTask(Task task) {

        String sql =
                "UPDATE tasks SET " +
                "project_id = ?, " +
                "title = ?, " +
                "description = ?, " +
                "assigned_to = ?, " +
                "status = ?, " +
                "priority = ?, " +
                "due_date = ? " +
                "WHERE id = ?";


        try (
                Connection connection =
                        DBConnection.getConnection();

                PreparedStatement statement =
                        connection.prepareStatement(sql)
        ) {

            statement.setInt(
                    1,
                    task.getProjectId()
            );

            statement.setString(
                    2,
                    task.getTitle()
            );

            statement.setString(
                    3,
                    task.getDescription()
            );

            statement.setString(
                    4,
                    task.getAssignedTo()
            );

            statement.setString(
                    5,
                    task.getStatus()
            );

            statement.setString(
                    6,
                    task.getPriority()
            );


            if (task.getDueDate() == null ||
                    task.getDueDate().isEmpty()) {

                statement.setDate(
                        7,
                        null
                );

            } else {

                statement.setDate(
                        7,
                        Date.valueOf(
                                task.getDueDate()
                        )
                );
            }


            statement.setInt(
                    8,
                    task.getId()
            );


            return statement.executeUpdate() > 0;

        } catch (Exception e) {

            e.printStackTrace();

            return false;
        }
    }


    // =========================================================
    // DELETE TASK
    // =========================================================

    public boolean deleteTask(int id) {

        String sql =
                "DELETE FROM tasks WHERE id = ?";


        try (
                Connection connection =
                        DBConnection.getConnection();

                PreparedStatement statement =
                        connection.prepareStatement(sql)
        ) {

            statement.setInt(
                    1,
                    id
            );


            return statement.executeUpdate() > 0;

        } catch (Exception e) {

            e.printStackTrace();

            return false;
        }
    }
}