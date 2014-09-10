// Please ignore this file for now.

// $(document).ready(function(){
// 	var levelNumber = 1;
// 	var passCode = Math.floor((Math.random() * 100) + 1);
// 	var userInput;
// 	var numGuesses = 0;
// 	var usedNumbers = [];
// 	var ammo = 0;
// 	var levelText = function(levelNumber){
// 		switch(levelNumber){
// 			case 2:
// 				return "levelText 2";
// 				break;
// 		};
// 	}

// 	$("#1, #2, #3, #4, #5, #6, #7, #8, #9, #0").click(function(event){
// 		event.stopPropagation();
// 		event.preventDefault();
// 		userInput = $(this).closest(".doorLock").find("#inputBox").val();
// 		if(userInput.length < 3){
// 			$(this).closest(".doorLock").find("#inputBox").val($(this).closest(".doorLock").find("#inputBox").val() + this.id);
// 		}
// 	});

// 	$(".hint").click(function(event){
// 		event.stopPropagation();
// 		event.preventDefault();
// 		$(this).closest(".doorLock").find("#inputBox").val(passCode);
// 	});

// 	$(".submitButton").on("click", function(){
// 		userInput = +$(this).closest(".doorLock").find("#inputBox").val();
// 		//console.log(userInput);
// 		if(isNaN(userInput) || userInput > 100 || userInput < 1){
// 			alert("Please enter a number between 1 and 100.");
// 		} else if(usedNumbers.indexOf(userInput) > -1){
// 			alert("You already used that number.");
// 		}else if(userInput === passCode && levelNumber !== 10){
// 			numGuesses += 1;
// 			switch(numGuesses){
// 				case 1:
// 					if($(this).closest(".doorLock").find(".smg").hasClass("show") === false){
// 						$(this).closest(".doorLock").find(".smg").addClass("show");
// 					}
// 					alert("You found an SMG!");
// 					break;

// 				case 2:
// 				case 3:
// 					if($(this).closest(".doorLock").find(".rock").hasClass("show") === false){
// 						$(this).closest(".doorLock").find(".rock").addClass("show");
// 					}
// 					alert("You found a magic rock!");
// 					break;

// 				case 4:
// 					if($(this).closest(".doorLock").find(".medkit").hasClass("show") === false){
// 						$(this).closest(".doorLock").find(".medkit").hasClass("show");
// 					}
// 					alert("You found a medkit!");
// 					break;

// 				case 5:
// 					$(this).closest(".doorLock").find(".ammo").text(ammo + 1);
// 					alert("You found more ammo!");
// 					break;

// 				default:
// 					break;
// 			}
// 			levelNumber += 1;
// 			$(this).closest(".doorLock").find(".guessStatus").text("Correct");
// 			$(this).closest(".doorLock").find(".submitButton").prop("value", "GO").removeClass("submitButton").addClass("nextLevel").off("click");
// 		} else {
// 			numGuesses += 1;
// 			usedNumbers.push(userInput);
// 			$(this).closest(".doorLock").find("#inputBox").val("");
// 			$(this).closest(".doorLock").find("#wrongNumbers").val(usedNumbers);
// 		}
// 	});
	
// 	$(".nextLevel").on("click", function(){
// 		$(this).closest(".container-fluid").find("#levelText").text(levelText(levelNumber));
// 		$(this).addClass("submitButton").removeClass("nextLevel").off("click");
// 	});

// });
