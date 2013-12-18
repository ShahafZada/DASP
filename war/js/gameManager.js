document.addEventListener('DOMContentLoaded' , gameManager , false);


function gameManager(){
	
	
	//Global variables:
	mouseX = 0;
	mouseY = 0;
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");
	width = canvas.getAttribute('width');	//canvas.scrollWidth;
	height = canvas.getAttribute('height'); //canvas.scrollHeight;
	
	//other constants:
	var everyXmiliseconds = 40;

	
	
	var page = new gameMenu();
	
    setInterval(update, everyXmiliseconds);
    
    this.onChangePage = function (e) {
		//alert(e.customData);
		if (e.customData == "goToGameMenu") {
			page = new gameMenu();
		}
		else if (e.customData == "goToGame") {
			page = new game();	
		}
		else if (e.customData == "goToGameInstructions") {
			page = new gameInstructions();	
		}
		else if (e.customData == "goToGameSettings") {
			page = new gameSettings();	
		}
		else if (e.customData == "goToGameCredits") {
			page = new gameCredits();	
		}
		else if (e.customData == "goToCreateGame") {
			page = new createGame();	
		}
		
	}
	
    this.repositionMouse= function(mouseEvent) {
    	if(mouseEvent.pageX || mouseEvent.pageY == 0)
		{
			mouseX = mouseEvent.pageX - this.offsetLeft;
			mouseY = mouseEvent.pageY - this.offsetTop;
		}
		else if(mouseEvent.offsetX || mouseEvent.offsetY == 0)
		{
			mouseX = mouseEvent.offsetX;
			mouseY = mouseEvent.offsetY;
		}
    }
    
	function update() {	//every js script in the game needs to implement these
		page.clear();
		page.logic();
		page.draw();
	}	

    window.addEventListener("changePage", this.onChangePage);
    canvas.addEventListener("mousemove", this.repositionMouse);
    
    
    //TODO find a way to activate another script's function through a listen here (so there would be less isteners!)
	
}