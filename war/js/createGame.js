function createGame(){

//	-------------------------------------------------------------

	//		variant definitions :




	//mode (chosen tool) :
	var currentMode
	var modes = [];


	//mode buttons :
	var buttonHeight = height/6;
	var buttonWidth = buttonHeight;
	var frameSize = buttonHeight * 1.1;
	var saveButtonWidth;
	//var distanceBetweenButtons;	//eventually not used
	var buttonDistFromEdges = -1;	//needs to be any negative value, which would trigger a fail-safe loop below

	var buttons = [];
	var buttonsOver = [];
	var buttonsActive = [];
	var buttonPositions = [];



	//GUI control :
	var showTools = true;
	var arrowHeight = buttonHeight/2;
	var arrowOverHeight = arrowHeight*1.1;
	var expandArrowWidth , collapseArrowWidth;
	var expandArrowOverWidth , collapseArrowOverWidth;
	var collapseArrow = new Image();
	var expandArrow = new Image();



	var createNodeButton = new Image();
	var eraseNodeButton = new Image();
	var createEdgeButton = new Image();
	var eraseEdgeButton = new Image();
	var setStartButton = new Image();
	var randomizeButton = new Image();
	var saveButton = new Image();

	var createNodeButton_Over = new Image();
	var eraseNodeButton_Over = new Image();
	var createEdgeButton_Over = new Image();
	var eraseEdgeButton_Over = new Image();
	var setStartButton_Over = new Image();
	var randomizeButton_Over = new Image();
	var saveButton_Over = new Image();

	var createNodeButton_Active = new Image();
	var eraseNodeButton_Active = new Image();
	var createEdgeButton_Active = new Image();
	var eraseEdgeButton_Active = new Image();
	var setStartButton_Active = new Image();
	var randomizeButton_Active = new Image();
	var saveButton_Active = new Image();

	var buttonFrame = new Image();




	collapseArrow.src =  "images/createGame/collapseArrow.png";
	expandArrow.src =  "images/createGame/expandArrow.png";

	createNodeButton.src = "images/createGame/Create_Nodes_Button.png";
	eraseNodeButton.src = "images/createGame/Erase_Nodes_Button.png";
	createEdgeButton.src = "images/createGame/Create_Edges_Button.png";
	eraseEdgeButton.src = "images/createGame/Erase_Edges_Button.png";
	setStartButton.src = "images/createGame/Set_Start_Button.png";
	randomizeButton.src = "images/createGame/Rand_Button.png";
	saveButton.src = "images/createGame/Save_Button.png";

	createNodeButton_Over.src = "images/createGame/Create_Nodes_Button_Over.png";
	eraseNodeButton_Over.src = "images/createGame/Erase_Nodes_Button_Over.png";
	createEdgeButton_Over.src = "images/createGame/Create_Edges_Button_Over.png";
	eraseEdgeButton_Over.src = "images/createGame/Erase_Edges_Button_Over.png";
	setStartButton_Over.src = "images/createGame/Set_Start_Button_Over.png";
	randomizeButton_Over.src = "images/createGame/Rand_Button_Over.png";
	saveButton_Over.src = "images/createGame/Save_Button_Over.png";

	createNodeButton_Active.src = "images/createGame/Create_Nodes_Button_Active.png";
	eraseNodeButton_Active.src = "images/createGame/Erase_Nodes_Button_Active.png";
	createEdgeButton_Active.src = "images/createGame/Create_Edges_Button_Active.png";
	eraseEdgeButton_Active.src = "images/createGame/Erase_Edges_Button_Active.png";
	setStartButton_Active.src = "images/createGame/Set_Start_Button_Active.png";
	randomizeButton_Active.src = "images/createGame/Rand_Button_Active.png";
	saveButton_Active.src = "images/createGame/Save_Button_Active.png";

	buttonFrame.src = "images/createGame/frame.png";


	//back-button : (not counted as a mode button)
	var backButtonSize = height/10;	// the button area is square
	var backButtonEnlargedSize = height/8;	// the button area is square
	var backButtonDistFromEdges = height/8;

	var backButton = new Image();
	var backButton_over = new Image();




	// nodes :
	var nodeSize = height/10; //height and width are the same
	var nodeRadius = nodeSize/2;

	var startNode = new Image();
	//var start_currentNode = new Image();	//not needed when just creating a map
	//var markedNode = new Image();
	//var marked_currentNode = new Image();
	var nonvisitedNode = new Image();

	var farthestAvailableID = 0;
	var releasedIDs = [];	//IDs of erased nodes, yet to be re-used in new nodes

	var nodes = [];




	startNode.src = "images/game/start_node.png";
	//start_currentNode.src = "images/game/start_current_node.png";
	//markedNode.src = "images/game/marked_node.png";
	//marked_currentNode.src = "images/game/marked_current_node.png";
	nonvisitedNode.src = "images/game/nonvisited_node.png";

	backButton.src = "images/backButton.png";
	backButton_over.src = "images/backButton.png";


	// edges :
	
	var defaultWeight = 1;
	var defaultColor = "cyan";
	
	
	
	


	buttons.push(createNodeButton);
	buttons.push(eraseNodeButton);
	buttons.push(createEdgeButton);
	buttons.push(eraseEdgeButton);
	buttons.push(setStartButton);
	buttons.push(randomizeButton);
	buttons.push(saveButton);

	buttonsOver.push(createNodeButton_Over);
	buttonsOver.push(eraseNodeButton_Over);
	buttonsOver.push(createEdgeButton_Over);
	buttonsOver.push(eraseEdgeButton_Over);
	buttonsOver.push(setStartButton_Over);
	buttonsOver.push(randomizeButton_Over);
	buttonsOver.push(saveButton_Over);

	buttonsActive.push(createNodeButton_Active);
	buttonsActive.push(eraseNodeButton_Active);
	buttonsActive.push(createEdgeButton_Active);
	buttonsActive.push(eraseEdgeButton_Active);
	buttonsActive.push(setStartButton_Active);
	buttonsActive.push(randomizeButton_Active);
	buttonsActive.push(saveButton_Active);



	for(var i = 0 ; i < buttons.length ; i++){	//initializing in mode setStart
		if(i == buttons.indexOf(setStartButton))
			modes.push(true);
		else
			modes.push(false);
	}


	while(buttonDistFromEdges < 0){	//fail-safe
		buttonHeight *= 0.95;
		buttonWidth *= 0.95;
		frameSize *= 0.95;
		arrowHeight *= 0.95;
		arrowOverHeight *= 0.95;
		buttonDistFromEdges = (height - backButtonSize/2 - backButtonDistFromEdges - ((buttons.length/2 + 1) * buttonHeight)) / (buttons.length/2);	//average of free height per button
	}

//	-------------------------------------------------------------

//	onload functions : 


	saveButton.onload = function(){
		saveButtonWidth = saveButton.width / (saveButton.height / buttonHeight);
		//distanceBetweenButtons = saveButtonWidth - 2*buttonWidth;	//not used

		determinePositions(buttonPositions , buttons);
	}


	expandArrow.onload = function(){
		expandArrowWidth = expandArrow.width * (arrowHeight / expandArrow.height);
		expandArrowOverWidth = expandArrowWidth * (arrowOverHeight / arrowHeight);
	}

	collapseArrow.onload = function(){
		collapseArrowWidth = collapseArrow.width * (arrowHeight / collapseArrow.height);
		collapseArrowOverWidth = collapseArrowWidth * (arrowOverHeight / arrowHeight);
	}





//	-------------------------------------------------------------

//	classes : 

	function coord(x,y){
		this.xPos = x;
		this.yPos = y;
	}


	function Node(id , x, y, radius , isStart){
		this.id = id;
		this.x = x;
		this.y = y;
		this.radius = radius;
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


	function Edge(pointedNodeID , color , weight){
		this.pointedNodeID = pointedNodeID;	//the other node being pointed to
		this.isMarked = false;
		this.passedThrough = false;
		this.color = color;
		this.weight = weight; 
	}


//	-------------------------------------------------------------





//	page-function implementations :

	this.clear = function(){
		context.clearRect(0, 0, width, height);
	}




	this.logic = function() {
		//finding the mode
		currentMode = modes.indexOf(true);

		//TODO
		if(currentMode == buttons.indexOf(randomizeButton)){	//Randomize
			;
		}
		//TODO
		else if(currentMode == buttons.indexOf(saveButton)){	//Save
			;
		}

		//if mouse is on collapse or right to upper left point of first button - ignore
	}




	this.draw = function(){
		//drawing buttons and collapse arrow
		if(showTools){
			for(var i = 0 ; i < buttons.length ; i++){

				if(isMouseOverButton(i))
					drawButton(buttonsOver , i);
				else if(modes[i]){
					drawFrame(i);
					drawButton(buttonsActive , i);
				}
				else{
					drawButton(buttons , i);
				}
			}
			drawCollapseArrow();
		}
		else{	//GUI isn't shown
			drawExpandArrow();
		}


		//drawing map elements
		//edges
		for(var i = 0 ; i < nodes.length ; i++){	//TODO
			
		}
		//nodes
		for(var i = 0 ; i < nodes.length ; i++){
			if(nodes[i].isStart)
				drawNode(startNode , nodes[i]);
			else
				drawNode(nonvisitedNode , nodes[i]);
		}




		drawBackButton();
	}










	//-------------------------------------------------------------


	//other private functions :


	function determinePositions(positionsArray , buttonArray){
		var leftColX = width - buttonDistFromEdges - saveButtonWidth;
		var rightColX = width - buttonDistFromEdges - buttonWidth;
		var xCoord , yCoord;
		var yCoord = buttonDistFromEdges;
		for(var i = 0 ; i < buttonArray.length ; i++){

			if(i % 2 == 0){
				xCoord = leftColX;
				if(i != 0)
					yCoord += (buttonHeight + buttonDistFromEdges);
			}
			else{
				xCoord = rightColX;
			}

			positionsArray.push(new coord(xCoord , yCoord));
		}
	}


	function setMode(index){
		for(var i = 0 ; i < modes.length ; i++){	//initializing in mode setStart
			if(i == index)
				modes[i] = true;
			else
				modes[i] = false;
		}
	}

	function isMouseOverButton(i){
		if(i == buttons.indexOf(saveButton)){	//save button
			if(buttonPositions[i].xPos < mouseX && mouseX < buttonPositions[i].xPos + saveButtonWidth && buttonPositions[i].yPos < mouseY && mouseY < buttonPositions[i].yPos + buttonHeight)
				return true;
			else
				return false;
		}
		else{
			if(buttonPositions[i].xPos < mouseX && mouseX < buttonPositions[i].xPos + buttonWidth && buttonPositions[i].yPos < mouseY && mouseY < buttonPositions[i].yPos + buttonHeight)
				return true;
			else
				return false;
		}
	}

	function drawButton(array , i){
		if(i == buttons.indexOf(saveButton))
			context.drawImage(array[i] , buttonPositions[i].xPos , buttonPositions[i].yPos , saveButtonWidth , buttonHeight);	//save button. It's larger than the rest
		else	
			context.drawImage(array[i] , buttonPositions[i].xPos , buttonPositions[i].yPos , buttonWidth , buttonHeight);
	}

	function drawFrame(i){
		if(i == buttons.indexOf(saveButton)){
			var saveFrameWidth = saveButtonWidth*frameSize/buttonWidth;
			context.drawImage(buttonFrame , buttonPositions[i].xPos + saveButtonWidth/2 - saveFrameWidth/2 , buttonPositions[i].yPos + buttonHeight/2 - frameSize/2 , saveFrameWidth , frameSize);
		}
		else
			context.drawImage(buttonFrame , buttonPositions[i].xPos + buttonWidth/2 - frameSize/2 , buttonPositions[i].yPos + buttonHeight/2 - frameSize/2 , frameSize , frameSize);
	}


	function drawCollapseArrow(){
		if(isMouseOverCollapseButton())
			context.drawImage(collapseArrow , buttonPositions[0].xPos - collapseArrowWidth - buttonDistFromEdges - (((collapseArrowOverWidth - collapseArrowWidth))/2) , buttonPositions[0].yPos - ((arrowOverHeight - arrowHeight)/2), collapseArrowOverWidth , arrowOverHeight);
		else
			context.drawImage(collapseArrow , buttonPositions[0].xPos - collapseArrowWidth - buttonDistFromEdges , buttonPositions[0].yPos , collapseArrowWidth , arrowHeight);
	}

	function drawExpandArrow(){
		if(isMouseOverExpandButton())
			context.drawImage(expandArrow , width - expandArrowWidth - (((expandArrowOverWidth - expandArrowWidth))/2) , buttonPositions[0].yPos - ((arrowOverHeight - arrowHeight)/2) , expandArrowOverWidth , arrowOverHeight);
		else
			context.drawImage(expandArrow , width - expandArrowWidth , buttonPositions[0].yPos , expandArrowWidth , arrowHeight);

	}

	function drawBackButton(){
		if(isMouseOverBackButton())
			context.drawImage(backButton_over , width - backButtonEnlargedSize/2 - backButtonDistFromEdges , height - backButtonEnlargedSize/2 - backButtonDistFromEdges , backButtonEnlargedSize , backButtonEnlargedSize);
		else
			context.drawImage(backButton , width - backButtonSize/2 - backButtonDistFromEdges , height - backButtonSize/2 - backButtonDistFromEdges , backButtonSize , backButtonSize);
	}

	function drawNode(nodeTypeToDraw , theNodeObject){
		context.drawImage(nodeTypeToDraw , theNodeObject.x , theNodeObject.y , theNodeObject.radius * 2 , theNodeObject.radius * 2);
	}



	function checkClick(){

		//applying the according action to mode
		if(currentMode == buttons.indexOf(createNodeButton)){	//Create Nodes
			if(isInDrawableArea()){
				if(isNotTouchingOtherNodes(mouseX , mouseY , nodeRadius)){
					nodes.push(new Node(generateID() , mouseX-nodeRadius , mouseY-nodeRadius , nodeRadius , false));
				}
				else
					alert("That's too close to another node");
			}
			//else, the player probably tried to activate a button, or "missed" the canvas

		}
		else if(currentMode == buttons.indexOf(eraseNodeButton)){	//Erase Nodes
			if(isInDrawableArea()){
				destroyByTouch(mouseX , mouseY);
			}
		}
		//TODO
		else if(currentMode == buttons.indexOf(createEdgeButton)){	//Create Edges
			;
		}
		//TODO
		else if(currentMode == buttons.indexOf(eraseEdgeButton)){	//Erase Edges
			;
		}
		else if(currentMode == buttons.indexOf(setStartButton)){	//Set Start
			if(isInDrawableArea()){
				if(isNotTouchingOtherNodes(mouseX , mouseY , nodeRadius)){
					//canceling previous start
					for(var i = 0 ; i < nodes.length ; i++){
						if(nodes[i].isStart){
							nodes[i].isStart = false;
							break;
						}
					}

					nodes.push(new Node(generateID() , mouseX-nodeRadius , mouseY-nodeRadius , nodeRadius , true));
					setMode(buttons.indexOf(createNodeButton));
				}
				else if(isNotTouchingOtherNodes(mouseX , mouseY , 0)){	//tried to add in a space that's too small (mouse itself touched no nodes)
					alert("That's too close to another node");
				}
				else{	//mouse touching an existing Node 
					//assigning start to existing point, or canceling it
					var touchX = mouseX;
					var touchY = mouseY;
					var leaveSetStart = true;
					var foundIt = false; //just to save the extra scan
					for(var i = 0 ; i < nodes.length ; i++){
						if(nodes[i].isStart){
							if(!foundIt){
								if(nodes[i].radius * nodes[i].radius > pitagorasSquareDistance(touchX , touchY , nodes[i].x + nodes[i].radius , nodes[i].y + nodes[i].radius)){
									leaveSetStart = false	//click wasted on cancelling a start, so no reason to leave it yet
									foundIt = true;
								}
							}
							nodes[i].isStart = false;	//if touched or not, any previous start is cancelled
						}
						else{
							if(!foundIt){
								if(nodes[i].radius * nodes[i].radius > pitagorasSquareDistance(touchX , touchY , nodes[i].x + nodes[i].radius , nodes[i].y + nodes[i].radius)){
									nodes[i].isStart = true;
									foundIt = true;
								}
							}
						}
					}
					
					if(leaveSetStart)
						setMode(buttons.indexOf(createNodeButton));
				}
			}


		}





		//collapse button check
		if(isMouseOverCollapseButton()){
			showTools = false;
		}
		else if(isMouseOverExpandButton()){
			showTools = true;
		}



		//tool button check
		for(var i = 0 ; i < buttons.length ; i++){
			if(isMouseOverButton(i))
				setMode(i);
		}



		//Back-button check
		if(isMouseOverBackButton()){	//clicked on back arrow
			var really = confirm("Back to menu? Your progress won't be saved!");
			if(really == true){
				var event = document.createEvent("Event");
				event.initEvent("changePage", true, true);
				event.customData = "goToGameMenu";
				window.dispatchEvent(event);
				this.removeEventListener("mouseup", checkClick);
			}
		}

	}








	function isInDrawableArea(){
		if(nodeRadius < mouseX && mouseX < width - backButtonSize/2 - backButtonDistFromEdges - nodeRadius)	//can draw until reaching the vertical area of back button
			if(nodeRadius < mouseY && mouseY < height - nodeRadius)
				if(!isMouseOverCollapseButton() && !isMouseOverExpandButton()){
					for(var i = 0 ; i < buttons.length ; i++){
						if(isMouseOverButton(i))
							return false;
					}
					return true;
				}

		return false;
	}

	function isNotTouchingOtherNodes(x , y , rad){
		var radiusesCombined;
		for(var i = 0 ; i < nodes.length ; i++){
			radiusesCombined = rad + nodes[i].radius;
			if(radiusesCombined*radiusesCombined > pitagorasSquareDistance(x , y , nodes[i].x + nodes[i].radius , nodes[i].y + nodes[i].radius))
				return false;	//intersecting with each other
		}
		return true;
	}

	function pitagorasSquareDistance(x1 , y1 , x2 , y2){
		var xDist = x1 - x2;
		var yDist = y1 - y2;
		var distSquare = xDist*xDist + yDist*yDist;
		return distSquare;
	}

	function generateID(){	
		if(releasedIDs.length == 0){
			farthestAvailableID++;
			return (farthestAvailableID-1);
		}
		else{	//still some old (smaller) IDs available
			var reusedID = releasedIDs[releasedIDs.length - 1];	//value of last vaccant ID (LIFO)
			releasedIDs.pop();
			return reusedID;
		}
	}

	function destroyByTouch(x , y){
		for(var i = 0 ; i < nodes.length ; i++){
			if(nodes[i].radius * nodes[i].radius > pitagorasSquareDistance(x , y , nodes[i].x + nodes[i].radius , nodes[i].y + nodes[i].radius)){
				releasedIDs.push(nodes[i].id);
				nodes[i] = nodes[nodes.length - 1];
				nodes.pop();
				return;
			}

		}
	}

	function isMouseOverCollapseButton(){
		if(showTools){	//GUI is visible
			if(buttonPositions[0].xPos - collapseArrowWidth - buttonDistFromEdges < mouseX && mouseX < buttonPositions[0].xPos - buttonDistFromEdges &&
					buttonPositions[0].yPos < mouseY && mouseY < buttonPositions[0].yPos + arrowHeight)
				return true;
		}
		return false;
	}

	function isMouseOverExpandButton(){
		if(!showTools){	//GUI is not visible
			if(width - expandArrowWidth < mouseX && mouseX < width && buttonPositions[0].yPos < mouseY && mouseY < buttonPositions[0].yPos + arrowHeight)
				return true;
		}
		return false;
	}

	function isMouseOverBackButton(){
		if((width - backButtonSize/2 - backButtonDistFromEdges < mouseX && mouseX < width - backButtonDistFromEdges + backButtonSize/2) &&
				(height - backButtonSize/2 - backButtonDistFromEdges < mouseY && mouseY < height - backButtonDistFromEdges + backButtonSize/2))	//clicked on back arrow
			return true;
		else
			return false;
	}


//	-------------------------------------------------------------

//	event listeners :

	canvas.addEventListener("mouseup", checkClick);

//	-------------------------------------------------------------



}