$(function() {
  console.log('Khadijah');
  startGame();
});

function startGame() {
  var columns = $('.column');
  var COUNTER = 6;
  var turn = true;
  var gameBoard = [
                /* 0    1     2     3     4      5    6
   /* 0 row */  [null, null, null, null, null, null, null],
   /* 1 row */  [null, null, null, null, null, null, null],
   /* 2 row */  [null, null, null, null, null, null, null],
   /* 3 row */  [null, null, null, null, null, null, null],
   /* 4 row */  [null, null, null, null, null, null, null],
   /* 5 row */  [null, null, null, null, null, null, null],
   /* 6 row */  [   5,    5,    5,    5,    5,    5,   5]
  ];

  $('#notification').text('Khadijah\'s Connect Four');
  $('.button').hide();
  
  columns.on('click', function() { 
    column = $(this);
    columnId = column.attr('id');
     if (gameBoard[COUNTER][columnId] >= 0)
       turn = playPiece(gameBoard, columnId, turn);
  });
}

var playPiece = function(board, column, turn) {
    var color = turn ? 'red' : 'black'
    var row = board[6][column];
    board[row][column] = color;

    setPieceColor(row, column, color);

    if (checkWin(board, row, column)) {
      disableClicks(board);
      notifyWinner(color);
      showRestartButton();
    }
    board[6][column]--;
    return !turn;
};

var disableClicks = function(board) {
  for(var i = 0; i <= 6; i++){
    board[6][i] = -1;
  }
};

var notifyWinner = function(color) {
  $('#notification').text(color + ' wins!');
};

var showRestartButton = function() {
  $('.button').show();
};

var setPieceColor = function(row, column, color) {
    var idOfPiece = getId([row,column]);
    var piece = $('#' + idOfPiece); 
    piece.addClass(color);
};

var checkWin = function(gameBoard, row, col) {
  col=(+col)
  winCheckFunctions = [checkHorizontalLeft, checkHorizontalRight, checkVerticalDown, checkDiagonalNE, checkDiagonalNW, checkDiagonalSE, checkDiagonalSW]; 
  for( var i = 0; i < winCheckFunctions.length; i++) {
    var win = winCheckFunctions[i](gameBoard, row, col)
    if (win)
      return win;
  } 
};

var checkHorizontalLeft = function(gameBoard, row, col) {
 if ( col + 3 < 7 ) { 
   if (gameBoard[row][col] === gameBoard[row][col+3] &&
       gameBoard[row][col] === gameBoard[row][col+2] && 
       gameBoard[row][col] === gameBoard[row][col+1]) {
         
         return determineWinner([row,col]);
    }
  }
 return false;
};

var checkHorizontalRight = function(gameBoard, row, col) {
 if ( col - 3 > -1 ) { 
   if (gameBoard[row][col] === gameBoard[row][col-3] &&
       gameBoard[row][col] === gameBoard[row][col-2] && 
       gameBoard[row][col] === gameBoard[row][col-1]) {
         
         return determineWinner([row,col]);
    }
  }
 return false;
};

var checkVerticalDown = function(gameBoard, row, col) {
  if ( row + 3 < 6 ) {
    if (gameBoard[row][col] === gameBoard[row+1][col] &&
        gameBoard[row][col] === gameBoard[row+2][col] &&
        gameBoard[row][col] === gameBoard[row+3][col]) {

         return determineWinner([row,col]);
    }
  }
  return false;
};

var checkDiagonalNE = function(gameBoard, row, col) {
  if ( row - 3 >= 0 && col + 3 <= 6 ) {
    if (gameBoard[row][col] === gameBoard[row-3][col+3] &&
        gameBoard[row][col] === gameBoard[row-2][col+2] &&
        gameBoard[row][col] === gameBoard[row-1][col+1] ) {

         return determineWinner([row,col]);
    }
  }
};

var checkDiagonalNW = function(gameBoard, row, col) {
  // No Such Thing ?
  if ( row - 3 >= 0 && col - 3 >= 0 ) {
    if (gameBoard[row][col] === gameBoard[row-3][col-3] &&
        gameBoard[row][col] === gameBoard[row-2][col-2] &&
        gameBoard[row][col] === gameBoard[row-1][col-1] ) {

         return determineWinner([row,col]);
    }
  }
};

var checkDiagonalSE = function(gameBoard, row, col) {
  if ( row + 3 <= 5 && col + 3 <= 6 ) {
    if (gameBoard[row][col] === gameBoard[row+3][col+3] &&
        gameBoard[row][col] === gameBoard[row+2][col+2] &&
        gameBoard[row][col] === gameBoard[row+1][col+1] ) {
        
        return determineWinner([row,col]);
    }
  }
};

var checkDiagonalSW = function(gameBoard, row, col) {
  if ( row + 3 <= 5 && col - 3 >= 0 ) {
    if (gameBoard[row][col] === gameBoard[row+3][col-3] &&
        gameBoard[row][col] === gameBoard[row+2][col-2] &&
        gameBoard[row][col] === gameBoard[row+1][col-1] ) {
        
        return determineWinner([row,col]);
    }
  }

};

var determineWinner = function(arr) {
  id = getId(arr)
  piece = $('#' + id);
  color = piece.hasClass('red') ? 'red' : 'black';
  return color;
};

var getId = function(arr) {
  var locationRow = arr[0];
  var locationCol = arr[1];
  return locationCol * 6 + locationRow;
};
