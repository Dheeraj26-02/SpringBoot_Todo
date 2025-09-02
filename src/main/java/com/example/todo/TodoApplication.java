package com.example.todo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.core.env.Environment;


@SpringBootApplication
public class TodoApplication {

    public static void main(String[] args) {
        ConfigurableApplicationContext context =SpringApplication.run(TodoApplication.class, args);
        Environment env = context.getEnvironment();
        String Port = env.getProperty("server.port", "8080");

        System.out.println(" ____   _                                        \n" +
                "|  _ \\ | |__    ___   ___ _ __ __ _  __       \n" +
                "| | | || '_ \\  / _ \\ / _ \\ '__/ _` ||  |     \n" +
                "| |_| || | | ||  __/|  __/ | | (_| ||  |   \n" +
                "|____/ |_| |_| \\___| \\___|_|  \\__,_||  |\n" +
                "                                    |  |\n" +
                "                                 __ /  /\n" +
                "                                |____ / ");
        System.out.println("Server running at " + "http://localhost:"+Port+"/");
    }
}
