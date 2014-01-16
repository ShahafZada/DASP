function gameCredits(){

//	-------------------------------------------------------------

	//		variant definitions :

	var creditsX = width/2;
	var creditsSpeed = 1;	//going up when positive
	var distanceWords = 40;

	var letUserWaitInSilence = false;
	var names = [];
	var namesY = [];
	var developerFont = "30px Harlow Solid Italic";
	var titleFont = "italic bold 10pt Courier";
	var developerColor = '#ffffff';
	var titleColor = '#eeeeee';

	var currentFrame = 0;
	var fadeStep = 0.01;

	names.push("Developers");
	reEnterTeam();
	//names.push("Resource Gathering");
	//reEnterTeam();
	names.push("Project Funding");
	reEnterTeam();
	names.push("Product Support");
	reEnterTeam();
	names.push("Emotional Support");
	reEnterTeam();
	//names.push("Product Testing");
	//reEnterTeam();
	names.push("Rubber-Duck Debugging");
	reEnterTeam();
	names.push("Special Thanks");
	names.push("Microsoft Corporation");
	names.push("Google");
	names.push("Adobe");
	names.push("Stack Overflow");
	names.push("Intel Corporation");
	names.push("Runtime spelling and syntax checker");
	names.push("Runtime spelling and syntax checker");
	names.push("Comfortable clothing");
	names.push("Tables");
	names.push("Pen and Paper");
	names.push("H2O");
	names.push("Chocolate flavoured Ice Cream");
	names.push("Darth Vader");
	names.push("Chuck Norris");
	names.push("Pikachu");
	names.push("Flying Ninja Panda Bear");
	names.push("That guy who said hello without knowing us");
	names.push("Free Coffe");
	names.push("Pirate Bay");
	names.push("The laws of physics");
	names.push("The year 2013 (R.I.P.)");
	names.push("Superconductors");
	names.push("Superfluids");
	names.push("Superpositions");
	names.push("Soup");
	names.push("Soap");
	names.push("SoundForge");
	names.push("Marshmallows that don't burn too easily");
	names.push("Series with good SFX/BGM to steal");
	names.push("");
	names.push("");
	names.push("");
	names.push("");
	names.push("");
	names.push("Very Special Thanks");
	reEnterTeam();
	names.push("");
	names.push("");
	names.push("");
	names.push("");
	names.push("");
	names.push("And you, for reading our credits");


	for(var i = 0 ; i < names.length ; i++) {
		namesY.push(Number(height) + i*distanceWords);
	}




	//back-button:
	var backButtonSize = height/10;	// the button area is square
	var backButtonEnlargedSize = height/8;	// the button area is square
	var buttonDistFromEdges = height/8;

	var backButton = new Image();
	var backButton_over = new Image();

	backButton.src = "images/backButton.png";
	backButton_over.src = "images/backButton.png";

	var creditsEpicBGM = new Audio("sounds/credits/Credits_BGM.mp3");
	var creditsEpicBGM = new Audio("sounds/credits/Credits_BGM.mp3");
	creditsEpicBGM.loop = true;
	creditsEpicBGM.volume = .12;
	creditsEpicBGM.load();
	creditsEpicBGM.play();
//	-------------------------------------------------------------

//	page-function implementations :

	this.clear = function(){
		context.clearRect(0, 0, width, height);
		context.fillStyle="#000000";
		context.fillRect(0,0,width,height);
	}

	this.logic = function() {
		if(!isLastCreditAtEnd()) {
			moveCredits();
		}		

		playBGM(creditsEpicBGM);

		if(currentFrame * fadeStep >= 1){
			letUserWaitInSilence = true;
		}
	}


	this.draw = function(){
		if(!letUserWaitInSilence)
		{
			if(!isLastCreditAtEnd()){
				drawCredits();
			}
			else{
				drawLastCredit();
			}
		}

		drawBackButton();
	}


	function isLastCreditAtEnd(){
		if(namesY[namesY.length-1] <= height/2) {
			return true;
		}
		else
			return false;
	}


	function drawLastCredit(){
		currentFrame++;
		context.font = developerFont;
		context.fillStyle = developerColor;
		context.textAlign="center";
		context.globalAlpha = 1 - currentFrame * fadeStep;
		context.fillText(names[names.length - 1], creditsX , namesY[namesY.length - 1]);
		context.globalAlpha = 1;
	}



	//-------------------------------------------------------------

	//other private functions :


	function reEnterTeam(){
		names.push("Aaron Wolde");
		names.push("Phillip Katz");
		names.push("Shahaf Zada");
		names.push("Daniel Portnoy");
		names.push("");
		names.push("");
		names.push("");
		names.push("");
		names.push("");
	}

	function moveCredits() {

		for(var i = 0; i < namesY.length; i ++) {
			namesY[i] -= creditsSpeed;
		}
	}


	function drawCredits() {	
		for(var i = 0; i < names.length; i++) {
			if(i == names.indexOf("Developers") ||
					//i == names.indexOf("Resource Gathering") ||
					i == names.indexOf("Project Funding") ||
					i == names.indexOf("Product Support") ||	
					i == names.indexOf("Emotional Support") ||
					//i == names.indexOf("Product Testing") ||
					i == names.indexOf("Special Thanks") ||	
					i == names.indexOf("Very Special Thanks") ||
					i == names.indexOf("Rubber-Duck Debugging")
			) {
				context.font = titleFont;
				context.fillStyle = titleColor;

			}
			else{
				context.font = developerFont;
				context.fillStyle = developerColor;
			}


			context.textAlign="center";
			context.fillText(names[i], creditsX , namesY[i]);
		}
	}



	function drawBackButton(){
		if(isMouseOverBackButton())
			context.drawImage(backButton_over , width - backButtonEnlargedSize/2 - buttonDistFromEdges , height - backButtonEnlargedSize/2 - buttonDistFromEdges , backButtonEnlargedSize , backButtonEnlargedSize);
		else
			context.drawImage(backButton , width - backButtonSize/2 - buttonDistFromEdges , height - backButtonSize/2 - buttonDistFromEdges , backButtonSize , backButtonSize);
	}


	function playBGM(sound){
		sound.play();
	}


	function checkClick(){

		//Back-button check
		if(isMouseOverBackButton()){	//clicked on back arrow
			var event = document.createEvent("Event");
			event.initEvent("changePage", true, true);
			event.customData = "goToGameMenu";
			window.dispatchEvent(event);
			this.removeEventListener("mouseup", checkClick);
			creditsEpicBGM.pause();
			creditsEpicBGM = undefined;

		}

	}

	function isMouseOverBackButton(){
		if((width - backButtonSize/2 - buttonDistFromEdges < mouseX && mouseX < width - buttonDistFromEdges + backButtonSize/2) &&
				(height - backButtonSize/2 - buttonDistFromEdges < mouseY && mouseY < height - buttonDistFromEdges + backButtonSize/2))	//clicked on back arrow
			return true;
		else
			return false;
	}


	//-------------------------------------------------------------

	//event listeners :

	canvas.addEventListener("mouseup", checkClick);

	//-------------------------------------------------------------




}