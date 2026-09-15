package com.devlab.dao;

import com.devlab.model.Project;
import com.devlab.util.DBConnection;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import java.util.ArrayList;
import java.util.List;

public class ProjectDAO {


    // =========================================================
    // ADD PROJECT
    // =========================================================

    public boolean addProject(Project project) {

        String sql =
                "INSERT INTO projects " +
                "(name, client, status, progress, amount) " +
                "VALUES (?, ?, ?, ?, ?)";

        try (
                Connection connection =
                        DBConnection.getConnection();

                PreparedStatement statement =
                        connection.prepareStatement(sql)
        ) {

            statement.setString(
                    1,
                    project.getName()
            );

            statement.setString(
                    2,
                    project.getClient()
            );

            statement.setString(
                    3,
                    project.getStatus()
            );

            statement.setInt(
                    4,
                    project.getProgress()
            );

            statement.setString(
                    5,
                    project.getAmount()
            );

            int rows =
                    statement.executeUpdate();

            return rows > 0;

        } catch (SQLException e) {

            e.printStackTrace();

            return false;
        }
    }


    // =========================================================
    // GET ALL PROJECTS
    // =========================================================

    public List<Project> getAllProjects() {

        List<Project> projects =
                new ArrayList<>();

        String sql =
                "SELECT id, name, client, status, " +
                "progress, amount, created_at " +
                "FROM projects " +
                "ORDER BY id DESC";

        try (
                Connection connection =
                        DBConnection.getConnection();

                PreparedStatement statement =
                        connection.prepareStatement(sql);

                ResultSet resultSet =
                        statement.executeQuery()
        ) {

            while (resultSet.next()) {

                Project project =
                        new Project();

                project.setId(
                        resultSet.getInt("id")
                );

                project.setName(
                        resultSet.getString("name")
                );

                project.setClient(
                        resultSet.getString("client")
                );

                project.setStatus(
                        resultSet.getString("status")
                );

                project.setProgress(
                        resultSet.getInt("progress")
                );

                project.setAmount(
                        resultSet.getString("amount")
                );

                project.setCreatedAt(
                        resultSet.getString("created_at")
                );

                projects.add(project);
            }

        } catch (SQLException e) {

            e.printStackTrace();
        }

        return projects;
    }


    // =========================================================
    // GET PROJECT BY ID
    // =========================================================

    public Project getProjectById(int id) {

        String sql =
                "SELECT id, name, client, status, " +
                "progress, amount, created_at " +
                "FROM projects " +
                "WHERE id = ?";

        try (
                Connection connection =
                        DBConnection.getConnection();

                PreparedStatement statement =
                        connection.prepareStatement(sql)
        ) {

            statement.setInt(1, id);

            try (
                    ResultSet resultSet =
                            statement.executeQuery()
            ) {

                if (resultSet.next()) {

                    Project project =
                            new Project();

                    project.setId(
                            resultSet.getInt("id")
                    );

                    project.setName(
                            resultSet.getString("name")
                    );

                    project.setClient(
                            resultSet.getString("client")
                    );

                    project.setStatus(
                            resultSet.getString("status")
                    );

                    project.setProgress(
                            resultSet.getInt("progress")
                    );

                    project.setAmount(
                            resultSet.getString("amount")
                    );

                    project.setCreatedAt(
                            resultSet.getString("created_at")
                    );

                    return project;
                }
            }

        } catch (SQLException e) {

            e.printStackTrace();
        }

        return null;
    }


    // =========================================================
    // UPDATE PROJECT
    // =========================================================

    public boolean updateProject(Project project) {

        String sql =
                "UPDATE projects SET " +
                "name = ?, " +
                "client = ?, " +
                "status = ?, " +
                "progress = ?, " +
                "amount = ? " +
                "WHERE id = ?";

        try (
                Connection connection =
                        DBConnection.getConnection();

                PreparedStatement statement =
                        connection.prepareStatement(sql)
        ) {

            statement.setString(
                    1,
                    project.getName()
            );

            statement.setString(
                    2,
                    project.getClient()
            );

            statement.setString(
                    3,
                    project.getStatus()
            );

            statement.setInt(
                    4,
                    project.getProgress()
            );

            statement.setString(
                    5,
                    project.getAmount()
            );

            statement.setInt(
                    6,
                    project.getId()
            );

            int rows =
                    statement.executeUpdate();

            return rows > 0;

        } catch (SQLException e) {

            e.printStackTrace();

            return false;
        }
    }


    // =========================================================
    // DELETE PROJECT
    // =========================================================

    public boolean deleteProject(int id) {

        String sql =
                "DELETE FROM projects WHERE id = ?";

        try (
                Connection connection =
                        DBConnection.getConnection();

                PreparedStatement statement =
                        connection.prepareStatement(sql)
        ) {

            statement.setInt(1, id);

            int rows =
                    statement.executeUpdate();

            return rows > 0;

        } catch (SQLException e) {

            e.printStackTrace();

            return false;
        }
    }
}