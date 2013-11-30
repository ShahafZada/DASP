function gameMenu(){


//	-------------------------------------------------------------

	//	variant definitions :

	//background (constants' determination): 
	var backgroundX = 0;
	var bgSpeed = 1;	//going left when positive
	var barGoingDown = true;
	var barXDist = 1/10;	//distance from cover's edge
	var barYStep = 1/9;		//distance travelled in a frame

	//randomizing right-side effect thingy
	var booleans=[];
	var effectNames = [];

	effectNames.push("scissorEffect");	//2 bars
	effectNames.push("passByEffect");	//2 bars
	effectNames.push("spinEffect");		//1 bar
	effectNames.push("hourglass");		//1 bar
	effectNames.push("single");			//1 bar
	//want a new effect? add it here!

	randomizeEffect();



//	images :
	var laImage = new Image();
	var raImage = new Image();;
	var logoImage = new Image();
	var playImage = new Image();
	var instructImage = new Image();
	var settingsImage = new Image();
	var creditsImage = new Image();
	var menuBG = new Image();
	var menuBG_cover = new Image();
	var movingBar = new Image();
	var movingBar2 = new Image();


	laImage.src = "images/GameMainMenu/arrow_pointing_right.png";
	raImage.src = "images/GameMainMenu/arrow_pointing_left.png";
	logoImage.src = "images/GameMainMenu/logo.png";
	playImage.src = "images/GameMainMenu/Play_regular.png";
	instructImage.src = "images/GameMainMenu/Instructions_regular.png";
	settingsImage.src = "images/GameMainMenu/Settings_regular.png";
	creditsImage.src = "images/GameMainMenu/Credits_regular.png";

	menuBG.src = "images/GameMainMenu/gameMenu_bg.png";
	menuBG_cover.src = "images/GameMainMenu/gameMenu_bg_cover.png";
	movingBar.src = "images/GameMainMenu/movingBar.png";
	movingBar2.src = "images/GameMainMenu/movingBar.png";


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




//	buttons and misc data :
	//buttons (for 4 only - TODO: make it flexible)
	var buttonY = [100,140,180,220];
	var buttonX = [];
	buttonX.length =4;
	var buttonWidth = [];
	buttonWidth.length =4;
	var buttonHeight = [];
	buttonHeight.length=4;

	//arrows
	var arrowsX = [0,0];
	var arrowsY = [0,0];
	var arrowsWidth = 34;
	var arrowsHeight = 40;
	var arrowsVisible = false;
	var arrowsRotate = 0;


//	function resizeMenuOption(){

//	}


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
		}
		else if(isStrTrue("scissorEffect")){	//moving bar 2 is same length, but off-set
			movingBar2_width = movingBar_width;
			movingBar2XPosition = movingBarXPosition + barXDist*width/4;
		}
		movingBar2_height = movingBar2.height*movingBar2_width/movingBar2.width;
	}


	playImage.onload = function()
	{
		buttonX[0]=width/2-playImage.width/2;
		buttonWidth[0]=playImage.width;
		buttonHeight[0]=playImage.height;
		context.drawImage(playImage, buttonX[0], buttonY[0]);
	};

	instructImage.onload = function()
	{
		buttonX[1]=width/2-instructImage.width/2;
		buttonWidth[1]=instructImage.width;
		buttonHeight[1]=instructImage.height;
		context.drawImage(instructImage, buttonX[1], buttonY[1]);
	};

	settingsImage.onload = function()
	{
		buttonX[2]=width/2-settingsImage.width/2;
		buttonWidth[2]=settingsImage.width;
		buttonHeight[2]=settingsImage.height;
		context.drawImage(settingsImage, buttonX[2], buttonY[2]);
	};
	creditsImage.onload = function()
	{
		buttonX[3]=width/2-creditsImage.width/2;
		buttonWidth[3]=creditsImage.width;
		buttonHeight[3]=creditsImage.height;
		context.drawImage(creditsImage, buttonX[3], buttonY[3]);
	};


//	-------------------------------------------------------------

//	page-function implementations :


	this.clear = function(){
		context.clearRect(0, 0, width, height);
	}

	this.logic = function() {
		animateBG();
	}

