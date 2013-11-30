function gameMenu(){


//	-------------------------------------------------------------

	//	variant definitions :
	
	//background (constants' determination): 
	var backgroundX = -width;
	var bgSpeed = 1;	//going left when positive
	var barGoingDown = true;
	var barXDist = 1/10;
	var barYStep = 1/9;
	var movingBarYPosition = height*(1-barYStep)
	var magicNumber = 270;	//it appears that the canvas isn't the actual visible area, until we get the right parameters, this will do
	

	
//		images :
	var laImage = new Image();
	var raImage = new Image();
	//var bgImage = new Image();
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

	//TODO - resize it right. I don't know how...
	menuBG.style.width = 2*width;	//twice the width of the canvas
	menuBG.style.height = height;
	menuBG_cover.width = width/2;
	menuBG_cover.height = height;
	movingBar.style.width = (width/2)*(1-2*barXDist)
	movingBar.style.height = 'auto';
	movingBar2.style.width = 30;
	var movingBarXPosition = magicNumber;	//width-movingBar.width-(barXDist*width/2);
	var movingBar2XPosition = magicNumber+15;
	
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

	

//	-------------------------------------------------------------

	//not doing anything!!!!!!!!!!!!!
//	bgImage.onload = function()
//	{
//	context.drawImage(bgImage, 0, 0);
//	};

//	logoImage.onload = function()
//	{
//	context.drawImage(logoImage, width/2-logoImage.width/2, 10);
//	};

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

//page-function implementations :


	this.clear = function(){
		context.clearRect(0, 0, width, height);
	}

	this.logic = function() {
		animateBG();
	}



	this.draw = function(){     	
		context.drawImage(menuBG ,  backgroundX , 0);
		context.drawImage(menuBG_cover ,  width-menuBG_cover.width , 0);
		context.drawImage(movingBar ,  movingBarXPosition , movingBarYPosition);
		context.drawImage(movingBar2 ,  movingBar2XPosition , height-movingBarYPosition);
		
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

		if(backgroundX <= -2*width)
		{
			backgroundX = -width;
		}
		
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


//	-------------------------------------------------------------

//event listener implementations :


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
