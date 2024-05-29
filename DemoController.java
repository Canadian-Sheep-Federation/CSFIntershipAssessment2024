package com.example.demo;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.FactSurvey;
import com.example.demo.SQLiteJDBC;


/* Controller for custom API */
@RestController
public class DemoController {
	
/* maintains / GET endpoint, returns all submitted responses */	
@GetMapping("/")
public String getAllResponses(){
	SQLiteJDBC jdbc = new SQLiteJDBC();
	String out = jdbc.selectAll();
	return out;
}

/* maintains /{id} GET endpoint, returns submitted response with given id */
@GetMapping("/{id}")
public String getResponse(int id) {
	SQLiteJDBC jdbc = new SQLiteJDBC();
	String out = jdbc.selectID(id);
	return out;
}

/* maintains / POST endpoint, accepts params from survey form, and 
 * returns id of inserted response */
@PostMapping("/")
public int sendResponse(@RequestParam(value="factID") String factID, 
		@RequestParam(value="ftext")String text, 
		@RequestParam(value="fperma") String perma,
		@RequestParam(value="fname", defaultValue="") String name, 
		@RequestParam(value="fknew") Boolean knew, 
		@RequestParam(value="fopinion", defaultValue="") String opinion ) {
	FactSurvey fs = new FactSurvey(-1, factID, text, perma, name, knew, opinion);
	SQLiteJDBC jdbc = new SQLiteJDBC();
	int id = jdbc.insert(fs);
	return id;
}

}
