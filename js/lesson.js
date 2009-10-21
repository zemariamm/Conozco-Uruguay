$(document).ready(function(){

	//Program constants
	var SVG_MAP = document.getElementById('mysvg');
	var MAX_SCREEN_X = 1200, MAX_SCREEN_Y = 900;
	var CAPITALS = [{dept:'artigas', capital:'artigas', deptName:'Artigas', capitalName:'Artigas'}, 
	    {dept:'rivera', capital:'rivera', deptName:'Rivera', capitalName:'Rivera'}, 
	    {dept:'salto', capital:'salto', deptName:'Salto', capitalName:'Salto'},
	    {dept:'paysandu', capital:'paysandu', deptName:'Paysandu', capitalName:'Paysandu'},
	    {dept:'rioNegro', capital:'frayBentos', deptName:'Rio Negro', capitalName:'Fray Bentos'},
	    {dept:'tacuarembo', capital:'tacuarembo', deptName:'Tacuarembo', capitalName:'Tacuarembo'},
	    {dept:'cerroLargo', capital:'melo', deptName:'Cerro Largo', capitalName:'Melo'},
	    {dept:'durazno', capital:'durazno', deptName:'Durazno', capitalName:'Durazno'},
	    {dept:'treintaYTres', capital:'treintaYTres', deptName:'Treinta Y Tres', capitalName:'Treinta Y Tres'},
	    {dept:'soriano', capital:'mercedes', deptName:'Soriano', capitalName:'Mercedes'},
	    {dept:'flores', capital:'trinidad', deptName:'Flores', capitalName:'Trinidad'},
	    {dept:'colonia', capital:'colonia', deptName:'Colonia', capitalName:'Colonia'},
	    {dept:'sanJose', capital:'sanJose', deptName:'San Jose', capitalName:'San Jose de Mayo'},
	    {dept:'montevideo', capital:'montevideo', deptName:'Montevideo', capitalName:'Montevideo'},
	    {dept:'lavalleja', capital:'minas', deptName:'Lavalleja', capitalName:'Minas'},
	    {dept:'rocha', capital:'rocha', deptName:'Rocha', capitalName:'Rocha'},		       
	    {dept:'canelones', capital:'canelones', deptName:'Canelones', capitalName:'Canelones'},		      
	    {dept:'maldonado', capital:'maldonado', deptName:'Maldonado', capitalName:'Maldonado'},		      
		       ];

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
		var index = Math.round(Math.random() * (questions.length - 1));
		var question = questions[index];
		
		//drop the city used from the list of answers
		if (index === 0 ){
		    questions.shift();
		} else {
		    questions.splice(index, 1)
		}
		
		return question;
	    };

	    var askQuestion = function (questions) {
		question = changeQuestion(questions);		
		
		$('#question').text("Where is the capital of " + 
				    question.deptName + "?");

	    };


	    var checkAnswer = function (mapElem) {
		if(isActive){
		    if ( ("cap" + question.capital).toLowerCase() === mapElem.id.toLowerCase()){
			$('#answer').text("Correct! " + question.capitalName +
				  " is the capital of " + question.deptName);
			$('.text.' + question.dept, svgMapDoc).attr('display',
								'');
			var timerID = setTimeout(function() {
			    $('#answer').text('');
			    askQuestion(questions);
			}, 3000);
		    } else {
			$('#answer').text("Incorrect. Please try again.");
		    }
		} else {
		    //do nothing
		}
		

	    };

  	    $.map($('.capital.city', svgMapDoc), function(elem){
		$(elem, svgMapDoc).bind('click', function(event) {
		    checkAnswer(event.target);
		})
	    });
	    
	    askQuestion(questions);

	    
	    

	});

});

