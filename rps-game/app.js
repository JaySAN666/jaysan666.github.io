var myScore = 0;
var losses = 0;
var ties = 0;
var total = 0;
var rate = 0;
var pick;

//Player picks rock
function choice1(){
	pick = 1;
	playGame();
}

//Player picks paper
function choice2(){
	pick = 2;
	playGame();
}

//Player picks scissors
function choice3(){
	pick = 3;
	playGame();
}

function playGame(){

	// Rock = 1, Paper = 2, Scissors = 3
	var rand = Math.floor(Math.random() * 3) + 1; 

	//Total number of games played
	sessionStorage.getItem("total", total);
	total = total + 1;
	sessionStorage.getItem("score", myScore);


	//Win Conditions
	if(((pick == 1) && (rand == 3)) || ((pick == 2) && (rand == 1)) || ((pick == 3) && (rand == 2))){
		document.getElementById("display").innerHTML = "You Win";
		myScore = myScore + 1;
	}
	//Tie Game
	else if(rand == pick){
		document.getElementById("display").innerHTML = "Tie Game";
		sessionStorage.getItem("draw", ties);
		ties = ties + 1;
	}
	//Player loses
	else{
		document.getElementById("display").innerHTML = "You Lose";
		sessionStorage.getItem("loss", losses);
		losses = losses + 1;
	}

	//Calculates Win Rate
	rate = myScore/total;
	document.getElementById("winrate").innerHTML = "Win Rate : " + rate;

	//Stores Data for the next use and retrieves data to display to the user
	if (typeof(Storage) !== "undefined") {
  		// Store
  		sessionStorage.setItem("score", myScore);
  		// Retrieve
  		document.getElementById("score").innerHTML = "Number of Wins: " + sessionStorage.getItem("score");

 
  		// Store Losses
  		sessionStorage.setItem("loss", losses);
  		// Retrieve
  		document.getElementById("loss").innerHTML = "Number of Losses: " + sessionStorage.getItem("loss");

  		// Store Losses
  		sessionStorage.setItem("draw", ties);
  		// Retrieve
  		document.getElementById("draw").innerHTML = "Number of Ties: " + sessionStorage.getItem("draw");

  		//Store number of games played
  		sessionStorage.setItem("total", total);
	} 
	else {
  		document.getElementById("score").innerHTML = "Sorry, your browser does not support Web Storage...";
	}


}