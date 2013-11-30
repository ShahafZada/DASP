function game(){

//	-------------------------------------------------------------

//	variant definitions :


//		canvas :
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	var width = canvas.getAttribute('width');
	var height = canvas.getAttribute('height');

//		mouse :  
	var mouseX;
	var mouseY;


//		images : 
	var current_regular = new image();
	var current_over = new image();
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
			nodes[i] = new Node(i , 5*(i+1) , 5*(i+1) , 2 , "rgb(155, 0, 0)" , true);
		
		nodes[i] = new Node(i , 30*(i+1) , 30*(i+1) , 2 , "rgb(155, 0, 0)" , false);

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
		drawElements();
	}

	function drawElements(){     	


		for(var i = 0 ; i < nodes.length ; i++){
			if(nodes[i].isCurrent){
				if(mouseInNodeRange(nodes[i]))
					context.drawImage(current_over, nodes[i].x, nodes[i].y);
				else
					context.drawImage(current_regular, nodes[i].x, nodes[i].y);
			}
			
			else if(nodes[i].isMarked){
				if(mouseInNodeRange(nodes[i]))
					context.drawImage(markedNode_over, nodes[i].x, nodes[i].y);
				else
					context.drawImage(markedNode_regular, nodes[i].x, nodes[i].y);
			}
			else{
				if(mouseInNodeRange(nodes[i]))
					context.drawImage(unmarkedNode_over, nodes[i].x, nodes[i].y);
				else
					context.drawImage(unmarkedNode_regular, nodes[i].x, nodes[i].y);
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
		var ydist = node.y - mouseY;
		
		if(r*r > xDist*xDist + yDist*yDist)
			return true;
		else
			return false;
	}

//	-------------------------------------------------------------



}