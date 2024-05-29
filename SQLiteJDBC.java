package com.example.demo;
import java.sql.*;

import com.example.demo.FactSurvey;


/* manage connection and operations to SQLite database*/
public class SQLiteJDBC {
	Connection c = null;
	Statement statement = null;
	PreparedStatement insert = null;
	PreparedStatement select = null;
	Statement selectAll = null;
	/*Creates connection to database, and 
	 * creates table if does not already exist */
	SQLiteJDBC() {
		
		try {
			Class.forName("org.sqlite.JDBC");
			c = DriverManager.getConnection("jdbs:sqlite:demo.db");
			String makeTable = "create table if not exists Table_FactSurvey("
					+ "ID int primary key not null, "
					+ "factID int not null, "
					+ "factText text not null, "
					+ "perma text not null, "
					+ "name text, "
					+ "know int not null, "
					+ "opinion text)";
			statement = c.createStatement();		
			statement.executeUpdate(makeTable);
			statement.close();
		} catch(Exception e) {
			e.printStackTrace();
			System.exit(0);
		}
	}
	
	/* insert results from form into database */
	int insert(FactSurvey fs){
		int id=-1;
		try {
			insert = c.prepareStatement("insert into Table_FactSurvey values(?, ?, ?, ?, ?, ?)");
			insert.setString(1, fs.getFactID());
			insert.setString(2, fs.getText());
			insert.setString(3, fs.getPerma());
			insert.setString(4, fs.getName());
			insert.setInt(5, fs.getDidYouKnow()? 1:0);
			insert.setString(6, fs.getOpinion());
			insert.executeUpdate();
			ResultSet rs = insert.getGeneratedKeys();
			if(rs.next()) {
				id = rs.getInt(1);
			}
			insert.close();
		} catch(Exception e) {
			e.printStackTrace();
		}
		return id;
	}
	
	/* select single element from database by id
	 * in form of JSON string*/
	String selectID(int id) {
		try {
			select = c.prepareStatement("select * from Table_FactSurvey where id = ?");
			select.setInt(1, id);
			ResultSet rs = select.executeQuery();
			String factID  = rs.getString(1);
			String text = rs.getString(2);
			String perma = rs.getString(3);
			String name = rs.getString(4);
			boolean knew = rs.getInt(5)==1;
			String opinion = rs.getString(6);
			return  "{id="+id+", factID="+factID+", text="+text+", perma="+perma+", name="+name+", knew="+knew+", opinion="+opinion+"}";
		} catch(Exception e) {
			e.printStackTrace();
		}
		return "{id="+-1+", factID="+""+", text="+""+", perma="+""+", name="+""+", knew="+""+", opinion="+""+"}";
	}
	
	/* select a list of all elements from database 
	 * in form of JSONArray String */
	String selectAll(){
		String out = "{";
		try {
			selectAll = c.createStatement();
			ResultSet rs = selectAll.executeQuery("select * from Table_FactSurvey");
			while(rs.next()) {
				int id = rs.getInt(0);
				String factID  = rs.getString(1);
				String text = rs.getString(2);
				String perma = rs.getString(3);
				String name = rs.getString(4);
				boolean knew = rs.getInt(5)==1;
				String opinion = rs.getString(6);
				out+="{id="+id+", factID="+factID+", text="+text+", perma="+perma+", name="+name+", knew="+knew+", opinion="+opinion+"},";
			}
		}catch(Exception e) {
			e.printStackTrace();
		}
		out+="}";
		return out;
	}
}
