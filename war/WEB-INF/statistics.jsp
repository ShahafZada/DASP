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
			<label for="StatisticsByMapNum">Get Statistics By Map number:</label>
			<input name="StatisticsByMapNum" type="number" min="1" max="9"
				required placeholder="Your Map number"><button
					type="submit">Submit</button>
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
	<%@ include file="footer.jsp"%>

</body>
</html>