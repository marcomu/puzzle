$(document).ready(main);

function main(){
	var idDrag, idDrop;
	var number = askForPieces();
	
	createPuzzle(number);
	
	dragDrop(idDrag, idDrop, number);
	
}
function askForPieces(){
	while((isNaN(p)) || p > 20 || p == ""){
		var p = prompt("How many pieces do you want? 20 pieces max.");
	}
	return p;
}

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
		puzzle.push(blackPiece);
	}

	$('#pool').append(shuffle(pool));

	$('#puzzle').append(puzzle);

}
 

function dragDrop(idDrag, idDrop, number){
	var counter = 0;
	$('.pool .white-piece').draggable({
		start: function(){
			idDrag = $(this);
/*			console.log(idDrag);*/
		},
		snap: ".puzzle .black-piece"
	});

	$( ".puzzle .black-piece" ).droppable({
      drop: function(){
     		idDrop = $(this);
     		if(idDrag.find(".shape").attr('alt') == idDrop.attr('id')){
     			alert('Is a match!');
     			idDrag.draggable('disable');
     			idDrag.css('z-index',2);
     			idDrag.css('cursor','auto');
     			counter++;

     		}
     		if(counter>number-1){
     			alert("Fin del juego!");
     		}
      },
			tolerance: "fit"
    });
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
