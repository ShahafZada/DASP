<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
 <%
  response.setHeader("Cache-Control","no-cache");
  response.setHeader("Cache-Control","no-store");
  response.setHeader("Pragma","no-cache");
  response.setDateHeader ("Expires", 0);
  %> 
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<img alt="logo" src="images/logo.png" id="logo">

<span id="login_icon">Welcome
<%
		String user_name = (String)session.getAttribute("theFullName");
		if(user_name == null) {
			request.getRequestDispatcher("/index.jsp").forward(request, response);
			return;
		}
		else {
       		out.println(user_name);
		}
%>
</span>
<table id="header_linkes">
	<tr>
		<td><img src="images/navigation/tool_bar.png"></td>
		<td><a href="index" title="Try solving it!"><img
				src="images/navigation/main_page.png"></a></td>
		<td><a href="view_solutions"
			title="Look at others techniques"><img
				src="images/navigation/view_solutions.png"></a></td>
		<td><a href="what_is_this" title="How could you not know!"><img
				src="images/navigation/what_is_this.png"></a></td>
		<td><a href="high_scores"
			title="The leaderboards of great minds!"><img
				src="images/navigation/high_scores.png"></a></td>
		<td><a href="learn" title="Mastery of knowledge"><img
				src="images/navigation/learn.png"></a></td>
		<td><a href="statistics"
			title="Yep there's a meaning behind it.."><img
				src="images/navigation/statistics.png"></a></td>
		<td><a href="contact_us"
			title="Suggestions? Complaints? Buying interests?"><img
				src="images/navigation/contact_us.png"></a></td>
		<td><a href="share" title="Let your friends know!"><img
				src="images/navigation/share.png"></a></td>
		<td><a href="donate"
			title="We need the money because of reasons"><img
				src="images/navigation/donate.png"></a></td>
		<td><a href="sign_up"
			title="For corporation owners with travlling salesmen problems"><img
				src="images/navigation/sign_up.png"></a></td>
		<td><img src="images/navigation/tool_bar.png"></td>
	</tr>
</table>
