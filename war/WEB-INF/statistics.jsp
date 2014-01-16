<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE HTML>
<%@page import="statistics.Statistics"%>
<%@page import="statistics.StatisticsManager"%>
<%@page import="java.util.Vector;"%>
<html>
<head>

<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<link type="text/css" rel="stylesheet" href="css/stylesheet.css" />

<script type="text/javascript" src="https://www.google.com/jsapi"></script>
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
<script type="text/javascript" src="js/statistics_charts.js"></script>

<title>Breaking Code</title>
</head>

<body>
	<%@ include file="header.jsp"%>
	
	<%
		Statistics stat = new Statistics();
		Vector<Double> vec = null;
	%>
	<div >

	<form  action="DataServlet" method="post">
		<label for="StatisticsOfPlayers">See Statistics of players:</label> <input
			name="StatisticsOfPlayers" type="hidden"
			value="players"></input>
		<button type="submit">Here!</button>
		</form>
		
	<form  action="DataServlet" method="post">
		<label for="StatisticsOfMapsAndScores">See Statistics of maps and scores:</label> <input
			name="StatisticsOfMapsAndScores" type="hidden"
			value="maps&scores"></input>
		<button type="submit">Here!</button>
		</form>

	</div>

	<!--Div that will hold the pie chart-->
	<table id="Piecharts_table">
		<tr id="Piecharts_row"></tr>
	</table>

	<div id="MapChart_div"></div>
	
	<div id="ColumnChart_div"></div>
	
	<%@ include file="footer.jsp"%>
</body>
</html>