//	var movingBar_width = (width/2)*(1-2*barXDist)
//	var movingBar_height = movingBar.height*(movingBar.height/movingBar_width);
//	var movingBar2_width = movingBar_width*0.75;

	this.draw = function(){
		//background
		context.drawImage(menuBG ,  backgroundX , 0 , menuBG_width , menuBG_height);
		context.drawImage(menuBG_cover ,  width/2 , 0 , menuBG_cover_width , menuBG_cover_height);
		
		//background side-effect
		if(isStrTrue("scissorEffect") || isStrTrue("passByEffect")){
			context.drawImage(movingBar ,  movingBarXPosition , movingBarYPosition , movingBar_width , movingBar_height);
			context.drawImage(movingBar2 ,  movingBar2XPosition , height-movingBarYPosition , movingBar2_width , movingBar2_height);
		}
		if(isStrTrue("single"))
			context.drawImage(movingBar ,  movingBarXPosition , movingBarYPosition , movingBar_width , movingBar_height);
		if(isStrTrue("hourglass")){
			context.drawImage(movingBar ,  movingBarXPosition , movingBarYPosition , movingBar_width * (Math.abs(movingBarYPosition - height/2))/(height/2) , movingBar_height);
		}
			
		
		//options ("buttons")
		context.drawImage(logoImage, width/2-logoImage.width/2, 10);
		context.drawImage(playImage, buttonX[0], buttonY[0]);
		context.drawImage(instructImage, buttonX[1], buttonY[1]);
		context.drawImage(settingsImage, buttonX[2], buttonY[2]);
		context.drawImage(creditsImage, buttonX[3], buttonY[3]);
		if(arrowsVisible){
			context.drawImage(laImage, arrowsX[0] - (arrowsWidth/2), arrowsY[0]-10, arrowsWidth, arrowsHeight);
			context.drawImage(raImage, arrowsX[1] - (arrowsWidth/2), arrowsY[1]-10, arrowsWidth, arrowsHeight);
		}

	}


	function animateBG()
	{
		backgroundX -= bgSpeed;

		if(backgroundX <= -menuBG.width/2)	//the middle is similar to the start
		{
			backgroundX = 0;
		}

		if(isStrTrue("scissorEffect") || isStrTrue("passByEffect") || isStrTrue("single") || isStrTrue("hourglass")){	//when bar 1 goes up and down
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
	}   

//	-------------------------------------------------------------

//	other private functions :

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

//	-------------------------------------------------------------

//	event listener implementations :


	function checkPos()
	{

		for(var i = 0; i < buttonX.length; i++)
		{
			if(mouseX > buttonX[i] && mouseX < buttonX[i] + buttonWidth[i])
			{
				if(mouseY > buttonY[i] && mouseY < buttonY[i] + buttonHeight[i])
				{	
					if (mouseY <= buttonY[1] )
					{
						playImage.src = "images/GameMainMenu/Play_over.png";

						instructImage.src = "images/GameMainMenu/Instructions_regular.png";
						settingsImage.src = "images/GameMainMenu/Settings_regular.png";
						creditsImage.src = "images/GameMainMenu/Credits_regular.png";
					}
					else if(mouseY <= buttonY[2])
					{
						instructImage.src = "images/GameMainMenu/Instructions_over.png";

						playImage.src = "images/GameMainMenu/Play_regular.png";
						settingsImage.src = "images/GameMainMenu/Settings_regular.png";
						creditsImage.src = "images/GameMainMenu/Credits_regular.png";
					}
					else if(mouseY <= buttonY[3])
					{
						settingsImage.src = "images/GameMainMenu/Settings_over.png";

						playImage.src = "images/GameMainMenu/Play_regular.png";
						instructImage.src = "images/GameMainMenu/Instructions_regular.png";
						creditsImage.src = "images/GameMainMenu/Credits_regular.png";
					}
					else
					{
						creditsImage.src = "images/GameMainMenu/Credits_over.png";

						playImage.src = "images/GameMainMenu/Play_regular.png";
						instructImage.src = "images/GameMainMenu/Instructions_regular.png";
						settingsImage.src = "images/GameMainMenu/Settings_regular.png";
					}

					arrowsVisible = true;
					arrowsX[0] = buttonX[i] - (arrowsWidth/2) - 2;
					arrowsY[0] = buttonY[i] + 2;
					arrowsX[1] = buttonX[i] + buttonWidth[i] + (arrowsWidth/2); 
					arrowsY[1] = buttonY[i] + 2;
				}	
			}
			else
			{
				arrowsVisible = false;
				playImage.src = "images/GameMainMenu/Play_regular.png";
				instructImage.src = "images/GameMainMenu/Instructions_regular.png";
				settingsImage.src = "images/GameMainMenu/Settings_regular.png";
				creditsImage.src = "images/GameMainMenu/Credits_regular.png";
			}
		}
	}

	function checkClick()
	{

		for(i = 0; i < buttonX.length; i++)
		{
			if(mouseX > buttonX[i] && mouseX < buttonX[i] + buttonWidth[i])
			{
				if(mouseY > buttonY[i] && mouseY < buttonY[i] + buttonHeight[i])
				{
					if (mouseY <= buttonY[1])
					{ 						
						var event = document.createEvent("Event");
						event.initEvent("changePage", true, true);
						event.customData = "goToGame";
						window.dispatchEvent(event);
						this.removeEventListener('mousemove' , checkPos);
						this.removeEventListener('mouseup' , checkClick);

					}
					else if(mouseY <= buttonY[2])
					{
						alert("lol noob tried to learn.... ");
					}
					else if(mouseY <= buttonY[3])
					{
						alert("lol noob tried to set.... ");
					}
					else
					{
						alert("lol noob tried to watch.... ");
					}
				}
			}
		}
	}


//	-------------------------------------------------------------

//	event listeners :

	canvas.addEventListener("mousemove", checkPos);
	canvas.addEventListener("mouseup", checkClick);

//	-------------------------------------------------------------
}
