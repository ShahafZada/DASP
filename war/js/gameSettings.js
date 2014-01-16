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
	imageObj.src = 'images/gameSettings/color_picker.png';
	
	
	var padding = 10;
	var mouseDown = false;
	var color = undefined;

	context.strokeStyle = '#444';
	context.lineWidth = 2;

	context.drawImage(imageObj, padding, padding);
	



	function drawColorSquare(color, imageObj) {
		var colorSquareSize = 100;
		var padding = 10;
		var squareX = (width - colorSquareSize + imageObj.width) / 2;
		var squareY = (height - colorSquareSize) / 2;

		context.beginPath();
		context.fillStyle = color;
		context.fillRect(squareX, squareY, colorSquareSize, colorSquareSize);
		context.strokeRect(squareX, squareY, colorSquareSize, colorSquareSize);
	}
	

//	imageObj.onload = function() {
//		init(this);
//	};
	









//	-------------------------------------------------------------

//	page-function implementations :

	this.clear = function(){
		context.clearRect(0, 0, width, height);
	}

	this.logic = function() {

	}


	this.draw = function(){


		context.strokeStyle = '#444';
		context.lineWidth = 2;

		context.drawImage(imageObj, padding, padding);
		drawColorSquare(color, imageObj);
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

	canvas.addEventListener('mousedown', function() {mouseDown = true;}, false);

	canvas.addEventListener('mouseup', function() {mouseDown = false;}, false);

	canvas.addEventListener('mousemove', function(evt) {
		

		if(mouseDown && mouseX > padding && mouseX < padding + imageObj.width && mouseY > padding && mouseY < padding + imageObj.height) {

			// color picker image is 256x256 and is offset by 10px
			// from top and bottom
			var imageData = context.getImageData(padding, padding, imageObj.width, imageObj.width);
			var data = imageData.data;
			var x = mouseX - padding;
			var y = mouseY - padding;
			var red = data[((imageObj.width * y) + x) * 4];
			var green = data[((imageObj.width * y) + x) * 4 + 1];
			var blue = data[((imageObj.width * y) + x) * 4 + 2];
			var color = 'rgb(' + red + ',' + green + ',' + blue + ')';
			drawColorSquare(color, imageObj);
		}
	}, false);

	//-------------------------------------------------------------


}