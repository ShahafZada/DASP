function createGame(){

//	-------------------------------------------------------------

	//		variant definitions :




	//mode (chosen tool) :
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


	//nodes:
	var startNode = new Image();
	var start_currentNode = new Image();
	var markedNode = new Image();
	var marked_currentNode = new Image();
	var nonvisitedNode = new Image();





	startNode.src = "images/game/start_node.png";
	start_currentNode.src = "images/game/start_current_node.png";
	markedNode.src = "images/game/marked_node.png";
	marked_currentNode.src = "images/game/marked_current_node.png";
	nonvisitedNode.src = "images/game/nonvisited_node.png";

	backButton.src = "images/backButton.png";
	backButton_over.src = "images/backButton.png";





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





//	-------------------------------------------------------------





//	page-function implementations :

	this.clear = function(){
		context.clearRect(0, 0, width, height);
	}

	this.logic = function() {
		
		//TODO if / elif for each mode
		//if mouse is on collapse or right to upper left point of first button - ignore
	}


	this.draw = function(){
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


	function setMode(index){
		for(var i = 0 ; i < modes.length ; i++){	//initializing in mode setStart
			if(i == index)
				modes[i] = true;
			else
				modes[i] = false;
		}
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


	function checkClick(){
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
			var event = document.createEvent("Event");
			event.initEvent("changePage", true, true);
			event.customData = "goToGameMenu";
			window.dispatchEvent(event);
			this.removeEventListener("mouseup", checkClick);

		}

	}

	//TODO
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


	//-------------------------------------------------------------

	//event listeners :

	canvas.addEventListener("mouseup", checkClick);

	//-------------------------------------------------------------



}