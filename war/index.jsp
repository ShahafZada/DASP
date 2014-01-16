<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%
	response.setHeader("Cache-Control", "no-cache");
	response.setHeader("Cache-Control", "no-store");
	response.setHeader("Pragma", "no-cache");
	response.setDateHeader("Expires", 0);
%>
<html lang="en">

<head>
<meta charset="UTF-8" />
<!-- <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">  -->
<title>Breaking Code</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
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
<script type="text/javascript" src="js/Jquery/notify.js"></script>

</head>
<body>
	<%
		session = request.getSession(true);

		String full_name = (String) session.getAttribute("theFullName");

		if (full_name != null) {
			request.getRequestDispatcher("/WEB-INF/index.jsp").forward(
					request, response);

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

						<script type="text/javascript">$.notify("<%String err_msg = (String) request.getAttribute("err_message");
			if (err_msg != null)
				out.print(err_msg);%>", "error");
						</script>
						<script type="text/javascript">$.notify("<%String succ_msg = (String) request.getAttribute("succ_message");
			if (succ_msg != null)
				out.print(succ_msg);%>","success");
						</script>
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
							<label for="sex" class="yourSex">Sex</label> <select id="sex"
								name="theSex" required="required">
								<option>Male</option>
								<option>Female</option>
								<option>Yes Please</option>
							</select>
						</p>
						<p>
							<label for="education" class="yourEducation">Education</label> <select
								id="education" name="theEducation" required="required">
								<option>Kindergarten</option>
								<option>Elementary school</option>
								<option>High School</option>
								<option>Student</option>
								<option>Bachelor Degree</option>
								<option>Masters Degree</option>
							</select>
						</p>
						<p>
							<label for="country" class="yourCountry">Country</label> <select
								id="country" name="theCountry" required="required">
								<option>Afghanistan</option>
								<option>Albania</option>
								<option>Algeria</option>
								<option>American Samoa</option>
								<option>Andorra</option>
								<option>Angola</option>
								<option>Anguilla</option>
								<option>Antigua &amp; Barbuda</option>
								<option>Argentina</option>
								<option>Armenia</option>
								<option>Aruba</option>
								<option>Australia</option>
								<option>Austria</option>
								<option>Azerbaijan</option>
								<option>Bahamas</option>
								<option>Bahrain</option>
								<option>Bangladesh</option>
								<option>Barbados</option>
								<option>Belarus</option>
								<option>Belgium</option>
								<option>Belize</option>
								<option>Benin</option>
								<option>Bermuda</option>
								<option>Bhutan</option>
								<option>Bolivia</option>
								<option>Bonaire</option>
								<option>Bosnia &amp; Herzegovina</option>
								<option>Botswana</option>
								<option>Brazil</option>
								<option>British Indian Ocean Ter</option>
								<option>Brunei</option>
								<option>Bulgaria</option>
								<option>Burkina Faso</option>
								<option>Burundi</option>
								<option>Cambodia</option>
								<option>Cameroon</option>
								<option>Canada</option>
								<option>Canary Islands</option>
								<option>Cape Verde</option>
								<option>Cayman Islands</option>
								<option>Central African Republic</option>
								<option>Chad</option>
								<option>Channel Islands</option>
								<option>Chile</option>
								<option>China</option>
								<option>Christmas Island</option>
								<option>Cocos Island</option>
								<option>Colombia</option>
								<option>Comoros</option>
								<option>Congo</option>
								<option>Cook Islands</option>
								<option>Costa Rica</option>
								<option>Cote D'Ivoire</option>
								<option>Croatia</option>
								<option>Cuba</option>
								<option>Curacao</option>
								<option>Cyprus</option>
								<option>Czech Republic</option>
								<option>Denmark</option>
								<option>Djibouti</option>
								<option>Dominica</option>
								<option>Dominican Republic</option>
								<option>East Timor</option>
								<option>Ecuador</option>
								<option>Egypt</option>
								<option>El Salvador</option>
								<option>Equatorial Guinea</option>
								<option>Eritrea</option>
								<option>Estonia</option>
								<option>Ethiopia</option>
								<option>Falkland Islands</option>
								<option>Faroe Islands</option>
								<option>Fiji</option>
								<option>Finland</option>
								<option>France</option>
								<option>French Guiana</option>
								<option>French Polynesia</option>
								<option>French Southern Ter</option>
								<option>Gabon</option>
								<option>Gambia</option>
								<option>Georgia</option>
								<option>Germany</option>
								<option>Ghana</option>
								<option>Gibraltar</option>
								<option>Great Britain</option>
								<option>Greece</option>
								<option>Greenland</option>
								<option>Grenada</option>
								<option>Guadeloupe</option>
								<option>Guam</option>
								<option>Guatemala</option>
								<option>Guinea</option>
								<option>Guyana</option>
								<option>Haiti</option>
								<option>Hawaii</option>
								<option>Honduras</option>
								<option>Hong Kong</option>
								<option>Hungary</option>
								<option>Iceland</option>
								<option>India</option>
								<option>Indonesia</option>
								<option>Iran</option>
								<option>Iraq</option>
								<option>Ireland</option>
								<option>Isle of Man</option>
								<option>Israel</option>
								<option>Italy</option>
								<option>Jamaica</option>
								<option>Japan</option>
								<option>Jordan</option>
								<option>Kazakhstan</option>
								<option>Kenya</option>
								<option>Kiribati</option>
								<option>Korea North</option>
								<option>Korea South</option>
								<option>Kuwait</option>
								<option>Kyrgyzstan</option>
								<option>Laos</option>
								<option>Latvia</option>
								<option>Lebanon</option>
								<option>Lesotho</option>
								<option>Liberia</option>
								<option>Libya</option>
								<option>Liechtenstein</option>
								<option>Lithuania</option>
								<option>Luxembourg</option>
								<option>Macau</option>
								<option>Macedonia</option>
								<option>Madagascar</option>
								<option>Malaysia</option>
								<option>Malawi</option>
								<option>Maldives</option>
								<option>Mali</option>
								<option>Malta</option>
								<option>Marshall Islands</option>
								<option>Martinique</option>
								<option>Mauritania</option>
								<option>Mauritius</option>
								<option>Mayotte</option>
								<option>Mexico</option>
								<option>Midway Islands</option>
								<option>Moldova</option>
								<option>Monaco</option>
								<option>Mongolia</option>
								<option>Montserrat</option>
								<option>Morocco</option>
								<option>Mozambique</option>
								<option>Myanmar</option>
								<option>Nambia</option>
								<option>Nauru</option>
								<option>Nepal</option>
								<option>Netherland Antilles</option>
								<option>Netherlands (Holland, Europe)</option>
								<option>Nevis</option>
								<option>New Caledonia</option>
								<option>New Zealand</option>
								<option>Nicaragua</option>
								<option>Niger</option>
								<option>Nigeria</option>
								<option>Niue</option>
								<option>Norfolk Island</option>
								<option>Norway</option>
								<option>Oman</option>
								<option>Pakistan</option>
								<option>Palau Island</option>
								<option>Palestine</option>
								<option>Panama</option>
								<option>Papua New Guinea</option>
								<option>Paraguay</option>
								<option>Peru</option>
								<option>Philippines</option>
								<option>Pitcairn Island</option>
								<option>Poland</option>
								<option>Portugal</option>
								<option>Puerto Rico</option>
								<option>Qatar</option>
								<option>Republic of Montenegro</option>
								<option>Republic of Serbia</option>
								<option>Reunion</option>
								<option>Romania</option>
								<option>Russia</option>
								<option>Rwanda</option>
								<option>St Barthelemy</option>
								<option>St Eustatius</option>
								<option>St Helena</option>
								<option>St Kitts-Nevis</option>
								<option>St Lucia</option>
								<option>St Maarten</option>
								<option>St Pierre &amp; Miquelon</option>
								<option>St Vincent &amp; Grenadines</option>
								<option>Saipan</option>
								<option>Samoa</option>
								<option>Samoa American</option>
								<option>San Marino</option>
								<option>Sao Tome &amp; Principe</option>
								<option>Saudi Arabia</option>
								<option>Senegal</option>
								<option>Serbia</option>
								<option>Seychelles</option>
								<option>Sierra Leone</option>
								<option>Singapore</option>
								<option>Slovakia</option>
								<option>Slovenia</option>
								<option>Solomon Islands</option>
								<option>Somalia</option>
								<option>South Africa</option>
								<option>Spain</option>
								<option>Sri Lanka</option>
								<option>Sudan</option>
								<option>Suriname</option>
								<option>Swaziland</option>
								<option>Sweden</option>
								<option>Switzerland</option>
								<option>Syria</option>
								<option>Tahiti</option>
								<option>Taiwan</option>
								<option>Tajikistan</option>
								<option>Tanzania</option>
								<option>Thailand</option>
								<option>Togo</option>
								<option>Tokelau</option>
								<option>Tonga</option>
								<option>Trinidad &amp; Tobago</option>
								<option>Tunisia</option>
								<option>Turkey</option>
								<option>Turkmenistan</option>
								<option>Turks &amp; Caicos Is</option>
								<option>Tuvalu</option>
								<option>Uganda</option>
								<option>Ukraine</option>
								<option>United Arab Emirates</option>
								<option>United Kingdom</option>
								<option>United States of America</option>
								<option>Uruguay</option>
								<option>Uzbekistan</option>
								<option>Vanuatu</option>
								<option>Vatican City State</option>
								<option>Venezuela</option>
								<option>Vietnam</option>
								<option>Virgin Islands (Brit)</option>
								<option>Virgin Islands (USA)</option>
								<option>Wake Island</option>
								<option>Wallis &amp; Futana Is</option>
								<option>Yemen</option>
								<option>Zaire</option>
								<option>Zambia</option>
								<option>Zimbabwe</option>
							</select>
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