
// returns a random number between 0 - upperbound
function random_between(upperbound) {
    return Math.floor(Math.random() * (upperbound + 1));
}

    function game(paper,img){
	var capitals = makeCapitals();
	var states = makeStates();
	var isVisible_f = function(boolval) {
	    return function(element,index,array) {
		return element.isVisiblep() === boolval ; };};
	var oldquestions_f = isVisible_f(true);
	var newquestions_f = isVisible_f(false);

	var selected = undefined;	
	var selectcap = function() {
	    if (!capitals.some(newquestions_f))
		return undefined;
	    var newcap = capitals.filter(newquestions_f);
	    var idx = random_between(newcap.length - 1);
	    selected = newcap[idx];
	    return selected;
	}

	return {
	    capitals : capitals,
	    newquestion : function() {
		selected = selected === undefined ? selectcap() : selected;
		return selected;},

	    isAnswerp : function(x,y) {
		if (selected === undefined)
		{
		    return false; 
		}
		if (selected.isClickingp(x,y))
		{
		    selected.toogle();
		    selected = undefined;
		    return true;
		}
		return false; },
	    has_more_questionp : function() {
		return capitals.some(newquestions_f);
	    },
	    draw : function() {
		var i;
		states.map(function(state){
		    state.draw(paper,img);});
		capitals.map(function(capital) {
		    capital.draw(paper,img) ;});
	    }
	};
    }


    function createCapital(name,posx,posy) {
	var visible = false;
	var phrase = "Where is " + name + "?";
	return {
	    getPhrase : phrase,
	    isVisiblep : function() {
		return visible === true; },
	    toogle : function() {
		visible = visible === false ? true : false;
	    },
	    x : posx,
	    y : posy,
	    draw : function(paper,imgsrc) {
		paper.image(imgsrc,posx,posy,10,10);
		if (visible)
		{ paper.text(posx + 15, posy + 15, name);}},	
		//paper.print(posx, posy, name, paper.getFont("Times"), 30);},

	    isClickingp : function(x,y) {
 		var radius = 20;
 		var diameter = radius * radius;
 		var eqt = Math.pow((x-posx),2) + Math.pow((y-posy),2);
 		return eqt <= diameter ? true : false;
	    }
	}
    }

    function createState(name,posx, posy) {
	return {
	    draw : function(paper) {
		paper.text(posx,posy,name);
	    }};
    }

    function makeStates()
    {
	return new Array(
	    createState("Artigas", 212,126),
	    createState("Salto", 202,254),
	    createState("Paysandú", 156,362),
	    createState("Río Negro", 130,500),
	    createState("Rivera", 490,272),
	    createState("Tacuarembó", 446,380),
	    createState("Soriano", 128,630),
	    createState("Colonia", 132,726),
	    createState("Flores", 246,614),
	    createState("Durazno", 388,550),
	    createState("Cerro Largo", 624,436),
	    createState("San José", 280,742),
	    createState("Florida", 386,668),
	    createState("Treinta y Tres", 624,534),
	    createState("Canelones", 382,786),
	    createState("Montevideo", 348,838),
	    createState("Lavalleja", 532,656),
	    createState("Maldonado", 522,818),
	    createState("Rocha", 654,678));
    }


    function makeCapitals()
    {
	return new Array(
	    createCapital("Artigas",293,54),
	    createCapital("Salto",91,237),
	    createCapital("Paysandú",77,396),
	    createCapital("Fray Bentos",51,562),
	    createCapital("Rivera",446,162),
	    createCapital("Tacuarembó",376,299),
	    createCapital("Mercedes",86,582),
	    createCapital("Colonia del Sacramento",120,784),
	    createCapital("Trinidad",244,647),
	    createCapital("San José de Mayo",262,785),
	    createCapital("Durazno",309,593),
	    createCapital("Florida",351,715),
	    createCapital("Canelones",341,798),
	    createCapital("Montevideo",355,847),
	    createCapital("Melo",632,400),
	    createCapital("Treinta y Tres",633,554),
	    createCapital("Minas",483,744),
	    createCapital("Rocha",607,765),
	    createCapital("Maldonado",532,853) );
    }
