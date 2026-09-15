package com.devlab.service;

import com.devlab.dao.ContactMessageDAO;
import com.devlab.model.ContactMessage;

import java.util.List;

public class ContactMessageService {

    private ContactMessageDAO contactMessageDAO;

    public ContactMessageService() {
        contactMessageDAO = new ContactMessageDAO();
    }

    // Save a new message
    public boolean saveMessage(ContactMessage message) {
        return contactMessageDAO.saveMessage(message);
    }

    // Fetch all messages
    public List<ContactMessage> getAllMessages() {
        return contactMessageDAO.getAllMessages();
    }

    // Fetch message by ID
    public ContactMessage getMessageById(int id) {
        return contactMessageDAO.getMessageById(id);
    }

    // Update message status
    public boolean updateStatus(int id, String status) {
        return contactMessageDAO.updateStatus(id, status);
    }

    // Delete message
    public boolean deleteMessage(int id) {
        return contactMessageDAO.deleteMessage(id);
    }
}