var m = 0;
var s = 0;
var t = 0;
var counter = 0;
var attempt = 0;
$(document).ready(main);

function main(){
	$('#new_game').on('click', newGame);

}


function newGame(){
	clearTimer();
	resetMenu();
	$('#puzzle').html("");
	$('#pool').html("");
	var idDrag, idDrop;
/*	var number = askForPieces();
*/
	var number = 20;
	createPuzzle(number);
	dragDrop(idDrag, idDrop, number);
	startTime();
}

/*function askForPieces(){
	while((isNaN(p)) || p > 20 || p == ""){
		var p = prompt("How many pieces do you want? 20 pieces max.");
	}
	return p;
}
*/
function createPuzzle(number){
	var pool = [];
	var puzzle = [];
	var props, blackPiece, whitePiece, canvas;

	for(var i=0; i<number; i++){
		props = new Piece(getRandomInt(0, 255),getRandomInt(0, 255),getRandomInt(0, 255), getRandomInt(50, 100),getRandomInt(50, 100), 'piece'+i);
		
		whitePiece = document.createElement('div');
		$(whitePiece).addClass('white-piece col-xs-1');


		canvas = document.createElement('canvas');
		$(canvas).attr('id',props.id).text('unsupported browser').width(props.width).height(props.height).appendTo(whitePiece);
		var ctx = canvas.getContext("2d");
		ctx.fillStyle = 'rgb('+ props.r +','+ props.g +','+ props.b+')';
		ctx.fillRect(0, 0,100,100);
		
		pool.push(whitePiece);

		
		
		blackPiece = document.createElement('div');
		$(blackPiece).addClass('black-piece col-xs-1 '+ props.id);

		canvasBlack = document.createElement('canvas');
		$(canvasBlack).text('unsupported browser').width(props.width).height(props.height).appendTo(blackPiece);
		var ctxb = canvasBlack.getContext('2d');
		ctxb.fillStyle = "black";
		ctxb.fillRect(0, 0,100,100);

		puzzle.push(blackPiece);
	}

	$('#pool').append(shuffle(pool));

	$('#puzzle').append(puzzle);

}
 

function dragDrop(idDrag, idDrop, number){
	
	$('.pool .white-piece').draggable({
		start: function(){
			idDrag = $(this);
			pieceDrag = idDrag.find("canvas").attr('id');
		},
		snap: ".puzzle .black-piece"
	});

	$( ".puzzle .black-piece" ).droppable({
      drop: function(){
     		idDrop = $(this).hasClass(pieceDrag);
     		attempt++;
     		$('#attempts_label').text(attempt);

     		rate(idDrag, idDrop, number);
      },
			tolerance: "fit"
    });
}


function rate(idDrag, idDrop, number){
	if(idDrop){
		idDrag.draggable('disable');
		idDrag.css('z-index',2);
		idDrag.css('cursor','auto');
		counter++;
		$('#score_label').text(counter);
	}
	if(counter>number-1){
		alert("Fin del juego!");
		clearTimer();
	}
}



function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  while (0 !== currentIndex) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min +1)) + min;
}


function startTime() {
    m = checkTime(m);
    s = checkTime(s);
    
    $('#time_label').text(m+":"+s);
    if(s<59){
    	s++;
    	if(typeof m == 'string'){
    		m = parseInt(m);
    	}
    }else{
    	s = 0;
    	m++;
    }

    t = setTimeout(function(){startTime()},1000);
   
}

function checkTime(i) {
    if (i<10) {
    	i = "0" + i
    };  // add zero in front of numbers < 10
    return i;
}

function clearTimer(){
	if(t != 0){
		clearTimeout(t);
		m = 0;
		s = 0;
	}
}

function resetMenu(){
	$('#time_label').html("00:00");
	counter = 0;
	attempt = 0;
	$('#score_label').text(counter);
	$('#attempts_label').text(attempt);
}