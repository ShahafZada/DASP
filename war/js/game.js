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
	var hollow_circle_20px = new Image();
	hollow_circle_20px.src = "images/game/hollow_circle_20px.png";

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
			context.drawImage(hollow_circle_20px, nodes[i].x, nodes[i].y);

			for(var j = 0 ; j < nodes[i].edges.length ; j++){
				if(nodes[i].id > nodes[i].edges[j].nodeID){	//connecting through one direction only
					context.moveTo(nodes[i].x , nodes[i].y);
					context.lineTo(nodes[i].edges[j].pointedNode.x , nodes[i].edges[j].pointedNode.y);
				}
			}

		}
	}


//	-------------------------------------------------------------



}