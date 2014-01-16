<!DOCTYPE HTML>
<%@page import="datastoreEntities.Player"%>
<%@page import="datastoreEntities.GameScore"%>
<%@page import="dataBaseManager.DataBaseManager"%>
<%@page import="statistics.StatisticsManager"%>
<%@page import="java.util.List;"%>
<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<link type="text/css" rel="stylesheet" href="css/stylesheet.css" />
<link type="text/css" rel="stylesheet" href="css/form_css.css" />
<link type="text/css" rel="stylesheet" href="css/hs_table.css" />

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

	<table id="high_scores" class="filter-table flat-table-3">
		<tr>
			<td>				
				<form method="post">
					<table class="filter-table">
						<tr><td><label for="HighscoresByMapNum">Filter scores by map number:</label></td></tr>						
						<tr><td><input name="HighscoresByMapNum" type="number" min="1" max="9"
								required placeholder="Map number"></td></tr>
						<tr><td><button type="submit" id="submit">Submit</button></td></tr>
					</table>
				</form>				
			</td>
			<td>
				<form method="post">
					<table class="filter-table">
						<tr><td><label for="HighscoresByEmail">Filter scores by Email:</label> </td></tr>					
						<tr><td><input name="HighscoresByEmail" type="text", required
							placeholder="Email"> </td></tr>
						 <tr><td><button type="submit" id="submit">Submit</button> </td></tr>
					 </table>
				</form>			
			</td>
			<td>
				<form method="post">
					<table class="filter-table">
						<tr><td><label for="HighscoresByMyEmail">Display your scores only</label>				
						<input name="HighscoresByMyEmail" type="hidden"
							value=<%=(session.getAttribute("theEmailName")).toString()%>></input></td></tr>
						<tr><td><button type="submit" id="submit" >Submit</button></td></tr>
					</table>
				</form>
			</td>
		</tr>	
	</table>		

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

	<table id="high_scores" class="flat-table flat-table-3">
		<tr>
			<th>Picture</th>
			<th>First name</th>
			<th>Last name</th>
			<th>Map number</th>
			<th>Score</th>
		</tr>
		<%
			for (GameScore item : list) {
				Player p = DataBaseManager.getInstance().getPlayerByEmail(item.getEmail());
		%>
		<tr>
			<td><img src="<%=p.getPicture().toString()%>"></td>
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
