function game(){

//	-------------------------------------------------------------

//	variant definitions :
	
	//back-button:
	var backButtonSize = height/10;	// the button area is square
	var backButtonEnlargedSize = height/8;	// the button area is square
	var buttonDistFromEdges = height/8;
	
	//nodes:
	var nodeSize = height/10; //height and width are the same
	

//		images : 
	var current_regular = new Image();
	var current_over = new Image();
	var unmarkedNode_regular = new Image();
	var unmarkedNode_over = new Image();
	var markedNode_regular = new Image();
	var markedNode_over = new Image();
	
	var backButton = new Image();
	var backButton_over = new Image();
	
	current_regular.src = "images/game/hollow_circle_current_20px.png";
	current_over.src = "images/game/hollow_circle_current_over_30px.png";
	unmarkedNode_regular.src = "images/game/hollow_circle_20px.png";
	unmarkedNode_over.src = "images/game/hollow_circle_over_30px.png";
	markedNode_regular.src = "images/game/hollow_circle_marked_20px.png";
	markedNode_over.src = "images/game/hollow_circle_marked_over_30px.png";
	
	backButton.src = "images/backButton.png";
	backButton_over.src = "images/backButton_over.png";
	

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
	
	for(var i = 0 ; i < numOfNodes ; i++){
		
		randomPoint(i);
		if(i ==0)
			nodes[i] = new Node(i , xPosition , yPosition , nodeSize/2 , "rgb(155, 0, 0)" , true);
		else
			nodes[i] = new Node(i , xPosition , yPosition , nodeSize/2 , "rgb(155, 0, 0)" , false);

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
		var rightLimit = nodeSize/2;
		var leftLimit = width - nodeSize/2;
		var topLimit = nodeSize/2;
		var bottomLimit = height - nodeSize/2;	
		do{
			randX = Math.random();			
			randY = Math.random();
			xPosition =  randX*spreadFactor;
			yPosition =  randY*spreadFactor;
			
		}while(!isPositionOk(xPosition, yPosition, rightLimit, leftLimit, topLimit, bottomLimit)
				|| areNodesCollide(i, xPosition, yPosition, nodeSize/2));
		
		
		if(i ==0)
			nodes[i] = new Node(i , xPosition , yPosition , nodeSize/2 , "rgb(155, 0, 0)" , true);
		else
			nodes[i] = new Node(i , xPosition , yPosition , nodeSize/2 , "rgb(155, 0, 0)" , false);

		for(var j = 0 ; j < numOfNodes ; j++){	//each node connects to every other node!
			if(i != j)	//creating edges from Node i to Node j
				 addEdge(i , j);
		}

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
					drawNode(current_over , nodes[i]);
				else
					drawNode(current_regular , nodes[i]);
			}
			
			else if(nodes[i].isMarked){	
				if(mouseInNodeRange(nodes[i]))
					drawNode(markedNode_over , nodes[i]);
				else
					drawNode(markedNode_regular , nodes[i]);
			}
			else{					
				if(mouseInNodeRange(nodes[i]))
					drawNode(unmarkedNode_over , nodes[i]);
				else
					drawNode(unmarkedNode_regular , nodes[i]);
			}
			
			
			
			for(var j = 0 ; j < nodes[i].edges.length ; j++){
				if(nodes[i].id > nodes[i].edges[j].nodeID){	//connecting through one direction only
					context.moveTo(nodes[i].x , nodes[i].y);
					context.lineTo(nodes[i].edges[j].pointedNode.x , nodes[i].edges[j].pointedNode.y);
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
	
	function drawNode(imageHolder , node){
		context.drawImage(imageHolder , node.x - nodeSize/2 , node.y - nodeSize/2 , nodeSize , nodeSize);
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

