function game(){

//	canvas :
	var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    var width = canvas.getAttribute('width');
    var height = canvas.getAttribute('height');
    
//		mouse :  
    var mouseX;
    var mouseY;
     
//  	-------------------------------------------------------------
     
//	page-function implementations :


 	this.clear = function()
 	 {
 			context.clearRect(0, 0, width, height);
 	 }
 	 
 	this.logic = function() {
 		
 	 }

 
     
     this.draw = function(){     	
    	 
     }
     



// 	-------------------------------------------------------------
     
     
     
}