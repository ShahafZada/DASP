<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<link type="text/css" rel="stylesheet" href="css/stylesheet.css" />
<title>Breaking Code</title>
</head>

<body>
	<%@ include file="header.jsp"%>
	<div class="about_us">
		<p>Given a list of cities and the distances between each pair of cities, 
			could you find the shortest possible route that visits each city at least once?</p>				
		
		<p>The answer to the question is actually harder than it seems. 
			So hard, that the problem is considered as 
			<a href = "http://en.wikipedia.org/wiki/NP-hard">"NP-hard" </a>
			 problem (Non-deterministic Polynomial-time hard). In simple words, this means that there's no "good" algorithm 
			 for solving the problem - therefore we can't compute the optimal solution.</p>
		
		<p>The simulation showed in this site is a simple version of a larger problem: the
		<a href = "http://en.wikipedia.org/wiki/Travelling_salesman_problem">Travelling salesman problem</a>.		
		</p>
		
		<p>The enormous amount of possibilities to solve a given map is demonstrated on this
		<a href = http://www.youtube.com/watch?v=bUEOuI2fK-M>solution example</a></p>		
		
		<p><a href = "http://rare-hub-382.appspot.com/index">Try solving it!</a></p>
			
	</div>
	
	
	<!--  <div id="center">
		<img src="images/learn/learn.png">
	</div>-->
	<%@ include file="footer.jsp"%>

</body>
</html>