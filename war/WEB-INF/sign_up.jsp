<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<link type="text/css" rel="stylesheet" href="css/stylesheet.css" />
<script type="text/javascript" src="js/scripts.js"></script>
<title>Breaking Code</title>
</head>

<body>
	<%@ include file="header.jsp"%>
	<div id="center">

	<form action="sign_up">
		<table class="text">
			<tr>
				<th>Login Form</th>
			</tr>
			<tr>
				<td>Enter your User Name:</td>
				<td><input type=text name="userId"></td>
			</tr>
			<tr>
				<td>Enter your Password:</td>
				<td><input type="password" name="password"></td>
			</tr>
			<tr>
				<td><button onclick="signupFunction()">Sign up</button></td>
			</tr>
		</table>
	</form>
	
	
	
	<form id="player_form" action=SaveNewPlayer method="post">
    <fieldset class="text">
        <div>
            <label for="first_name">First Name</label>
            <input id="first_name" type="text" name="theFirstName" required placeholder="First name">
        </div>
        <div>
            <label for="last_name">Last Name</label>
            <input id="last_name" type="text" name="theLastName" required placeholder="Last name">
        </div>
        <div>
            <label for="password">Password</label>
            <input id="password" name="thePassword" type="password" required placeholder="Password">
        </div>
        <div>
            <label for="email">Email Address</label>
            <input id="email" name="theEmail" type="email" required placeholder="Email Address">
        </div>
        <div>
            <label for="age">Age</label>
            <input id="age" name="theAge" type="number" min="1" max="200" required placeholder="Your age">
        </div>
		<div>
            <label for="sex">Sex</label>
            <select id="sex" name="theSex">
            	<option>Male</option>
            	<option>Female</option>
       		</select>
        </div>

		<div>
            <label for="education">Education</label>
            <select id="education" name="theEducation">
            	<option>Kindergarten</option>
            	<option>Elementary school</option>
            	<option>High School</option>
            	<option>Student</option>
            	<option>Bachelor Degree</option>
            	<option>Masters Degree</option>
       		</select>
        </div>
        
		<div>
            <label for="Country">Country</label>
            <input id="country" name="theCountry" type="text" required placeholder="Your country">
        </div>
        
        <div>
            <label for="city">City</label>
            <input id="city" name="theCity" type="text" required placeholder="Your city">
        </div>
        
        <div>
            <label for="picture">Picture</label>
            <input id="picture" name="thePicture" required type="file">
        </div>

        <div>
            <label for="checkbox">
                <input id="checkbox" name="theCheckbox" required type="checkbox"> I've read the terms and conditions
            </label>

            <button type="submit">Submit</button>
        </div>
    </fieldset>
    <span class="message">${message}</span>
</form>
	
	
	</div>
	<%@ include file="footer.jsp"%>

</body>
</html>