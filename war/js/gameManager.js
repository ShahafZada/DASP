document.addEventListener('DOMContentLoaded' , gameManager , false);


function gameManager(){
	
	
	//Global variables:
	mouseX = 0;
	mouseY = 0;
	mapNum = 1;
	canvas = document.getElementById("GameCanvas");
	context = canvas.getContext("2d");
	width = canvas.getAttribute('width');	//canvas.scrollWidth;
	height = canvas.getAttribute('height'); //canvas.scrollHeight;		
	isAdmin = false;
	loadAdmin();							//automatically changes "IsAdmin"
		
	//other constants:
	var everyXmiliseconds = 40;
	

	
	
	var page = new gameMenu();
	
    setInterval(update, everyXmiliseconds);
    
    this.onChangePage = function (e) {
		//alert(e.customData);
		if (e.customData == "goToGameMenu") {
			page = new gameMenu();
		}
		else if (e.customData == "goToGameChoice") {
			page = new gameChoice();
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
	
	function loadAdmin(){
		$.ajax({			
			url : "sign_in",
			type: "get",
			async: false,
			dataType : "json",
			contentType:"application/json",
			timeout : 30000,
			error : function() {
				alert("Error: loading the admin option");			
			},
			success : function(data) {
				isAdmin = data;
			}
		});
	}
	

    window.addEventListener("changePage", this.onChangePage);
    canvas.addEventListener("mousemove", this.repositionMouse);
    	
}