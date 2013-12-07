<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE HTML>

<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<link type="text/css" rel="stylesheet" href="css/stylesheet.css" />
<link type="text/css" rel="stylesheet" href="css/score_popup.css" />
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
<script type="text/javascript" src="js/form.js"></script>
<script type="text/javascript" src="js/gameCredits.js"></script>
<script type="text/javascript" src="js/gameSettings.js"></script>
<script type="text/javascript" src="js/gameInstructions.js"></script>
<script type="text/javascript" src="js/stageFile.js"></script>
<script type="text/javascript" src="js/game.js"></script>
<script type="text/javascript" src="js/scripts.js"></script>
<script type="text/javascript" src="js/gameMenu.js"></script>
<script type="text/javascript" src="js/gameManager.js"></script>


<title>Breaking Code</title>
</head>

<body>
	<%@ include file="header.jsp"%>

	<div id="popup_send_score">
		<form id="scores_form" action="SaveGameScores" method="post">
		<label id ="popup_title">Your score is: <b id="score"></b> ,Deploy?</label>
		<table id="popup_table">
			<tr>
				<td><label for="nameField">Your Name: </label></td>
				<td><input type="text" id="nameField" name="theNameField"></td>
			</tr>
			<tr>
				<!--  <td><label for="scoreField">Your Score</label></td> -->
				<td><input type="hidden" id="scoreField" name="theScoreField"></td>
			</tr>
			<tr>
				<td><label for="picField">Your Picture: </label></td>
				<!--  <td><input type="text" id="picField" name="thePicField"></td> -->
				<td><img src="images/high_scores/Derp.png"></td>
			</tr>
			</table>
			<input type="submit" id="send" value="send" />
			<input type="button" id="cancel" value="cancel" />
		</form>
	</div>
	<div id="shadow" class="popup"></div>

	<div id="GameDiv">
		<canvas id="canvas" width="950" height="580"></canvas>
	</div>

	<%@ include file="footer.jsp"%>
</body>
</html>