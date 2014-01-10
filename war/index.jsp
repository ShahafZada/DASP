<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
 <%
  response.setHeader("Cache-Control","no-cache");
  response.setHeader("Cache-Control","no-store");
  response.setHeader("Pragma","no-cache");
  response.setDateHeader ("Expires", 0);
  %> 
<html lang="en">

<head>
<meta charset="UTF-8" />
<!-- <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">  -->
<title>Breaking Code</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<script type="text/javascript" src="js/Jquery/pictureSelector.js"></script>
<link type="text/css" rel="stylesheet" href="css/stylesheet.css" />
<link rel="shortcut icon" href="../favicon.ico">
<link rel="stylesheet" type="text/css" href="css/demo.css" />
<link rel="stylesheet" type="text/css" href="css/style.css" />
<link rel="stylesheet" type="text/css" href="css/animate-custom.css" />
<link rel="stylesheet" type="text/css"
	href="css/lib/control/iconselect.css">
<script type="text/javascript" src="lib/control/iconselect.js"></script>
<script type="text/javascript" src="lib/iscroll.js"></script>

</head>
<body >
	<%
	
		session = request.getSession(true);
		
		String full_name = (String) session.getAttribute("theFullName");

		if (full_name != null) {
			request.getRequestDispatcher("/WEB-INF/index.jsp").forward(request, response);
			
		}

	%>
	<div class="container">
		<div id="container_demo">
			<a class="hiddenanchor" id="toregister"></a> <a class="hiddenanchor"
				id="tologin"></a>
			<div id="wrapper">
				<div id="login" class="animate form">
					<form action="sign_in" method="post" autocomplete="on">
						<h1>Log in</h1>
						<p>
							<label for="username" class="uname" data-icon="u"> Your
								email </label> <input id="username" name="userEmail" required="required"
								type="text" placeholder="ryuzaki@gmail.com" />
						</p>
						<p>
							<label for="password" class="youpasswd" data-icon="p">
								Your password </label> <input id="password" name="userPassword"
								required="required" type="password" placeholder="eg. 123456" />
						</p>
						<p class="login button">
							<input type="submit" value="Login" />
						</p>
						<p class="change_link">
							Not a member yet ? <a href="#toregister" class="to_register">Join
								us</a>
						</p>
					</form>
				</div>

				<div id="register" class="animate form">
					<form action=SaveNewPlayer method="post" autocomplete="on">
						<h1>Sign up</h1>
						<p>
							<label for="first_name" class="uname" data-icon="u">First
								Name</label> <input name="theFirstName" size="15" required="required"
								type="text" placeholder="Light" />
						</p>
						<p>
							<label for="last_name" class="uname" data-icon="u">Last
								Name</label> <input name="theLastName" size="15" required="required"
								type="text" placeholder="Yagami" />
						</p>
						<p>
							<label for="emailsignup" class="youmail" data-icon="e">Your
								email</label> <input id="emailsignup" name="theEmail" size="15"
								required="required" type="email" placeholder="kira@gmail.com" />
						</p>
						<p>
							<label for="passwordsignup" class="youpasswd" data-icon="p">Your
								password</label> <input name="thePassword" required="required"
								type="password" placeholder="eg. X8df!90EO" />
						</p>
						<p>
							<label for="age" class="yourAge">Age</label> <input id="age"
								name="theAge" type="number" min="1" max="200"
								required="required" />
						</p>
						<p>
							<label for="sex" class="yourSex">Sex</label> 
							<select id="sex" name="theSex" required="required" >
							<option>Male</option>
							<option>Female</option>
							</select>
						</p>
						<p>
							<label for="education" class="yourEducation">Education</label> 
							<select id="education" name="theEducation" required="required" >
							<option>Kindergarten</option>
							<option>Elementary school</option>
							<option>High School</option>
							<option>Student</option>
							<option>Bachelor Degree</option>
							<option>Masters Degree</option>
							</select>
						</p>
						<p>
							<label for="country" class="yourCountry">Country</label> <input
								id="country" name="theCountry" type="text" size="15"
								required="required" placeholder="Your Country">
						</p>
						<p>
							<label for="age" class="yourAge">City</label> <input id="city"
								name="theCity" type="text" size="15" required="required"
								placeholder="Your City" />
						</p>
						<p>
							<label for="picture" class="yourPicture">Picture</label> <input
								type="text" id="selected-text" name="thePicture" hidden="true"
								required="required" style="width: 65px;">
						<div id="my-icon-select"></div>


						<p>
							<label for="checkbox" class="yourCheckbox"></label> <input
								id="checkbox" name="theCheckbox" type="checkbox"
								required="required" /> I've read the terms and conditions
						</p>
						<p class="signin button">
							<input type="submit" value="Sign up" />
						</p>
						<p class="change_link">
							Already a member ? <a href="#tologin" class="to_register"> Go
								and log in </a>
						</p>
						</form>
				</div>
			</div>
		</div>
	</div>
</body>
</html>