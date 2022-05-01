
var myGamePiece;
var myObstacles = [];
var myScore;

function loadGame() {
    myGamePiece = new component(25, 50, "media/blueCar.png" , 175 , 600, "image");
    myScore = new component("15px", "Consolas", "white", 10, 40, "text");
    myGameArea.start();
}
//  function reStartGame(){
//    var oldCanvas = document.getElementsByTagName("canvas");
//     myGameArea.canvas.remove();
/////////////////////////////////////
//     myGamePiece = new component(25, 50, "media/blueCar.png" , 175 , 600, "image");
//     myScore = new component("15px", "Consolas", "white", 10, 40, "text");
//     myGameArea.start();    
//  }
var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 400;
        this.canvas.height = 700;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 5);
        
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(myGameArea.interval);
    },
    // drawLine : function(x1, y1, x2, y2) {
    //     this.context.beginPath();
    //     this.context.moveTo(x1, (400-y1))
    //     this.context.lineTo(x2, (400-y2));
    //     this.context.stroke();
    //     console.info(myGameArea.frameNo, x1, y1);
    // }
}
console.info(this.interval);
function component(width, height, color, x, y, type) {
    this.type = type;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = myGameArea.context;
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        }
        else if (type == "image") {
            ctx.drawImage(this.image, 
                this.x, 
                this.y,
                this.width, this.height);
        }  
        else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;        
    }
    this.crashWith = function(otherobj) {
        var myleft = this.y;
        var myright = this.y + (this.height);
        var mytop = this.x;
        var mybottom = this.x + (this.width);
        var otherleft = otherobj.y;
        var otherright = otherobj.y + (otherobj.height);
        var othertop = otherobj.x;
        var otherbottom = otherobj.x + (otherobj.width);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}

function updateGameArea() {
    var x, height, gap, minWidth, maxWidth, minCenter, maxCenter;
    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {
            myGameArea.stop();
            return;
       } 
    }
    myGameArea.clear();
    // h sets height for each block being generated
    
    var gap = 100;
    var frameInterval = 400;
    var h = 20;
    myGameArea.frameNo += 1;// experimenting with horizintal images instead of vertical, will eventually add more diverse images
    if (myGameArea.frameNo == 1 || everyinterval(frameInterval)) {
        x = myGameArea.canvas.width;
        minWidth = 85;
        maxWidth = 315;
        c1AWidth = Math.floor(Math.random()*(maxWidth-minWidth+1)+minWidth);
        console.info(gap);
        c1BX= c1AWidth + gap;
        c2AWidth = Math.floor(Math.random()*(maxWidth-minWidth+1)+minWidth); 
        c2BX= c2AWidth + gap;
        console.info(myGameArea.frameNo, c1AWidth, c2AWidth);
        // to try and randomize the x variable /////////
        // minX = 50;
        // maxX = myGameArea.canvas.width;
        // x =  Math.floor(Math.random()*(maxX-minX+1)+minX);
       // gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
       // myGameArea.drawLine(c1AWidth, c1BX, c2AWidth, c2BX);
        myObstacles.push(new component(c1AWidth, h, "blue", 0 , -h,"block"));
        myObstacles.push(new component(400-c1BX, h, "black", c1BX , -h, "block"));
        myObstacles.push(new component(c2AWidth, h, "red", 0 , -h- (frameInterval/2),"block"));
        myObstacles.push(new component(400-c2BX, h, "white", c2BX , -h - (frameInterval/2), "block"));
        //console.info(myGameArea.drawLine)
        
     //} else{ if (everyinterval(h)){
    //         // function drawLine(){

            // }
            
        //     var iCWidth = 0;
        //    iCWidth = c1AWidth;            
        //     iCX = iCWidth + gap;
        //     console.info(myGameArea.frameNo,c1AWidth, c2AWidth, iCWidth, iCX, c2BX); 
        //     for(var x = 0; x < h; ++x){
        //         console.info(x, iCWidth, iCX, gap );
        //     iWidth= iCWidth + x / 100;
        //     iCX = iWidth + gap;          
        //     myObstacles.push(new component(iWidth, 5, "green" , 0, -h, "block"));
        //     myObstacles.push(new component(400 - iCX, 5, "yellow", iCX, -h,"block"));
            
        //}
            
    }
    

    if (myObstacles.length > 0){
        while(myObstacles[0].y > 700){
        myObstacles.shift();
        }
    }    
    // original code ////////
    // if (myGameArea.frameNo == 1 || everyinterval(200)) {
    //     x = myGameArea.canvas.width;
    //     minHeight = 20;
    //     maxHeight = 200;
    //     height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
    //     minGap = 80;
    //     maxGap = 250;
    //     gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
    //     myObstacles.push(new component(100, height, "orange", x, 0));
    //     myObstacles.push(new component(100, x - height - gap, "orange", x, height + gap));
    // }
    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].speedY = 1;
       // console.info(myObstacles);
        myObstacles[i].newPos();
        myObstacles[i].update();
      // console.info(myObstacles);
    }
    myScore.text="SCORE: " + (Math.floor(myGameArea.frameNo/250)-2);
    myScore.update();
    myGamePiece.newPos();    
    myGamePiece.update();
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}

function moveup() {
    myGamePiece.speedY = -1;
    // var x=5;
    // myGameArea.interval = setInterval(updateGameArea, ++x);
    // console.info(myGameArea.interval);
}

function movedown() {
    myGamePiece.speedY = 1;
    // var x=5;
    // myGameArea.interval = setInterval(updateGameArea, --x);
    // console.info(myGameArea.interval); 
}

function moveleft() {
    myGamePiece.speedX = -1; 
}

function moveright() {
    myGamePiece.speedX = 1; 
}

function clearmove() {
    myGamePiece.speedX = 0; 
    myGamePiece.speedY = 0; 
}
window.addEventListener("keydown", function(p)
     {console.info(p.key);
    const key = p.key;
    switch (key) {
        case "ArrowUp":
            moveup();
            break;
        case "ArrowLeft":
            moveleft();
            break;
        case "ArrowRight":
            moveright();
            break;
        case "ArrowDown":
            movedown();
            break;
        case "Space":
            clearmove();
            break;  
          
    }
document.addEventListener("keyup", function()
{
    clearmove();
})
})
// document.getElementById("up").addEventListener("onmousedown", function(){
//    moveup();
//   })
//   document.getElementById("down").addEventListener("click", function(){
//     movedown();
//   })
//   document.getElementById("left").addEventListener("click", function(){
//     moveleft();
//   })
//   document.getElementById("right").addEventListener("click", function(){
//     moveright();
//   })
   document.getElementById("reset").addEventListener("click", function(){
     location.reload();
   })