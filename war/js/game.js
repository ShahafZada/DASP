function game(){

	//TODO draw new images, including a new current node
//	-------------------------------------------------------------

//	variant definitions :

	//back-button:
	var backButtonSize = height/10;	// the button area is square
	var backButtonEnlargedSize = height/8;	// the button area is square
	var buttonDistFromEdges = height/8;

	// edges :
	var lineWidth = "4";
	var lineColor = "cyan";
	var markedLineColor = "cyan";
	var boldLineWidth = "8";	//must be larger than lineWidth
	var boldLineColor = "black";
//	var passedThroughEdges = [];
//	var
	//TODO add an array of edges in history (so they'll get drawn after the rest of the edges)

	//nodes:
	var nodeSize = height/10; //height and width are the same
	var mouseOverEnlarger = 0.3;
	var lastClickedID = 0;
	var clickHistory = [];
	clickHistory.push(lastClickedID);

//	images : 
	var current_regular = new Image();
	var current_over = new Image();
	var unmarkedNode_regular = new Image();
	var unmarkedNode_over = new Image();
	var markedNode_regular = new Image();
	var markedNode_over = new Image();

	var backButton = new Image();
	var backButton_over = new Image();


	var backButton = new Image();
	var backButton_over = new Image();

	current_regular.src = "images/game/hollow_circle_current_20px.png";
	unmarkedNode_regular.src = "images/game/hollow_circle_20px.png";
	markedNode_regular.src = "images/game/hollow_circle_marked_20px.png";
	backButton.src = "images/backButton.png";

//	-------------------------------------------------------------



//	classes :

	function Node(id , x, y, radius , color, isStart){
		this.id = id;
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.color = color;
		if(isStart){
			this.isStart = true;	//is the 
			this.isMarked = true;	
		}
		else{
			this.isStart = false;
			this.isMarked = false;
		}

		this.edges = [];
	}


	function Edge(pointedNode , color , weight){
		this.pointedNode = pointedNode;	//the other edge being pointed to
		this.isMarked = false;
		this.passedThrough = false;
		this.color = color;	//TODO call this instead of the global variable. change it in edges whenever a node gets clicked
		this.weight = weight; 
	}

//	-------------------------------------------------------------

//	object creation :
	//this data is supposed to be taken from another file (a "stage" file)



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



//	-------------------------------------------------------------



//	page-function implementations :


	this.clear = function(){
		context.clearRect(0, 0, width, height);
	}

	this.logic = function() {

		
		//check "closed" edges
		for(var i = 0 ; i < nodes.length - 1 ; i++){
			for(var j = i+1 ; j < nodes.length ; j++){
				if(nodes[i].isMarked && nodes[j].isMarked){
					for(var k = 0 ; k < nodes[i].edges.length ; k++){
						if(j == nodes[i].edges[k].pointedNode)
							nodes[i].edges[k].isMarked = true;
					}
					for(var k = 0 ; k < nodes[j].edges.length ; k++){
						if(i == nodes[j].edges[k].pointedNode)
							nodes[j].edges[k].isMarked = true;
					}

				}
			}

		}
	

	//checking if game's finished (i.e. all nodes marked)
	for(var i = 0 ; i < nodes.length ; i++){
		if(nodes[i].isMarked){
			if(i == nodes.length - 1){
				alert("YAAY!! :) \n your steps:" + clickHistory.length);
				exit();//yay, finished game!
			}
			else{
				continue;
			}
		}
		else
			break;
	}


}



this.draw = function(){     	
	drawEdges();
	drawNodes();

	//back button drawing
	drawBackButton();

}




//-------------------------------------------------------------



//other private functions :


function drawNodes(){     

	for(var i = 0 ; i < nodes.length ; i++){

		if(nodes[i].isStart){				
			drawNode(current_regular , nodes[i] , mouseInNodeRange(nodes[i]));
		}

		else if(nodes[i].isMarked){
			drawNode(markedNode_regular , nodes[i] , mouseInNodeRange(nodes[i]));
		}
		else{
			drawNode(unmarkedNode_regular , nodes[i] , mouseInNodeRange(nodes[i]));
		}

	}
}

function drawEdges(){
	for(var i = 0 ; i < nodes.length ; i++){
		for(var j = 0 ; j < nodes[i].edges.length ; j++){				
			if(nodes[i].id > nodes[i].edges[j].pointedNode){	//connecting through one direction only
				
				if(nodes[i].edges[j].passedThrough)
					drawAFuckingLine(i , j , boldLineColor , boldLineWidth);
				
				if(nodes[i].edges[j].isMarked)
					drawAFuckingLine(i , j , markedLineColor , lineWidth);
				else
					drawAFuckingLine(i , j , lineColor , lineWidth);	
				
				//TODO place the bold/marked lines above others
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
			clickNode(i);
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



function clickNode(i){
	if(i == lastClickedID)
		return;
	
	for(var j = 0 ; j < nodes[lastClickedID].edges.length ; j++){
		if(nodes[lastClickedID].edges[j].pointedNode == i){
			nodes[lastClickedID].edges[j].passedThrough = true;
			nodes[i].edges[getEdge(i , lastClickedID)].passedThrough = true;
			nodes[i].isMarked = true;
			lastClickedID = i;
			clickHistory.push(lastClickedID);
		}
		//TODO cancel node mark
	}
}

function getEdge(from , to){
	for(var i = 0 ; i < nodes[from].edges.length ; i++){
		if(nodes[from].edges[i].pointedNode == to){
			return i;	//edge index
		}	
	}

}



function isMouseOverBackButton(){
	if((width - backButtonSize/2 - buttonDistFromEdges < mouseX && mouseX < width - buttonDistFromEdges + backButtonSize/2) &&
			(height - backButtonSize/2 - buttonDistFromEdges < mouseY && mouseY < height - buttonDistFromEdges + backButtonSize/2))	//clicked on back arrow
		return true;
	else
		return false;
}



function drawNode(imageHolder , node , isMouseOver){
	if(isMouseOver)
		context.drawImage(imageHolder , node.x - nodeSize*(1 + mouseOverEnlarger)/2 , node.y - nodeSize*(1 + mouseOverEnlarger)/2 , nodeSize*(1 + mouseOverEnlarger) , nodeSize*(1 + mouseOverEnlarger));
	else
		context.drawImage(imageHolder , node.x - nodeSize/2 , node.y - nodeSize/2 , nodeSize , nodeSize);
}


function drawAFuckingLine(nodeID , edgeIndex , color , lineW){
	var indexTo = nodes[nodeID].edges[edgeIndex].pointedNode;
	context.beginPath();
	context.lineWidth = lineW;
	context.strokeStyle = color;
	context.moveTo(nodes[nodeID].x , nodes[nodeID].y);					
	context.lineTo(nodes[indexTo].x , nodes[indexTo].y);
	context.stroke();
}


function addEdge(fromNodeID , toNodeID){
	var newEdge = new Edge(toNodeID , lineColor , 1);
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
			|| areNodesCollide(i, xPosition, yPosition, (nodeSize/2)*(1+mouseOverEnlarger)));


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
	for(i = i-1 ;i >= 0; i--){			
		xDist = Math.abs(nodes[i].x - x);
		yDist = Math.abs(nodes[i].y - y);
		minRadius = Math.min(nodes[i].radius, radius);
		if(xDist < minRadius && yDist < minRadius){
			//alert("BOOM!");				
			return true;
		}
	}
	return false;
}



function exit(){
	var event = document.createEvent("Event");
	event.initEvent("changePage", true, true);
	event.customData = "goToGameMenu";
	window.dispatchEvent(event);
	this.removeEventListener("mouseup", checkClick);
}


//-------------------------------------------------------------

//event listeners :

canvas.addEventListener("mouseup", checkClick);

//-------------------------------------------------------------


}

