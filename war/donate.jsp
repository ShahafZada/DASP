<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<link type="text/css" rel="stylesheet" href="stylesheet.css" />
<script type="text/javascript" src="js/scripts.js"></script>
<title>Breaking Code</title>
</head>

<body>
	<%@ include file="WEB-INF/header.jsp"%>
	<div id="center">
		<span onclick="donateFunction()"><img
			src="images/donate/donate.png"></span>
		<button onclick="donateFunction()">Donate</button>
	</div>
	<%@ include file="WEB-INF/footer.jsp"%>

</body>
</html>