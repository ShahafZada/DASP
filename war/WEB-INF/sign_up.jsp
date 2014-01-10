<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<link type="text/css" rel="stylesheet" href="css/stylesheet.css" />
<script type="text/javascript" src="js/scripts.js"></script>
<title>Breaking Code</title>
</head>

<body>
	<%@ include file="header.jsp"%>
	<div id="center">
		<%
 			session = request.getSession(false);
			session.invalidate();
		%>
		<jsp:forward page="/index.jsp"></jsp:forward>
	</div>

</body>
</html>