document.addEventListener('DOMContentLoaded' , gameManager , false);


function gameManager(){
	
	var everyXmiliseconds = 40;
	
	var page = new GameMenu();
	
    setInterval(update, everyXmiliseconds);
    
    this.onChangePage = function (e) {
		alert(e.customData);
		if (e.customData == "GameData") {
			page = new GameMenu();
		}
		
	}
	
	function update() {	//every js script in the game needs to implement these
		page.clear();
		page.logic();
		page.draw();
	}

    window.addEventListener("changePage", this.onChangePage);
	
}