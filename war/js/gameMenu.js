function gameMenu(){


//	-------------------------------------------------------------

	//		variant definitions :

	//	background (constants' determination) : 
	var backgroundX = 0;
	var bgSpeed = 1;	//going left when positive
	var barGoingDown = true;
	var barXDist = 1/10;	//distance from cover's edge
	var barYStep = 1/9;		//distance travelled in a frame
	var barRotationFractionOfCircle = 1/36;
	var barRotationalStep = 0;
	var barAngle;

	//	title :
	var titleDistFromTopInRatio = 1/6;	//by default the title would be 1/6 down its height
	var titleToPageHeightRatio = 1/5;

	//	buttons :
	var buttonToPageHeightRatio = 1/15;
	var buttonOverToPageHeightRatio = 1/10;	//for mouse-over
	var buttonsStartHeight = 1/3;	//the height rate (relative to canvas height) where the first button is
	//adding a new button image requires the addition of its push to the buttons and buttonsOver array, its onload function definition, and printing function

	//	button arrows :
	var arrowToPageHeightRatio = 1/8;
	var arrowStep = (1/20)*width;

	//	other small extras 
	//glitches
	var glitchRisk = 0.05;
	var numOfGlitches = 9;
	var dErr = glitchRisk/numOfGlitches;


	//randomizing right-side effect thingy
	var booleans=[];
	var effectNames = [];

	effectNames.push("scissorEffect");		//2 bars
	effectNames.push("passByEffect");		//2 bars
	effectNames.push("passThroughEffect");	//4 bars
	effectNames.push("spinEffect");			//1 bar
	effectNames.push("radarEffect");			//1 bar
	effectNames.push("hourglassEffect");		//1 bar
	effectNames.push("singleEffect");			//1 bar
	//want a new effect? add it here!
	//all effects are filtered through the isStrTrue function, and checked before every step which involves the effect-bars

	randomizeEffect();



//	images :

	var menuBG = new Image();
	var menuBG_cover = new Image();
	var movingBar = new Image();
	var movingBar2 = new Image();

	var title_glitch1 = new Image();
	var title_glitch2 = new Image();
	var title_glitch3 = new Image();
	var title_glitch4 = new Image();
	var title_glitch5 = new Image();
	var title_glitch6 = new Image();
	var title_glitch7 = new Image();
	var title_glitch8 = new Image();
	var title_glitch9 = new Image();

	var title = new Image();
	var playButton = new Image();
	var instructionsButton = new Image();
	var settingsButton = new Image();
	var creditsButton = new Image();

	var playButtonOver = new Image();
	var instructionsButtonOver = new Image();
	var settingsButtonOver = new Image();
	var creditsButtonOver = new Image();

	var buttons = [];
	var buttonsOver = [];

	var leftArrow = new Image();
	var rightArrow = new Image();

	menuBG.src = "images/GameMainMenu/gameMenu_bg.png";
	menuBG_cover.src = "images/GameMainMenu/gameMenu_bg_cover.png";
	movingBar.src = "images/GameMainMenu/movingBar.png";
	movingBar2.src = "images/GameMainMenu/movingBar.png";

	title_glitch1.src = "images/GameMainMenu/Title_glitch1.png";
	title_glitch2.src = "images/GameMainMenu/Title_glitch2.png";
	title_glitch3.src = "images/GameMainMenu/Title_glitch3.png";
	title_glitch4.src = "images/GameMainMenu/Title_glitch4.png";
	title_glitch5.src = "images/GameMainMenu/Title_glitch5.png";
	title_glitch6.src = "images/GameMainMenu/Title_glitch6.png";
	title_glitch7.src = "images/GameMainMenu/Title_glitch7.png";
	title_glitch8.src = "images/GameMainMenu/Title_glitch8.png";
	title_glitch9.src = "images/GameMainMenu/Title_glitch9.png";

	title.src = "images/GameMainMenu/title.png";

	playButton.src = "images/GameMainMenu/Play_regular.png";
	instructionsButton.src = "images/GameMainMenu/Instructions_regular.png";
	settingsButton.src = "images/GameMainMenu/Settings_regular.png";
	creditsButton.src = "images/GameMainMenu/Credits_regular.png";

	playButtonOver.src = "images/GameMainMenu/Play_over.png";
	instructionsButtonOver.src = "images/GameMainMenu/Instructions_over.png";
	settingsButtonOver.src = "images/GameMainMenu/Settings_over.png";
	creditsButtonOver.src = "images/GameMainMenu/Credits_over.png";

	leftArrow.src = "images/GameMainMenu/arrow_pointing_right.png";
	rightArrow.src = "images/GameMainMenu/arrow_pointing_left.png";


	//image handling
	var menuBG_width;
	var menuBG_height = height;;

	var menuBG_cover_width = width/2;
	var menuBG_cover_height = height

	var movingBar_width = (width/2)*(1-2*barXDist);
	var movingBar_height;

	var movingBarYPosition = height*(1-barYStep);
	var movingBarXPosition = width-movingBar_width-(barXDist*width/2);

	var movingBar2_width;
	var movingBar2_height;
	var movingBar2XPosition;


	var titleXPosition;
	var titleYPosition;
	var title_width;
	var title_height = height * titleToPageHeightRatio;


//	buttons and misc data :

	buttons.push(playButton);
	buttons.push(instructionsButton);
	buttons.push(settingsButton);
	buttons.push(creditsButton);

	setButtonHeightAndYPosition(buttons , buttonToPageHeightRatio);

	//must be same order of normal button push!
	buttonsOver.push(playButtonOver);
	buttonsOver.push(instructionsButtonOver);
	buttonsOver.push(settingsButtonOver);
	buttonsOver.push(creditsButtonOver);

	setButtonHeightAndYPosition(buttonsOver , buttonOverToPageHeightRatio);



	var arrowHeight = arrowToPageHeightRatio * height;
	var arrowWidth;







//	-------------------------------------------------------------

//	onload functions : 







	//onload is called once the images are done loading into the page - then (and after) you can get their width/height
	menuBG.onload = function(){
		menuBG_width = menuBG.width*height/menuBG.height;	//keeping ratio
	}

	//no need
	//menuBG_cover.onload = function(){}

	movingBar.onload = function(){
		movingBar_height = movingBar.height*movingBar_width/movingBar.width;

		//same type of image, so we can pre-define here
		if(isStrTrue("passByEffect")){	//bar 2 is shorter, with no offset
			movingBar2_width = movingBar_width*0.75;
			movingBar2XPosition = movingBarXPosition;
			movingBar2_height = movingBar2.height*movingBar2_width/movingBar2.width;
		}
		else if(isStrTrue("scissorEffect")){	//moving bar 2 is same length, but off-set
			movingBar2_width = movingBar_width;
			movingBar2XPosition = movingBarXPosition + barXDist*width/4;
			movingBar2_height = movingBar2.height*movingBar2_width/movingBar2.width;
		}
		else if(isStrTrue("passThroughEffect")){
			movingBar2_width = movingBar_height;
			movingBar2_height = movingBar_height;
			movingBar2XPosition = movingBarXPosition + movingBar_width/2 - movingBar2_width/2;
		}
	}

	title.onload = function(){
		title_width = getTitleWidth(title);
		titleXPosition = width/2 - title_width/2;
		titleYPosition = titleDistFromTopInRatio * title_height;
	}

	playButton.onload = function(){setButtonStats(playButton , buttons);}

	instructionsButton.onload = function(){setButtonStats(instructionsButton , buttons);}

	settingsButton.onload = function(){setButtonStats(settingsButton , buttons);}

	creditsButton.onload = function(){setButtonStats(creditsButton , buttons);}


	playButtonOver.onload = function(){setButtonStats(playButtonOver , buttonsOver);}

	instructionsButtonOver.onload = function(){setButtonStats(instructionsButtonOver , buttonsOver);}

	settingsButtonOver.onload = function(){setButtonStats(settingsButtonOver , buttonsOver);}

	creditsButtonOver.onload = function(){setButtonStats(creditsButtonOver , buttonsOver);}


	leftArrow.onload = function(){	//technically could have been rightArrow.onload, because we assume they're the same width
		arrowWidth = leftArrow.width * (leftArrow.height/arrowHeight);
	}







//	-------------------------------------------------------------

//	page-function implementations :









	this.clear = function(){
		context.clearRect(0, 0, width, height);
	}

	this.logic = function() {
		animateBG();
		detectButtonOver();

	}


	this.draw = function(){
		//background
		context.drawImage(menuBG ,  backgroundX , 0 , menuBG_width , menuBG_height);
		context.drawImage(menuBG_cover ,  width/2 , 0 , menuBG_cover_width , menuBG_cover_height);

		//background side-effect
		if(isStrTrue("scissorEffect") || isStrTrue("passByEffect")){
			context.drawImage(movingBar ,  movingBarXPosition , movingBarYPosition , movingBar_width , movingBar_height);
			context.drawImage(movingBar2 ,  movingBar2XPosition , height-movingBarYPosition , movingBar2_width , movingBar2_height);
		}
		if(isStrTrue("passThroughEffect")){
			context.drawImage(movingBar ,  movingBarXPosition , movingBarYPosition , movingBar_width , movingBar_height);
			context.drawImage(movingBar2 ,  movingBar2XPosition , height-movingBarYPosition , movingBar2_width , movingBar2_height);
			context.drawImage(movingBar2 ,  movingBar2XPosition , movingBarYPosition/2 , movingBar2_width , movingBar2_height);
			context.drawImage(movingBar2 ,  movingBar2XPosition , height - movingBarYPosition/2 , movingBar2_width , movingBar2_height);
		}

		if(isStrTrue("singleEffect"))
			context.drawImage(movingBar ,  movingBarXPosition , movingBarYPosition , movingBar_width , movingBar_height);

		if(isStrTrue("hourglassEffect")){
			context.drawImage(movingBar ,  movingBarXPosition , movingBarYPosition , movingBar_width * (Math.abs(movingBarYPosition - height/2))/(height/2) , movingBar_height);
		}

		if(isStrTrue("spinEffect")){
			context.translate(width*3/4 , height/2);
			context.rotate(barAngle);
			context.drawImage(movingBar , -movingBar_width/2 , -movingBar_height/2 , movingBar_width , movingBar_height);
			context.rotate(-barAngle);
			context.translate(-width*3/4 , -height/2);
		}

		if(isStrTrue("radarEffect")){
			context.translate(width , 0);	// going to upper-right corner
			context.rotate(barAngle);
			context.drawImage(movingBar ,  -movingBar_height/2 , -movingBar_height/2 , movingBar_width , movingBar_height);
			context.rotate(-barAngle);
			context.translate(-width , 0);
			context.translate(width , height);	// going to lower-right corner
			context.rotate(barAngle);
			context.drawImage(movingBar ,  -movingBar_height/2 , -movingBar_height/2 , movingBar_width , movingBar_height);
			context.rotate(-barAngle);
			context.translate(-width , -height);
		}






		//		title :
		//in glitch: x , y and height are constant, but not width
		switch(glitch()){
		case 0: //default title
			context.drawImage(title , titleXPosition , titleYPosition , title_width , title_height);
			break;
		case 1:
			context.drawImage(title_glitch1 , titleXPosition , titleYPosition , getTitleWidth(title_glitch1) , title_height);
			break;
		case 2:
			context.drawImage(title_glitch2 , titleXPosition , titleYPosition , getTitleWidth(title_glitch2) , title_height);
			break;
		case 3:
			context.drawImage(title_glitch3 , titleXPosition , titleYPosition , getTitleWidth(title_glitch3) , title_height);
			break;
		case 4:
			context.drawImage(title_glitch4 , titleXPosition , titleYPosition , getTitleWidth(title_glitch4) , title_height);
			break;
		case 5:
			context.drawImage(title_glitch5 , titleXPosition , titleYPosition , getTitleWidth(title_glitch5) , title_height);
			break;
		case 6:
			context.drawImage(title_glitch6 , titleXPosition , titleYPosition , getTitleWidth(title_glitch6) , title_height);
			break;
		case 7:
			context.drawImage(title_glitch7 , titleXPosition , titleYPosition , getTitleWidth(title_glitch7) , title_height);
			break;
		case 8:
			context.drawImage(title_glitch8 , titleXPosition , titleYPosition , getTitleWidth(title_glitch8) , title_height);
			break;
		case 9:
			context.drawImage(title_glitch9 , titleXPosition , titleYPosition , getTitleWidth(title_glitch9) , title_height);
			break;
		default:
			alert("An error has occured. Error type: a glitch in the matrix");
		}




		//		options ("buttons") :

		for(var i = 0 ; i < buttons.length ; i++){
			if(buttonsOver[i].isOver){
				printButton(buttonsOver[i] , buttonsOver);
				buttonsOver[i].arrowProgress++;
				paintArrows(buttonsOver[i].yPosition , buttonsOver[i].arrowProgress , buttonsOver[i].widthStretch/2);
			}
			else{
				buttonsOver[i].arrowProgress = 0;
				printButton(buttons[i] , buttons);				
			}
		}

	}






//	-------------------------------------------------------------

//	other private functions :








	function animateBG(){
		backgroundX -= bgSpeed;

		if(backgroundX <= -menuBG_width/2)	//the middle is similar to the start
			backgroundX = 0;



		if(isStrTrue("scissorEffect") || isStrTrue("passByEffect") || isStrTrue("singleEffect") || isStrTrue("hourglassEffect") || isStrTrue("passThroughEffect")){	//when bar 1 goes up and down
			if(barGoingDown){
				movingBarYPosition += height*barYStep;
				if(movingBarYPosition > height){
					movingBarYPosition -= 2*height*barYStep;
					barGoingDown = false;
				}
			}
			else{
				movingBarYPosition -= height*barYStep;
				if(movingBarYPosition < 0){
					movingBarYPosition += 2*height*barYStep;
					barGoingDown = true;
				}
			}
		}

		if(isStrTrue("spinEffect") || isStrTrue("radarEffect")){
			barRotationalStep++;
			if(barRotationalStep * barRotationFractionOfCircle >= 1)
				barRotationalStep = 0;

			barAngle = 2* Math.PI * (barRotationalStep * barRotationFractionOfCircle);
		}
	}  

	function detectButtonOver(){
		for(var i = 0 ; i < buttons.length ; i++){
			if(buttonsOver[i].isOver)	//if icon is already enlarged, check it
				buttonsOver[i].isOver = isMouseOver(buttonsOver[i] , buttonsOver);
			else
				buttonsOver[i].isOver = isMouseOver(buttons[i] , buttons);

		}
	}



	function isStrTrue(str){

		for(var i = 0 ; i < effectNames.length ; i++){
			if(effectNames[i] == str)	//match found
				return booleans[i];
		}

		alert("error: keyword isn't registered");
		return false;
	}



	function randomizeEffect(){

		if(booleans.length > effectNames)
			booleans = [];

		var rand = Math.random();	//between 0 and 1
		for(var i = 0 ; i < effectNames.length ; i++){	//makes 1 of the variables true (even distribution of chances)
			if(i/effectNames.length < rand && rand < (i+1)/effectNames.length)
				booleans.push(true);
			else
				booleans.push(false);
		}

	}

	function glitch(){	//distorts the title in one way or another
		var glitchOccasion = Math.random();
		if(glitchOccasion < glitchRisk){
			var i = 0;
			while(glitchOccasion > 0){
				glitchOccasion -= dErr;
				i++;
			}
			return i;

			if(i > numOfGlitches)
				alert("error at purposely made glitches (yes, they're on purpose)");
		}

		return 0;
	}


	function getTitleWidth(titleImg){
		return titleImg.width * (title_height/titleImg.height);
	}

	function setButtonHeightAndYPosition(array , relativeHeight){
		for(var i = 0 ; i < array.length ; i++){
			array[i].heightStretch = height * relativeHeight;
			array[i].yPosition = (buttonsStartHeight*height + i * (height - buttonsStartHeight*height)/array.length) - array[i].heightStretch/2;
		}
	}

	function setButtonStats(menuButton , array){
		array[array.indexOf(menuButton)].widthStretch = array[array.indexOf(menuButton)].width * array[array.indexOf(menuButton)].heightStretch/array[array.indexOf(menuButton)].height;
		array[array.indexOf(menuButton)].xPosition = width/2 - array[array.indexOf(menuButton)].widthStretch/2;
		array[array.indexOf(menuButton)].isOver = false;
		array[array.indexOf(menuButton)].arrowProgress = 0;
	}

	function printButton(menuButton , array){
		context.drawImage(menuButton, array[array.indexOf(menuButton)].xPosition , array[array.indexOf(menuButton)].yPosition , array[array.indexOf(menuButton)].widthStretch , array[array.indexOf(menuButton)].heightStretch);
	}


	function isMouseOver(menuButton , array){
		if(array[array.indexOf(menuButton)].xPosition < mouseX && mouseX < array[array.indexOf(menuButton)].xPosition + array[array.indexOf(menuButton)].widthStretch)
			if(array[array.indexOf(menuButton)].yPosition < mouseY && mouseY < array[array.indexOf(menuButton)].yPosition + array[array.indexOf(menuButton)].heightStretch)
				return true;
		return false;
	}

	function paintArrows(arrowY , progress , halfButton){
		if(progress*arrowStep >= width/2 - halfButton){	//if left arrow's tip is getting into button's area
			context.drawImage(leftArrow , width/2 - halfButton - arrowWidth  , arrowY , arrowWidth , arrowHeight);
			context.drawImage(rightArrow , width/2 + halfButton  , arrowY , arrowWidth , arrowHeight);
			return;
		}
		
		context.drawImage(leftArrow , -arrowWidth + progress*arrowStep  , arrowY , arrowWidth , arrowHeight);
		context.drawImage(rightArrow , width -progress*arrowStep  , arrowY , arrowWidth , arrowHeight);
	}


//	-------------------------------------------------------------

//	event listener implementations :







	function checkClick(){
		if (playButtonOver.isOver){
			var event = document.createEvent("Event");
			event.initEvent("changePage", true, true);
			event.customData = "goToGame";
			window.dispatchEvent(event);
			this.removeEventListener('mouseup' , checkClick);
		}

		if(instructionsButtonOver.isOver){
			alert("lol noob tried to learn.... ");
		}

		if(settingsButtonOver.isOver){
			alert("lol noob tried to set.... ");
		}

		if(creditsButtonOver.isOver){
			alert("lol noob tried to watch.... ");
		}
	}


//	-------------------------------------------------------------

//	event listeners :
	//no need to check position - the position is global and updating all the time
	canvas.addEventListener("mouseup", checkClick);

//	-------------------------------------------------------------
}
