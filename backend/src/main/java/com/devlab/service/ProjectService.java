package com.devlab.service;

import com.devlab.dao.ProjectDAO;
import com.devlab.model.Project;

import java.util.List;

public class ProjectService {

    private final ProjectDAO projectDAO;


    // =========================================================
    // CONSTRUCTOR
    // =========================================================

    public ProjectService() {

        projectDAO = new ProjectDAO();

    }


    // =========================================================
    // ADD PROJECT
    // =========================================================

    public boolean addProject(Project project) {

        return projectDAO.addProject(project);

    }


    // =========================================================
    // GET ALL PROJECTS
    // =========================================================

    public List<Project> getAllProjects() {

        return projectDAO.getAllProjects();

    }


    // =========================================================
    // GET PROJECT BY ID
    // =========================================================

    public Project getProjectById(int id) {

        return projectDAO.getProjectById(id);

    }


    // =========================================================
    // UPDATE PROJECT
    // =========================================================

    public boolean updateProject(Project project) {

        return projectDAO.updateProject(project);

    }


    // =========================================================
    // DELETE PROJECT
    // =========================================================

    public boolean deleteProject(int id) {

        return projectDAO.deleteProject(id);

    }

}