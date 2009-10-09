$(document).ready(function(){
    var DEFAULT_SIZE_X = 786;
    var DEFAULT_SIZE_Y = 900;
    //stupid hack, find out how to calc the diff between image and top
    // of webpage
    var OFFSET = 8;
    var g = game();

    var k = $.karma({container: "#karma-main"})
    k.init({
	images : [
	    {name : "background", file : "fondo.png", localized : false },
	    {name : "capital", file : "capital.png" , localized : false},
	    {name : "lines", file : "deptosLineas.png", localized: false}
	]
    });

    k.main(function() {
	var paper = Raphael("mycanvas",DEFAULT_SIZE_X,DEFAULT_SIZE_Y);

	var g = game(paper,k.library.images["capital"].src);
	var q = g.newquestion();
	$('#question').html(q.getPhrase);

	
	var clicked = function(event){
	    var x = event.clientX + document.documentElement.scrollLeft - OFFSET;
	    var y = event.clientY + document.documentElement.scrollTop - OFFSET;
	    var ans = g.isAnswerp(x, y);
	    if (ans) { 
		g.draw();
		q = g.newquestion();
	    }
	    $('question').html(q.getPhrase);
	}

	var draw = function() {
	    paper.image(k.library.images["background"].src,0,0,DEFAULT_SIZE_X,DEFAULT_SIZE_Y);
	    var i = paper.image(k.library.images["lines"].src,0,0,DEFAULT_SIZE_X,DEFAULT_SIZE_Y);
	    g.draw();
	}

	$('#mycanvas').bind('click', clicked, false);

	$('#start').bind('click', draw, false);

    });
});
	


	    

    