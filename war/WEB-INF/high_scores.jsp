<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<%@page import="datastoreEntities.Player"%>
<%@page import="datastoreEntities.GameScore"%>
<%@page import="dbManager.DataBaseManager"%>
<%@page import="java.util.List;"%>
<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<link type="text/css" rel="stylesheet" href="css/stylesheet.css" />
<title>Breaking Code</title>
</head>

<body>
	<%@ include file="header.jsp"%>

	<%
		List<GameScore> list;
		list = DataBaseManager.getInstance().getAllScores(); //results from previous games
		DataBaseManager DBManager = DataBaseManager.getInstance();
		/*
		if (session.getAttribute("userName") == null) {
			//list = DataBaseManager.getInstance().getAllScores();
			//results from previous games:
		} else {
			//list = DataBaseManager.getInstance().getScoreForPlayer(session.getAttribute("userName").toString());	
			//results from your games:
		}
	*/
	%>
	<table id="high_scores">
		<tr>
			<td>Picture</td>
			<td>Name</td>
			<td>Score</td>
		</tr>
		<% for (GameScore item : list) { 
				Player p = DBManager.getPlayerByEmail( item.getEmail() );
				String Fname = p.getFirstName();
		%>
		<tr>
			<td><img src="images/high_scores/Derp.png"></td> 
			<td><%=Fname%></td>
			<td><%=item.score%></td>
		</tr>
		<% } %>
	</table>
	<%@ include file="footer.jsp"%>
</body>
</html>
