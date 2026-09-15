package com.devlab.service;

import com.devlab.dao.ServiceDAO;
import com.devlab.model.Service;

import java.util.List;

public class ServiceService {

    private final ServiceDAO serviceDAO = new ServiceDAO();

    public boolean addService(Service service) {
        return serviceDAO.addService(service);
    }

    public List<Service> getAllServices() {
        return serviceDAO.getAllServices();
    }

    public Service getServiceById(int id) {
        return serviceDAO.getServiceById(id);
    }

    public boolean updateService(Service service) {
        return serviceDAO.updateService(service);
    }

    public boolean deleteService(int id) {
        return serviceDAO.deleteService(id);
    }
}