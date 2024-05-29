<!DOCTYPE html>
<%@page import="java.util.*"%>
<%@page import="org.json.Cookie"%>
<%@page import="org.json.JSONObject"%>
<%@page import="java.net.http.HttpURLConnection"%>
<%@page import="com.example.demo.Fact"%>
<html>
<head>
<meta charset="UTF-8">
<title>Rest Demo</title>
</head>
<body>
<%-- function to get a fact from useless fact api --%>
<%!

Fact getFact(){
	Url url = new URL("https://uselessfacts.jsph.pl/api/v2/facts/random");
	HttpURLConnection con = (HttpURLConnection) url.openConnection();
	con.setRequestMethod("GET");
	con.setRequestProperty("Content-Type", "application/json");
	con.setRequestProperty("Accept", "application/json");
	Fact out = null;
	try(BufferedReader br = new BufferedReader(
  		new InputStreamReader(con.getInputStream(), "utf-8"))) {
    		StringBuilder response = new StringBuilder();
    		String responseLine = null;
    		while ((responseLine = br.readLine()) != null) {
        		response.append(responseLine.trim());
    		}
		JSONObject json_response = Cookie.toJSONObject(response.toString());
		out = new Fact(json_response.getString("id"),
			json_response.getString("text"),
			json_response.getString("source_url"));
	}
	return out;
}
Fact fact = getFact();

%>
<%-- Survey form, posts to "/" --%>
<button onClick=<%fact = getFact()%> >Get A New Fact</button> <%-- Calls the getFact again to get a new random useless fact --%>
	<form action="http::/localhost:8080/">
		<input type="hidden" id="factID" value=<%=fact.getFactID() %>/>
		<p id="ftext"><%=fact.getFactText() %></p><br>
		<input type="hidden" id="fperma" value=<%=fact.getFactPerma() %>/>
		<label for="fname">Name:</label><br>
		<input type="text" id="fname" name="fname"><br>
		<label for="fknew">Did you know this?:</label><br>
		<input type="checkbox" id="fknew" name="fknew"><br>
		<label for="fopinion">What do you think about that?:</label><br>
		<input type="text" id="fopinion" name="fopinion"><br>
		<input type="submit" value="Submit">
	</form>

<%-- Heres where the survey responses would be displayed --%>
<%! 
	Url url_survey = new URL("https://localhost:8080/");
	HttpURLConnection con = (HttpURLConnection) url_survey.openConnection();
	con.setRequestMethod("GET");
	try(BufferedReader br = new BufferedReader(
  		new InputStreamReader(con.getInputStream(), "utf-8"))) {
    		StringBuilder response = new StringBuilder();
    		String responseLine = null;
    		while ((responseLine = br.readLine()) != null) {
        		response.append(responseLine.trim());
    		}
		JSONObject json_response = Cookie.toJSONObject(response.toString());
		<%-- Convert response to array, then populate list with array elements to display survey responses  --%>
	}
%>
</body>
</html>