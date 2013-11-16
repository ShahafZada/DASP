<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<link type="text/css" rel="stylesheet" href="stylesheet.css" />
<script type="text/javascript" src="js/scripts.js"></script>
<script type="text/javascript" src="js/game.js"></script>
<title>Breaking Code</title>
</head>

<body>
	<!-- <img src="images/main_page/java_game.png" id="context"> 
         <canvas id="canvas" width="800" height="500"></canvas> -->
	<%@ include file="WEB-INF/header.jsp"%>
	<div id="center">
		<canvas id="canvas"></canvas>
		<audio preload="true" id="collide">
			<source
				src="http://dl.dropbox.com/u/26141789/canvas/pingpong/Metal%20Cling%20-%20Hit.mp3" />
			<source
				src="http://dl.dropbox.com/u/26141789/canvas/pingpong/Metal%20Cling%20-%20Hit.wav" />
		</audio>
	</div>
	<%@ include file="WEB-INF/footer.jsp"%>

</body>
</html>