function gameCredits(){

//	-------------------------------------------------------------

	//		variant definitions :

	var creditsX = width/2;
	var creditsSpeed = 1;	//going up when positive
	var distanceWords = 40;

	var names = [];
	var namesY = [];

	names.push("Developers:");
	names.push("Aaron Wolde");
	names.push("Phillip Katz");
	names.push("Shahaf Zada");
	names.push("Daniel Portnoy");

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
	}

	this.logic = function() {
		if(!(namesY[namesY.length-1] <= -height)) {
			moveCredits();
		}		
		
		playBGM(creditsEpicBGM);
	}


	this.draw = function(){
		drawBG();
		
		if(!(namesY[namesY.length-1] <= -height)) {
			drawCredits();
		}

		drawBackButton();
	}







	//-------------------------------------------------------------

	//other private functions :


	function moveCredits() {

		for(var i = 0; i < namesY.length; i ++) {
			namesY[i] -= creditsSpeed;
		}
	}
	
	function drawBG(){
		context.fillStyle="#000000";
		context.fillRect(0,0,width,height);
	}

	function drawCredits() {
		context.fillStyle = '#eeeeee';
		context.font = "italic bold 10pt Courier";
		context.textAlign="center";
		context.fillText(names[0], creditsX , namesY[0]);
		
		context.font="30px Harlow Solid Italic";
		context.fillStyle = 'white';
		for(var i = 1; i < names.length; i++) {
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