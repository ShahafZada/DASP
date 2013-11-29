document.addEventListener('DOMContentLoaded',domloaded,false);

function domloaded(){

//	-------------------------------------------------------------

//	variants
	
	 var canvas = document.getElementById("canvas");
     var context = canvas.getContext("2d");
     var width = canvas.getAttribute('width');
     var height = canvas.getAttribute('height');
     
     var mouseX;
     var mouseY;
     
     var hollow_circle_20px = new Image();
     hollow_circle_20px.src = "images/game/hollow_circle_20px.png";
     
//	-------------------------------------------------------------


// 	objects :

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
 		var edges = [];
 	}
 	
 	
 	function Edge(nodeID , color , weight){
 		this.nodeID = nodeID;	//the other edge being pointed to
 		
 		this.color
 		this.weight 
 	}

// 	-------------------------------------------------------------

// 	running :
 	
 	setInterval(routine, 30);
 	
 	function routine(){
 		context.clearRect(0, 0, width, height);
 		
 		for(var i = 0 ; i < nodes.length ; i++){
 			context.drawImage(hollow_circle_20px, nodes[i].x, nodes[i].y);
 			
 			for(var j = 0 ; j < nodes[i].edges.length ; j++)
 	 			if(nodes[i].id > nodes[i].edges[j].nodeID){
 	 				context.moveTo(nodes[i].x , nodes[i].y);
 	 				context.lineTo(nodes[i].edges[j].x , nodes[i].edges[j].y);
 	 			}
 	 				
 		}
 		
 	}
//	-------------------------------------------------------------
 	
 	
 	
 	
 	
 	
}