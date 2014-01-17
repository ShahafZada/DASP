<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<link type="text/css" rel="stylesheet" href="css/stylesheet.css" />
<link type="text/css" rel="stylesheet" href="css/contact_us.css" />
<script type="text/javascript" src="js/scripts.js"></script>
<title>Breaking Code</title>
</head>

<body>
	<%@ include file="header.jsp"%>
	<div id="form-main">
		<div id="form-div">
			<form class="form" id="form1">
				<p class="name" style = "margin-bottom:40px;">
					<label class="feedback-input" id="name" >
					<%out.println(user_name);%>
					</label>
					<!-- <input name="name" type="text"
						class="feedback-input"
						placeholder="Name" id="name" /> -->
				</p>				
				<p class="email" style = "margin-bottom:30px;">
					<label class="feedback-input" id="email" >
					<%
						session = request.getSession(true);
						String user_email = (String)session.getAttribute("theEmailName");
						if(user_email == null) {
							request.getRequestDispatcher("/WEB-INF/index.jsp").forward(
									request, response);
						}
						else {
				       		out.println(user_email);
						}
					%>
					</label>					
				</p>
				<p class="text">
					<textarea name="text"
						class="validate[required,length[6,300]] feedback-input"
						id="comment" placeholder="You're awesome!"></textarea>
				</p>


				<div class="submit">
					<input type="submit" value="SEND" id="button-blue" />
					<div class="ease"></div>
				</div>
			</form>
		</div>
	</div>
	<%@ include file="footer.jsp"%>
</body>
</html>