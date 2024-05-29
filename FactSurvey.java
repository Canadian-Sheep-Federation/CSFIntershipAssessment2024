package com.example.demo;
/* An object to hold a response to a random fact (from the random useless facts
 * API) and its survey form contents. */
public class FactSurvey {
	private int id; // database id, generated on insertion
	///From API
	private String factID; // id of useless fact
	private String text; // useless fact
	private String perma; // permalink to fact json response
	///From form
	private String name; //survey participant name
	private Boolean didYouKnow; // whether the fact was previously known
	private String opinion; //participant's opinion of the fact
	FactSurvey(int newID, String newFactID, String newText, String newPerma, 
			String newName, Boolean knew, String newOpinion){
		this.id = newID;
		this.factID = newFactID;
		this.text = newText;
		this.perma = newPerma;
		this.name = newName;
		this.didYouKnow = knew;
		this.opinion = newOpinion;
	}
	int getID() {return this.id;}
	String getFactID() {return this.factID;}
	String getText() {return this.text;}
	String getPerma() {return this.perma;}
	String getName() {return this.name;}
	Boolean getDidYouKnow() {return this.didYouKnow;}
	String getOpinion() {return this.opinion;}
	
	void setID(int newID) {this.id=newID;}
	
}
