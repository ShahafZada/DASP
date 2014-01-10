<!DOCTYPE HTML>
<%@page import="datastoreEntities.Player"%>
<%@page import="datastoreEntities.GameScore"%>
<%@page import="dbManager.DataBaseManager"%>
<%@page import="statistics.StatisticsManager"%>
<%@page import="java.util.List;"%>
<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<link type="text/css" rel="stylesheet" href="css/stylesheet.css" />
<link type="text/css" rel="stylesheet" href="css/form_css.css" />

<title>Breaking Code</title>
</head>

<body>
	<%@ include file="header.jsp"%>

	<%
		List<GameScore> list;
		String MapNum = null;
		String PlayerEmail = null;
		String myMail = null;
	%>

	<form method="post">
		<label for="HighscoresByMapNum">Get High Scores By Map number:</label>
		<input name="HighscoresByMapNum" type="number" min="1" max="9"
			required placeholder="Your Map number">
		<button type="submit">Submit</button>
	</form>

	<form method="post">
		<label for="HighscoresByEmail">Get High Scores By Email:</label> <input
			name="HighscoresByEmail" type="text" required
			placeholder="Your Email">
		<button type="submit">Submit</button>
	</form>

	<form method="post">
		<label for="HighscoresByMyEmail">Get Your High Scores:</label> <input
			name="HighscoresByMyEmail" type="hidden"
			value=<%=(session.getAttribute("theEmailName")).toString()%>></input>
		<button type="submit">Submit</button>
	</form>

	<%
		MapNum = request.getParameter("HighscoresByMapNum");
		PlayerEmail = request.getParameter("HighscoresByEmail");
		myMail = request.getParameter("HighscoresByMyEmail");

		if (myMail != null)
			list = DataBaseManager.getInstance().getScoreForEmail(myMail);
		else if (MapNum != null)
			list = StatisticsManager.getInstance().getScoreForMap(MapNum);
		else if (PlayerEmail != null)
			list = DataBaseManager.getInstance().getScoreForEmail(
					PlayerEmail);
		else
			list = DataBaseManager.getInstance().getAllScores(); //results from previous games
	%>

	<table id="high_scores">
		<tr>
			<td>Picture</td>
			<td>First name</td>
			<td>Last name</td>
			<td>Map number</td>
			<td>Score</td>
		</tr>
		<%
			for (GameScore item : list) {
				Player p = DataBaseManager.getInstance().getPlayerByEmail(item.getEmail());
		%>
		<tr>
			<td><img src="<%=p.getPicture().toString()%>" alt="s"></td>
			<td><%=p.getFirstName()%></td>
			<td><%=p.getLastName()%></td>
			<td><%=item.getmapNum()%></td>
			<td><%=item.score%></td>
		</tr>
		<%
			}
		%>
	</table>
	<%@ include file="footer.jsp"%>
</body>
</html>
