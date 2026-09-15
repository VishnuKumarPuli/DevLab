package com.devlab.service;

import com.devlab.dao.TestimonialDAO;
import com.devlab.model.Testimonial;

import java.util.List;

public class TestimonialService {

    private final TestimonialDAO testimonialDAO;

    // Constructor
    public TestimonialService() {
        testimonialDAO = new TestimonialDAO();
    }


    // Get all testimonials
    public List<Testimonial> getAllTestimonials() {

        return testimonialDAO.getAllTestimonials();
    }


    // Get testimonial by ID
    public Testimonial getTestimonialById(int id) {

        return testimonialDAO.getTestimonialById(id);
    }


    // Add testimonial
    public boolean addTestimonial(Testimonial testimonial) {

        return testimonialDAO.addTestimonial(testimonial);
    }


    // Update testimonial
    public boolean updateTestimonial(Testimonial testimonial) {

        return testimonialDAO.updateTestimonial(testimonial);
    }


    // Delete testimonial
    public boolean deleteTestimonial(int id) {

        return testimonialDAO.deleteTestimonial(id);
    }


    // Enable / Disable testimonial
    public boolean updateStatus(int id, String status) {

        return testimonialDAO.updateStatus(id, status);
    }
}