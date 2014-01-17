function gameSettings(){


//	-------------------------------------------------------------

	//		variant definitions :

	//back-button:
	var backButtonSize = height/10;	// the button area is square
	var backButtonEnlargedSize = height/8;	// the button area is square
	var buttonDistFromEdges = height/8;


	var backButton = new Image();
	var backButton_over = new Image();

	backButton.src = "images/backButton.png";
	backButton_over.src = "images/backButton.png";


	var imageObj = new Image();
	imageObj.src = 'images/gameSettings/colorwheel5.png';
	
	var color = undefined;
	
	var squareX = 0;
	var squareY = 0;
	var colorSquareSize = 50;
	
	var showRGBPlate = false;

	function drawColorSquare(color) {
		squareX = (width - colorSquareSize) / 2;
		squareY = (height - colorSquareSize) / 2;

		context.beginPath();
		context.fillStyle = color;
		context.fillRect(squareX, squareY, colorSquareSize, colorSquareSize);
		context.strokeRect(squareX, squareY, colorSquareSize, colorSquareSize);
	}
	


//	-------------------------------------------------------------

//	page-function implementations :

	this.clear = function(){
		context.clearRect(0, 0, width, height);
	}

	this.logic = function() {

	}


	this.draw = function(){

		if(showRGBPlate) context.drawImage(imageObj, squareX + colorSquareSize, squareY + colorSquareSize);
		drawColorSquare(color);
		drawBackButton();
	}



	//-------------------------------------------------------------

	//other private functions :


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

		if(isMouseOverColorSquare()){
			showRGBPlate = !showRGBPlate;
		}


	}

	function isMouseOverBackButton(){
		if((width - backButtonSize/2 - buttonDistFromEdges < mouseX && mouseX < width - buttonDistFromEdges + backButtonSize/2) &&
				(height - backButtonSize/2 - buttonDistFromEdges < mouseY && mouseY < height - buttonDistFromEdges + backButtonSize/2))	//clicked on back arrow
			return true;
		else
			return false;
	}
	
	function isMouseOverColorSquare(){
		if((squareX < mouseX && mouseX < squareX +colorSquareSize )
			&&(squareY < mouseY && mouseY <  squareY +colorSquareSize)) {
			return true;
		}
		else {
			return false;
		}
	}


	//-------------------------------------------------------------

	//event listeners :

	canvas.addEventListener("mouseup", checkClick);

	canvas.addEventListener('mousedown', function() {showRGBPlate = false;}, false);

	canvas.addEventListener('mousemove', function(evt) {
		
		if(showRGBPlate && mouseX > squareX + colorSquareSize && mouseX < squareX + colorSquareSize + imageObj.width && mouseY > squareY + colorSquareSize && mouseY < squareY + colorSquareSize + imageObj.height) {

			// color picker image is 256x256 and is offset by 10px
			// from top and bottom
			var imageData = context.getImageData(squareX + colorSquareSize, squareY + colorSquareSize, imageObj.width, imageObj.height);
			var data = imageData.data;
			var x = mouseX - squareX - colorSquareSize;
			var y = mouseY - squareY - colorSquareSize;
				
			var red = data[((imageObj.width * y) + x) * 4];
			var green = data[((imageObj.width * y) + x) * 4 + 1];
			var blue = data[((imageObj.width * y) + x) * 4 + 2];
			color = 'rgb(' + red + ',' + green + ',' + blue + ')';
			drawColorSquare(color);

		}
	}, false);

	//-------------------------------------------------------------


}