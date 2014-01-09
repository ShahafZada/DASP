function createGame(){

    //the script generates an array of Nodes, which all contain arrays of edges
    //the nodes array is possibly messed, by "incorrect" indexing to each node (not matching ID) - but fear not, for if it matters, the array can be sorted. Besides, the edge drawing utilizes IDs (and not indexes) anyway

//	-------------------------------------------------------------

    //		variant definitions :

    var ARBITRARY_NEGATIVE = -1;

    var allowConsoleMessages = true;


    //mode (chosen tool) :
    var currentMode = 0;
    var modes = [];


    //mode buttons :
    var buttonHeight = height/6;
    var buttonWidth = buttonHeight;
    var frameSize = buttonHeight * 1.1;
    var saveButtonWidth;
    //var distanceBetweenButtons;	//eventually not used
    var buttonDistFromEdges = ARBITRARY_NEGATIVE;	//needs to be any negative value, which would trigger a fail-safe loop below

    var nodesInRandomizedMap = 10;
    var maxRandomizingAttempts = 1000;
    var connectRandomNodesElegantly = false;
    var alreadyVisitedIndexes = [];


    var buttons = [];
    var buttonsOver = [];
    var buttonsActive = [];
    var buttonPositions = [];



    //GUI control :
    var showTools = true;
    var arrowHeight = buttonHeight/2;
    var arrowOverHeight = arrowHeight*1.1;
    var expandArrowWidth , collapseArrowWidth;
    var expandArrowOverWidth , collapseArrowOverWidth;
    var collapseArrow = new Image();
    var expandArrow = new Image();



    var createNodeButton = new Image();
    var eraseNodeButton = new Image();
    var createEdgeButton = new Image();
    var eraseEdgeButton = new Image();
    var setStartButton = new Image();
    var randomizeButton = new Image();
    var moveNodesButton = new Image();
    var setEdgePropertiesButton = new Image();
    var saveButton = new Image();

    var createNodeButton_Over = new Image();
    var eraseNodeButton_Over = new Image();
    var createEdgeButton_Over = new Image();
    var eraseEdgeButton_Over = new Image();
    var setStartButton_Over = new Image();
    var randomizeButton_Over = new Image();
    var moveNodesButton_Over = new Image();
    var setEdgePropertiesButton_Over = new Image();
    var saveButton_Over = new Image();

    var createNodeButton_Active = new Image();
    var eraseNodeButton_Active = new Image();
    var createEdgeButton_Active = new Image();
    var eraseEdgeButton_Active = new Image();
    var setStartButton_Active = new Image();
    var randomizeButton_Active = new Image();
    var moveNodesButton_Active = new Image();
    var setEdgePropertiesButton_Active = new Image();
    var saveButton_Active = new Image();

    var buttonFrame = new Image();



    collapseArrow.src =  "images/createGame/collapseArrow.png";
    expandArrow.src =  "images/createGame/expandArrow.png";

    createNodeButton.src = "images/createGame/Create_Nodes_Button.png";
    eraseNodeButton.src = "images/createGame/Erase_Nodes_Button.png";
    createEdgeButton.src = "images/createGame/Create_Edges_Button.png";
    eraseEdgeButton.src = "images/createGame/Erase_Edges_Button.png";
    setStartButton.src = "images/createGame/Set_Start_Button.png";
    randomizeButton.src = "images/createGame/Rand_Button.png";
    moveNodesButton.src = "images/createGame/Move_Nodes_Button.png";   //TODO - own version
    setEdgePropertiesButton.src = "images/createGame/Set_Edge_Properties_Button.png";   //TODO - own version
    saveButton.src = "images/createGame/Save_Button.png";

    createNodeButton_Over.src = "images/createGame/Create_Nodes_Button_Over.png";
    eraseNodeButton_Over.src = "images/createGame/Erase_Nodes_Button_Over.png";
    createEdgeButton_Over.src = "images/createGame/Create_Edges_Button_Over.png";
    eraseEdgeButton_Over.src = "images/createGame/Erase_Edges_Button_Over.png";
    setStartButton_Over.src = "images/createGame/Set_Start_Button_Over.png";
    randomizeButton_Over.src = "images/createGame/Rand_Button_Over.png";
    moveNodesButton_Over.src = "images/createGame/Move_Nodes_Button.png";   //TODO - own version
    setEdgePropertiesButton_Over.src = "images/createGame/Set_Edge_Properties_Button.png";   //TODO - own version
    saveButton_Over.src = "images/createGame/Save_Button_Over.png";

    createNodeButton_Active.src = "images/createGame/Create_Nodes_Button_Active.png";
    eraseNodeButton_Active.src = "images/createGame/Erase_Nodes_Button_Active.png";
    createEdgeButton_Active.src = "images/createGame/Create_Edges_Button_Active.png";
    eraseEdgeButton_Active.src = "images/createGame/Erase_Edges_Button_Active.png";
    setStartButton_Active.src = "images/createGame/Set_Start_Button_Active.png";
    randomizeButton_Active.src = "images/createGame/Rand_Button_Active.png";
    moveNodesButton_Active.src = "images/createGame/Move_Nodes_Button.png";
    setEdgePropertiesButton_Active.src = "images/createGame/Set_Edge_Properties_Button.png";   //TODO - own version
    saveButton_Active.src = "images/createGame/Save_Button_Active.png";//TODO - own version

    buttonFrame.src = "images/createGame/frame.png";


    //back-button : (not counted as a mode button)
    var backButtonSize = height/10;	// the button area is square
    var backButtonEnlargedSize = height/8;	// the button area is square
    var backButtonDistFromEdges = height/16;

    var backButton = new Image();
    var backButton_over = new Image();




    // nodes :
    var nodeSize = height/10; //height and width are the same
    var nodeRadius = nodeSize/2;

    var startNode = new Image();
    //var start_currentNode = new Image();	//not needed when just creating a map
    //var markedNode = new Image();
    //var marked_currentNode = new Image();
    var nonvisitedNode = new Image();
    var ghostNode = new Image();

    var selectedNodeToMove = ARBITRARY_NEGATIVE;
    var farthestAvailableID = 0;	//the value here is the lowest ID (the count's start)
    var releasedIDs = [];	//IDs of erased nodes, yet to be re-used in new nodes

    var nodes = [];



    startNode.src = "images/game/start_node.png";
    //start_currentNode.src = "images/game/start_current_node.png";
    //markedNode.src = "images/game/marked_node.png";
    //marked_currentNode.src = "images/game/marked_current_node.png";
    nonvisitedNode.src = "images/game/nonvisited_node.png";
    ghostNode.src = "images/createGame/ghost_node.png";

    backButton.src = "images/backButton.png";
    backButton_over.src = "images/backButton.png";



    // edges :

    var defaultEdgeWeight = 1;
    var defaultEdgeWidth = 5;
    var defaultEdgeColor = "cyan";

    var lastClickedNodeID = ARBITRARY_NEGATIVE;	//while it's negative: no node was touched. Use this to know if node was touched, for that DO NOT use the index identifier (lastClickedNodeIndex)
    var lastClickedNodeIndex;

    var allowingMultiColoredEdges = true;
    var restColorRandomizing = 2;	//there's a certain edge which would get randomized every 'restColorRandomizing' cycles. In other words, this is sleep for randomize
    var restRandomizingCounter = 0;


    buttons.push(createNodeButton);
    buttons.push(eraseNodeButton);
    buttons.push(createEdgeButton);
    buttons.push(eraseEdgeButton);
    buttons.push(setStartButton);
    buttons.push(randomizeButton);
    buttons.push(moveNodesButton);
    buttons.push(setEdgePropertiesButton);
    buttons.push(saveButton);

    buttonsOver.push(createNodeButton_Over);
    buttonsOver.push(eraseNodeButton_Over);
    buttonsOver.push(createEdgeButton_Over);
    buttonsOver.push(eraseEdgeButton_Over);
    buttonsOver.push(setStartButton_Over);
    buttonsOver.push(randomizeButton_Over);
    buttonsOver.push(moveNodesButton_Over);
    buttonsOver.push(setEdgePropertiesButton_Over);
    buttonsOver.push(saveButton_Over);

    buttonsActive.push(createNodeButton_Active);
    buttonsActive.push(eraseNodeButton_Active);
    buttonsActive.push(createEdgeButton_Active);
    buttonsActive.push(eraseEdgeButton_Active);
    buttonsActive.push(setStartButton_Active);
    buttonsActive.push(randomizeButton_Active);
    buttonsActive.push(moveNodesButton_Active);
    buttonsActive.push(setEdgePropertiesButton_Active);
    buttonsActive.push(saveButton_Active);


    for(var i = 0 ; i < buttons.length ; i++){	//initializing in mode setStart
        if(i == buttons.indexOf(setStartButton))
            modes.push(true);
        else
            modes.push(false);
    }
    currentMode = modes.indexOf(true);


    while(buttonDistFromEdges < 0){	//fail-safe
        buttonHeight *= 0.95;
        buttonWidth *= 0.95;
        frameSize *= 0.95;
        arrowHeight *= 0.95;
        arrowOverHeight *= 0.95;
        buttonDistFromEdges = (height - backButtonSize - backButtonDistFromEdges - (((buttons.length-1)/2 + 1) * buttonHeight)) / ((buttons.length-1)/2);	//average of free height per button
    }

//	-------------------------------------------------------------

//	onload functions : 


    saveButton.onload = function(){
        saveButtonWidth = saveButton.width / (saveButton.height / buttonHeight);
        //distanceBetweenButtons = saveButtonWidth - 2*buttonWidth;	//not used

        determinePositions(buttonPositions , buttons);
    }


    expandArrow.onload = function(){
        expandArrowWidth = expandArrow.width * (arrowHeight / expandArrow.height);
        expandArrowOverWidth = expandArrowWidth * (arrowOverHeight / arrowHeight);
    }

    collapseArrow.onload = function(){
        collapseArrowWidth = collapseArrow.width * (arrowHeight / collapseArrow.height);
        collapseArrowOverWidth = collapseArrowWidth * (arrowOverHeight / arrowHeight);
    }





//	-------------------------------------------------------------

//	classes : 

    function coord(x,y){
        this.xPos = x;
        this.yPos = y;
    }


    function Node(id , x, y, radius , isStart){
        this.id = id;
        this.x = x;
        this.y = y;
        this.radius = radius;
        if(isStart){
            this.isStart = true;	//is the
            this.isMarked = true;
        }
        else{
            this.isStart = false;
            this.isMarked = false;
        }

        this.edges = [];
    }


    function Edge(pointedNodeID , color , weight){
        this.pointedNodeID = pointedNodeID;	//the other node being pointed to
        this.isMarked = false;
        this.passedThrough = false;
        this.color = color;
        this.weight = weight;
    }


//	-------------------------------------------------------------





//	page-function implementations :

    this.clear = function(){
        context.clearRect(0, 0, width, height);
    }




    this.logic = function() {

        if(currentMode == buttons.indexOf(randomizeButton)){	//Randomize
            var screwThisImStartingOver = confirm("A map would be generated with " + nodesInRandomizedMap + " nodes.\nYou do know that the current layout would be wiped out... right?");
            if(screwThisImStartingOver == true){

                //destroy all nodes (or better described: start over)
                nodes = [];
                farthestAvailableID = 0;
                releasedIDs = [];
                lastClickedNodeID = ARBITRARY_NEGATIVE;


                //add nodes
                var nodeRandomX , nodeRandomY;
                var randomizingAttempts;
                var successfullyAddedNode;

                for(var i = 0 ; i < nodesInRandomizedMap ; i++){
                    randomizingAttempts = 0;
                    successfullyAddedNode = false;

                    do{
                        randomizingAttempts++;

                        nodeRandomX = Math.random();
                        nodeRandomX *= width - backButtonSize/2 - backButtonDistFromEdges - 2*nodeRadius;
                        nodeRandomX += nodeRadius;

                        nodeRandomY = Math.random();
                        nodeRandomY *= height - 2*nodeRadius;
                        nodeRandomY += nodeRadius;

                        if(isCircleNotTouchingOtherNodes(nodeRandomX , nodeRandomY , nodeRadius)){
                            addNode(nodeRandomX , nodeRandomY , false);
                            successfullyAddedNode = true;
                        }
                    }while( (!successfullyAddedNode) && (randomizingAttempts < maxRandomizingAttempts) );

                    if(randomizingAttempts >= maxRandomizingAttempts){	//quit because couldn't add node
                        alert("Was able to create " + i + " nodes (out of " + nodesInRandomizedMap + ")before failing to place the recent one");
                        break;
                    }

                }

                //setting a start point (it's all random, so why not the first...)
                nodes[0].isStart = true;
                nodes[0].isMarked = true;

                do{
                    for(var i = 0 ; i < nodes.length ; i++){
                        addEdgeRandomly(i);
                    }
                }while(!areAllNodesConnectedToTheSystem());



            }


            else{
                alert("be more careful with that button...");
            }

            setMode(buttons.indexOf(createNodeButton));
        }
        else if(currentMode == buttons.indexOf(saveButton)){	//Save

            if(!areAllNodesConnectedToTheSystem()){
                if(allowConsoleMessages)
                    console.log("Map is illegal ; did not save");
            }

            else{	//all nodes can be reached from start

                //organize the nodes array
                for(var i = 0 ; i < nodes.length ; i++){	//bubble sort!!
                    for(var j = 0 ; j < nodes.length - 1 ; j++){
                        if(nodes[j].id > nodes[j+1].id){	//switch
                            var temp = nodes[j];
                            nodes[j] = nodes[j+1];
                            nodes[j+1] = temp;
                        }
                    }
                }
//				if(allowConsoleMessages){
//					console.log("Array arrangement:");
//					for(var i = 0 ; i < nodes.length ; i++){
//						console.log("Index: " + i + " id: " + nodes[i].id);
//					}
//				}
                for(var i = 0 ; i < nodes.length ; i++){
                    for(var j = 0 ; j < nodes[i].edges.length ; j++){	//makes pointing edges use a correct pointedID
                        var otherNodeIndex;
                        otherNodeIndex = getNodesIndexFromNodeID(nodes[i].edges[j].pointedNodeID);
                        for(var k = 0 ; k < nodes[otherNodeIndex].edges.length ; k++){
                            if(nodes[otherNodeIndex].edges[k].pointedNodeID == nodes[i].id)
                                nodes[otherNodeIndex].edges[k].pointedNodeID = i;
                        }
                    }

                    nodes[i].id = i;	//changes node's id (to that of its index)
                }



                var json = JSON.stringify(nodes);
                //console.log(json);

                var mapN = prompt("Enter map num");


                jQuery.ajax({
                    url : "SaveNewMap",
                    data : { nodes : json , map : mapN },
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

            setMode(buttons.indexOf(createNodeButton));

        }

    }

    this.draw = function(){

        //drawing map elements
        //edges
        for(var i = 0 ; i < nodes.length ; i++){
            for(var j = 0 ; j < nodes[i].edges.length ; j++){
                if(nodes[i].id < nodes[i].edges[j].pointedNodeID){	//makes sure we only draw every edge once (because there are 2 directions)
                    var pointedNodeIndex = getNodesIndexFromNodeID(nodes[i].edges[j].pointedNodeID);	//finds the other end's position in nodes
                    if(allowingMultiColoredEdges)
                        drawLineFromPointToPoint(nodes[i].x + nodes[i].radius , nodes[i].y + nodes[i].radius , nodes[pointedNodeIndex].x + nodes[pointedNodeIndex].radius , nodes[pointedNodeIndex].y + nodes[pointedNodeIndex].radius , nodes[i].edges[j].color);
                    else
                        drawLineFromPointToPoint(nodes[i].x + nodes[i].radius , nodes[i].y + nodes[i].radius , nodes[pointedNodeIndex].x + nodes[pointedNodeIndex].radius , nodes[pointedNodeIndex].y + nodes[pointedNodeIndex].radius , defaultEdgeColor);
                }
            }

        }
        if(lastClickedNodeID >= 0){	//need to draw line from picked node towards mouse
            if(allowingMultiColoredEdges){
                if(restRandomizingCounter == restColorRandomizing){	//saving some work for your computer :)
                    restRandomizingCounter = 0;
                    drawLineFromPointToPoint(nodes[lastClickedNodeIndex].x + nodes[lastClickedNodeIndex].radius , nodes[lastClickedNodeIndex].y + nodes[lastClickedNodeIndex].radius , mouseX , mouseY , randomRGBColor());
                }
                restRandomizingCounter++;
            }
            else	// if using uni-color
                drawLineFromPointToPoint(nodes[lastClickedNodeIndex].x + nodes[lastClickedNodeIndex].radius , nodes[lastClickedNodeIndex].y + nodes[lastClickedNodeIndex].radius , mouseX , mouseY , defaultEdgeColor);	//drawing line from node to nothing (where the mouse is)
        }


        //nodes
        for(var i = 0 ; i < nodes.length ; i++){
            if(nodes[i].isStart)
                drawNode(startNode , nodes[i]);
            else
                drawNode(nonvisitedNode , nodes[i]);
        }

        if(selectedNodeToMove >= 0){
            context.drawImage(ghostNode , mouseX-nodeSize/2 , mouseY-nodeSize/2 , nodeSize , nodeSize); //drawing  at mouse location
            //drawing over the chosen node
            context.drawImage(ghostNode , nodes[selectedNodeToMove].x , nodes[selectedNodeToMove].y , nodeSize , nodeSize);
            for(var j = 0 ; j < nodes[selectedNodeToMove].edges.length ; j++){
                //drawLineFromPointToPoint(mouseX , mouseY , nodes[getNodesIndexFromNodeID(nodes[selectedNodeToMove].edges[j].pointedNodeID)].x , nodes[getNodesIndexFromNodeID(nodes[selectedNodeToMove].edges[i].pointedNodeID)].y , randomRGBColor());
            }
        }


        //drawing buttons and collapse arrow
        if(showTools){
            for(var i = 0 ; i < buttons.length ; i++){

                if(isMouseOverButton(i))
                    drawButton(buttonsOver , i);
                else if(modes[i]){
                    drawFrame(i);
                    drawButton(buttonsActive , i);
                }
                else{
                    drawButton(buttons , i);
                }
            }
            drawCollapseArrow();
        }
        else{	//GUI isn't shown
            drawExpandArrow();
        }


        drawBackButton();
    }










//	-------------------------------------------------------------


//	other private functions :



//////////////////////////draw functions



    function drawButton(array , i){
        if(i == buttons.indexOf(saveButton))
            context.drawImage(array[i] , buttonPositions[i].xPos , buttonPositions[i].yPos , saveButtonWidth , buttonHeight);	//save button. It's larger than the rest
        else
            context.drawImage(array[i] , buttonPositions[i].xPos , buttonPositions[i].yPos , buttonWidth , buttonHeight);
    }

    function drawFrame(i){
        if(i == buttons.indexOf(saveButton)){
            var saveFrameWidth = saveButtonWidth*frameSize/buttonWidth;
            context.drawImage(buttonFrame , buttonPositions[i].xPos + saveButtonWidth/2 - saveFrameWidth/2 , buttonPositions[i].yPos + buttonHeight/2 - frameSize/2 , saveFrameWidth , frameSize);
        }
        else
            context.drawImage(buttonFrame , buttonPositions[i].xPos + buttonWidth/2 - frameSize/2 , buttonPositions[i].yPos + buttonHeight/2 - frameSize/2 , frameSize , frameSize);
    }


    function drawCollapseArrow(){
        if(isMouseOverCollapseButton())
            context.drawImage(collapseArrow , buttonPositions[0].xPos - collapseArrowWidth - buttonDistFromEdges - (((collapseArrowOverWidth - collapseArrowWidth))/2) , buttonPositions[0].yPos - ((arrowOverHeight - arrowHeight)/2), collapseArrowOverWidth , arrowOverHeight);
        else
            context.drawImage(collapseArrow , buttonPositions[0].xPos - collapseArrowWidth - buttonDistFromEdges , buttonPositions[0].yPos , collapseArrowWidth , arrowHeight);
    }

    function drawExpandArrow(){
        if(isMouseOverExpandButton())
            context.drawImage(expandArrow , width - expandArrowWidth - (((expandArrowOverWidth - expandArrowWidth))/2) , buttonPositions[0].yPos - ((arrowOverHeight - arrowHeight)/2) , expandArrowOverWidth , arrowOverHeight);
        else
            context.drawImage(expandArrow , width - expandArrowWidth , buttonPositions[0].yPos , expandArrowWidth , arrowHeight);

    }

    function drawBackButton(){
        if(isMouseOverBackButton())
            context.drawImage(backButton_over , width - backButtonEnlargedSize/2 - backButtonDistFromEdges , height - backButtonEnlargedSize/2 - backButtonDistFromEdges , backButtonEnlargedSize , backButtonEnlargedSize);
        else
            context.drawImage(backButton , width - backButtonSize/2 - backButtonDistFromEdges , height - backButtonSize/2 - backButtonDistFromEdges , backButtonSize , backButtonSize);
    }

    function drawNode(nodeTypeToDraw , theNodeObject){
        context.drawImage(nodeTypeToDraw , theNodeObject.x , theNodeObject.y , theNodeObject.radius * 2 , theNodeObject.radius * 2);
    }


    function drawLineFromPointToPoint(xA , yA , xB , yB , lineColor){
        context.beginPath();
        context.lineWidth = defaultEdgeWidth;
        context.strokeStyle = lineColor;
        context.moveTo(xA , yA);
        context.lineTo(xB , yB);
        context.stroke();
    }






//////////////////////////measurement functions



    function pitagorasSquareDistance(x1 , y1 , x2 , y2){
        var xDist = x1 - x2;
        var yDist = y1 - y2;
        var distSquare = xDist*xDist + yDist*yDist;
        return distSquare;
    }



//////////////////////////generation functions



    function generateID(){
        if(releasedIDs.length == 0){
            farthestAvailableID++;
            return (farthestAvailableID-1);
        }
        else{	//still some old (smaller) IDs available
            var reusedID = releasedIDs[releasedIDs.length - 1];	//value of last vaccant ID (LIFO)
            releasedIDs.pop();
            return reusedID;
        }
    }

    function randomRGBColor(){
        return '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
    }



//////////////////////////getting, setting, creating and destroying functions



    function determinePositions(positionsArray , buttonArray){
        var leftColX = width - buttonDistFromEdges - saveButtonWidth;
        var rightColX = width - buttonDistFromEdges - buttonWidth;
        var xCoord;
        var yCoord = buttonDistFromEdges;
        for(var i = 0 ; i < buttonArray.length ; i++){

            if(i % 2 == 0){
                xCoord = leftColX;
                if(i != 0)
                    yCoord += (buttonHeight + buttonDistFromEdges);
            }
            else{
                xCoord = rightColX;
            }

            positionsArray.push(new coord(xCoord , yCoord));
        }
    }

    function getNodesIndexFromNodeID(nodeID){
        for(var i = 0 ; i < nodes.length ; i++){
            if(nodes[i].id == nodeID)
                return i;
        }
        if(allowConsoleMessages)
            console.log("hey, there's a bug here, come fix me!");	//happens when last clicked node ID isn't an existing node's ID
        return -1;
    }

    function setEdgeOrigin(index){
        lastClickedNodeID = nodes[index].id;
        lastClickedNodeIndex = index;
    }

    function setMode(index){
        if(currentMode == buttons.indexOf(createEdgeButton))	//canceling the previously chosen node in edge creation
            lastClickedNodeID = ARBITRARY_NEGATIVE;

        selectedNodeToMove = ARBITRARY_NEGATIVE;

        for(var i = 0 ; i < modes.length ; i++){	//initializing in mode setStart
            if(i == index)
                modes[i] = true;
            else
                modes[i] = false;
        }

        currentMode = modes.indexOf(true);
    }


    function addEdgeBetween(nodeIndex1 , nodeIndex2){
        if(doesEdgeAlreadyExistBetweenNodes(nodeIndex1 , nodeIndex2)){
            if(allowConsoleMessages)
                console.log("tried to add an edge between nodes indexed " + nodeIndex1 + " and " + nodeIndex2 + ", but it already existed");

            return;
        }

        if(!allowingMultiColoredEdges){
            nodes[nodeIndex1].edges.push(new Edge(nodes[nodeIndex2].id , defaultEdgeColor , defaultEdgeWeight));
            nodes[nodeIndex2].edges.push(new Edge(nodes[nodeIndex1].id , defaultEdgeColor , defaultEdgeWeight));
        }
        else{
            var randomColor = randomRGBColor();
            nodes[nodeIndex1].edges.push(new Edge(nodes[nodeIndex2].id , randomColor , defaultEdgeWeight));
            nodes[nodeIndex2].edges.push(new Edge(nodes[nodeIndex1].id , randomColor , defaultEdgeWeight));
        }

        if(allowConsoleMessages)
            console.log("created edge between nodes indexed " + nodeIndex1 + " and " + nodeIndex2);
    }

    function addEdgeRandomly(i){
        var randomIndex;

        do{
            randomIndex = Math.random();
            randomIndex *= (nodes.length - 1);
            randomIndex = Math.round(randomIndex);
        }while(randomIndex == i);

        if(connectRandomNodesElegantly){
            if(isEdgeObstructed(i , randomIndex))	//no good, other nodes are in the way
                return;
        }

        addEdgeBetween(i , randomIndex);
    }

    function addNode(x , y , isStartNode){
        nodes.push(new Node(generateID() , x-nodeRadius , y-nodeRadius , nodeRadius , isStartNode));
        if(allowConsoleMessages){
            console.log("created node; index: " + (nodes.length-1) + " id: " + nodes[nodes.length-1].id);
        }

    }

    function removeEdgeBetween(nodeIndex1 , nodeIndex2){
        removeEdgeSingleDirection(nodeIndex1 , nodeIndex2);
        removeEdgeSingleDirection(nodeIndex2 , nodeIndex1);
    }

    function removeEdgeSingleDirection(nodeIndexFrom , nodeIndexTo){
        for(var j = 0 ; j < nodes[nodeIndexFrom].edges.length ; j++){
            if(nodes[nodeIndexFrom].edges[j].pointedNodeID == nodes[nodeIndexTo].id){
                nodes[nodeIndexFrom].edges[j] = nodes[nodeIndexFrom].edges[nodes[nodeIndexFrom].edges.length - 1];
                nodes[nodeIndexFrom].edges.pop();
            }
        }
    }



    function destroyTouchedNode(){
        for(var i = 0 ; i < nodes.length ; i++){
            if(isNodeITouchedByMouse(i)){
                releasedIDs.push(nodes[i].id);

                for(var j = 0 ; j < nodes[i].edges.length ; j++){	//release all opposite directed edges (into nodes[i])
                    removeEdgeSingleDirection(getNodesIndexFromNodeID(nodes[i].edges[j].pointedNodeID) , i);
                }

                if(allowConsoleMessages)
                    console.log("destroyed node; index: " + i + " id: " + nodes[i].id);

                if(i != nodes.length-1){
                    nodes[i] = nodes[nodes.length - 1];
                    if(allowConsoleMessages)
                        console.log("now the id for this index is: " + nodes[i].id);
                }
                //no need to redirect edges back to moved to node - they are guided by ID, not index
                nodes.pop();
                return;
            }

        }
    }



//////////////////////////boolean functions



    function isInDrawableArea(){
        if(nodeRadius < mouseX && mouseX < width - backButtonSize/2 - backButtonDistFromEdges - nodeRadius)	//can draw until reaching the vertical area of back button
            if(nodeRadius < mouseY && mouseY < height - nodeRadius)
                if(!isMouseOverCollapseButton() && !isMouseOverExpandButton()){
                    for(var i = 0 ; i < buttons.length ; i++){
                        if(isMouseOverButton(i))
                            return false;
                    }
                    return true;
                }

        return false;
    }


    function isCircleNotTouchingOtherNodes(x , y , rad){
        var radiusesCombined;
        for(var i = 0 ; i < nodes.length ; i++){
            radiusesCombined = rad + nodes[i].radius;
            if(radiusesCombined*radiusesCombined > pitagorasSquareDistance(x , y , nodes[i].x + nodes[i].radius , nodes[i].y + nodes[i].radius))
                return false;	//intersecting with each other
        }
        return true;
    }

    function isNodeIndexInList(i){
        for(var j = 0 ; j < alreadyVisitedIndexes.length ; j++){
            if(alreadyVisitedIndexes[j] == i)
                return true;
        }
        return false;
    }

    function isNodeIProperlyConnectedToTheSystem(i){
        if(isNodeIndexInList(i))
            return false;
        else
            alreadyVisitedIndexes.push(i);

        for(var j = 0 ; j < nodes[i].edges.length ; j++){
            if(nodes[getNodesIndexFromNodeID(nodes[i].edges[j].pointedNodeID)].isStart)	//owned edge points to start
                return true;
            if(isNodeIProperlyConnectedToTheSystem(getNodesIndexFromNodeID(nodes[i].edges[j].pointedNodeID)))	//go check at other connected node...
                return true;
        }

        return false;
    }

    function areAllNodesConnectedToTheSystem(){

        for(var i = 0 ; i < nodes.length ; i++){
            alreadyVisitedIndexes = [];
            if(!isNodeIProperlyConnectedToTheSystem(i , alreadyVisitedIndexes)){
                return false;
            }

        }
        return true;
    }

    function doesEdgeAlreadyExistBetweenNodes(index1 , index2){
        for(var j = 0 ; j < nodes[index1].edges.length ; j++){
            if(nodes[index1].edges[j].pointedNodeID == nodes[index2].id)
                return true;
        }
        return false;
    }


    function isNodeITouchedByMouse(i){
        if(nodes[i].radius * nodes[i].radius > pitagorasSquareDistance(mouseX , mouseY , nodes[i].x + nodes[i].radius , nodes[i].y + nodes[i].radius))
            return true;
        else
            return false;
    }

    function isMouseOverEdgeArea(nodeIndex1 , nodeIndex2){

        //..../..../
        //.../|.../
        //../.|<-/----verticalEdgeWidth
        //./..|./
        ///___|/
        //..../
        //.../
        //../
        //./
        ///

        var node1X = nodes[nodeIndex1].x + nodes[nodeIndex1].radius;
        var node2X = nodes[nodeIndex2].x + nodes[nodeIndex2].radius;

        var node1Y = nodes[nodeIndex1].y + nodes[nodeIndex1].radius;
        var node2Y = nodes[nodeIndex2].y + nodes[nodeIndex2].radius;



        if((mouseX > node1X && mouseX > node2X) || (mouseX < node1X && mouseX < node2X))
            return false;
        if((mouseY > node1Y && mouseY > node2Y) || (mouseY < node1Y && mouseY < node2Y))
            return false;




        var dx = node1X - node2X;
        var dy = node1Y - node2Y;
        var hypotenuse = Math.sqrt(dx*dx + dy*dy);

        var cosinus = dx / hypotenuse;
        var verticalEdgeWidth = defaultEdgeWidth / cosinus;

        var	m = dy / dx;
        var maxY = node1Y + m * (mouseX - node1X) + (verticalEdgeWidth/2);
        var minY = node1Y + m * (mouseX - node1X) - (verticalEdgeWidth/2);

        if(minY < mouseY && mouseY < maxY)
            return true;
        else
            return false;
    }



    function isEdgeObstructed(nodeIndex1 , nodeIndex2){
        for(var i = 0 ; i < nodes.length ; i++){
            if(i != nodeIndex1 && i != nodeIndex2){
                if(isNodeIObstructingEdge(i , nodeIndex1 , nodeIndex2))
                    return true;
            }
        }
        return false;
    }

    //TODO -
    function isNodeIObstructingEdge(i , nodeIndex1 , nodeIndex2){
        //TODO - write properly? not really worth it... we'll just treat the nodes as squares
//		var node1X = nodes[nodeIndex1].x + nodes[nodeIndex1].radius;
//		var node2X = nodes[nodeIndex2].x + nodes[nodeIndex2].radius;

//		var node1Y = nodes[nodeIndex1].y + nodes[nodeIndex1].radius;
//		var node2Y = nodes[nodeIndex2].y + nodes[nodeIndex2].radius;



//		var dx = node1X - node2X;
//		var dy = node1Y - node2Y;
//		var hypotenuse = Math.sqrt(dx*dx + dy*dy);

//		var cosinus = dx / hypotenuse;
//		var verticalEdgeWidth = defaultEdgeWidth / cosinus;

//		var	m = dy / dx;
//		var maxY = node1Y + m * (mouseX - node1X) + (verticalEdgeWidth/2);
//		var minY = node1Y + m * (mouseX - node1X) - (verticalEdgeWidth/2);

//		if(minY < mouseY && mouseY < maxY)
//		return true;
//		else
//		return false;
        return true;

    }


    function isMouseOverButton(i){
        if(!showTools)
            return false;

        if(i == buttons.indexOf(saveButton)){	//save button
            if(buttonPositions[i].xPos < mouseX && mouseX < buttonPositions[i].xPos + saveButtonWidth && buttonPositions[i].yPos < mouseY && mouseY < buttonPositions[i].yPos + buttonHeight)
                return true;
            else
                return false;
        }
        else{
            if(buttonPositions[i].xPos < mouseX && mouseX < buttonPositions[i].xPos + buttonWidth && buttonPositions[i].yPos < mouseY && mouseY < buttonPositions[i].yPos + buttonHeight)
                return true;
            else
                return false;
        }
    }

    function isMouseOverCollapseButton(){
        if(showTools){	//GUI is visible
            if(buttonPositions[0].xPos - collapseArrowWidth - buttonDistFromEdges < mouseX && mouseX < buttonPositions[0].xPos - buttonDistFromEdges &&
                buttonPositions[0].yPos < mouseY && mouseY < buttonPositions[0].yPos + arrowHeight)
                return true;
        }
        return false;
    }

    function isMouseOverExpandButton(){
        if(!showTools){	//GUI is not visible
            if(width - expandArrowWidth < mouseX && mouseX < width && buttonPositions[0].yPos < mouseY && mouseY < buttonPositions[0].yPos + arrowHeight)
                return true;
        }
        return false;
    }

    function isMouseOverBackButton(){
        if((width - backButtonSize/2 - backButtonDistFromEdges < mouseX && mouseX < width - backButtonDistFromEdges + backButtonSize/2) &&
            (height - backButtonSize/2 - backButtonDistFromEdges < mouseY && mouseY < height - backButtonDistFromEdges + backButtonSize/2))	//clicked on back arrow
            return true;
        else
            return false;
    }















    function checkClick(){

        //applying the according action to mode
        if(currentMode == buttons.indexOf(createNodeButton)){	//Create Nodes
            if(isInDrawableArea()){
                if(isCircleNotTouchingOtherNodes(mouseX , mouseY , nodeRadius)){
                    addNode(mouseX , mouseY , false);
                }
                else{
                    if(allowConsoleMessages)
                        console.log("That's too close to another node");
                }

            }
            //else, the player probably tried to activate a button, or "missed" the canvas

        }
        else if(currentMode == buttons.indexOf(eraseNodeButton)){	//Erase Nodes
            if(isInDrawableArea()){
                destroyTouchedNode();
            }
        }

        else if(currentMode == buttons.indexOf(createEdgeButton)){	//Create Edges
            if(lastClickedNodeID < 0){	//line's starting node isn't already picked
                for(var i = 0 ; i < nodes.length ; i++){
                    if(isNodeITouchedByMouse(i)){
                        setEdgeOrigin(i);
                    }
                }
            }
            else{
                for(var i = 0 ; i < nodes.length ; i++){
                    if(isNodeITouchedByMouse(i)){
                        if(lastClickedNodeIndex == i){	//cancel the mark
                            lastClickedNodeID = ARBITRARY_NEGATIVE;
                        }
                        else{
                            //the following call includes the check we make: is the node we're connecting holding an edge which leads back to our previous one
                            addEdgeBetween(lastClickedNodeIndex , i);
                            setEdgeOrigin(i);	//anyway the next origin should be the clicked node
                        }
                    }

                }

            }
        }


        else if(currentMode == buttons.indexOf(eraseEdgeButton)){	//Erase Edges
            for(var i = 0 ; i < nodes.length ; i++){
                for(var j = 0 ; j < nodes[i].edges.length ; j++){
                    //if(nodes[i].id > nodes[i].edges[j].pointedNodeID)	//don't use this, it screws up the checking
                    if(isMouseOverEdgeArea(i , getNodesIndexFromNodeID(nodes[i].edges[j].pointedNodeID))){

                        if(allowConsoleMessages)
                            console.log("removed edges of indexes: " + i + " and " + (getNodesIndexFromNodeID(nodes[i].edges[j].pointedNodeID)) );

                        removeEdgeBetween(i , getNodesIndexFromNodeID(nodes[i].edges[j].pointedNodeID));
                    }
                }
            }
        }
        else if(currentMode == buttons.indexOf(setStartButton)){	//Set Start
            if(isInDrawableArea()){
                if(isCircleNotTouchingOtherNodes(mouseX , mouseY , nodeRadius)){
                    //canceling previous start
                    for(var i = 0 ; i < nodes.length ; i++){
                        if(nodes[i].isStart){
                            nodes[i].isStart = false;
                            break;
                        }
                    }

                    addNode(mouseX , mouseY , true);

                    setMode(buttons.indexOf(createNodeButton));
                }
                else if(isCircleNotTouchingOtherNodes(mouseX , mouseY , 0)){	//tried to add in a space that's too small (mouse itself touched no nodes)
                    if(allowConsoleMessages)
                        console.log("That's too close to another node");
                }
                else{	//mouse touching an existing Node
                    //assigning start to existing point, or canceling it
                    var leaveSetStart = true;
                    var foundIt = false; //just to save the rest of the loop's run
                    for(var i = 0 ; i < nodes.length ; i++){
                        if(nodes[i].isStart){
                            if(!foundIt){
                                if(isNodeITouchedByMouse(i)){
                                    leaveSetStart = false	//click wasted on canceling a start, so no reason to leave it yet
                                    foundIt = true;
                                }
                            }
                            nodes[i].isStart = false;	//if touched or not, any previous start is cancelled
                        }
                        else{
                            if(!foundIt){
                                if(isNodeITouchedByMouse(i)){
                                    nodes[i].isStart = true;
                                    foundIt = true;
                                }
                            }
                        }
                    }

                    if(leaveSetStart)
                        setMode(buttons.indexOf(createNodeButton));
                }
            }


        }
        else if(currentMode == buttons.indexOf(moveNodesButton)){
            if(selectedNodeToMove < 0){
                for(var i = 0 ; i < nodes.length ; i++){
                    if(isNodeITouchedByMouse(i)){
                        selectedNodeToMove = i;
                        break;
                    }
                }
            }
            else{
                if(isInDrawableArea){
                    if(isCircleNotTouchingOtherNodes(mouseX , mouseY , nodeRadius)){
                        nodes[selectedNodeToMove].x = mouseX - nodes[selectedNodeToMove].radius;
                        nodes[selectedNodeToMove].y = mouseY - nodes[selectedNodeToMove].radius;
                        selectedNodeToMove = ARBITRARY_NEGATIVE;
                        if(allowConsoleMessages)
                            console.log("relocated node!");
                    }
                    else{
                        if(allowConsoleMessages)
                            console.log("that's over other nodes, can't place here");
                        return;
                    }

                }
                else{
                    if(allowConsoleMessages)
                        console.log("not in drawable area");
                    return;
                }

            }

        }




        //collapse button check
        if(isMouseOverCollapseButton()){
            showTools = false;
        }
        else if(isMouseOverExpandButton()){
            showTools = true;
        }



        //tool button check
        for(var i = 0 ; i < buttons.length ; i++){
            if(isMouseOverButton(i))
                setMode(i);
        }



        //Back-button check
        if(isMouseOverBackButton()){	//clicked on back arrow
            var really = confirm("Back to menu? Your progress won't be saved!");
            if(really == true){
                var event = document.createEvent("Event");
                event.initEvent("changePage", true, true);
                event.customData = "goToGameMenu";
                window.dispatchEvent(event);
                this.removeEventListener("mouseup", checkClick);
            }
        }

    }


//	-------------------------------------------------------------

//	event listeners :

    canvas.addEventListener("mouseup", checkClick);

//	-------------------------------------------------------------



}
