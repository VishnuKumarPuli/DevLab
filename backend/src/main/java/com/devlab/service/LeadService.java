package com.devlab.service;

import com.devlab.dao.LeadDAO;
import com.devlab.model.Lead;

import java.util.List;

public class LeadService {

    private LeadDAO leadDAO;

    public LeadService() {
        leadDAO = new LeadDAO();
    }

    // CREATE
    public boolean addLead(Lead lead) {
        return leadDAO.addLead(lead);
    }

    // READ ALL
    public List<Lead> getAllLeads() {
        return leadDAO.getAllLeads();
    }

    // READ ONE
    public Lead getLeadById(int id) {
        return leadDAO.getLeadById(id);
    }

    // UPDATE
    public boolean updateLead(Lead lead) {
        return leadDAO.updateLead(lead);
    }

    // DELETE
    public boolean deleteLead(int id) {
        return leadDAO.deleteLead(id);
    }
}