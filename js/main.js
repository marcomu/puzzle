$(document).ready(main);

function main(){
	var counter = [0];
	var idDrag, idDrop;
	var number = askPieces();

	var pool = createPieces(number);
	var poolDiv = $('#pool');
	poolDiv.append(pool);
	var puzzleDiv = $('#puzzle');
	puzzleDiv.append(shuffle(pool));
	dragDrop(idDrag, idDrop, counter, number);
	
}
function askPieces(){
	while(isNaN(p)){
		var p = prompt("How many pieces do you want? 30 pieces max.");
		while(p>30){
			var p = prompt("How many pieces do you want? 30 pieces max.");
		}
	}
	return p;
	
}


function createPieces(number){
	var pool = [];
	var props, piece;
	for(var i=0; i<number; i++){
		props = new Piece(getRandomInt(50, 100),getRandomInt(100, 150)); 
		props.id = 'piece'+i;
		//console.log(props);
		piece = '<div class="col-piece col-xs-1"  id="'+props.id+'"><div class="shape" style="width:'+props.width+'px; height:'+props.height+'px;"></div></div>';
		pool.push(piece);
	}
	return pool;
}


function dragDrop(idDrag, idDrop, counter, number){
	$('.pool .col-piece').draggable({
		start: function(){
			idDrag = $(this).attr("id");
		},
		snap: ".puzzle .col-piece"
	})
	$( ".puzzle .col-piece" ).droppable({
      drop: function(){
     		idDrop = $(this).attr("id");
     		if(idDrag == idDrop){
     			alert("It's a match!");
     			$('#'+idDrag).draggable('disable');
     			$('#'+idDrag).css('z-index',2);
     			$('#'+idDrag).css('cursor','auto');
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
