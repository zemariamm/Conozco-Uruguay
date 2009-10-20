$(document).ready(function(){

    var k = $.karma({container: "#karma-main", lang: "en"});
    
    k.init();
    
    
    k.main(function() {

	//Program constants
	var SVG_MAP = document.getElementById('mysvg');
	var MAX_SCREEN_X = 1200, MAX_SCREEN_Y = 900;
	var CAPITALS = [['Artigas', 'capArtigas'], 
	    ['Rivera', 'capRivera'], ['Salto', 'capSalto']];

	//Game Control
	var isActive = true;
	var question = [];
	var answeredCorrect = false;

	var questions = CAPITALS;


	// You can't access any properties of the svg document 
	// until it has loaded
	$('#mysvg').bind('load', function() {
	    var svgMapDoc = SVG_MAP.getSVGDocument();

	    //utility functions
	    var scaleView = function (svgElem, width, height) {
		var newRatio = 1;
		var xRatio = width/MAX_SCREEN_X;
		var yRatio = height/MAX_SCREEN_Y;

		//get the smallest ratio
		newRatio = xRatio > yRatio ? yRatio : xRatio;

		if (newRatio < 1) {
		    svgElem.currentScale = newRatio - 0.05;
		    return newRatio;	
		} else {
		    //do nothing
		    return newRatio;
		}
	    };

	    var hideAnswers = function (svgRoot) {
		$('.text', svgRoot).attr('display', 'none');
	    };

	    scaleView(svgMapDoc.documentElement, window.innerWidth, 
		      window.innerHeight);

	    hideAnswers(svgMapDoc);

	    //gameplay functions
	    var changeQuestion = function (questions){
		var index = Math.round(Math.random() * questions.length);
		var question = questions[index];
		
		//drop the city used from the list of answers
		if (index === 1 ){
		    questions.shift();
		} else {
		    questions.splice(index-1, 1)
		}
		
		return question;
	    };

	    var askQuestion = function (questions) {
		question = changeQuestion(questions);		
		
		$('#question').text("What is the capital of " + 
				    question[0] + "?");

	    };


	    var checkAnswer = function (elemName) {
		if(isActive){
		    if ( question[1] === elemName){
			$('#answer').text("Correct! " + 
					  elemName + " is the capital of " + 
					  question[0]);
		    } else {
			
		    }
		} else {
		    //do nothing
		}
		

	    };

  	    $.map($('.capital.city', svgMapDoc), function(elem){
		$(elem, svgMapDoc).bind('click', function(event) {
		    checkAnswer(event.target.id);
		})
	    });
	    
	    askQuestion(questions);

	    
	    

	});
    });
});

