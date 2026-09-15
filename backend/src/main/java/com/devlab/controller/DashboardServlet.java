package com.devlab.controller;

import com.devlab.service.DashboardService;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/api/dashboard")
public class DashboardServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;

    private DashboardService dashboardService;


    @Override
    public void init() throws ServletException {

        dashboardService = new DashboardService();

    }


    @Override
    protected void doGet(
            HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        PrintWriter out = response.getWriter();


        int totalLeads =
                dashboardService.getTotalLeads();

        int newLeads =
                dashboardService.getNewLeads();

        int contactedLeads =
                dashboardService.getContactedLeads();

        int convertedLeads =
                dashboardService.getConvertedLeads();

        int activeProjects =
                dashboardService.getActiveProjects();

        int completedProjects =
                dashboardService.getCompletedProjects();

        double totalRevenue =
                dashboardService.getTotalRevenue();


        String json =
                "{"
                + "\"totalLeads\":" + totalLeads + ","
                + "\"newLeads\":" + newLeads + ","
                + "\"contactedLeads\":" + contactedLeads + ","
                + "\"convertedLeads\":" + convertedLeads + ","
                + "\"activeProjects\":" + activeProjects + ","
                + "\"completedProjects\":" + completedProjects + ","
                + "\"totalRevenue\":" + totalRevenue
                + "}";


        out.print(json);

    }
}