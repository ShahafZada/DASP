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
	
	function update() {
		page.clear();
		page.logic();
		page.draw();
	}

    window.addEventListener("changePage", this.onChangePage);
	
}