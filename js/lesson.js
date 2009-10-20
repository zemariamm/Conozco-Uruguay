$(document).ready(function(){
    
    var SVG_EMBED = document.getElementById('mysvg');
    var MAX_SCREEN_X = 1200;
    var MAX_SCREEN_Y = 900;

    // You can't access any properties of the svg document 
    // until it has loaded
    $('#mysvg').bind('load', function() {
	var SVG_DOC = SVG_EMBED.getSVGDocument();
	/*  var myCity = svgDoc.getElementById('capArtigas')
	      myCity.addEventListener('click', 
	      function(){ document.write('foo');}, false);
        */

	$('.text', SVG_DOC).attr('display', 'none');
  	$.map($('.capital.city', SVG_DOC), function(elem){
	    $(elem, SVG_DOC).bind('click', function() { document.write('foo');
						     })});
	
	

	var scaleView = function (svgElem, width, height) {
	    var newRatio = 1;
	    var xRatio = width/MAX_SCREEN_X;
	    var yRatio = height/MAX_SCREEN_Y;

	    //get the smallest ratio
	    newRatio = xRatio > yRatio ? yRatio : xRatio;

	    if (newRatio > 1) {
		//do nothing
		return newRatio;
	    } else {
		svgElem.currentScale = newRatio - 0.05;
		return newRatio;
	    }
	};

	var hideElements = function () {
	
	};
      
	scaleView(SVG_DOC.documentElement, window.innerWidth, 
		  window.innerHeight);

    });
});

