function game(){


     
//  	-------------------------------------------------------------
     
//	page-function implementations :


 	this.clear = function()
 	 {
 			context.clearRect(0, 0, width, height);
 	 }
 	 
 	this.logic = function() {
 		 move();
 	 }

 
     
     this.draw = function()
     {     	
        	context.drawImage(bgImage, backgroundX , 0 );
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
     



// 	-------------------------------------------------------------
     
     
     
}