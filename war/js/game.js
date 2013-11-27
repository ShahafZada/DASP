document.addEventListener('DOMContentLoaded',domloaded,false);

function domloaded(){

	 var canvas = document.getElementById("canvas");
     var context = canvas.getContext("2d");
     var width = canvas.getAttribute('width');
     var height = canvas.getAttribute('height');
     
     var laImage = new Image();
     var raImage = new Image();
     var bgImage = new Image();
     var logoImage = new Image();
     var playImage = new Image();
     var instructImage = new Image();
     var settingsImage = new Image();
     var creditsImage = new Image();
     
     laImage.src = "images/GameMainManu/arrow_pointing_right.png";
     raImage.src = "images/GameMainManu/arrow_pointing_left.png";
     bgImage.src = "images/GameMainManu/Background.png";
     logoImage.src = "images/GameMainManu/logo.png";
     playImage.src = "images/GameMainManu/Play_regular.png";
     instructImage.src = "images/GameMainManu/Instructions_regular.png";
     settingsImage.src = "images/GameMainManu/Settings_regular.png";
     creditsImage.src = "images/GameMainManu/Credits_regular.png";
     
     var buttonY = [100,140,180,220];
     var buttonX = [];
     buttonX.length =4;
     var buttonWidth = [];
     buttonWidth.length =4;
     var buttonHeight = [];
     buttonHeight.length=4;
     
     bgImage.onload = function()
     {
    	    context.drawImage(bgImage, 0, 0);
     };
     
     logoImage.onload = function()
     {
    	    context.drawImage(logoImage, width/2-logoImage.width/2, 10);
     };
     
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
     
     var frames = 30;
     var timerId = 0;
     
     var backgroundX = 0;
     var speed = 1;
        
     timerId = setInterval(update, 1000/frames);

     var mouseX;
     var mouseY;
     
     var arrowsX = [0,0];
     var arrowsY = [0,0];
     var arrowsWidth = 34;
     var arrowsHeight = 40;
      
     var arrowsVisible = false;
     var arrowsRotate = 0;
     
     var fadeId = 0;
     var time = 0.0;
      
     canvas.addEventListener("mousemove", checkPos);
	 canvas.addEventListener("mouseup", checkClick);

     
     function update() 
     {
 			clear();
 			move();
 			draw();
 	 }
     
 	 function clear() 
 	 {
 			context.clearRect(0, 0, width, height);
 	 }

     function move()
     {
    		backgroundX -= speed;
    		
 			if(backgroundX == -1 * width)
 			{
 				backgroundX = 0;
 			}	  
     }
     
     function draw()
     {     	
        	context.drawImage(bgImage, backgroundX , 0 );
        	context.drawImage(logoImage, width/2-logoImage.width/2, 10);
    		context.drawImage(playImage, buttonX[0], buttonY[0]);
    		context.drawImage(instructImage, buttonX[1], buttonY[1]);
    		context.drawImage(settingsImage, buttonX[2], buttonY[2]);
    		context.drawImage(creditsImage, buttonX[3], buttonY[3]);
    		if(arrowsVisible == true){
    			context.drawImage(laImage, arrowsX[0] - (arrowsWidth/2), arrowsY[0]-10, arrowsWidth, arrowsHeight);
    			context.drawImage(raImage, arrowsX[1] - (arrowsWidth/2), arrowsY[1]-10, arrowsWidth, arrowsHeight);
    		}

     }
     
     function checkPos(mouseEvent)
     {
 			if(mouseEvent.pageX || mouseEvent.pageY == 0)
     		{
     			mouseX = mouseEvent.pageX - this.offsetLeft;
     			mouseY = mouseEvent.pageY - this.offsetTop;
     		}
     		else if(mouseEvent.offsetX || mouseEvent.offsetY == 0)
     		{
     			mouseX = mouseEvent.offsetX;
     			mouseY = mouseEvent.offsetY;
     		}
 			
     		for(var i = 0; i < buttonX.length; i++)
     		{
     			if(mouseX > buttonX[i] && mouseX < buttonX[i] + buttonWidth[i])
     			{
     				if(mouseY > buttonY[i] && mouseY < buttonY[i] + buttonHeight[i])
     				{	
     					if (mouseY <= buttonY[1] )
     					{
     						 playImage.src = "images/GameMainManu/Play_over.png";
     						 
		     		        instructImage.src = "images/GameMainManu/Instructions_regular.png";
		     		        settingsImage.src = "images/GameMainManu/Settings_regular.png";
		     		        creditsImage.src = "images/GameMainManu/Credits_regular.png";
     					}
     					else if(mouseY <= buttonY[2])
     					{
     						instructImage.src = "images/GameMainManu/Instructions_over.png";
     						
     						playImage.src = "images/GameMainManu/Play_regular.png";
		     		        settingsImage.src = "images/GameMainManu/Settings_regular.png";
		     		        creditsImage.src = "images/GameMainManu/Credits_regular.png";
     					}
     					else if(mouseY <= buttonY[3])
     					{
     						settingsImage.src = "images/GameMainManu/Settings_over.png";
     						
     						playImage.src = "images/GameMainManu/Play_regular.png";
		     		        instructImage.src = "images/GameMainManu/Instructions_regular.png";
		     		        creditsImage.src = "images/GameMainManu/Credits_regular.png";
     					}
     					else
     					{
     						creditsImage.src = "images/GameMainManu/Credits_over.png";
     						
     						playImage.src = "images/GameMainManu/Play_regular.png";
		     		        instructImage.src = "images/GameMainManu/Instructions_regular.png";
		     		        settingsImage.src = "images/GameMainManu/Settings_regular.png";
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
     				playImage.src = "images/GameMainManu/Play_regular.png";
     		        instructImage.src = "images/GameMainManu/Instructions_regular.png";
     		        settingsImage.src = "images/GameMainManu/Settings_regular.png";
     		        creditsImage.src = "images/GameMainManu/Credits_regular.png";
     			}
     		}
 	}
     
     function checkClick(mouseEvent)
     {
 		for(i = 0; i < buttonX.length; i++)
 		{
 			if(mouseX > buttonX[i] && mouseX < buttonX[i] + buttonWidth[i])
 			{
 				if(mouseY > buttonY[i] && mouseY < buttonY[i] + buttonHeight[i])
 				{
 					if (mouseY <= buttonY[1])
 					{
 						 alert("lol noob tried to play.... ");
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
}
