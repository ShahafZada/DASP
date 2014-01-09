function gameChoice(){

//	-------------------------------------------------------------

	//		variant definitions :

	//back-button:
	var backButtonSize = height/10;	// the button area is square
	var backButtonEnlargedSize = height/8;	// the button area is square
	var buttonDistFromEdges = height/16;




	var backButton = new Image();
	var backButton_over = new Image();

	backButton.src = "images/backButton.png";
	backButton_over.src = "images/backButton.png";


	//		Display settings	
	var maps = [];

	var map1 = new Image();
	var map2 = new Image();
	var map3 = new Image();
	var map4 = new Image();
	var map5 = new Image();
	var map6 = new Image();
	var map7 = new Image();
	var map8 = new Image();
	var map9 = new Image();

	map1.src = "images/gameChoice/Map1.png";
	map2.src = "images/gameChoice/Map2.png";
	map3.src = "images/gameChoice/Map3.png";
	map4.src = "images/gameChoice/Map4.png";
	map5.src = "images/gameChoice/Map5.png";
	map6.src = "images/gameChoice/Map6.png";
	map7.src = "images/gameChoice/Map7.png";
	map8.src = "images/gameChoice/Map8.png";
	map9.src = "images/gameChoice/Map9.png";

	maps.push(map1);
	maps.push(map2);
	maps.push(map3);
	maps.push(map4);
	maps.push(map5);
	maps.push(map6);
	maps.push(map7);
	maps.push(map8);
	maps.push(map9);

	var rows = 3;
	var cols = Math.ceil(maps.length / rows);

	var margin = 30;
	var imageBorder = 3
	var rightLimit = width - cols*margin;
	var leftLimit = 0;
	var topLimit = 0;
	var bottomLimit = (height - backButtonSize/2 - buttonDistFromEdges) - rows*margin;	
	var imageWidth = Math.abs(leftLimit-rightLimit) / cols;
	var imageHeight = Math.abs(topLimit-bottomLimit) / rows;


//	-------------------------------------------------------------

//	page-function implementations :

	this.clear = function(){
		context.clearRect(0, 0, width, height);
	}

	this.logic = function() {

	}


	this.draw = function(){

		drawMapsGrid();

		drawBackButton();
	}







	//-------------------------------------------------------------

	//other private functions :


	function drawBackButton(){
		if(isMouseOverBackButton())
			context.drawImage(backButton_over , width - backButtonEnlargedSize/2 - buttonDistFromEdges , height - backButtonEnlargedSize/2 - buttonDistFromEdges , backButtonEnlargedSize , backButtonEnlargedSize);
		else
			context.drawImage(backButton , width - backButtonSize/2 - buttonDistFromEdges , height - backButtonSize/2 - buttonDistFromEdges , backButtonSize , backButtonSize);
	}

	//Assuming each map image has the same size
	function drawMapsGrid(){
		context.beginPath();
		for(var x = 0; x < cols; x++)
			for(var y = 0; y < rows; y++){
				context.drawImage(maps[x*cols+y] , y*imageWidth + y*margin, x*imageHeight  + x*margin , imageWidth , imageHeight);
				context.rect( y*imageWidth + y*margin, x*imageHeight  + x*margin, imageWidth, imageHeight);				
				context.lineWidth = imageBorder;
				context.strokeStyle = 'black';
				context.stroke();
			}

	}

	function checkClick(){
		//Map click check
		for(var x = 0; x < cols; x++)
			for(var y = 0; y < rows; y++)
				if(isMouseOverMap(x,y))				
				{
					//clickMap(x,y);	//using a function to cancel the event listener doesn't work!!!!!!!!!!!!!!
//					if(y < 3)        mapNum = 0;
//					else if(y < 6)   mapNum = 3;
//					else if(y < 9)   mapNum = 6;
//					var mapNum = mapNum + x;
					mapNum = x*cols + y + 1;					
					//temporarily - until we'd have actual maps
					var event = document.createEvent("Event");
					event.initEvent("changePage", true, true);
					event.customData = "goToGame";
					window.dispatchEvent(event);
					this.removeEventListener("mouseup" , checkClick);
				}


		//Back-button check
		if(isMouseOverBackButton()){	//clicked on back arrow
			var event = document.createEvent("Event");
			event.initEvent("changePage", true, true);
			event.customData = "goToGameMenu";
			window.dispatchEvent(event);
			this.removeEventListener("mouseup", checkClick);

		}

	}

	function isMouseOverMap(x,y){
		if((mouseX > y*imageWidth + y*margin) && (mouseX < y*imageWidth + y*margin + imageWidth) &&
				(mouseY > x*imageHeight  + x*margin) && (mouseY <  x*imageHeight  + x*margin + imageHeight))	
			return true;
		else
			return false;
	}

	function clickMap(x,y){
		
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