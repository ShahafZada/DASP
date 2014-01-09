<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<link type="text/css" rel="stylesheet" href="css/stylesheet.css" />
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
<script type="text/javascript" src="js/Jquery/form.js"></script>
<script type="text/javascript" src="js/solutionsChoice.js"></script>
<script type="text/javascript" src="js/scripts.js"></script>
<script type="text/javascript" src="js/solutionsManager.js"></script>
<script type="text/javascript" src="js/solutions.js"></script>



<title>Breaking Code</title>
</head>
<body>
	<%@ include file="header.jsp"%>
	<!-- 
	<div id="center">
		<img src="images/view_solutions/video.png" width="1500">
	</div> -->
	
	<div id="SolutionsDiv">
		<canvas id="SolutionsCanvas" width="950" height="580"></canvas>
	</div>
	
	<%@ include file="footer.jsp"%>
</body>
</html>