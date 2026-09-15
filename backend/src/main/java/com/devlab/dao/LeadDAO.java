package com.devlab.dao;

import com.devlab.model.Lead;
import com.devlab.model.Notification;
import com.devlab.util.DBConnection;
import com.devlab.model.Notification;
import java.sql.Statement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class LeadDAO {

    // CREATE LEAD
	// =========================================
	// CREATE LEAD
	// =========================================

	public boolean addLead(Lead lead) {

	    String sql = "INSERT INTO leads "
	            + "(name, email, phone, service, budget, message, status) "
	            + "VALUES (?, ?, ?, ?, ?, ?, ?)";

	    try (Connection con = DBConnection.getConnection();
	         PreparedStatement ps = con.prepareStatement(
	                 sql,
	                 Statement.RETURN_GENERATED_KEYS)) {

	        ps.setString(1, lead.getName());
	        ps.setString(2, lead.getEmail());
	        ps.setString(3, lead.getPhone());
	        ps.setString(4, lead.getService());
	        ps.setString(5, lead.getBudget());
	        ps.setString(6, lead.getMessage());
	        ps.setString(7, "New");

	        int result = ps.executeUpdate();

	        if (result == 0) {
	            return false;
	        }

	        // Get the newly created lead ID
	        int leadId = 0;

	        try (ResultSet rs = ps.getGeneratedKeys()) {

	            if (rs.next()) {
	                leadId = rs.getInt(1);
	                lead.setId(leadId);
	            }
	        }

	        // Create notification
	        Notification notification = new Notification(
	                "New lead received",
	                lead.getName() + " submitted a new project request.",
	                "LEAD",
	                leadId
	        );

	        NotificationDAO notificationDAO = new NotificationDAO();

	        boolean notificationCreated =
	                notificationDAO.createNotification(notification);

	        if (!notificationCreated) {
	            System.out.println(
	                    "Lead created successfully, but notification creation failed."
	            );
	        }

	        return true;

	    } catch (Exception e) {

	        e.printStackTrace();

	        return false;
	    }
	}


    // READ ALL LEADS
    public List<Lead> getAllLeads() {

        List<Lead> leads = new ArrayList<>();

        String sql = "SELECT * FROM leads ORDER BY id DESC";

        try (Connection con = DBConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {

                Lead lead = new Lead();

                lead.setId(rs.getInt("id"));
                lead.setName(rs.getString("name"));
                lead.setEmail(rs.getString("email"));
                lead.setPhone(rs.getString("phone"));
                lead.setService(rs.getString("service"));
                lead.setBudget(rs.getString("budget"));
                lead.setMessage(rs.getString("message"));
                lead.setStatus(rs.getString("status"));

                leads.add(lead);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return leads;
    }


    // READ ONE LEAD
    public Lead getLeadById(int id) {

        String sql = "SELECT * FROM leads WHERE id = ?";

        try (Connection con = DBConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setInt(1, id);

            try (ResultSet rs = ps.executeQuery()) {

                if (rs.next()) {

                    Lead lead = new Lead();

                    lead.setId(rs.getInt("id"));
                    lead.setName(rs.getString("name"));
                    lead.setEmail(rs.getString("email"));
                    lead.setPhone(rs.getString("phone"));
                    lead.setService(rs.getString("service"));
                    lead.setBudget(rs.getString("budget"));
                    lead.setMessage(rs.getString("message"));
                    lead.setStatus(rs.getString("status"));

                    return lead;
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }


    // UPDATE LEAD
    public boolean updateLead(Lead lead) {

        String sql = "UPDATE leads SET "
                + "name = ?, email = ?, phone = ?, service = ?, "
                + "budget = ?, message = ?, status = ? "
                + "WHERE id = ?";

        try (Connection con = DBConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setString(1, lead.getName());
            ps.setString(2, lead.getEmail());
            ps.setString(3, lead.getPhone());
            ps.setString(4, lead.getService());
            ps.setString(5, lead.getBudget());
            ps.setString(6, lead.getMessage());
            ps.setString(7, lead.getStatus());
            ps.setInt(8, lead.getId());

            return ps.executeUpdate() > 0;

        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }


    // DELETE LEAD
    public boolean deleteLead(int id) {

        String sql = "DELETE FROM leads WHERE id = ?";

        try (Connection con = DBConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setInt(1, id);

            return ps.executeUpdate() > 0;

        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}