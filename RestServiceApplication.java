package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/* runs the api, as directed by the DemoController */
@SpringBootApplication
public class RestServiceApplication {

		public static void main(String[] args) {
			SpringApplication.run(RestServiceApplication.class, args);
		}
}
