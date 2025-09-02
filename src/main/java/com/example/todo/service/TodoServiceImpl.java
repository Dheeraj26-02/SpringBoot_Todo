package com.example.todo.service;

import com.example.todo.entity.TodoEntity;
import com.example.todo.modal.Todo;
import com.example.todo.repository.TodoRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class TodoServiceImpl implements TodoService {

    @Autowired
    TodoRepository todoRepository;


    public List<Todo> getAllTodos() {
        List<Todo> todoArray = new ArrayList<>();

        List<TodoEntity> todoList = todoRepository.findAll();//getting data from database(repo) and storing in entity
        for (TodoEntity todoEntity : todoList) {
            Todo td = new Todo();
            td.setId(todoEntity.getId());
            td.setTitle(todoEntity.getTitle());
            td.setChecked(todoEntity.getCheck());
            todoArray.add(td);
        }
        return todoArray;
    }


    public void addTodo(Todo td) {
        TodoEntity todoEntity = new TodoEntity();
        System.out.println(todoEntity);
        if(td.getId()!=null){
            todoEntity.setId(td.getId());
        }
        todoEntity.setTitle(td.getTitle());
        todoEntity.setChecked(td.isChecked());
        todoRepository.save(todoEntity); //saving from entity(table-model) to database(repo)
    }

    public boolean deleteTodo(Long id) {
        Optional<TodoEntity> todoOpt = todoRepository.findById(id);

        if (todoOpt.isPresent()) {
            todoRepository.delete(todoOpt.get());
            return true;
        } else {
            return false;
        }
    }
//    public boolean checkTodo(Long id) {
//        Optional<TodoEntity> todoOpt = todoRepository.findById(id);
//        if (todoOpt.isPresent()) {
//            if(todoOpt.get().getCheck()==true){
//                todoRepository.;
//            }
//        }
//    }
}
