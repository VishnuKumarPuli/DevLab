
package com.devlab.controller;

import com.devlab.model.Lead;
import com.devlab.service.LeadService;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

@WebServlet("/api/leads")
public class LeadServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;

    private LeadService leadService;

    @Override
    public void init() throws ServletException {
        leadService = new LeadService();
    }

    // POST /api/leads
    @Override
    protected void doPost(
            HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        String name = request.getParameter("name");
        String email = request.getParameter("email");
        String phone = request.getParameter("phone");
        String service = request.getParameter("service");
        String budget = request.getParameter("budget");
        String message = request.getParameter("message");

        Lead lead = new Lead(
                name,
                email,
                phone,
                service,
                budget,
                message
        );

        boolean success = leadService.addLead(lead);

        PrintWriter out = response.getWriter();

        if (success) {

            response.setStatus(HttpServletResponse.SC_CREATED);

            out.print("""
                    {
                        "success": true,
                        "message": "Lead created successfully"
                    }
                    """);

        } else {

            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);

            out.print("""
                    {
                        "success": false,
                        "message": "Unable to create lead"
                    }
                    """);
        }
    }

   
 // GET /api/leads
 // GET /api/leads?id=4
 @Override
 protected void doGet(
         HttpServletRequest request,
         HttpServletResponse response)
         throws ServletException, IOException {

     response.setContentType("application/json");
     response.setCharacterEncoding("UTF-8");

     PrintWriter out = response.getWriter();

     // Check whether id was provided
     String id = request.getParameter("id");

     // If id is provided → get one lead
     if (id != null && !id.isEmpty()) {

         int leadId;

         try {
             leadId = Integer.parseInt(id);
         } catch (NumberFormatException e) {

             response.setStatus(HttpServletResponse.SC_BAD_REQUEST);

             out.print("""
                     {
                         "success": false,
                         "message": "Invalid lead ID"
                     }
                     """);

             return;
         }

         Lead lead = leadService.getLeadById(leadId);

         // Lead found
         if (lead != null) {

             out.print("{");

             out.print("\"id\":" + lead.getId() + ",");
             out.print("\"name\":\"" + escapeJson(lead.getName()) + "\",");
             out.print("\"email\":\"" + escapeJson(lead.getEmail()) + "\",");
             out.print("\"phone\":\"" + escapeJson(lead.getPhone()) + "\",");
             out.print("\"service\":\"" + escapeJson(lead.getService()) + "\",");
             out.print("\"budget\":\"" + escapeJson(lead.getBudget()) + "\",");
             out.print("\"message\":\"" + escapeJson(lead.getMessage()) + "\",");
             out.print("\"status\":\"" + escapeJson(lead.getStatus()) + "\"");

             out.print("}");

         } else {

             response.setStatus(HttpServletResponse.SC_NOT_FOUND);

             out.print("""
                     {
                         "success": false,
                         "message": "Lead not found"
                     }
                     """);
         }

         return;
     }

     // If id is NOT provided → get all leads
     List<Lead> leads = leadService.getAllLeads();

     out.print("[");

     for (int i = 0; i < leads.size(); i++) {

         Lead lead = leads.get(i);

         out.print("{");

         out.print("\"id\":" + lead.getId() + ",");
         out.print("\"name\":\"" + escapeJson(lead.getName()) + "\",");
         out.print("\"email\":\"" + escapeJson(lead.getEmail()) + "\",");
         out.print("\"phone\":\"" + escapeJson(lead.getPhone()) + "\",");
         out.print("\"service\":\"" + escapeJson(lead.getService()) + "\",");
         out.print("\"budget\":\"" + escapeJson(lead.getBudget()) + "\",");
         out.print("\"message\":\"" + escapeJson(lead.getMessage()) + "\",");
         out.print("\"status\":\"" + escapeJson(lead.getStatus()) + "\"");

         out.print("}");

         if (i < leads.size() - 1) {
             out.print(",");
         }
     }

     out.print("]");
 }
 
 private String escapeJson(String value) {

     if (value == null) {
         return "";
     }

     return value
             .replace("\\", "\\\\")
             .replace("\"", "\\\"")
             .replace("\n", "\\n")
             .replace("\r", "\\r");
 }


 // PUT /api/leads?id=4

 @Override
 protected void doPut(
         HttpServletRequest request,
         HttpServletResponse response)
         throws ServletException, IOException {

     response.setContentType("application/json");
     response.setCharacterEncoding("UTF-8");

     PrintWriter out = response.getWriter();

     // Get lead ID
     String id = request.getParameter("id");

     // Check ID
     if (id == null || id.isEmpty()) {

         response.setStatus(HttpServletResponse.SC_BAD_REQUEST);

         out.print("""
                 {
                     "success": false,
                     "message": "Lead ID is required"
                 }
                 """);

         return;
     }

     int leadId;

     try {
         leadId = Integer.parseInt(id);

     } catch (NumberFormatException e) {

         response.setStatus(HttpServletResponse.SC_BAD_REQUEST);

         out.print("""
                 {
                     "success": false,
                     "message": "Invalid lead ID"
                 }
                 """);

         return;
     }

     // Get existing lead
     Lead lead = leadService.getLeadById(leadId);

     if (lead == null) {

         response.setStatus(HttpServletResponse.SC_NOT_FOUND);

         out.print("""
                 {
                     "success": false,
                     "message": "Lead not found"
                 }
                 """);

         return;
     }

     // Get new status
     String status = request.getParameter("status");

     if (status == null || status.isEmpty()) {

         response.setStatus(HttpServletResponse.SC_BAD_REQUEST);

         out.print("""
                 {
                     "success": false,
                     "message": "Status is required"
                 }
                 """);

         return;
     }

     // Update status
     lead.setStatus(status);

     boolean success = leadService.updateLead(lead);

     if (success) {

         response.setStatus(HttpServletResponse.SC_OK);

         out.print("""
                 {
                     "success": true,
                     "message": "Lead status updated successfully"
                 }
                 """);

     } else {

         response.setStatus(HttpServletResponse.SC_BAD_REQUEST);

         out.print("""
                 {
                     "success": false,
                     "message": "Unable to update lead"
                 }
                 """);
     }
 }
 
