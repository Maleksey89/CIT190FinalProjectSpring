// sets the color that the puzzle pieces will have when they are hovered over//
const PUZZLE_HOVER_TINT = '#ff0707';
 
 //draws the puzzle source image
const canvas = document.querySelector("#game");
const gameArea = canvas.getContext("2d");
const img = new Image();

var difficulty=1;
var pieces;
var puzzleWidth;
var puzzleHeight;
var pieceWidth;
var pieceHeight;
var currentPiece;
var currentDropPiece;
// var MAX_WIDTH= 720;
// var MAX_HEIGHT= 1280;
var newWidth;
var newHeight;
// var easy = 3;
// var medium= 5;
// var hard = 8;

 
var mouse;
//loads the image when the page loads
img.addEventListener('load', onImage, false);
img.src = "media/supercar_garage.jpg";

// declares puzzle and initializes it
function loadPuzzleImage() 
{
    pieces = [];
    mouse = {
      x: 0,
      y: 0
      };
    currentPiece = null;
    currentDropPiece = null;
    gameArea.drawImage(
      img,
      0,
      0,
      puzzleWidth,
      puzzleHeight,
      0,
      0,
      puzzleWidth,
      puzzleHeight
    );
    buildPieces();
  }
  //sets size of canvas based on image size and draws border around it
  function setCanvas() 
  {
    canvas.width = puzzleWidth;
    canvas.height = puzzleHeight;
    canvas.style.border = "5px solid rgb(85, 252, 7)";
  }
  //determines size of image and size of individual pieces that will be rendered in the puzzle
 function onImage() 
 {   
    pieceWidth = Math.floor(puzzleWidth/ difficulty);
    pieceHeight = Math.floor(puzzleHeight / difficulty);
    puzzleWidth = Math.floor(img.width);
    puzzleHeight = Math.floor(img.height);
    setCanvas();
    loadPuzzleImage();
  }
  //creates the grid like appearance of the movable pieces that can be arranged to finish the puzzle
  function buildPieces() 
  {
    var i;
    var piece;
    var xPos = 0;
    var yPos = 0;
    // the grid is split into a i x i grid based on the difficulty setting
    for (i = 0; i < difficulty * difficulty; i++) {
      piece = {};
      piece.sx = xPos;
      piece.sy = yPos;
      pieces.push(piece);
      xPos += pieceWidth;
      if (xPos >= puzzleWidth) {
        xPos = 0;
        yPos += pieceHeight;
      }
    }
  }
  // shuffles the puzzle so that each piece is moved to a different location in the grid
  function shufflePuzzle() 
  {
    pieces = shuffleArray(pieces);
    gameArea.clearRect(0, 0, puzzleWidth, puzzleHeight);
    var xPos = 0;
    var yPos = 0;
    for (const piece of pieces) {
      piece.xPos = xPos;
      piece.yPos = yPos;
      gameArea.drawImage(
        img,
        piece.sx,
        piece.sy,
        pieceWidth,
        pieceHeight,
        xPos,
        yPos,
        pieceWidth,
        pieceHeight
      );
      gameArea.strokeRect(xPos, yPos, pieceWidth, pieceHeight);
      xPos += pieceWidth;
      if (xPos >= puzzleWidth) {
        xPos = 0;
        yPos += pieceHeight;
      }
    }    
    // reads the location of the mouse when its clicked and calls the puzzleclick function
    document.onpointerdown = onPuzzleClick;
  }
  // checks which peice is picked up by the mouse down action
  function checkPieceClicked() 
  {
    for (const piece of pieces) {
      if (mouse.x < piece.xPos || mouse.x > piece.xPos + pieceWidth|| 
          mouse.y < piece.yPos || mouse.y > piece.yPos + pieceHeight) 
        {
        } 
        else 
        {
        return piece;
        }
        }
    return null;
  }
  // updates puzzle based on piece dropped
  function updatePuzzle(e) 
  {
    currentDropPiece = null;
    if (e.layerX || e.layerX == 0) {
      mouse.x = e.layerX - canvas.offsetLeft;
      mouse.y = e.layerY - canvas.offsetTop;
    } else if (e.offsetX || e.offsetX == 0) {
      mouse.x = e.offsetX - canvas.offsetLeft;
      mouse.y = e.offsetY - canvas.offsetTop;
    }
    gameArea.clearRect(0, 0, puzzleWidth, puzzleHeight);
    for (const piece of pieces) {
      if (piece == currentPiece) {
        continue;
      }
      gameArea.drawImage(
        img,
        piece.sx,
        piece.sy,
        pieceWidth,
        pieceHeight,
        piece.xPos,
        piece.yPos,
        pieceWidth,
        pieceHeight
      );
      gameArea.strokeRect(piece.xPos, piece.yPos, pieceWidth, pieceHeight);
      if (currentDropPiece == null) {
        if (
          mouse.x < piece.xPos ||
          mouse.x > piece.xPos + pieceWidth ||
          mouse.y < piece.yPos ||
          mouse.y > piece.yPos + pieceHeight
        ) {
        } else {
          currentDropPiece = piece;
          gameArea.save();
          gameArea.globalAlpha = 0.4;
          gameArea.fillStyle = PUZZLE_HOVER_TINT;
          gameArea.fillRect(
            currentDropPiece.xPos,
            currentDropPiece.yPos,
            pieceWidth,
            pieceHeight
          );
          gameArea.restore();
        }
      }
    }
    gameArea.save();
    gameArea.globalAlpha = 0.6;
    gameArea.drawImage(
      img,
      currentPiece.sx,
      currentPiece.sy,
      pieceWidth,
      pieceHeight,
      mouse.x - pieceWidth / 2,
      mouse.y - pieceHeight / 2,
      pieceWidth,
      pieceHeight
    );
    gameArea.restore();
    gameArea.strokeRect(
      mouse.x - pieceWidth / 2,
      mouse.y - pieceHeight / 2,
      pieceWidth,
      pieceHeight
    );
  }
  
  function onPuzzleClick(e) 
  {
    if (e.layerX || e.layerX === 0) {
      mouse.x = e.layerX - canvas.offsetLeft;
      mouse.y = e.layerY - canvas.offsetTop;
    } else if (e.offsetX || e.offsetX === 0) {
      mouse.x = e.offsetX - canvas.offsetLeft;
      mouse.y = e.offsetY - canvas.offsetTop;
    }
    currentPiece = checkPieceClicked();
    if (currentPiece !== null) {
      gameArea.clearRect(
        currentPiece.xPos,
        currentPiece.yPos,
        pieceWidth,
        pieceHeight
      );
      gameArea.save();
      gameArea.globalAlpha = 0.9;
      gameArea.drawImage(
        img,
        currentPiece.sx,
        currentPiece.sy,
        pieceWidth,
        pieceHeight,
        mouse.x - pieceWidth / 2,
        mouse.y - pieceHeight / 2,
        pieceWidth,
        pieceHeight
      );
      gameArea.restore();
      document.onpointermove = updatePuzzle;
      document.onpointerup = pieceDropped;
    }
  }
  
  function gameOver() 
  {
    document.onpointerdown = null;
    document.onpointermove = null;
    document.onpointerup = null;
    loadPuzzleImage();
  }
  
  function pieceDropped(e) 
  {
    document.onpointermove = null;
    document.onpointerup = null;
    if (currentDropPiece !== null) {
      var tmp = {
        xPos: currentPiece.xPos,
        yPos: currentPiece.yPos
      };
      currentPiece.xPos = currentDropPiece.xPos;
      currentPiece.yPos = currentDropPiece.yPos;
      currentDropPiece.xPos = tmp.xPos;
      currentDropPiece.yPos = tmp.yPos;
    }
    resetPuzzleAndCheckWin();
  }
  function resetPuzzleAndCheckWin() 
  {
    gameArea.clearRect(0, 0, puzzleWidth, puzzleHeight);
    var gameWin = true;
    for (piece of pieces) {
      gameArea.drawImage(
        img,
        piece.sx,
        piece.sy,
        pieceWidth,
        pieceHeight,
        piece.xPos,
        piece.yPos,
        pieceWidth,
        pieceHeight
      );
      gameArea.strokeRect(piece.xPos, piece.yPos, pieceWidth, pieceHeight);
      if (piece.xPos != piece.sx || piece.yPos != piece.sy) {
        gameWin = false;
      }
    }
    if (gameWin) {
      //setTimeout(gameOver, 5000);
    }
  }
  
  function shuffleArray(o) 
  {
    for (
      var j, x, i = o.length;
      i;
      j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x
    );
    return o;
  }
