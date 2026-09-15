package com.devlab.service;

import com.devlab.dao.TaskDAO;
import com.devlab.model.Task;

import java.util.List;

public class TaskService {

    private final TaskDAO taskDAO;


    public TaskService() {

        taskDAO = new TaskDAO();
    }


    public boolean addTask(Task task) {

        return taskDAO.addTask(task);
    }


    public List<Task> getAllTasks() {

        return taskDAO.getAllTasks();
    }


    public Task getTaskById(int id) {

        return taskDAO.getTaskById(id);
    }


    public boolean updateTask(Task task) {

        return taskDAO.updateTask(task);
    }


    public boolean deleteTask(int id) {

        return taskDAO.deleteTask(id);
    }
}