//DELETE /api/leads?id=4

@Override
protected void doDelete(
      HttpServletRequest request,
      HttpServletResponse response)
      throws ServletException, IOException {

  response.setContentType("application/json");
  response.setCharacterEncoding("UTF-8");

  PrintWriter out = response.getWriter();

  // Get lead ID
  String id = request.getParameter("id");

  // Check ID
  if (id == null || id.isEmpty()) {

      response.setStatus(HttpServletResponse.SC_BAD_REQUEST);

      out.print("""
              {
                  "success": false,
                  "message": "Lead ID is required"
              }
              """);

      return;
  }

  int leadId;

  try {
      leadId = Integer.parseInt(id);

  } catch (NumberFormatException e) {

      response.setStatus(HttpServletResponse.SC_BAD_REQUEST);

      out.print("""
              {
                  "success": false,
                  "message": "Invalid lead ID"
              }
              """);

      return;
  }

  // Check whether lead exists
  Lead lead = leadService.getLeadById(leadId);

  if (lead == null) {

      response.setStatus(HttpServletResponse.SC_NOT_FOUND);

      out.print("""
              {
                  "success": false,
                  "message": "Lead not found"
              }
              """);

      return;
  }

  // Delete lead
  boolean success = leadService.deleteLead(leadId);

  if (success) {

      response.setStatus(HttpServletResponse.SC_OK);

      out.print("""
              {
                  "success": true,
                  "message": "Lead deleted successfully"
              }
              """);

  } else {

      response.setStatus(HttpServletResponse.SC_BAD_REQUEST);

      out.print("""
              {
                  "success": false,
                  "message": "Unable to delete lead"
              }
              """);
  }
}


 }
 

    
