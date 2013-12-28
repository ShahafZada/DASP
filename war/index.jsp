<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<%
		session = request.getSession(true);
		String full_name = (String)session.getAttribute("theFullName");
		
        if (full_name != null) {
        	request.getRequestDispatcher("/WEB-INF/index.jsp").forward(request, response);
        }
%>
	<form action=sign_in  method="post">
		<table class="text">
			<tr>
				<th>Login Form</th>
			</tr>
			<tr>
				<td>Enter your Email:</td>
				<td><input type="email" name="userEmail"></td>
			</tr>
			<tr>
				<td>Enter your Password:</td>
				<td><input type="password" name="userPassword"></td>
			</tr>
			<tr>
				<td><button type="submit">Sign up</button></td>
			</tr>
		</table>
	</form>
	
	<form id="player_form" action=SaveNewPlayer method="post">
    <fieldset class="text">
        <div>
            <label for="first_name">First Name</label>
            <input id="first_name" type="text" name="theFirstName" size="15" required placeholder="First name">
        </div>
        <div>
            <label for="last_name">Last Name</label>
            <input id="last_name" type="text" name="theLastName" size="15" required placeholder="Last name">
        </div>
        <div>
            <label for="password">Password</label>
            <input id="password" name="thePassword" type="password" size="15" required placeholder="Password">
        </div>
        <div>
            <label for="email">Email Address</label>
            <input id="email" name="theEmail" type="email" size="15" required placeholder="Email Address">
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
            <input id="country" name="theCountry" type="text" size="15" required placeholder="Your country">
        </div>
        
        <div>
            <label for="city">City</label>
            <input id="city" name="theCity" type="text" size="15" required placeholder="Your city">
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
    <span class="signup_message">${message}</span>
</form>
