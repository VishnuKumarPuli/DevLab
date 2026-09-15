
package com.devlab.service;

import com.devlab.dao.PortfolioDAO;
import com.devlab.model.Portfolio;

import java.util.List;

public class PortfolioService {

    private PortfolioDAO portfolioDAO;

    public PortfolioService() {
        portfolioDAO = new PortfolioDAO();
    }


    // Get all portfolio projects
    public List<Portfolio> getAllPortfolios() {
        return portfolioDAO.getAllPortfolios();
    }


    // Get portfolio project by ID
    public Portfolio getPortfolioById(int id) {
        return portfolioDAO.getPortfolioById(id);
    }


    // Add new portfolio project
    public boolean addPortfolio(Portfolio portfolio) {
        return portfolioDAO.addPortfolio(portfolio);
    }


    // Update portfolio project
    public boolean updatePortfolio(Portfolio portfolio) {
        return portfolioDAO.updatePortfolio(portfolio);
    }


    // Delete portfolio project
    public boolean deletePortfolio(int id) {
        return portfolioDAO.deletePortfolio(id);
    }


    // Enable / Disable portfolio project
    public boolean updateStatus(int id, String status) {
        return portfolioDAO.updateStatus(id, status);
    }
}
