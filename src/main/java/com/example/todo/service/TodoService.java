package com.example.todo.service;

import com.example.todo.modal.Todo;

import java.util.List;

public interface TodoService {
    void addTodo(Todo td);

    List<Todo> getAllTodos();

    boolean deleteTodo(Long id);

    boolean checkTodo(Long id);
}
