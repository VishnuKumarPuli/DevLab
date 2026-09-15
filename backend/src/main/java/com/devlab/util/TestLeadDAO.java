package com.devlab.util;

import com.devlab.dao.LeadDAO;
import com.devlab.model.Lead;

import java.util.List;

public class TestLeadDAO {

    public static void main(String[] args) {

        LeadDAO dao = new LeadDAO();

        // 1. CREATE
        Lead lead = new Lead(
                "Vishnu Kumar",
                "vishnu@gmail.com",
                "9876543210",
                "Web Development",
                "50000",
                "Need a business website"
        );

        boolean added = dao.addLead(lead);

        System.out.println("Lead Added: " + added);


        // 2. READ ALL
        List<Lead> leads = dao.getAllLeads();

        System.out.println("\nAll Leads:");

        for (Lead l : leads) {

            System.out.println(
                    l.getId() + " | "
                    + l.getName() + " | "
                    + l.getEmail() + " | "
                    + l.getPhone() + " | "
                    + l.getService() + " | "
                    + l.getBudget() + " | "
                    + l.getStatus()
            );
        }
     // 3. UPDATE
        Lead updateLead = dao.getLeadById(1);

        if (updateLead != null) {

            updateLead.setName("Vishnu Kumar Updated");
            updateLead.setStatus("Contacted");

            boolean updated = dao.updateLead(updateLead);

            System.out.println("\nLead Updated: " + updated);
        }


        // 4. READ ONE
        Lead singleLead = dao.getLeadById(1);

        if (singleLead != null) {

            System.out.println("\nSingle Lead:");

            System.out.println(
                    singleLead.getId() + " | "
                    + singleLead.getName() + " | "
                    + singleLead.getEmail() + " | "
                    + singleLead.getStatus()
            );
        }
     // 5. DELETE
        boolean deleted = dao.deleteLead(2);

        System.out.println("\nLead Deleted: " + deleted);
    }
}