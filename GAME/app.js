//Players
var myGamePiece;
var myObstacles = [];
var myScore;
var gameSpeed;
var genSpeed;

//Power Button
function startGame() {
    myGameArea.start();
    myGamePiece = new component(30, 30, "rgba(0, 0, 255, 0.5)", 10, 120); // Spawn Point
    myObstacle = new component(10, 200, "rgba(255, 105, 180, 0.5)", 300, 120); 
    myScore = new component("30px", "Consolas", "black", 280, 40, "text");
}

//Boundaries
var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;  
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
     	 	myGameArea.keys = (myGameArea.keys || []);
      		myGameArea.keys[e.keyCode] = true;
    	})
    	window.addEventListener('keyup', function (e) {
      		myGameArea.keys[e.keyCode] = false; 
    	})
    },
    //REFRESH
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    //GAME OVER
    stop : function() {
    	clearInterval(this.interval);
    	window.alert("GAME OVER. Refresh the page to play again");
  	}
  	
}

//Render
function component(width, height, color, x, y, type) {
	this.type = type;
    this.width = width;
    this.height = height;
    this.speedX = 0;
 	this.speedY = 0;
    this.x = x;
    this.y = y;    
    this.update = function(){
    	ctx = myGameArea.context;
    	if (this.type == "text") {
      		ctx.font = this.width + " " + this.height;
      		ctx.fillStyle = color;
      		ctx.fillText(this.text, this.x, this.y);
    	} else {
    		//Player
    		ctx.fillStyle = color;
    		ctx.fillRect(this.x, this.y, this.width, this.height);
    	}
    }
    this.newPos = function() {
   		this.x += this.speedX;
    	this.y += this.speedY; 
  	}
  	//Collision Detection
  	this.crashWith = function(otherobj) {
    	var myleft = this.x;
    	var myright = this.x + (this.width);
    	var mytop = this.y;
    	var mybottom = this.y + (this.height);
    	var otherleft = otherobj.x;
    	var otherright = otherobj.x + (otherobj.width);
    	var othertop = otherobj.y;
    	var otherbottom = otherobj.y + (otherobj.height);
    	var crash = true;
    	if ((mybottom < othertop) || (mytop > otherbottom) ||(myright < otherleft) || (myleft > otherright)) {
      		crash = false;
    	}
    	return crash; 
   	}
}

//Refresh rate
function updateGameArea() {
	var x, y;

	for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {
            myGameArea.stop();
            return;
        } 
    }

    //Controller
   	myGameArea.clear();
 	  myGamePiece.speedX = 0;
  	myGamePiece.speedY = 0; 
  	if ((myGameArea.keys && myGameArea.keys[37]) || (myGameArea.keys && myGameArea.keys[65])) {myGamePiece.speedX = -2; } //Left
  	if ((myGameArea.keys && myGameArea.keys[39]) || (myGameArea.keys && myGameArea.keys[68])) {myGamePiece.speedX = 2; } //Right
  	if ((myGameArea.keys && myGameArea.keys[38]) || (myGameArea.keys && myGameArea.keys[87])) {myGamePiece.speedY = -2; } //Up
  	if ((myGameArea.keys && myGameArea.keys[40]) || (myGameArea.keys && myGameArea.keys[83])) {myGamePiece.speedY = 2; } //Down
  	myGamePiece.newPos(); 
  	myGamePiece.update();

  	obstableSpeed();

  	//Generate New Objects
  	myGameArea.frameNo += 1;
  	if (myGameArea.frameNo == 1 || everyinterval(genSpeed)) {
    	x = myGameArea.canvas.width;
    	minHeight = 20;
    	maxHeight = 200;
    	height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
    	minGap = 50;
    	maxGap = 100;
    	gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
    	myObstacles.push(new component(10, height, "rgba(255, 105, 180, 0.5)", x, 0));
    	myObstacles.push(new component(10, x - height - gap, "rgba(255, 105, 180, 0.5)", x, height + gap));
  	}

    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].x += -gameSpeed;
        myObstacles[i].update();
    }

    myScore.text = "SCORE: " + myGameArea.frameNo;
  	myScore.update();
}

//Control Speed
function moveup() {
  myGamePiece.speedY -= 2; 
}

function movedown() {
  myGamePiece.speedY += 2; 
}

function moveleft() {
  myGamePiece.speedX -= 2;
}

function moveright() {
  myGamePiece.speedX += 2;
}

function stopMove() {
  myGamePiece.speedX = 0;
  myGamePiece.speedY = 0; 
}

//Obstacle Generator
function everyinterval(n) {
  if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
  return false;
}

//Difficulty Generator
function obstableSpeed(){
	if(myGameArea.frameNo < 500){
		gameSpeed = 1;
		genSpeed = 150
	}
	else if(myGameArea.frameNo < 1000){
		gameSpeed = 2;
		genSpeed = 75;
	}
	else{
		gameSpeed = 3;
		genSpeed = 50;
	}
}

