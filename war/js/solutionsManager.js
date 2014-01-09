document.addEventListener('DOMContentLoaded' , solutionsManager , false);


function solutionsManager(){
	
	
	//Global variables:
	mouseX = 0;
	mouseY = 0;
	mapNum = 1;
	canvas = document.getElementById("SolutionsCanvas");
	context = canvas.getContext("2d");
	width = canvas.getAttribute('width');	//canvas.scrollWidth;
	height = canvas.getAttribute('height'); //canvas.scrollHeight;		
	//isAdmin = false;
	//loadAdmin();							//automatically changes "IsAdmin"
		
	//other constants:
	var everyXmiliseconds = 40;	
	
	var page = new solutionsChoice();
	
    setInterval(update, everyXmiliseconds);
    
    this.onChangePage = function (e) {
		//alert(e.customData);
		if (e.customData == "goToSolutionsChoice") {
			page = new solutionsChoice();
		}
		if (e.customData == "goToSolutions") {
			page = new solutions(e.mapNum);
		}
	}
	
    this.repositionMouse = function(mouseEvent) {
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
//	-------------------------------------------------------------

//	function implementations :
    
	function update() {	//every js script in the game needs to implement these
		page.clear();
		page.logic();
		page.draw();
	}	

    window.addEventListener("changePage", this.onChangePage);
    canvas.addEventListener("mousemove", this.repositionMouse);
    	
}