function solutions (mapNum) {		 	
//	variant definitions :

	//bottom toolbar:
	var toolbar = new Object();
	toolbar.y = height/8;	
	toolbar.buttons = [];
	toolbar.buttonsOver = [];

	//back-button:
	var toolbarButtonSize = height/10;	// the button area is square
	var toolbarButtonEnlargedSize = height/8;	// the button area is square

	//arrow-buttons (next & previous):
	var arrowsY = toolbar.y;
	var arrowsX = width/3;
	
    //universal
    var buttonDistFromEdges = height/16;       
	
	// edges :
	//var lineColor = "cyan";
	//var markedLineColor = "cyan";
    var lineWidth = 10;
	var boldLineWidth = lineWidth+4;
	var boldLineColor = "black";
//	var passedThroughEdges = [];

	//TODO add an array of edges in history (so they'll get drawn after the rest of the edges)

	//nodes:
	var nodes = [];
	//var nodeSize = height/10; //height and width are the same
	var mouseOverEnlarger = 0.3;
	var lastClickedID = 0;
    var stepsPlayed = 0;
	var solutionPath = [];
//	var clickHistory = [1,2,3,4];
	var clickHistory = [];			
	loadSolution();
	var step = 0;
	
	//solutionPath.push(lastClickedID);

//	images : 
	var startNode = new Image();
	var start_currentNode = new Image();
	var markedNode = new Image();
	var marked_currentNode = new Image();
	var nonvisitedNode = new Image();

	var backButton = new Image();
	var backButton_over = new Image();
	
	var nextArrow = new Image();
	var nextArrow_over = new Image();
	var previousArrow = new Image();
	var previousArrow_over = new Image();


	startNode.src = "images/game/start_node.png";
	start_currentNode.src = "images/game/start_current_node.png";
	markedNode.src = "images/game/marked_node.png";
	marked_currentNode.src = "images/game/marked_current_node.png";
	nonvisitedNode.src = "images/game/nonvisited_node.png";
	
	backButton.src = "images/backButton.png";
	backButton_over.src = "images/backButton.png";
	
	nextArrow.src = "images/view_solutions/arrow_pointing_right.png";
	nextArrow_over.src = "images/view_solutions/arrow_pointing_right.png";
	previousArrow.src = "images/view_solutions/arrow_pointing_left.png";
	previousArrow_over.src = "images/view_solutions/arrow_pointing_left.png";
	
	toolbar.buttons.push(backButton);
	toolbar.buttons.push(nextArrow);
	toolbar.buttons.push(previousArrow);
	
	toolbar.buttonsOver.push(backButton_over);
	toolbar.buttonsOver.push(nextArrow);
	toolbar.buttonsOver.push(previousArrow);
//	-------------------------------------------------------------

//	classes :

	function Node(id , x, y, radius , color, isStart , edges){
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

		this.edges = edges;
	}

	function Edge(pointedNodeID , color , weight){
		this.pointedNodeID = pointedNodeID;	//the other edge being pointed to
		this.isMarked = false;
		this.passedThrough = false;
		this.color = color;	//TODO call this instead of the global variable. change it in edges whenever a node gets clicked
		this.weight = weight; 
	}

//	-------------------------------------------------------------

//	object creation :
	//this data is supposed to be taken from another file (a "stage" file)

	//Send request - get layout of map: mapNum
	$.ajax({
		url : "CreateMap",
		async: false,
		data : { map_num : mapNum },
		error : function(data) {
			console.log("Error: ", data);
		}  ,
		type : "post",
		timeout : 30000
	});

	//Receive response from server
	setTimeout(function() {
	$.ajax({			
		url : "CreateMap",
		type: "get",
		async: false,
		dataType : "json",
		contentType:"application/json",
		timeout : 150000,
		error : function() {
			console.log("Error: loading the map failed");			
			var event = document.createEvent("Event");
			event.initEvent("changePage", true, true);
			event.customData = "goToSolutionsChoice";
			window.dispatchEvent(event);
		},
		success : function(data) {
			nodes = data;
		}
	});
	} , 1000);


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
						if(j == nodes[i].edges[k].pointedNodeID)
							nodes[i].edges[k].isMarked = true;
					}
					for(var k = 0 ; k < nodes[j].edges.length ; k++){
						if(i == nodes[j].edges[k].pointedNodeID)
							nodes[j].edges[k].isMarked = true;
					}

				}
			}

		}


		//checking if game's finished (i.e. all nodes marked)
		for(var i = 0 ; i < nodes.length ; i++){
			if(nodes[i].isMarked){
				if(i == nodes.length - 1){
					//alert("YAAY!! :) \n your steps:" + clickHistory.length);
					//exit();//yay, finished game!
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
//		drawToolbar();

		drawBackButton();        
		drawNextArrowButton();
		drawPreviousArrowButton();

        context.font="30px Arial";
        context.fillText("Steps: " + stepsPlayed, 10 , 50);

	}

//	-------------------------------------------------------------

//	other private functions :


	function drawNodes(){     

		for(var i = 0 ; i < nodes.length ; i++){

			if(nodes[i].isStart){
				if(nodes[i].id == lastClickedID)	//current
					drawNode(start_currentNode , nodes[i] , mouseInNodeRange(nodes[i]));

				else
					drawNode(startNode , nodes[i] , mouseInNodeRange(nodes[i]));
			}

			else if(nodes[i].isMarked){
				if(nodes[i].id == lastClickedID)	//current
					drawNode(marked_currentNode , nodes[i] , mouseInNodeRange(nodes[i]));
				else
					drawNode(markedNode , nodes[i] , mouseInNodeRange(nodes[i]));
			}

			else{
				drawNode(nonvisitedNode , nodes[i] , mouseInNodeRange(nodes[i]));
			}

		}
	}

	function drawEdges(){
		for(var i = 0 ; i < nodes.length ; i++){
			for(var j = 0 ; j < nodes[i].edges.length ; j++){				
				if(nodes[i].id > nodes[i].edges[j].pointedNodeID){	//connecting through one direction only

					if(nodes[i].edges[j].passedThrough)
						drawAFuckingLine(i , j , boldLineColor , boldLineWidth);

					if(nodes[i].edges[j].isMarked)
						drawAFuckingLine(i , j , nodes[i].edges[j].color , lineWidth);
					else
						drawAFuckingLine(i , j , nodes[i].edges[j].color , lineWidth);

					//TODO place the bold/marked lines above others
				}
			}
		}
	}


/*/
	function drawToolbar(){
		var buttonSpace = width / toolbar.buttons.length-1;
		for(var i = toolbar.buttons.length; i > 0; i--){
			
			context.drawImage(toolbar.buttons[i-1] , width - buttonSpace*i , height - toolbarButtonSize/2 - buttonDistFromEdges , toolbarButtonSize , toolbarButtonSize);
		}
			//context.drawImage(toolbar.buttons[i-1] , width - toolbarButtonSize/2 - buttonDistFromEdges*(2*i) , height - toolbarButtonSize/2 - buttonDistFromEdges , toolbarButtonSize , toolbarButtonSize);
			
		
	}
/*/
	function drawButton(){		
        if(isMouseOverBackButton())
            context.drawImage(backButton_over , width - toolbarButtonEnlargedSize/2 - buttonDistFromEdges , height - toolbarButtonEnlargedSize/2 - buttonDistFromEdges , toolbarButtonEnlargedSize , toolbarButtonEnlargedSize);
        else
			context.drawImage(backButton , width - toolbarButtonSize/2 - buttonDistFromEdges , height - toolbarButtonSize/2 - buttonDistFromEdges , toolbarButtonSize , toolbarButtonSize);
	}
	
	function drawBackButton(){
        if(isMouseOverBackButton())
            context.drawImage(backButton_over , width - toolbarButtonEnlargedSize/2 - buttonDistFromEdges , height - toolbarButtonEnlargedSize/2 - buttonDistFromEdges , toolbarButtonEnlargedSize , toolbarButtonEnlargedSize);
        else
			context.drawImage(backButton , width - toolbarButtonSize/2 - buttonDistFromEdges , height - toolbarButtonSize/2 - buttonDistFromEdges , toolbarButtonSize , toolbarButtonSize);
	}
	
	function drawNextArrowButton(){
        if(isMouseOverNextArrowButton())
            context.drawImage(nextArrow_over , width - toolbarButtonEnlargedSize/2 - arrowsX , height - toolbarButtonEnlargedSize/2 - buttonDistFromEdges , toolbarButtonEnlargedSize , toolbarButtonEnlargedSize);
        else
			context.drawImage(nextArrow , width - toolbarButtonSize/2 - arrowsX , height - toolbarButtonSize/2 - buttonDistFromEdges , toolbarButtonSize , toolbarButtonSize);
	}
	
	function drawPreviousArrowButton(){
        if(isMouseOverPreviousArrowButton())
            context.drawImage(previousArrow_over , width - toolbarButtonEnlargedSize/2 - arrowsX*2 , height - toolbarButtonEnlargedSize/2 - buttonDistFromEdges , toolbarButtonEnlargedSize , toolbarButtonEnlargedSize);
        else
			context.drawImage(previousArrow , width - toolbarButtonSize/2 - arrowsX*2 , height - toolbarButtonSize/2 - buttonDistFromEdges , toolbarButtonSize , toolbarButtonSize);
	}


	function mouseInNodeRange(node){
		var r = node.radius;
		var xDist = node.x + node.radius - mouseX;
		var yDist = node.y + node.radius - mouseY;

		if(r*r > xDist*xDist + yDist*yDist)
			return true;
		else
			return false;
	}


	function checkClick(){		
		//Back-button check
		if(isMouseOverBackButton()){	//clicked on back arrow            
		    var event = document.createEvent("Event");
		    event.initEvent("changePage", true, true);
            event.customData = "goToSolutionsChoice";
            window.dispatchEvent(event);
            this.removeEventListener("mouseup", checkClick);        
		}
		
		if(isMouseOverNextArrowButton())
				nextStep();		
		
		if(isMouseOverPreviousArrowButton())
			previousStep();		
	}



	function clickNode(i){	
		for(var j = 0 ; j < nodes[lastClickedID].edges.length ; j++){
			if(nodes[lastClickedID].edges[j].pointedNodeID == i){
                stepsPlayed += nodes[i].edges[getEdgeIndex(i , lastClickedID)].weight;
				nodes[lastClickedID].edges[j].passedThrough = true;
				nodes[i].edges[getEdgeIndex(i , lastClickedID)].passedThrough = true;
				nodes[i].isMarked = true;
				lastClickedID = i;
				//clickHistory.push(lastClickedID);
			}
			//TODO cancel node mark
		}		
	}

	function unclickNode(){
        if(solutionPath.length == 1)    //back at start node
            return;


        var nodeWasVisitedBefore = false;
        var prevNodeVisitedCurrentNodeBefore = false;
        for(var i = 0 ; i < solutionPath.length - 1 ; i++){
            if(solutionPath[i] == lastClickedID){
                nodeWasVisitedBefore = true;
                if(i != 0){
                    if(solutionPath[i - 1] == solutionPath[solutionPath.length - 2]){
                        prevNodeVisitedCurrentNodeBefore = true;
                    }
                }
                if(i != solutionPath.length - 2){
                    if(solutionPath[i + 1] == solutionPath[solutionPath.length - 2]){
                        prevNodeVisitedCurrentNodeBefore = true;
                    }
                }
            }
        }
        if(!nodeWasVisitedBefore){
            nodes[lastClickedID].isMarked = false;
        }
        //otherwise, we leave it marked
        if(!prevNodeVisitedCurrentNodeBefore){
            nodes[lastClickedID].edges[getEdgeIndex(lastClickedID , solutionPath[solutionPath.length - 2])].passedThrough = false;
            nodes[solutionPath[solutionPath.length - 2]].edges[getEdgeIndex(solutionPath[solutionPath.length - 2] , lastClickedID)].passedThrough = false;
            nodes[lastClickedID].edges[getEdgeIndex(lastClickedID , solutionPath[solutionPath.length - 2])].isMarked = false;
            nodes[solutionPath[solutionPath.length - 2]].edges[getEdgeIndex(solutionPath[solutionPath.length - 2] , lastClickedID)].isMarked = false;
        }
        //otherwise, we leave them (edges in both directions) marked

        stepsPlayed -= nodes[solutionPath[solutionPath.length - 1]].edges[getEdgeIndex(solutionPath[solutionPath.length - 1] , solutionPath[solutionPath.length - 2])].weight;

        var clickedNode = solutionPath[solutionPath.length-1];
		solutionPath.pop();
		clickHistory.unshift(clickedNode);	
        lastClickedID = solutionPath[solutionPath.length - 1];
    }

	function getEdgeIndex(from , to){
		for(var i = 0 ; i < nodes[from].edges.length ; i++){
			if(nodes[from].edges[i].pointedNodeID == to){
				return i;	//edge index
			}	
		}

	}

	function isMouseOverBackButton(){
		if((width - toolbarButtonSize/2 - buttonDistFromEdges < mouseX && mouseX < width - buttonDistFromEdges + toolbarButtonSize/2) &&
				(height - toolbarButtonSize/2 - buttonDistFromEdges < mouseY && mouseY < height - buttonDistFromEdges + toolbarButtonSize/2))	//clicked on back arrow
			return true;
		else
			return false;
	}
	
	function isMouseOverNextArrowButton(){
		if((width - toolbarButtonSize/2 - arrowsX < mouseX && mouseX < width - arrowsX + toolbarButtonSize/2) &&
				(height - toolbarButtonSize/2 - buttonDistFromEdges < mouseY && mouseY < height - buttonDistFromEdges + toolbarButtonSize/2))	//clicked on back arrow
			return true;
		else
			return false;
	}
	
	function isMouseOverPreviousArrowButton(){
		if((width - toolbarButtonSize/2 - arrowsX*2 < mouseX && mouseX < width - arrowsX*2 + toolbarButtonSize/2) &&
				(height - toolbarButtonSize/2 - buttonDistFromEdges < mouseY && mouseY < height - buttonDistFromEdges + toolbarButtonSize/2))	//clicked on back arrow
			return true;
		else
			return false;
	}

	function drawNode(imageHolder , node , isMouseOver){
		if(isMouseOver)
			context.drawImage(imageHolder , node.x - node.radius*mouseOverEnlarger , node.y - node.radius*mouseOverEnlarger , 2*node.radius*(1 + mouseOverEnlarger) , 2*node.radius*(1 + mouseOverEnlarger));
		else
			context.drawImage(imageHolder , node.x , node.y , 2*node.radius , 2*node.radius);
	}


	function drawAFuckingLine(nodeID , edgeIndex , color , lineW){
		var indexTo = nodes[nodeID].edges[edgeIndex].pointedNodeID;
		context.beginPath();
		context.lineWidth = lineW;
		context.strokeStyle = color;
		context.moveTo(nodes[nodeID].x + nodes[nodeID].radius , nodes[nodeID].y + nodes[nodeID].radius);
		context.lineTo(nodes[indexTo].x + nodes[nodeID].radius , nodes[indexTo].y + nodes[nodeID].radius);
		context.stroke();
	}


	function exit(){
		var event = document.createEvent("Event");
		event.initEvent("changePage", true, true);
		event.customData = "goToSolutionsChoice";
		window.dispatchEvent(event);
		this.removeEventListener("mouseup", checkClick);
	}
	
	function nextStep(){
		if(clickHistory.length <= 0)
			return;
		
		var clickedNode = clickHistory[0];
		clickHistory.shift();
		solutionPath.push(clickedNode);		
		clickNode(clickedNode);
	}
	
	function previousStep(){		
		if(solutionPath.length == 1)	//We only have the initial node 
			return;
		unclickNode();					
	}
	
	function loadSolution(){
		//Send request solution for map: mapNum
		$.ajax({
			url : "SolutionPathServlet",
			async: false,
			data : { map_num : mapNum },
			error : function(data) {
				console.log("Error: ", data);
			}  ,
			type : "post",
			timeout : 30000
		});

		//Receive response from server
		setTimeout(function() {
		$.ajax({			
			url : "SolutionPathServlet",
			type: "get",
			async: false,
			dataType : "json",
			contentType:"application/json",
			timeout : 150000,
			error : function() {
				console.log("Error: loading the map solution failed");			
				var event = document.createEvent("Event");
				event.initEvent("changePage", true, true);
				event.customData = "goToSolutionsChoice";
				window.dispatchEvent(event);
			},
			success : function(data) {
				clickHistory = data;				
				nextStep();	//Removing the first node (since we already know where we start)				
			}
		});
		} , 1000);
	}


//	-------------------------------------------------------------

//	event listeners :

	canvas.addEventListener("mouseup", checkClick);

//	-------------------------------------------------------------
	
}