
package com.devlab.dao;

import com.devlab.model.Portfolio;
import com.devlab.util.DBConnection;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class PortfolioDAO {

    // Get all portfolio projects
    public List<Portfolio> getAllPortfolios() {

        List<Portfolio> portfolios = new ArrayList<>();

        String sql = "SELECT * FROM portfolio_projects ORDER BY id DESC";

        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {

                Portfolio portfolio = new Portfolio();

                portfolio.setId(rs.getInt("id"));
                portfolio.setTitle(rs.getString("title"));
                portfolio.setCategory(rs.getString("category"));
                portfolio.setDescription(rs.getString("description"));
                portfolio.setImage(rs.getString("image"));
                portfolio.setTechnologies(rs.getString("technologies"));
                portfolio.setProjectUrl(rs.getString("project_url"));
                portfolio.setStatus(rs.getString("status"));

                portfolios.add(portfolio);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return portfolios;
    }


    // Get portfolio project by ID
    public Portfolio getPortfolioById(int id) {

        Portfolio portfolio = null;

        String sql = "SELECT * FROM portfolio_projects WHERE id = ?";

        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setInt(1, id);

            try (ResultSet rs = ps.executeQuery()) {

                if (rs.next()) {

                    portfolio = new Portfolio();

                    portfolio.setId(rs.getInt("id"));
                    portfolio.setTitle(rs.getString("title"));
                    portfolio.setCategory(rs.getString("category"));
                    portfolio.setDescription(rs.getString("description"));
                    portfolio.setImage(rs.getString("image"));
                    portfolio.setTechnologies(rs.getString("technologies"));
                    portfolio.setProjectUrl(rs.getString("project_url"));
                    portfolio.setStatus(rs.getString("status"));
                }
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return portfolio;
    }


    // Add new portfolio project
    public boolean addPortfolio(Portfolio portfolio) {

        String sql = "INSERT INTO portfolio_projects "
                   + "(title, category, description, image, technologies, project_url, status) "
                   + "VALUES (?, ?, ?, ?, ?, ?, ?)";

        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, portfolio.getTitle());
            ps.setString(2, portfolio.getCategory());
            ps.setString(3, portfolio.getDescription());
            ps.setString(4, portfolio.getImage());
            ps.setString(5, portfolio.getTechnologies());
            ps.setString(6, portfolio.getProjectUrl());
            ps.setString(7, portfolio.getStatus());

            int rows = ps.executeUpdate();

            return rows > 0;

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return false;
    }


    // Update existing portfolio project
    public boolean updatePortfolio(Portfolio portfolio) {

        String sql = "UPDATE portfolio_projects SET "
                   + "title = ?, "
                   + "category = ?, "
                   + "description = ?, "
                   + "image = ?, "
                   + "technologies = ?, "
                   + "project_url = ?, "
                   + "status = ? "
                   + "WHERE id = ?";

        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, portfolio.getTitle());
            ps.setString(2, portfolio.getCategory());
            ps.setString(3, portfolio.getDescription());
            ps.setString(4, portfolio.getImage());
            ps.setString(5, portfolio.getTechnologies());
            ps.setString(6, portfolio.getProjectUrl());
            ps.setString(7, portfolio.getStatus());
            ps.setInt(8, portfolio.getId());

            int rows = ps.executeUpdate();

            return rows > 0;

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return false;
    }


    // Delete portfolio project
    public boolean deletePortfolio(int id) {

        String sql = "DELETE FROM portfolio_projects WHERE id = ?";

        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setInt(1, id);

            int rows = ps.executeUpdate();

            return rows > 0;

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return false;
    }


    // Enable / Disable portfolio project
    public boolean updateStatus(int id, String status) {

        String sql = "UPDATE portfolio_projects SET status = ? WHERE id = ?";

        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, status);
            ps.setInt(2, id);

            int rows = ps.executeUpdate();

            return rows > 0;

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return false;
    }
}
