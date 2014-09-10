$(document).ready(function(){
	var passCode = Math.floor((Math.random() * 100) + 1);
	var	userInput = "";
	var	numGuesses = 0;
	var	levelNumber = 1;
	var	usedNumbers = [];
	var	usedNumbersHot = [];
	var	usedNumbersCold = [];
	var originalLevelText = "You run through trainyard next to gulag. You can not take trian to lab. All train are broke down. Politiburo police make shoot at you, but you hop fence and turn down alley. Alley is dead end with only door to building. Door has lock. <b>Hack lock with not wrong number between 1 and 100</b>. Politiburo police are right behind you and shoot guns. <b>If guess wrong number, lose <!--will be 10% when project is finished-->20% health from bullet.</b> Press \"*\" or \"#\" for hint. <br/><b>(PLEASE GO TO THE \"HOW FLEE\" PAGE FOR MORE DETAILS ON HOW TO PLAY)</b>.";
	//Reset for when the reset button is clicked or for when the user loses
	var reset = function(){
		passCode = Math.floor((Math.random() * 100) + 1);
		userInput = "";
		numGuesses = 0;
		usedNumbers = [];
		usedNumbersHot = [];
		usedNumbersCold = [];
		$("#inputBox").val("");
		$(".wrongNumbers").val(usedNumbers);
		$("#guessStatus").text("Input passcode");
		$(".wrongNumbers").removeClass("success");
		$("#inputBox").removeClass("success");
	};
	var levelText = function(levelNumber){
		switch(levelNumber){
			case 2:
				return "levelText 2";
				break;
		};
	}
	//Click function for numberpad buttons
	$("#1, #2, #3, #4, #5, #6, #7, #8, #9, #0").click(function(event){
		event.preventDefault();
		userInput = $("#inputBox").val();
		if(userInput.length < 3){
			//Concatenates id value of button pressed to end of #inputBox value
			$("#inputBox").val($("#inputBox").val() + this.id);
		}
	});

	//Hint function. Pressing "*" or "#" displays answer in the #inputBox
	$(".hint").click(function(event){
		event.preventDefault();
		$("#inputBox").val(passCode);
	});

	//Reset button
	$(".reset").click(function(){
		levelNumber = 1;
		$("#healthPercent").text("100");
		$("#levelText").html(originalLevelText);
		reset();
	});

	//Function for when user presses Enter button
	$(document).on("click", "#confirm", function(){
		//#inputBox string value converted to a number
		userInput = +$("#inputBox").val();
		if(isNaN(userInput) || userInput > 100 || userInput < 1){
			alert("Please enter a number between 1 and 100.");
		} else if(usedNumbers.indexOf(userInput) > -1){
			alert("You already used that number.");
		}else if(userInput === passCode && numGuesses < 5){
			numGuesses = 0;
			levelNumber += 1;
			$("#guessStatus").text("Correct");
			//Changes hot/cold guess displays and inputbox to green background-color
			$(".wrongNumbers").addClass("success");
			$("#inputBox").addClass("success");
			$(this).prop("value", "GO").removeAttr("id").addClass("nextLevel");
		} else if(numGuesses < 5){
			numGuesses += 1;
			var hotCold = $("#guessStatus");
			if(userInput > passCode && userInput <= passCode + 5){
				hotCold.html("Cold. <br> Guess Lower.");
				usedNumbersHot.push(userInput);
			} else if(userInput > passCode && userInput <= passCode + 10){
				hotCold.html("Ice Cold. <br> Guess Lower.");
				usedNumbersHot.push(userInput);
			} else if(userInput > passCode && userInput <= passCode + 20){
				hotCold.html("Frigid. <br> Guess Lower.");
				usedNumbersCold.push(userInput);
			} else if(userInput > passCode){
				hotCold.html("Latvian. <br> Guess Lower.");
				usedNumbersCold.push(userInput);
			} else if(userInput < passCode && userInput >= passCode - 5){
				hotCold.html("Cold. <br> Guess Higher.");
				usedNumbersHot.push(userInput);
			} else if(userInput < passCode && userInput >= passCode - 10){
				hotCold.html("Ice Cold. <br> Guess Higher.");
				usedNumbersHot.push(userInput);
			} else if(userInput < passCode && userInput >= passCode - 20){
				hotCold.html("Frigid. <br> Guess Higher.");
				usedNumbersCold.push(userInput);
			} else if(userInput < passCode){
				hotCold.html("Latvian. <br> Guess Higher.");
				usedNumbersCold.push(userInput);
			}
			if(usedNumbers.length !== 0){
				if(Math.abs(usedNumbers[usedNumbers.length-1] - passCode) > Math.abs(userInput - passCode)){
					hotCold.append("<br>Getting Less Cold.");
				} else {
					hotCold.append("<br>Getting More Cold.");
				}
			}
			usedNumbers.push(userInput);
			$("#inputBox").val("");
			$(".wrongNumbers").filter(".hot").val(usedNumbersHot);
			$(".wrongNumbers").filter(".cold").val(usedNumbersCold);
			$("#healthPercent").text(+$("#healthPercent").text() - 20);
		} 
		if(numGuesses >= 5) {
			levelNumber = 1;
			$("#healthPercent").text("100");
			$("#levelText").html(originalLevelText);
			reset();
			alert("You die. It is happy day. Your suffering end.");
		}
	});
	$(document).on("click", ".nextLevel", function(){
		$("#levelText").text(levelText(levelNumber));
		$(this).prop("value", "Enter").attr("id", "confirm").removeClass("nextLevel");
		reset();
	});
});
