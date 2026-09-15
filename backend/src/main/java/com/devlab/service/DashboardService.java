package com.devlab.service;

import com.devlab.dao.DashboardDAO;

public class DashboardService {

    private DashboardDAO dashboardDAO;

    public DashboardService() {

        dashboardDAO = new DashboardDAO();

    }


    public int getTotalLeads() {

        return dashboardDAO.getTotalLeads();

    }


    public int getNewLeads() {

        return dashboardDAO.getNewLeads();

    }


    public int getContactedLeads() {

        return dashboardDAO.getContactedLeads();

    }


    public int getConvertedLeads() {

        return dashboardDAO.getConvertedLeads();

    }


    public int getActiveProjects() {

        return dashboardDAO.getActiveProjects();

    }


    public int getCompletedProjects() {

        return dashboardDAO.getCompletedProjects();

    }


    public double getTotalRevenue() {

        return dashboardDAO.getTotalRevenue();

    }
}