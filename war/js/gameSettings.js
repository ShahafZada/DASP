function gameSettings(){


//	-------------------------------------------------------------

	//		variant definitions :

	//back-button:
	var backButtonSize = height/10;	// the button area is square
	var backButtonEnlargedSize = height/8;	// the button area is square
	var buttonDistFromEdges = height/8;

	var settings = [];
	
	var backButton = new Image();
	var backButton_over = new Image();

	backButton.src = "images/backButton.png";
	backButton_over.src = "images/backButton.png";


	var imageObj = new Image();
	var plusPic = new Image();
	var minusPic = new Image();
	var savePic = new Image();

	imageObj.src = 'images/gameSettings/color_picker.png';
	plusPic.src = 'images/gameSettings/plus.png';
	minusPic.src = 'images/gameSettings/minus.png';
	savePic.src = 'images/gameSettings/save_button.png';
	
	var UP_KEY = 38;
	var DOWN_KEY = 40;
	var currentOption = 1;
	
	var titleFont = "70px Cambria Solid Italic";
	var optionsFont = "30px Cambria";
	var distanceOpt = 20;
	var titlePixelSize = 70;
	var textColor = '#000000';
	var distanceWords = 70;
	var textXStartPos = 60;
	var textYStartPos = 80;
	
	var color1 = lineColor;
	var color2 = markedLineColor;
	var colorSquareSize = parseInt(height/30);
	var squareX = parseInt((width - colorSquareSize) / 2);
	var squareY1 = textYStartPos - distanceOpt + distanceWords;
	var squareY2 = textYStartPos - distanceOpt + distanceWords*2;
	
	var showRGBPlate = false;
	var lineColorClicked = false;
	var markedLineClicked = false;
	
	var volume = globalVolume;
	var coloredEdges = allowingMultiColoredEdges
	var nodeChangeSize = nodeSize;
	var edgeChangeWidth = defaultEdgeWidth;
	
	var plusXPos = 400;
	var minusXPos = plusXPos + 50;
	var nodeYPos = 250;
	var edgeYPos = 390;
	var volumeYPos = 460;
	
	var maxNodeSize = height/9;
	var minNodeSize = height/11;
	var maxEdgeeSize = 15;
	var minEdgeeSize = 5;
	var maxVolume = 0.999;
	var minVolume = 0.001;
	
	var saveXPos = width - 400;
	var saveYPos = height - 70;
	
	insertSettingsTextToArray();
	
	function insertSettingsTextToArray() {
		settings.push("Settings");
		settings.push("Change line color");
		settings.push("Change marked line color");
		settings.push("Change node size: "+nodeChangeSize);
		settings.push("Allow Multi Colored Edges");
		settings.push("Set edge width: "+edgeChangeWidth);
		settings.push("Adjust volume: "+parseInt(volume*100)+"%");
	}
	

	function drawColorSquare1() {		
		context.beginPath();
		context.fillStyle = color1;

		context.fillRect(squareX, squareY1, colorSquareSize, colorSquareSize);
		context.strokeRect(squareX, squareY1, colorSquareSize, colorSquareSize);

	}
	
	function drawColorSquare2() {
		context.beginPath();
		context.fillStyle = color2;

		context.fillRect(squareX, squareY2, colorSquareSize, colorSquareSize);
		context.strokeRect(squareX, squareY2, colorSquareSize, colorSquareSize);
		
	}
	
	function drawAdjustButtons() {
		context.drawImage(plusPic, plusXPos, nodeYPos);
		context.drawImage(minusPic, minusXPos, nodeYPos);
		
		context.drawImage(plusPic, plusXPos, edgeYPos);
		context.drawImage(minusPic, minusXPos, edgeYPos);
		
		context.drawImage(plusPic, plusXPos, volumeYPos);
		context.drawImage(minusPic, minusXPos, volumeYPos);
	}

	function drawSaveButton() {
		context.drawImage(savePic, saveXPos, saveYPos);
	}


//	-------------------------------------------------------------

//	page-function implementations :

	this.clear = function(){
		context.clearRect(0, 0, width, height);
	}

	this.logic = function() {

	}

	this.draw = function(){
		
		drawSettings();
		drawAdjustButtons();
		drawSaveButton();
		
		if(showRGBPlate && lineColorClicked) {
			context.drawImage(imageObj, squareX + colorSquareSize, squareY1 + colorSquareSize);
			context.strokeRect(squareX + colorSquareSize, squareY1 + colorSquareSize, imageObj.width, imageObj.height);
		}
		if(showRGBPlate && markedLineClicked) {
			context.drawImage(imageObj, squareX + colorSquareSize, squareY2 + colorSquareSize);
			context.strokeRect(squareX + colorSquareSize, squareY2 + colorSquareSize, imageObj.width, imageObj.height);
		}
		
		
		drawColorSquare1();
		drawColorSquare2();
		drawBackButton();
	}



	//-------------------------------------------------------------

	//other private functions :

	function drawSettings() {
		
		settings = [];
		insertSettingsTextToArray();
		
		context.font = titleFont;
		context.fillStyle = textColor;
		context.fillText(settings[0], textXStartPos , textYStartPos);
		
		context.font = optionsFont;
		context.textAlign = 'left';
		for(var i = 1; i < settings.length; i++) {
			context.fillText(settings[i], textXStartPos , i*distanceWords + textYStartPos);
			context.fillStyle = textColor;
		}
		
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

		if(isMouseOverColorSquare(1)){
			showRGBPlate = !showRGBPlate;
		}
		if(isMouseOverColorSquare(2)){
			showRGBPlate = !showRGBPlate;
		}
		
		if(isMouseOverNodePlus() && nodeChangeSize < maxNodeSize) {
			nodeChangeSize++;
		}
		if(isMouseOverNodeMinus() && nodeChangeSize > minNodeSize) {
			nodeChangeSize--;
		}
		if(isMouseOverEdgePlus() && edgeChangeWidth < maxEdgeeSize) {
			edgeChangeWidth++;
		}
		if(isMouseOverEdgeMinus() && edgeChangeWidth > minEdgeeSize) {
			edgeChangeWidth--;
		}
		if(isMouseOverVolumePlus() && volume < maxVolume) {
			volume += 0.1;
		}
		if(isMouseOverVolumeMinus() && volume > minVolume) {
			volume -= 0.1;
		}
		
		if(isMouseOverSaveButton()) {
			saveSettings();
		}

	}

	function isMouseOverBackButton(){
		if((width - backButtonSize/2 - buttonDistFromEdges < mouseX && mouseX < width - buttonDistFromEdges + backButtonSize/2) &&
				(height - backButtonSize/2 - buttonDistFromEdges < mouseY && mouseY < height - buttonDistFromEdges + backButtonSize/2))	//clicked on back arrow
			return true;
		else
			return false;
	}
	
	function isMouseOverColorSquare(i){
		if((squareX < mouseX && mouseX < squareX +colorSquareSize)
			&&(squareY1 < mouseY && mouseY <  squareY1 +colorSquareSize)&&(i == 1)) {
			lineColorClicked = true;
			markedLineClicked = false;
			return true;
		}
		else if((squareX < mouseX && mouseX < squareX +colorSquareSize )
				&&(squareY2 < mouseY && mouseY <  squareY2 +colorSquareSize)&&(i == 2)) {
			markedLineClicked = true;
			lineColorClicked = false;
			return true;
		}
		else {
			return false;
		}
		
	}
	
	
	function isMouseOverNodePlus(){
		if((mouseX > plusXPos && mouseX < plusXPos + plusPic.width) && (mouseY > nodeYPos && mouseY < nodeYPos + plusPic.height)) {
			return true;
		}
		else {
			return false;
		}
	}
	
	function isMouseOverNodeMinus(){
		if((mouseX > minusXPos && mouseX < minusXPos + minusPic.width) && (mouseY > nodeYPos && mouseY < nodeYPos + minusPic.height)) {
			return true;
		}
		else {
			return false;
		}
	}
	
	function isMouseOverEdgePlus(){
		if((mouseX > plusXPos && mouseX < plusXPos + plusPic.width) && (mouseY > edgeYPos && mouseY < edgeYPos + plusPic.height)) {
			return true;
		}
		else {
			return false;
		}
	}
	
	function isMouseOverEdgeMinus(){
		if((mouseX > minusXPos && mouseX < minusXPos + minusPic.width) && (mouseY > edgeYPos && mouseY < edgeYPos + minusPic.height)) {
			return true;
		}
		else {
			return false;
		}
	}
	
	function isMouseOverVolumePlus(){
		if((mouseX > plusXPos && mouseX < plusXPos + plusPic.width) && (mouseY > volumeYPos && mouseY < volumeYPos + plusPic.height)) {
			return true;
		}
		else {
			return false;
		}
	}
	
	function isMouseOverVolumeMinus(){
		if((mouseX > minusXPos && mouseX < minusXPos + minusPic.width) && (mouseY > volumeYPos && mouseY < volumeYPos + minusPic.height)) {
			return true;
		}
		else {
			return false;
		}
	}
	
	function isMouseOverSaveButton() {
		if((mouseX > saveXPos && mouseX < saveXPos + savePic.width) && (mouseY > saveYPos && mouseY < saveYPos + savePic.height)) {
			return true;
		}
		else {
			return false;
		}
	}
	
	function saveSettings() {
		globalVolume = volume;
		nodeSize = nodeChangeSize;
		defaultEdgeWidth = edgeChangeWidth;
		allowingMultiColoredEdges = coloredEdges;
		lineColor = color1;
		markedLineColor = color2;

	}

	//-------------------------------------------------------------

	//event listeners :

	canvas.addEventListener("mouseup", checkClick);

	canvas.addEventListener('mousedown', function() {
		showRGBPlate = false;
		lineColorClicked = false;
		markedLineClicked = false;
	}, false);

	canvas.addEventListener('mousemove', function(evt) {
			
		if(lineColorClicked && showRGBPlate && mouseX > squareX + colorSquareSize && mouseX < squareX + colorSquareSize + imageObj.width 
				&& mouseY > squareY1 + colorSquareSize && mouseY < squareY1 + colorSquareSize + imageObj.height) {

			// color picker image is 256x256 and is offset by 10px
			// from top and bottom
			var imageData = context.getImageData(squareX + colorSquareSize, squareY1 + colorSquareSize, imageObj.width, imageObj.height);
			var data = imageData.data;
			var x = mouseX - squareX - colorSquareSize;
			var y = mouseY - squareY1 - colorSquareSize;

			var red = data[((imageObj.width * y) + x) * 4];
			var green = data[((imageObj.width * y) + x) * 4 + 1];
			var blue = data[((imageObj.width * y) + x) * 4 + 2];
			color1 = 'rgb(' + red + ',' + green + ',' + blue + ')';
			drawColorSquare1();
		}
		
		if(markedLineClicked && showRGBPlate && mouseX > squareX + colorSquareSize && mouseX < squareX + colorSquareSize + imageObj.width 
				&& mouseY > squareY2 + colorSquareSize && mouseY < squareY2 + colorSquareSize + imageObj.height) {

			// color picker image is 256x256 and is offset by 10px
			// from top and bottom
			var imageData = context.getImageData(squareX + colorSquareSize, squareY2 + colorSquareSize, imageObj.width, imageObj.height);
			var data = imageData.data;
			var x = mouseX - squareX - colorSquareSize;
			var y = mouseY - squareY2 - colorSquareSize;

			var red = data[((imageObj.width * y) + x) * 4];
			var green = data[((imageObj.width * y) + x) * 4 + 1];
			var blue = data[((imageObj.width * y) + x) * 4 + 2];
			color2 = 'rgb(' + red + ',' + green + ',' + blue + ')';
			drawColorSquare2();
		}
		
	}, false);


	//-------------------------------------------------------------


}