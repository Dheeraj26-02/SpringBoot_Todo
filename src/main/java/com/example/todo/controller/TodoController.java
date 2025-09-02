package com.example.todo.controller;

import com.example.todo.modal.Todo;
import com.example.todo.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.ui.Model;
import java.util.List;


@RestController
@RequestMapping("/api/todos")

public class TodoController {

    @Autowired
    public TodoService todoService;


    @GetMapping
    public List<Todo> loadData(){
        List<Todo> todoList=todoService.getAllTodos();
        return todoList;
    }

    @PostMapping("/add")
    public void addTodo(@RequestBody Todo td) {
        todoService.addTodo(td);
    }

    @DeleteMapping("/{id}")
    public void deleteTodo(@PathVariable Long id) {
        todoService.deleteTodo(id);
    }




}
