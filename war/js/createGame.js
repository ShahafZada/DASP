function createGame(){

//	-------------------------------------------------------------

	//		variant definitions :

	
	//tools (modes) :
	var isModeSetStart = true;
	var isModeCreateNodes = false;
	var isModeEraseNodes = false;
	var isModeCreateEdges = false;
	var isModeEraseEdges = false;
	
	
	//mode buttons :
	var buttons = [];
	var setStartButtons = new Image();
	var createNodeButton = new Image();
	var eraseNodeButton = new Image();
	var createEdgeButton = new Image();
	var eraseEdgeButton = new Image();
	var randomizeButton = new Image();
	
	
	//back-button : (not counted as a mode button)
	var backButtonSize = height/10;	// the button area is square
	var backButtonEnlargedSize = height/8;	// the button area is square
	var buttonDistFromEdges = height/8;


	
	
	
	



	var backButton = new Image();
	var backButton_over = new Image();

	backButton.src = "images/backButton.png";
	backButton_over.src = "images/backButton.png";
	
	
	buttons.push(setStartButtons);
	buttons.push(createNodeButton);
	buttons.push(eraseNodeButton);
	buttons.push(createEdgeButton);
	buttons.push(eraseEdgeButton);
	buttons.push(randomizeButton);
	

//	-------------------------------------------------------------

//	page-function implementations :

	this.clear = function(){
		context.clearRect(0, 0, width, height);
	}

	this.logic = function() {
		
	}


	this.draw = function(){



		drawBackButton();
	}







	//-------------------------------------------------------------

	//other private functions :

	function setMode(mode){
		
			
	}

	function drawBackButton(){
		if(isMouseOverBackButton())
			context.drawImage(backButton_over , width - backButtonEnlargedSize/2 - buttonDistFromEdges , height - backButtonEnlargedSize/2 - buttonDistFromEdges , backButtonEnlargedSize , backButtonEnlargedSize);
		else
			context.drawImage(backButton , width - backButtonSize/2 - buttonDistFromEdges , height - backButtonSize/2 - buttonDistFromEdges , backButtonSize , backButtonSize);
	}


	function checkClick(){


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


	//-------------------------------------------------------------

	//event listeners :

	canvas.addEventListener("mouseup", checkClick);

	//-------------------------------------------------------------



}