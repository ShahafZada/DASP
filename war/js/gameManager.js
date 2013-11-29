document.addEventListener('DOMContentLoaded' , gameManager , false);


function gameManager(){
	
	var everyXmiliseconds = 40;
	
	var page = new gameMenu();
	
    setInterval(update, everyXmiliseconds);
    
    this.onChangePage = function (e) {
		alert(e.customData);
		if (e.customData == "goToGameMenu") {
			page = new gameMenu();
		}
		else if (e.customData == "goToGame") {
			page = new game();
			
		}
		
	}
	
	function update() {	//every js script in the game needs to implement these
		page.clear();
		page.logic();
		page.draw();
	}

    window.addEventListener("changePage", this.onChangePage);
	
}