package com.example.demo;
/* Storage object for facts from Useless Fact API */
public class Fact {
	private String factID;
	private String text;
	private String perma;
	
	Fact(String id, String txt, String lnk){
		this.factID=id;
		this.text=txt;
		this.perma=lnk;
	}
	String getFactID() {
		return this.factID;
	}
	String getFactText() {
		return this.text;
	}
	String getFactPerma() {
		return this.perma;
	}
}
