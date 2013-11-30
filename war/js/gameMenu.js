function gameMenu(){


//	-------------------------------------------------------------

//	variant definitions :
	var isOnGameMenu = true;

//		canvas :
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	var width = canvas.getAttribute('width');
	var height = canvas.getAttribute('height');

//		mouse :  


//		images :
	var laImage = new Image();
	var raImage = new Image();
	var bgImage = new Image();
	var logoImage = new Image();
	var playImage = new Image();
	var instructImage = new Image();
	var settingsImage = new Image();
	var creditsImage = new Image();

	laImage.src = "images/GameMainMenu/arrow_pointing_right.png";
	raImage.src = "images/GameMainMenu/arrow_pointing_left.png";
	bgImage.src = "images/GameMainMenu/Background.png";
	logoImage.src = "images/GameMainMenu/logo.png";
	playImage.src = "images/GameMainMenu/Play_regular.png";
	instructImage.src = "images/GameMainMenu/Instructions_regular.png";
	settingsImage.src = "images/GameMainMenu/Settings_regular.png";
	creditsImage.src = "images/GameMainMenu/Credits_regular.png";



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

	//background
	var backgroundX = 0;
	var bgSpeed = 1;	//going left when positive

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


	this.clear = function()
	{
		context.clearRect(0, 0, width, height);
	}

	this.logic = function() {
		move();
	}



	this.draw = function()
	{     	
		context.drawImage(bgImage, backgroundX , 0);
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


	function move()
	{
		backgroundX -= bgSpeed;

		if(backgroundX == -1 * width)
		{
			backgroundX = 0;
		}	  
	}   


//	-------------------------------------------------------------

//event listener implementations :


	function checkPos()
	{
		if(!isOnGameMenu)
			return;

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
		if(!isOnGameMenu)
			return;
		
		for(i = 0; i < buttonX.length; i++)
		{
			if(mouseX > buttonX[i] && mouseX < buttonX[i] + buttonWidth[i])
			{
				if(mouseY > buttonY[i] && mouseY < buttonY[i] + buttonHeight[i])
				{
					if (mouseY <= buttonY[1])
					{ 						
						isOnGameMenu = false;
						var event = document.createEvent("Event");
						event.initEvent("changePage", true, true);
						event.customData = "goToGame";
						window.dispatchEvent(event);
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
