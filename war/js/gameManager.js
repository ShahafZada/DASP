document.addEventListener('DOMContentLoaded' , gameManager , false);


function gameManager(){
	
	var everyXmiliseconds = 40;
	
	var page = new GameMenu();
	
    setInterval(update, everyXmiliseconds);

    canvas.addEventListener("changePage", onChangePage);

	
	function onChangePage(e) {
		alert("yeeeeeeeeeeeeeeeeeeeeees");
		page = new GameMenu();
	}
	
	function update() {
		page.clear();
		page.logic();
		page.draw();
	}
		
	
	
}