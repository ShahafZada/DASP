function game(){

//	-------------------------------------------------------------

//	variant definitions :
	var isOnGame = true;

//		canvas :
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	var width = canvas.getAttribute('width');
	var height = canvas.getAttribute('height');


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
			this.isMarker = false;
		}
		else{
			this.isCurrent = false;
			this.isMarker = false;
		}
		this.edges = [];
	}


	function Edge(pointedNode , color , weight){
		this.pointedNode = pointedNode;	//the other edge being pointed to

		this.color
		this.weight 
	}

//	-------------------------------------------------------------

//	object creation :
	//this data is supposed to be taken from another file (a "stage" file)

	//TODO - initially set every node and edge


	var numOfNodes = 5;

	var nodes = [];
	nodes.length = numOfNodes;


	for(var i = 0 ; i < numOfNodes ; i++){
		if(i ==0)
			nodes[i] = new Node(i , 5*(i+1) , 5*(i+1) , 20 , "rgb(155, 0, 0)" , true);
		
		nodes[i] = new Node(i , 30*(i+1) , 30*(i+1) , 20 , "rgb(155, 0, 0)" , false);

		for(var j = 0 ; j < numOfNodes ; j++){	//each node connects to every other node!
			if(i != j)	//creating edges from Node i to Node j
				 addEdge(i , j);
		}
	}

	function addEdge(fromNodeID , toNode){
		var newEdge = new Edge(toNode , "rgb(15, 15, 15)" , 1);
		nodes[fromNodeID].edges.push(newEdge);
	}

//	-------------------------------------------------------------



//	page-function implementations :


	this.clear = function()
	{
		context.clearRect(0, 0, width, height);
	}

	this.logic = function() {

	}



	this.draw = function(){     	
		drawPlayElements();
		context.drawImage(backButton , width - backButton.width , height - backButton.height);
	}

	
	
	
	
	function drawPlayElements(){     	


		for(var i = 0 ; i < nodes.length ; i++){
			
			if(nodes[i].isCurrent){
				if(mouseInNodeRange(nodes[i]))
					context.drawImage(current_over, nodes[i].x - current_over.width/2 , nodes[i].y - current_over.height/2);
				else
					context.drawImage(current_regular, nodes[i].x - current_regular.width/2 , nodes[i].y - current_regular.height/2);
			}

			else if(nodes[i].isMarked){
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
				if(nodes[i].id > nodes[i].edges[j].nodeID){	//connecting through one direction only
					context.moveTo(nodes[i].x , nodes[i].y);
					context.lineTo(nodes[i].edges[j].pointedNode.x , nodes[i].edges[j].pointedNode.y);
					context.stroke();
				}
			}

		}
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

//	-------------------------------------------------------------



}