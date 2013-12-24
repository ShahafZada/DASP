<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<link type="text/css" rel="stylesheet" href="css/stylesheet.css" />
<title>Breaking Code</title>
</head>

<body>
	<%@ include file="header.jsp"%>
	<div id="center">
	
	<form action="">
		<label for="StatisticsByLevel">Get Statistics By Level:</label>
		<input name="StatisticsByLevel" type="number" min="1" max="10" required placeholder="Your Level">
		<a href="statistics/?by='player'" title="Try solving it!"><button type="submit">Submit</button></a>
		
		<% 
			String i = request.getParameter("StatisticsByLevel"); 
			if(i != null)
				response.getWriter().write(i);
		%>
		
	</form>
	
	</div>
	<%@ include file="footer.jsp"%>

</body>
</html>