function game(){

	//TODO draw new images, including a new current node
//	-------------------------------------------------------------

//	variant definitions :

    var ARBITRARY_NEGATIVE = -1;
    var allowConsoleMessages = true;

	//back-button:
	var backButtonSize = height/10;	// the button area is square
	var backButtonEnlargedSize = height/8;	// the button area is square
    var buttonDistFromEdges = height/16;
	
	//undo-button:
	var undoButtonHeight = height/10;
    var undoButtonWidth;
	var undoButtonEnlargedHeight = height/8;
    var undoButtonEnlargedWidth;
    var undoButtonDistFromEdges = height/64;

    //mute-button:
    var muteButtonHeight = height/10;
    var muteButtonWidth;
    var muteButtonEnlargedHeight = height/8;
    var muteButtonEnlargedWidth;
    var muteButtonDistFromEdges = height/64;

    //step counter:
    var stepDisplayDuration = 50;
    var stepDisplayTimer = stepDisplayDuration +1;
    var timeoutToDisplayPlain = 200;
    var spaceBetweenStepChars = 0;
    var stepCharHeight = height/15;
    var stepTotalWidth = 0;
    var stepCharWidth = [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0]; //index 0: 0 , index 1: 1... index 9: 9 , index 10: step width
    var stepImages = [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0]; //index 0: 0 , index 1: 1... index 9: 9 , index 10: step image


	
	// edges :
    var allowingMultiColoredEdges = false;  //determines if edges could have different colors
    var drawMarkedEdgesFirst = true;
	var lineColor = "cyan";
	var markedLineColor = "red";
    var lineWidth = "4";
	var boldLineWidth = "8";
	var boldLineColor = "black";
//	var passedThroughEdges = [];

	//TODO add an array of edges in history (so they'll get drawn after the rest of the edges)

	//nodes:
	var nodes = [];
	var nodeSize = height/10; //height and width are the same
	var mouseOverEnlarger = 0.3;
	var lastClickedID = 0;
    var stepsPlayed = 0;
	var clickHistory = [];
	clickHistory.push(lastClickedID);

//	images : 
	var startNode = new Image();
	var start_currentNode = new Image();
	var markedNode = new Image();
	var marked_currentNode = new Image();
	var nonvisitedNode = new Image();

    var step = new Image();
    var zero = new Image();
    var one = new Image();
    var two = new Image();
    var three = new Image();
    var four = new Image();
    var five = new Image();
    var six = new Image();
    var seven = new Image();
    var eight = new Image();
    var nine = new Image();


	var backButton = new Image();
	var backButton_over = new Image();
	
	var undoButton = new Image();
    var undoButton_over = new Image();

    var soundOn = new Image();
    var soundOn_Over = new Image();
    var soundOff = new Image();
    var soundOff_Over = new Image();


	startNode.src = "images/game/start_node.png";
	start_currentNode.src = "images/game/start_current_node.png";
	markedNode.src = "images/game/marked_node.png";
	marked_currentNode.src = "images/game/marked_current_node.png";
	nonvisitedNode.src = "images/game/nonvisited_node.png";

    step.src = "images/game/step_presentation/step.png";
    zero.src = "images/game/step_presentation/zero.png";
    one.src = "images/game/step_presentation/one.png";
    two.src = "images/game/step_presentation/two.png";
    three.src = "images/game/step_presentation/three.png";
    four.src = "images/game/step_presentation/four.png";
    five.src = "images/game/step_presentation/five.png";
    six.src = "images/game/step_presentation/six.png";
    seven.src = "images/game/step_presentation/seven.png";
    eight.src = "images/game/step_presentation/eight.png";
    nine.src = "images/game/step_presentation/nine.png";

    undoButton.src = "images/game/undo.png";
    undoButton_over.src = "images/game/undo.png";
	
	backButton.src = "images/backButton.png";
	backButton_over.src = "images/backButton.png";

    soundOn.src = "images/game/sound_on.png";
    soundOn_Over.src = "images/game/sound_on.png";
    soundOff.src = "images/game/sound_off.png";
    soundOff_Over.src = "images/game/sound_off.png";



    //sound:    (might not suit Internet Explorer)

    var isSoundOn = true;

    var sfxNewNode = new Audio("sounds/game/box.wav");
    var sfxVisitedNode = new Audio("sounds/game/bi3.wav");
    var undoMove = new Audio("sounds/game/ba.wav");

//	-------------------------------------------------------------



//	classes :

	function Node(id , x, y, radius , color, isStart , edges){
		this.id = id;
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.color = color;
		if(isStart){
			this.isStart = true;	//is the 
			this.isMarked = true;
		}
		else{
			this.isStart = false;
			this.isMarked = false;
		}

		this.edges = edges;
	}


	function Edge(pointedNodeID , color , weight){
		this.pointedNodeID = pointedNodeID;	//the other edge being pointed to
		this.isMarked = false;
		this.passedThrough = false;
		this.color = color;	//TODO call this instead of the global variable. change it in edges whenever a node gets clicked
		this.weight = weight; 
	}

//	-------------------------------------------------------------


//	onload :

    undoButton.onload = function(){
        undoButtonWidth = undoButton.width*(undoButtonHeight/undoButton.height);
        undoButtonEnlargedWidth = undoButtonWidth*(undoButtonEnlargedHeight/undoButtonHeight);
    }

    soundOn.onload = function(){
        muteButtonWidth = soundOn.width*(muteButtonHeight/soundOn.height);
        muteButtonEnlargedWidth = muteButtonWidth*(muteButtonEnlargedHeight/muteButtonHeight);
    }

    step.onload = function(){
        stepCharWidth[10] = step.width*(stepCharHeight/step.height);
        stepImages[10] = step;
    }
    zero.onload = function(){
        stepCharWidth[0] = zero.width*(stepCharHeight/zero.height);
        stepImages[0] = zero;
    }
    one.onload = function(){
        stepCharWidth[1] = one.width*(stepCharHeight/one.height);
        stepImages[1] = one;
    }
    two.onload = function(){
        stepCharWidth[2] = two.width*(stepCharHeight/two.height);
        stepImages[2] = two;
    }
    three.onload = function(){
        stepCharWidth[3] = three.width*(stepCharHeight/three.height);
        stepImages[3] = three;
    }
    four.onload = function(){
        stepCharWidth[4] = four.width*(stepCharHeight/four.height);
        stepImages[4] = four;
    }
    five.onload = function(){
        stepCharWidth[5] = five.width*(stepCharHeight/five.height);
        stepImages[5] = five;
    }
    six.onload = function(){
        stepCharWidth[6] = six.width*(stepCharHeight/six.height);
        stepImages[6] = six;
    }
    seven.onload = function(){
        stepCharWidth[7] = seven.width*(stepCharHeight/seven.height);
        stepImages[7] = seven;
    }
    eight.onload = function(){
        stepCharWidth[8] = eight.width*(stepCharHeight/eight.height);
        stepImages[8] = eight;
    }
    nine.onload = function(){
        stepCharWidth[9] = nine.width*(stepCharHeight/nine.height);
        stepImages[9] = nine;
    }

//	-------------------------------------------------------------
//	object creation :
	//this data is supposed to be taken from another file (a "stage" file)


	$.ajax({
		url : "CreateMap",
		async: false,
		data : { map_num : mapNum },
		error : function(data) {
			console.log("Error: ", data);
		}  ,
		type : "post",
		timeout : 30000
	});

	setTimeout(function() {
	$.ajax({			
		url : "CreateMap",
		type: "get",
		async: false,
		dataType : "json",
		contentType:"application/json",
		timeout : 150000,
		error : function() {
			console.log("Error: loading the map failed");			
			var event = document.createEvent("Event");
			event.initEvent("changePage", true, true);
			event.customData = "goToGameMenu";
			window.dispatchEvent(event);
		},
		success : function(data) {
			nodes = data;
		}
	});
	} , 1000);




//	-------------------------------------------------------------



//	page-function implementations :


	this.clear = function(){
		context.clearRect(0, 0, width, height);
	}

	this.logic = function() {
        stepDisplayTimer++;

		//check "closed" edges
		for(var i = 0 ; i < nodes.length - 1 ; i++){
			for(var j = i+1 ; j < nodes.length ; j++){
				if(nodes[i].isMarked && nodes[j].isMarked){
					for(var k = 0 ; k < nodes[i].edges.length ; k++){
						if(j == nodes[i].edges[k].pointedNodeID)
							nodes[i].edges[k].isMarked = true;
					}
					for(var k = 0 ; k < nodes[j].edges.length ; k++){
						if(i == nodes[j].edges[k].pointedNodeID)
							nodes[j].edges[k].isMarked = true;
					}

				}
			}

		}


		//checking if game's finished (i.e. all nodes marked)
		for(var i = 0 ; i < nodes.length ; i++){
			if(nodes[i].isMarked){
				if(i == nodes.length - 1){
					//alert("YAAY!! :) \n your steps:" + clickHistory.length);
					exit();//yay, finished game!
				}
				else{
					continue;
				}
			}
			else
				break;
		}


	}

	this.draw = function(){     	
		drawEdges();
		drawNodes();	

		//back button drawing
		drawBackButton();
        drawUndoButton();
        drawMuteButton();

        drawSteps();
	}




//	-------------------------------------------------------------

//	other private functions :


	function drawNodes(){     

		for(var i = 0 ; i < nodes.length ; i++){

			if(nodes[i].isStart){
				if(nodes[i].id == lastClickedID)	//current
					drawNode(start_currentNode , nodes[i] , mouseInNodeRange(nodes[i]));

				else
					drawNode(startNode , nodes[i] , mouseInNodeRange(nodes[i]));
			}

			else if(nodes[i].isMarked){
				if(nodes[i].id == lastClickedID)	//current
					drawNode(marked_currentNode , nodes[i] , mouseInNodeRange(nodes[i]));
				else
					drawNode(markedNode , nodes[i] , mouseInNodeRange(nodes[i]));
			}

			else{
				drawNode(nonvisitedNode , nodes[i] , mouseInNodeRange(nodes[i]));
			}

		}
	}

	function drawEdges(){
        if(drawMarkedEdgesFirst){
            //marked
            for(var i = 0 ; i < nodes.length ; i++){
                for(var j = 0 ; j < nodes[i].edges.length ; j++){
                    if(nodes[i].id > nodes[i].edges[j].pointedNodeID){	//connecting through one direction only

                        if(nodes[i].edges[j].passedThrough)
                            drawAFuckingLine(i , j , boldLineColor , boldLineWidth);
                        if(allowingMultiColoredEdges){
                            if(nodes[i].edges[j].isMarked)
                                drawAFuckingLine(i , j , nodes[i].edges[j].color , lineWidth);
                        }
                        else{
                            if(nodes[i].edges[j].isMarked)
                                drawAFuckingLine(i , j , markedLineColor , lineWidth);
                        }

                        //TODO place the bold/marked lines above others
                    }
                }
            }

            //unmarked
            for(var i = 0 ; i < nodes.length ; i++){
                for(var j = 0 ; j < nodes[i].edges.length ; j++){
                    if(nodes[i].id > nodes[i].edges[j].pointedNodeID){	//connecting through one direction only


                        if(allowingMultiColoredEdges){
                            if(!nodes[i].edges[j].isMarked)
                                drawAFuckingLine(i , j , nodes[i].edges[j].color , lineWidth);
                        }
                        else{
                            if(!nodes[i].edges[j].isMarked)
                                drawAFuckingLine(i , j , lineColor , lineWidth);

                        }

                        //TODO place the bold/marked lines above others
                    }
                }
            }

        }
        else{
            for(var i = 0 ; i < nodes.length ; i++){
                for(var j = 0 ; j < nodes[i].edges.length ; j++){
                    if(nodes[i].id > nodes[i].edges[j].pointedNodeID){	//connecting through one direction only

                        if(nodes[i].edges[j].passedThrough)
                            drawAFuckingLine(i , j , boldLineColor , boldLineWidth);
                        if(allowingMultiColoredEdges){
                            drawAFuckingLine(i , j , nodes[i].edges[j].color , lineWidth);
                        }
                        else{
                            if(nodes[i].edges[j].isMarked)
                                drawAFuckingLine(i , j , markedLineColor , lineWidth);
                            else
                                drawAFuckingLine(i , j , lineColor , lineWidth);
                        }

                        //TODO place the bold/marked lines above others
                    }
                }
            }
        }

	}



	function drawBackButton(){
        if(isMouseOverBackButton())
            context.drawImage(backButton_over , width - backButtonEnlargedSize/2 - buttonDistFromEdges , height - backButtonEnlargedSize/2 - buttonDistFromEdges , backButtonEnlargedSize , backButtonEnlargedSize);
        else
			context.drawImage(backButton , width - backButtonSize/2 - buttonDistFromEdges , height - backButtonSize/2 - buttonDistFromEdges , backButtonSize , backButtonSize);
	}

    function drawUndoButton(){
        if(isMouseOverUndoButton())
            context.drawImage(undoButton_over , width - undoButtonDistFromEdges - (undoButtonWidth + 0.5*(undoButtonEnlargedWidth-undoButtonWidth)) , undoButtonDistFromEdges - 0.5*(undoButtonEnlargedHeight - undoButtonHeight) , undoButtonEnlargedWidth , undoButtonEnlargedHeight);
        else
            context.drawImage(undoButton , width - undoButtonDistFromEdges - undoButtonWidth , undoButtonDistFromEdges , undoButtonWidth , undoButtonHeight);
    }

    function drawMuteButton(){
        if(isSoundOn){
            if(isMouseOverMuteButton())
                context.drawImage(soundOn_Over , width - muteButtonDistFromEdges - (muteButtonWidth + 0.5*(muteButtonEnlargedWidth-muteButtonWidth)) , undoButtonDistFromEdges + undoButtonHeight + muteButtonDistFromEdges - 0.5*(muteButtonEnlargedHeight - muteButtonHeight) , muteButtonEnlargedWidth , muteButtonEnlargedHeight);
            else
                context.drawImage(soundOn , width - muteButtonDistFromEdges - muteButtonWidth , undoButtonDistFromEdges + undoButtonHeight + muteButtonDistFromEdges , muteButtonWidth , muteButtonHeight);
        }
        else{
            if(isMouseOverMuteButton())
                context.drawImage(soundOff_Over , width - muteButtonDistFromEdges - (muteButtonWidth + 0.5*(muteButtonEnlargedWidth-muteButtonWidth)) , undoButtonDistFromEdges + undoButtonHeight + muteButtonDistFromEdges - 0.5*(muteButtonEnlargedHeight - muteButtonHeight) , muteButtonEnlargedWidth , muteButtonEnlargedHeight);
            else
                context.drawImage(soundOff , width - muteButtonDistFromEdges - muteButtonWidth , undoButtonDistFromEdges + undoButtonHeight + muteButtonDistFromEdges , muteButtonWidth , muteButtonHeight);
        }

    }

    function drawSteps(){
        if(stepDisplayTimer < stepDisplayDuration){
            var numOfSteps = stepsPlayed;
            var scanner = 1;

            context.globalAlpha = (stepDisplayDuration - stepDisplayTimer)/stepDisplayDuration;
            
            var currentDrawingLocationX = nodes[lastClickedID].x + nodes[lastClickedID].radius - stepTotalWidth/2; //knowing that lastClickedID is also the index
            var currentDrawingLocationY = nodes[lastClickedID].y + 2*nodes[lastClickedID].radius + spaceBetweenStepChars;
            context.drawImage(step , currentDrawingLocationX , currentDrawingLocationY , stepCharWidth[10] , stepCharHeight);
            currentDrawingLocationX += stepCharWidth[10];

            while(scanner <= numOfSteps){
                scanner *= 10
            }
            //scanner is 1 digit longer than numOfSteps

            if(scanner == 1){
                currentDrawingLocationX += spaceBetweenStepChars;

                context.drawImage(stepImages[0] , currentDrawingLocationX , currentDrawingLocationY , stepCharWidth[0] , stepCharHeight);
            }
            while(scanner != 1){
                scanner /= 10;

                var highestDigit = 0;
                while(highestDigit * scanner <= numOfSteps){
                    highestDigit++;
                }
                highestDigit--;

                currentDrawingLocationX += spaceBetweenStepChars;

                context.drawImage(stepImages[highestDigit] , currentDrawingLocationX , currentDrawingLocationY , stepCharWidth[highestDigit] , stepCharHeight);
                currentDrawingLocationX += stepCharWidth[highestDigit];

                numOfSteps -= (highestDigit * scanner);

            }
            context.globalAlpha = 1;
        }
        else if(stepDisplayTimer > timeoutToDisplayPlain){
            context.font="30px Arial";
            context.fillText("Steps: " + stepsPlayed, 10 , 50);
        }
    }

    function startStepsDisplay(){
        stepDisplayTimer = 0;

        var numOfSteps = stepsPlayed;
        var currentDigit;
        stepTotalWidth = stepCharWidth[10];

        while(numOfSteps != 0){
            stepTotalWidth += spaceBetweenStepChars;
            currentDigit = numOfSteps;

            numOfSteps /= 10;
            numOfSteps = Math.floor(numOfSteps);

            currentDigit -= (numOfSteps*10);    //getting the digit we took out
            stepTotalWidth += stepCharWidth[currentDigit];
        }
    }

	function mouseInNodeRange(node){
		var r = node.radius;
		var xDist = node.x + node.radius - mouseX;
		var yDist = node.y + node.radius - mouseY;

		if(r*r > xDist*xDist + yDist*yDist)
			return true;
		else
			return false;
	}

	function checkClick(){
		//Node click check
		for(var i = 0 ; i < nodes.length ; i++){
			if(mouseInNodeRange(nodes[i]))
				clickNode(i);
		}

        if(isMouseOverMuteButton()){	//clicked on mute button
            isSoundOn = !isSoundOn;
        }

        if(isMouseOverUndoButton()){	//clicked on undo
            unclickNode();
        }

		//Back-button check
		if(isMouseOverBackButton()){	//clicked on back arrow
            var screwThisImQuitting = confirm("Your progress won't be saved, are you sure you want to quit?");
            if(screwThisImQuitting == true){
			    var event = document.createEvent("Event");
			    event.initEvent("changePage", true, true);
                event.customData = "goToGameMenu";
                window.dispatchEvent(event);
                this.removeEventListener("mouseup", checkClick);
            }
		}

	}

	function clickNode(i){
		if(i == lastClickedID)
			return;

		for(var j = 0 ; j < nodes[lastClickedID].edges.length ; j++){
			if(nodes[lastClickedID].edges[j].pointedNodeID == i){
                //playing sound:

                if(nodes[i].isMarked)
                    playSFX(sfxVisitedNode);
                else
                    playSFX(sfxNewNode);

                stepsPlayed += nodes[i].edges[getEdgeIndex(i , lastClickedID)].weight;
				nodes[lastClickedID].edges[j].passedThrough = true;
				nodes[i].edges[getEdgeIndex(i , lastClickedID)].passedThrough = true;
				nodes[i].isMarked = true;
				lastClickedID = i;
				clickHistory.push(lastClickedID);
                startStepsDisplay();
                break;
			}
		}
	}

    function unclickNode(){
        if(clickHistory.length == 1)    //back at start node
            return;

        playSFX(undoMove);

        var nodeWasVisitedBefore = false;
        var prevNodeVisitedCurrentNodeBefore = false;
        for(var i = 0 ; i < clickHistory.length - 1 ; i++){
            if(clickHistory[i] == lastClickedID){
                nodeWasVisitedBefore = true;
                if(i != 0){
                    if(clickHistory[i - 1] == clickHistory[clickHistory.length - 2]){
                        prevNodeVisitedCurrentNodeBefore = true;
                    }
                }
                if(i != clickHistory.length - 2){
                    if(clickHistory[i + 1] == clickHistory[clickHistory.length - 2]){
                        prevNodeVisitedCurrentNodeBefore = true;
                    }
                }
            }
        }
        if(!nodeWasVisitedBefore){
            nodes[lastClickedID].isMarked = false;
        }
        //otherwise, we leave it marked
        if(!prevNodeVisitedCurrentNodeBefore){
            nodes[lastClickedID].edges[getEdgeIndex(lastClickedID , clickHistory[clickHistory.length - 2])].passedThrough = false;
            nodes[clickHistory[clickHistory.length - 2]].edges[getEdgeIndex(clickHistory[clickHistory.length - 2] , lastClickedID)].passedThrough = false;
            nodes[lastClickedID].edges[getEdgeIndex(lastClickedID , clickHistory[clickHistory.length - 2])].isMarked = false;
            nodes[clickHistory[clickHistory.length - 2]].edges[getEdgeIndex(clickHistory[clickHistory.length - 2] , lastClickedID)].isMarked = false;
        }
        //otherwise, we leave them (edges in both directions) marked

        stepsPlayed -= nodes[clickHistory[clickHistory.length - 1]].edges[getEdgeIndex(clickHistory[clickHistory.length - 1] , clickHistory[clickHistory.length - 2])].weight;

        clickHistory.pop(lastClickedID);
        lastClickedID = clickHistory[clickHistory.length - 1];
        startStepsDisplay();
    }

	function getEdgeIndex(from , to){
		for(var i = 0 ; i < nodes[from].edges.length ; i++){
			if(nodes[from].edges[i].pointedNodeID == to){
				return i;	//edge index
			}	
		}

	}

    function isMouseOverMuteButton(){
        if((width - muteButtonWidth - muteButtonDistFromEdges < mouseX && mouseX < width - muteButtonDistFromEdges) &&
            (undoButtonDistFromEdges + undoButtonHeight + muteButtonDistFromEdges < mouseY && mouseY < undoButtonDistFromEdges + undoButtonHeight + muteButtonDistFromEdges + muteButtonHeight))	//clicked on back arrow
            return true;
        else
            return false;
    }

	function isMouseOverUndoButton(){
		if((width - undoButtonWidth - undoButtonDistFromEdges < mouseX && mouseX < width - undoButtonDistFromEdges) &&
				(undoButtonDistFromEdges < mouseY && mouseY < undoButtonDistFromEdges + undoButtonHeight))	//clicked on back arrow
			return true;
		else
			return false;
	}

	function isMouseOverBackButton(){
		if((width - backButtonSize/2 - buttonDistFromEdges < mouseX && mouseX < width - buttonDistFromEdges + backButtonSize/2) &&
				(height - backButtonSize/2 - buttonDistFromEdges < mouseY && mouseY < height - buttonDistFromEdges + backButtonSize/2))	//clicked on back arrow
			return true;
		else
			return false;
	}



	function drawNode(imageHolder , node , isMouseOver){
		if(isMouseOver)
			context.drawImage(imageHolder , node.x - node.radius*mouseOverEnlarger , node.y - node.radius*mouseOverEnlarger , 2*node.radius*(1 + mouseOverEnlarger) , 2*node.radius*(1 + mouseOverEnlarger));
		else
			context.drawImage(imageHolder , node.x , node.y , 2*node.radius , 2*node.radius);
	}

	function drawAFuckingLine(nodeID , edgeIndex , color , lineW){
		var indexTo = nodes[nodeID].edges[edgeIndex].pointedNodeID;
		context.beginPath();
		context.lineWidth = lineW;
		context.strokeStyle = color;
		context.moveTo(nodes[nodeID].x + nodes[nodeID].radius , nodes[nodeID].y + nodes[nodeID].radius);
		context.lineTo(nodes[indexTo].x + nodes[nodeID].radius , nodes[indexTo].y + nodes[nodeID].radius);
		context.stroke();
	}

    function playSFX(sound){
        if(!isSoundOn)
            return;

        sound.play();
        sound.currentTime = 0;
    }

	function exit(){
		var event = document.createEvent("Event");
		event.initEvent("changePage", true, true);
		event.customData = "goToGameMenu";
		window.dispatchEvent(event);
		this.removeEventListener("mouseup", checkClick);
		$("#score").text(stepsPlayed);
		$("#scoreField").val(stepsPlayed);
		$("#mapNumField").val(mapNum);
		sendSolutionPath();
		score_popup();		
		//$("#scoreField").text("is"+ clickHistory.length);

	}

	//Saving the solution path 
	//Solution path is index array, meaning it's type is int []
	function sendSolutionPath(){
		var json = JSON.stringify(clickHistory);
		jQuery.ajax({
            url : "SolutionPathServlet",
            data : { path : json , map_num : mapNum },
            error : function(data) {
                console.log("Error: ", data);
            },
            success : function(){
                alert("Saved!");
            },
            type : "post",
            timeout : 30000
        });
	
	}
	

//	-------------------------------------------------------------

//	event listeners :

	canvas.addEventListener("mouseup", checkClick);

//	-------------------------------------------------------------
}

