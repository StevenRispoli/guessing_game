$(document).ready(function(){
	var passCode = Math.floor((Math.random() * 100) + 1);
	var userInput = "";
	var numGuesses = 0;
	var usedNumbers = [];
	var usedNumbersCold = [];
	var usedNumbersHot = [];
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
		$("#healthPercent").text("100");
		$(".wrongNumbers").removeClass("success");
		$("#inputBox").removeClass("success");
	};
	//Click function for numberpad buttons
	$("#1, #2, #3, #4, #5, #6, #7, #8, #9, #0").click(function(event){
		event.preventDefault();
		userInput = $(this).closest(".doorLock").find("#inputBox").val();
		if(userInput.length < 3){
			//Concatenates id value of button pressed to end of #inputBox value
			$(this).closest(".doorLock").find("#inputBox").val($(this).closest(".doorLock").find("#inputBox").val() + this.id);
		}
	});

	//Hint function. Pressing "*" or "#" displays answer in the #inputBox
	$(".hint").click(function(event){
		event.preventDefault();
		$(this).closest(".doorLock").find("#inputBox").val(passCode);
	});

	//Reset button
	$(".reset").click(function(){
		reset();
	});

	//Function for when user presses Enter button
	$("#confirm").on("click", function(){
		//#inputBox string value converted to a number
		userInput = +$(this).closest(".doorLock").find("#inputBox").val();
		if(isNaN(userInput) || userInput > 100 || userInput < 1){
			alert("Please enter a number between 1 and 100.");
		} else if(usedNumbers.indexOf(userInput) > -1){
			alert("You already used that number.");
		}else if(userInput === passCode && numGuesses < 5){
			numGuesses = 0;
			$(this).closest(".doorLock").find("#guessStatus").text("Correct");
			//Changes hot/cold guess displays and inputbox to green background-color
			$(this).closest(".doorLock").find(".wrongNumbers").addClass("success");
			$(this).closest(".doorLock").find("#inputBox").addClass("success");
		} else if(numGuesses < 5){
			numGuesses += 1;
			var hotCold = "";
			if(userInput > passCode && userInput <= passCode + 5){
				hotCold = "Cold.Guess Lower.";
				usedNumbersHot.push(userInput);
			} else if(userInput > passCode && userInput <= passCode + 10){
				hotCold = "Ice Cold.Guess Lower.";
				usedNumbersHot.push(userInput);
			} else if(userInput > passCode && userInput <= passCode + 20){
				hotCold = "Frigid.Guess Lower.";
				usedNumbersCold.push(userInput);
			} else if(userInput > passCode){
				hotCold = "Latvian.Guess Lower.";
				usedNumbersCold.push(userInput);
			} else if(userInput < passCode && userInput >= passCode - 5){
				hotCold = "Cold.Guess Higher.";
				usedNumbersHot.push(userInput);
			} else if(userInput < passCode && userInput >= passCode - 10){
				hotCold = "Ice Cold.Guess Higher.";
				usedNumbersHot.push(userInput);
			} else if(userInput < passCode && userInput >= passCode - 20){
				hotCold = "Frigid.Guess Higher.";
				usedNumbersCold.push(userInput);
			} else if(userInput < passCode){
				hotCold = "Latvian.Guess Higher.";
				usedNumbersCold.push(userInput);
			}
			if(usedNumbers.length !== 0){
				if(Math.abs(usedNumbers[usedNumbers.length-1] - passCode) > Math.abs(userInput - passCode)){
					hotCold += "Getting Less Cold.";
				} else {
					hotCold += "Getting More Cold.";
				}
			}
			usedNumbers.push(userInput);
			$(this).closest(".doorLock").find("#guessStatus").text(hotCold);
			$(this).closest(".doorLock").find("#inputBox").val("");
			$(this).closest(".doorLock").find(".wrongNumbers.hot").val(usedNumbersHot);
			$(this).closest(".doorLock").find(".wrongNumbers.cold").val(usedNumbersCold);
			$(this).closest(".doorLock").find("#healthPercent").text(+$(this).closest(".doorLock").find("#healthPercent").text() - 20);
		} 
		if(numGuesses >= 5) {
			reset();
			alert("You die. It is happy day. Your suffering end.");
		}
	});
});
