<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
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

	<form action="sign_up">
		<table>
			<tr>
				<th colspan="2">Login Form</th>
			</tr>
			<tr>
				<td>Enter your User Name:</td>
				<td><input type=text name="userId"></td>
			</tr>
			<tr>
				<td>Enter your Password:</td>
				<td><input type="password" name="password"></td>
			</tr>
			<tr>
				<td><button onclick="signupFunction()">Sign up</button></td>
			</tr>
		</table>
	</form>
	</div>
	<%@ include file="footer.jsp"%>

</body>
</html>