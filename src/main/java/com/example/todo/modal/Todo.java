package com.example.todo.modal;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Todo {
    private Long id;
    private String title;
    private boolean checked;
}
