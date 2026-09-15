package com.devlab.dao;

import com.devlab.model.Service;
import com.devlab.util.DBConnection;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class ServiceDAO {

    // ADD
    public boolean addService(Service service) {

        String sql = """
                INSERT INTO services (name, price, active)
                VALUES (?, ?, ?)
                """;

        try (
            Connection connection = DBConnection.getConnection();
            PreparedStatement statement =
                    connection.prepareStatement(sql)
        ) {

            statement.setString(1, service.getName());
            statement.setDouble(2, service.getPrice());
            statement.setBoolean(3, service.isActive());

            return statement.executeUpdate() > 0;

        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }


    // GET ALL
    public List<Service> getAllServices() {

        List<Service> services = new ArrayList<>();

        String sql = """
                SELECT id, name, price, active
                FROM services
                ORDER BY id DESC
                """;

        try (
            Connection connection = DBConnection.getConnection();
            PreparedStatement statement =
                    connection.prepareStatement(sql);
            ResultSet resultSet = statement.executeQuery()
        ) {

            while (resultSet.next()) {

                Service service = new Service();

                service.setId(resultSet.getInt("id"));
                service.setName(resultSet.getString("name"));
                service.setPrice(resultSet.getDouble("price"));
                service.setActive(resultSet.getBoolean("active"));

                services.add(service);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return services;
    }


    // GET BY ID
    public Service getServiceById(int id) {

        String sql = """
                SELECT id, name, price, active
                FROM services
                WHERE id = ?
                """;

        try (
            Connection connection = DBConnection.getConnection();
            PreparedStatement statement =
                    connection.prepareStatement(sql)
        ) {

            statement.setInt(1, id);

            try (ResultSet resultSet = statement.executeQuery()) {

                if (resultSet.next()) {

                    Service service = new Service();

                    service.setId(resultSet.getInt("id"));
                    service.setName(resultSet.getString("name"));
                    service.setPrice(resultSet.getDouble("price"));
                    service.setActive(resultSet.getBoolean("active"));

                    return service;
                }
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return null;
    }


    // UPDATE
    public boolean updateService(Service service) {

        String sql = """
                UPDATE services
                SET name = ?, price = ?, active = ?
                WHERE id = ?
                """;

        try (
            Connection connection = DBConnection.getConnection();
            PreparedStatement statement =
                    connection.prepareStatement(sql)
        ) {

            statement.setString(1, service.getName());
            statement.setDouble(2, service.getPrice());
            statement.setBoolean(3, service.isActive());
            statement.setInt(4, service.getId());

            return statement.executeUpdate() > 0;

        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }


    // DELETE
    public boolean deleteService(int id) {

        String sql = """
                DELETE FROM services
                WHERE id = ?
                """;

        try (
            Connection connection = DBConnection.getConnection();
            PreparedStatement statement =
                    connection.prepareStatement(sql)
        ) {

            statement.setInt(1, id);

            return statement.executeUpdate() > 0;

        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }
}