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
<link type="text/css" rel="stylesheet" href="css/hs_table.css" />

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
		<table id="high_scores" class="filter-table flat-table-3">
			<tr>
				<td>
					<form  action="DataServlet" method="post">
						<table class="filter-table">
							<tr><td><label for="StatisticsOfPlayers">Display players statistics :</label>	<input
								name="StatisticsOfPlayers" type="hidden"
								value="players"></input></td></tr> 
							<tr><td><button type="submit" id="submit">Here!</button></td></tr> 
						</table>
					</form>
				</td>
				<td>	
					<form  action="DataServlet" method="post">
						<table class="filter-table">
							<tr><td><label for="StatisticsOfMapsAndScores">Display maps and scores statistics:</label> <input
								name="StatisticsOfMapsAndScores" type="hidden"
								value="maps&scores"></input></td></tr>
							<tr><td><button type="submit" id="submit">Here!</button></td></tr>
						</table>
					</form>
				</td>
			</tr>
		</table>
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