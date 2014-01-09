function solutionsChoice () {

//	-------------------------------------------------------------

	//		variant definitions :

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

	map1.src = "images/view_solutions/Map1.png";
	map2.src = "images/view_solutions/Map2.png";
	map3.src = "images/view_solutions/Map3.png";
	map4.src = "images/view_solutions/Map4.png";
	map5.src = "images/view_solutions/Map5.png";
	map6.src = "images/view_solutions/Map6.png";
	map7.src = "images/view_solutions/Map7.png";
	map8.src = "images/view_solutions/Map8.png";
	map9.src = "images/view_solutions/Map9.png";

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
	var imageBorder = 3;
	var rightLimit = width - cols*margin;
	var leftLimit = 0;
	var topLimit = 0;
	var bottomLimit = height - rows*margin;	
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
	}


	//-------------------------------------------------------------

	//other private functions :

	//Assuming each map image has the same size
	function drawMapsGrid(){
		context.beginPath();
		for(var x = 0; x < cols; x++)
			for(var y = 0; y < rows; y++){
				context.drawImage(maps[x*cols+y] , y*imageWidth + y*margin, x*imageHeight  + x*margin , imageWidth , imageHeight);
				context.beginPath();
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
					mapNum = x*cols + y + 1;					
					var event = document.createEvent("Event");
					event.initEvent("changePage", true, true);
					event.customData = "goToSolutions";
					event.mapNum = mapNum;
					window.dispatchEvent(event);
					this.removeEventListener("mouseup" , checkClick);
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

	//-------------------------------------------------------------

	//event listeners :

	canvas.addEventListener("mouseup", checkClick);

	//-------------------------------------------------------------

}