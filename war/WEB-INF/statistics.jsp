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
		String MapNum = null;
		Statistics stat = new Statistics();
		Vector<Double> vec = null;
	%>
	<div id="center">

	<form method="post">
		<label for="Statistics">Get Your High Scores:</label> <input
			name="HighscoresByMyEmail" type="hidden"
			value=<%=(session.getAttribute("theEmailName")).toString()%>></input>
		<button type="submit">Submit</button>
	</form>
	
	<form method="post">
		<label for="HighscoresByMyEmail">Get Your High Scores:</label> <input
			name="HighscoresByMyEmail" type="hidden"
			value=<%=(session.getAttribute("theEmailName")).toString()%>></input>
		<button type="submit">Submit</button>
	</form>
	
	<form method="post">
		<label for="HighscoresByMyEmail">Get Your High Scores:</label> <input
			name="HighscoresByMyEmail" type="hidden"
			value=<%=(session.getAttribute("theEmailName")).toString()%>></input>
		<button type="submit">Submit</button>
	</form>
	
		<%
			MapNum = request.getParameter("StatisticsByMapNum");
			if (MapNum != null) {
				vec = StatisticsManager.getInstance().ScoreListToVector(MapNum);
			}
			if (vec != null) {
		%><%=stat.analyze_one_vector(vec)%>
		<%
			}
		%>

	</div>

	<!--Div that will hold the pie chart-->
	<div id="chart_div"></div>

	<%@ include file="footer.jsp"%>
</body>
</html>