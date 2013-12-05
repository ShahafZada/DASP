function game(){

//	-------------------------------------------------------------

//	variant definitions :
	var backButtonSize = height/10;	// the button area is square
	var backButtonEnlargedSize = height/8;	// the button area is square
	var buttonDistFromEdges = height/8;
	
	// lines :
	var lineWidth = "4";
	var lineColor = "cyan";
	var markedLineColor = "magenta";

//		images : 
	var current_regular = new Image();
	var current_over = new Image();
	var unmarkedNode_regular = new Image();
	var unmarkedNode_over = new Image();
	var markedNode_regular = new Image();
	var markedNode_over = new Image();
	current_regular.src = "images/game/hollow_circle_current_20px.png";
	current_over.src = "images/game/hollow_circle_current_over_30px.png";
	unmarkedNode_regular.src = "images/game/hollow_circle_20px.png";
	unmarkedNode_over.src = "images/game/hollow_circle_over_30px.png";
	markedNode_regular.src = "images/game/hollow_circle_marked_20px.png";
	markedNode_over.src = "images/game/hollow_circle_marked_over_30px.png";
	
	var backButton = new Image();
	var backButton_over = new Image();
	backButton.src = "images/backButton.png";
	backButton_over.src = "images/backButton_over.png";
	
	
//	current_regular.style.margin = "0 auto";
//	current_over.style.margin = "0 auto";
//	unmarkedNode_regular.style.margin = "0 auto";
//	unmarkedNode_over.style.margin = "0 auto";
//	markedNode_regular.style.margin = "0 auto";
//	markedNode_over.style.margin = "0 auto";

//	-------------------------------------------------------------



//	classes :

	function Node(id , x, y, radius , color, isStart){
		this.id = id;
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.color = color;
		if(isStart){
			this.isCurrent = true;	//is the 
			this.isMarked = false;
		}
		else{
			this.isCurrent = false;
			this.isMarked = false;
		}
		this.edges = [];
	}


	function Edge(pointedNode , color , weight){
		this.pointedNode = pointedNode;	//the other edge being pointed to
		
		this.color = color;
		this.weight = weight; 
	}

//	-------------------------------------------------------------

//	object creation :
	//this data is supposed to be taken from another file (a "stage" file)

	//TODO - initially set every node and edge


	var numOfNodes = 5;
	var nodes = [];
	nodes.length = numOfNodes;
	var xPosition = 0;
	var yPosition = 0;
	var normalRadius = 20;
	
	for(var i = 0 ; i < numOfNodes ; i++){
		
		randomPoint(i);
		if(i ==0)
			nodes[i] = new Node(i , xPosition , yPosition , 20 , "rgb(155, 0, 0)" , true);
		else
			nodes[i] = new Node(i , xPosition , yPosition , 20 , "rgb(155, 0, 0)" , false);

		for(var j = 0 ; j < numOfNodes ; j++){	//each node connects to every other node!
			if(i != j)							//creating edges from Node i to Node j
				 addEdge(i , j);
		}		
	}
	
	function addEdge(fromNodeID , toNode){
		var newEdge = new Edge(toNode , "rgb(15, 15, 15)" , 1);
		nodes[fromNodeID].edges.push(newEdge);
	}	

	function randomPoint(i){		
		var randX;
		var randY;
		var spreadFactor = width;
		var rightLimit = normalRadius;
		var leftLimit = width - normalRadius;
		var topLimit = normalRadius;
		var bottomLimit = height - normalRadius;	
		do{
			randX = Math.random();			
			randY = Math.random();
			xPosition =  randX*spreadFactor;
			yPosition =  randY*spreadFactor;
			
		}while(!isPositionOk(xPosition, yPosition, rightLimit, leftLimit, topLimit, bottomLimit)
				|| areNodesCollide(i, xPosition, yPosition, normalRadius));
		
	}
	function isPositionOk(x, y, right, left, top, bottom){
		if(x > right && x < left && y > top && y < bottom)
			return true;
		else
			return false;
	}
	
	function areNodesCollide(i,x,y,radius){
		var xDist;
		var yDist;
		var minRadius = 0;		
		for(i = i-1 ;i >= 0; i--)
		{			
			xDist = Math.abs(nodes[i].x - x);
			yDist = Math.abs(nodes[i].y - y);
			minRadius = Math.min(nodes[i].radius, radius);
			if(xDist < minRadius && yDist < minRadius)
			{
				//alert("BOOM!");				
				return true;
			}
		}
		return false;
	}

	
	
//	-------------------------------------------------------------



//	page-function implementations :


	this.clear = function(){
		context.clearRect(0, 0, width, height);
	}

	this.logic = function() {

	}



	this.draw = function(){     	
		drawPlayElements();
		
		//back button drawing
		
		drawBackButton();
		
	}

	

	
//	-------------------------------------------------------------



//	other private functions :

	
	function drawPlayElements(){     
		
		for(var i = 0 ; i < nodes.length ; i++){
			
			if(nodes[i].isCurrent){				
				if(mouseInNodeRange(nodes[i]))
					context.drawImage(current_over, nodes[i].x - current_over.width/2 , nodes[i].y - current_over.height/2);
				else
					context.drawImage(current_regular, nodes[i].x - current_regular.width/2 , nodes[i].y - current_regular.height/2);
			}
			
			if(nodes[i].isMarked){	
				if(mouseInNodeRange(nodes[i]))
					context.drawImage(markedNode_over, nodes[i].x - markedNode_over.width/2 , nodes[i].y - markedNode_over.height/2);
				else
					context.drawImage(markedNode_regular, nodes[i].x - markedNode_regular.width/2 , nodes[i].y - markedNode_regular.height/2);
			}
			else{					
				if(mouseInNodeRange(nodes[i]))
					context.drawImage(unmarkedNode_over, nodes[i].x - unmarkedNode_over.width/2 , nodes[i].y - unmarkedNode_over.height/2);
				else
					context.drawImage(unmarkedNode_regular, nodes[i].x - unmarkedNode_regular.width/2 , nodes[i].y - unmarkedNode_regular.height/2);
			}
				
			for(var j = 0 ; j < nodes[i].edges.length ; j++){				
				if(nodes[i].id > nodes[i].edges[j].pointedNode){	//connecting through one direction only
					var indexTo = nodes[i].edges[j].pointedNode;
					context.beginPath();
					context.lineWidth=lineWidth;
					context.strokeStyle=lineColor;
					context.moveTo(nodes[i].x , nodes[i].y);					
					context.lineTo(nodes[indexTo].x , nodes[indexTo].y);
					context.stroke();
				}
			}
			

			

		}
	}
	
	function drawBackButton(){
		if(isMouseOverBackButton())
			context.drawImage(backButton_over , width - backButtonEnlargedSize/2 - buttonDistFromEdges , height - backButtonEnlargedSize/2 - buttonDistFromEdges , backButtonEnlargedSize , backButtonEnlargedSize);
		else
			context.drawImage(backButton , width - backButtonSize/2 - buttonDistFromEdges , height - backButtonSize/2 - buttonDistFromEdges , backButtonSize , backButtonSize);
	}
	

	function mouseInNodeRange(node){
		var r = node.radius;
		var xDist = node.x - mouseX;
		var yDist = node.y - mouseY;
		
		if(r*r > xDist*xDist + yDist*yDist)
			return true;
		else
			return false;
	}
	
	
	function checkClick(){
		//Node click check
		for(var i = 0 ; i < nodes.length ; i++){
			if(mouseInNodeRange(nodes[i]))							
				nodes[i].isMarked = !nodes[i].isMarked;														
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

	
	function isMouseOverBackButton(){
		if((width - backButtonSize/2 - buttonDistFromEdges < mouseX && mouseX < width - buttonDistFromEdges + backButtonSize/2) &&
				(height - backButtonSize/2 - buttonDistFromEdges < mouseY && mouseY < height - buttonDistFromEdges + backButtonSize/2))	//clicked on back arrow
			return true;
		else
			return false;
	}
	
	function exit(){
		var event = document.createEvent("Event");
		event.initEvent("changePage", true, true);
		event.customData = "goToGameMenu";
		window.dispatchEvent(event);
		this.removeEventListener("mouseup", checkClick);
	}


//	-------------------------------------------------------------

//	event listeners :

	canvas.addEventListener("mouseup", checkClick);

//	-------------------------------------------------------------
	

}