function showGameButtons() 
{
  var gameRunning = document.getElementById("gameRunning");
      gameRunning.classList.remove("hidden");
      gameRunning.style.display = "block";
}
function hideDifficulty()
{
  var selectDifficulty = document.getElementById("selectDifficulty");
    selectDifficulty.classList.add("hidden");
    selectDifficulty.style.display = "none";
}
    function startPuzzle(e) 
    { 
    console.info(e.srcElement.value);
    e.stopPropagation()
    difficulty = e.srcElement.value;
    pieceWidth = Math.floor(img.width / difficulty);
    pieceHeight = Math.floor(img.height / difficulty);
    puzzleWidth = pieceWidth * difficulty;
    puzzleHeight = pieceHeight * difficulty;
    gameOver();
    shufflePuzzle();
    hideDifficulty();
    showGameButtons();
    }
  var buttons = document.getElementsByClassName("selectDifficulty");
      buttons[0].addEventListener("click", startPuzzle
);

  var hint = document.getElementById("hint");
      hint.addEventListener("mousedown", function(){
        document.getElementById("hintWindow").innerHTML = "<img src='media/supercar_garage.jpg' width='100%' height='auto'>";
     }     
     );
  document.getElementById("hintWindow").addEventListener("mouseout", function(){
  document.getElementById("hintWindow").innerHTML = "";
    })
    document.getElementById("reset").addEventListener("click", function(){
      location.reload();
    })