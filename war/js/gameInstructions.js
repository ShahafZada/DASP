function gameInstructions(){


//	-------------------------------------------------------------

	//		variant definitions :

	//slides
	var currentSlide = 0;
	var isGoingRight = true;
	var slideAwayStep = 14;
	var slideAwayFrame = 0;
	//var startingSpeed = 7;
	//var slideAwaySpeed = startingSpeed;
	//var decceleration = 2;
	var isAnimating = false;
	var animatedXPosition = 0;
	
	var slides = [];
	
	//arrows
	
	var arrowSize = height/10;	//assuming width and height of button are the same (=arrowSize)
	var arrowEnlargedSize = arrowSize*1.3;
	var arrowYPosition = height/2;
	var arrowDistFromEdges = height/20;
	
	//back-button:
	var backButtonSize = height/10;	// the button area is square
	var backButtonEnlargedSize = height/8;	// the button area is square
	var buttonDistFromEdges = height/8;

	
	var slide0 = new Image();
	var slide1 = new Image();
	var slide2 = new Image();
	var slide3 = new Image();
	var rightArrow = new Image();
	var leftArrow = new Image();
	
	slide0.src = "images/gameInstructions/slide0.png";
	slide1.src = "images/gameInstructions/slide1.png";
	slide2.src = "images/gameInstructions/slide2.png";
	slide3.src = "images/gameInstructions/slide3.png";
	rightArrow.src = "images/gameInstructions/right_arrow.png";
	leftArrow.src = "images/gameInstructions/left_arrow.png";

	
	slides.push(slide0);
	slides.push(slide1);
	slides.push(slide2);
	slides.push(slide3);

	var backButton = new Image();
	var backButton_over = new Image();

	backButton.src = "images/backButton.png";
	backButton_over.src = "images/backButton.png";



//	-------------------------------------------------------------

//	page-function implementations :

	this.clear = function(){
		context.clearRect(0, 0, width, height);
	}

	this.logic = function() {
		
	}


	this.draw = function(){
		drawCurrentSlide();
		
		if(isAnimating)
			animateSlideAway();
		
		drawArrows();

		drawBackButton();
	}


/*
 page0
 Click a node in order to visit it 
 *
 page1
 You can only visit nodes that are connected to your current node
 *
 page2
 Your objective is to visit every node in the stage
 *
 page3
 Try to finish the stage while traveling with the the least steps you can
 */



	//-------------------------------------------------------------

	//other private functions :

	function drawCurrentSlide() {
		context.drawImage(slides[currentSlide] , 0 , 0 , width, height);
	}
	
	function drawSildeOffset(img , x) {
		context.drawImage(img , x , 0 , width, height);
	}
	
	function drawArrows() {
	
		if(isMouseOverRightArrow()) {
			var diff = arrowEnlargedSize/2 - arrowSize/2;
			context.drawImage(rightArrow , width - (arrowDistFromEdges+arrowSize+diff) , arrowYPosition - arrowSize/2 - diff, arrowEnlargedSize, arrowEnlargedSize);
		}
		else {
			context.drawImage(rightArrow , width - (arrowDistFromEdges+arrowSize) , arrowYPosition - arrowSize/2, arrowSize, arrowSize);
		}
		if(isMouseOverLeftArrow()) {
			var diff = arrowEnlargedSize/2 - arrowSize/2;
			context.drawImage(leftArrow , arrowDistFromEdges - diff , arrowYPosition - arrowSize/2 -diff , arrowEnlargedSize, arrowEnlargedSize);
		}
		else {
			context.drawImage(leftArrow , arrowDistFromEdges , arrowYPosition - arrowSize/2, arrowSize, arrowSize);
		}
	}
	
	function drawBackButton(){
		if(isMouseOverBackButton())
			context.drawImage(backButton_over , width - backButtonEnlargedSize/2 - buttonDistFromEdges , height - backButtonEnlargedSize/2 - buttonDistFromEdges , backButtonEnlargedSize , backButtonEnlargedSize);
		else
			context.drawImage(backButton , width - backButtonSize/2 - buttonDistFromEdges , height - backButtonSize/2 - buttonDistFromEdges , backButtonSize , backButtonSize);
	}

	function passSlide() {
		if((currentSlide == 0 && !isGoingRight) || (currentSlide == (slides.length-1) && isGoingRight)){
			return;	//can't go there
		}
		slideAwayFrame = 0;
		//slideAwaySpeed = startingSpeed;
		if(isGoingRight){
			currentSlide++;
		}
		else{	//if going left
			currentSlide--;
		}
		
		isAnimating = true;
			
	}
	
	function animateSlideAway(){
		slideAwayFrame++;
		animatedXPosition += slideAwayStep*slideAwayFrame;

		//animatedXPosition += slideAwayStep*slideAwayFrame*slideAwaySpeed;
		//if(slideAwaySpeed > decceleration){
		//	slideAwaySpeed -= decceleration;
		//	console.log(slideAwaySpeed);
		//}
			
		if(isGoingRight){
			drawSildeOffset(slides[currentSlide-1] , -animatedXPosition);
		}
		else{
			drawSildeOffset(slides[currentSlide+1] , animatedXPosition);
		}
		
		if(animatedXPosition > width) {
			slideAwayFrame = 0;
			isAnimating = false;
			animatedXPosition = 0;
		}
			
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
		else if(isMouseOverRightArrow()){
			isGoingRight = true;
			passSlide();
		}
		else if(isMouseOverLeftArrow()){
			isGoingRight = false;
			passSlide();
			
		}
	}
	
	function isMouseOverBackButton(){
		if((width - backButtonSize/2 - buttonDistFromEdges < mouseX && mouseX < width - buttonDistFromEdges + backButtonSize/2) &&
				(height - backButtonSize/2 - buttonDistFromEdges < mouseY && mouseY < height - buttonDistFromEdges + backButtonSize/2))	//clicked on back arrow
			return true;
		else
			return false;
	}

	function isMouseOverRightArrow(){
		if((width - (arrowDistFromEdges+arrowSize) < mouseX && mouseX < width - arrowDistFromEdges)
			&&(arrowYPosition - arrowSize/2 < mouseY && mouseY < arrowYPosition + arrowSize/2)) {
			return true;
		}
		else {
			return false;
		}
	}
	
	function isMouseOverLeftArrow(){
		if((arrowDistFromEdges < mouseX && mouseX < arrowDistFromEdges + arrowSize)
			&&(arrowYPosition - arrowSize/2 < mouseY && mouseY < arrowYPosition + arrowSize/2)) {
			return true;
		}
		else {
			return false;
		}
	}

	//-------------------------------------------------------------

	//event listeners :

	canvas.addEventListener("mouseup", checkClick);

	//-------------------------------------------------------------




	
}