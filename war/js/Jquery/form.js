/**
 * This is the jQuery code for the pop-up form that appears in the end of the game
 */

function score_popup() {
	$("#shadow").fadeIn("normal");
	$("#popup_send_score").fadeIn("normal");
	$("#nameField").focus();

	$("#cancel").click(function(){
		$("#popup_send_score").fadeOut("normal");
		$("#shadow").fadeOut();
	});
}