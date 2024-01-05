setInterval(drawPipe,1500)
function updateImg() {  // Upload animation
    if (endGame) {
        stateGameOver()
        requestId = cancelAnimationFrame(updateImg)
        return requestAnimationFrame(updateImg);
    } else {
        requestAnimationFrame(updateImg)
        update()
        draw()           
    }    
}
updateImg() 

function draw() { // draw Image
    bird1.draw()  
    base.draw()
}

function update() {
    if (endGame) {
        return;  
    }  
    ctx.clearRect(0,0,boardWidth,boardHeight) 
    for (let i in arrPipe) {  
        var pipe = arrPipe[i]
        arrPipe[i].x += speedX
        ctx.drawImage(arrPipe[i].img,arrPipe[i].x,arrPipe[i].y,52,320) 
        if (!pipe.passed && bird1.x > pipe.x + pipe.width) {
            scoreAud.play()
            score += 0.5;
            pipe.passed = true;
            best = Math.max(score,best);
        } 
        if (checkCollision(bird1,pipe)) {
            endGame = true
            hitAud.play()
        } 
    }
    while (arrPipe.length > 0 && arrPipe[0].x < -60) {
        arrPipe.shift();  
    } 
    ctx.fillStyle = "white";
    ctx.font="35px Teko";
    ctx.fillText(score,144, 45);   
    ctx.textAlign = "center"; 
    bird1.update()
}

// Animation pipes
function drawPipe() {   
    if (endGame) {
        return; 
    }   
    let openingSpace = 128                       // 512/4 = 128
    let randomPipe1 = -60 - Math.random()*160    // 320/4 = 80 
    let randomPipe2 = randomPipe1 + openingSpace + 320
    pipe1 = new Pipe(288,randomPipe1,52,320,topPipe,false) 
    pipe2 = new Pipe(288,randomPipe2,52,320,bottomPipe,false) 
    arrPipe.push(pipe1, pipe2)
}

// Control the game
if (!endGame) {
    document.addEventListener("keydown",function(e) { // Bird jump
        if (e.code == "Space" || e.code == "ArrowUp") {
                speedY = -6   
                bird1.img = yellowDownImg
                flapAud.play()
        }
    });   
    document.addEventListener("keyup",function(e) { 
        if (e.code == "Space" || e.code == "ArrowUp") {
            bird1.img = yellowUpImg 
        }
    }); 
}

// Check collision
function checkCollision(rect1, rect2) {
    let distX = (rect1.x + (rect1.width/2)) - (rect2.x + (rect2.width)/2);
    if (distX < 0)
        distX = -distX;

    const distW = (rect1.width + rect2.width)/2;

    let distY =(rect1.y + (rect1.height/2)) - (rect2.y + (rect2.height)/2);
    if(distY < 0)
        distY = -distY;

    const distH = (rect1.height + rect2.height)/2;

    return (distX <= distW && distY <= distH);
}

// Display game over
function stateGameOver() {
    ctx.drawImage(gameOverImg,48,164)  
    ctx.drawImage(bestScore,31,216)
    ctx.fillStyle = "white";
    ctx.font="25px Teko";
    ctx.fillText(score,218, 268);   
    ctx.fillStyle = "white";
    ctx.font="25px Teko";
    ctx.fillText(best,218, 310);
    ctx.drawImage(buttonReset,103,350)
    canvas.addEventListener("click", (event) => {
        let rect = canvas.getBoundingClientRect();
        let clickX = event.clientX - rect.left;
        let clickY = event.clientY - rect.top;
        if(clickX >= 103 && clickX <= 185 && clickY >= 350 && clickY <= 378){ // 185 = 103 + 82 | 378 = 350 + 28  
            bird1.y = birdY;
            arrPipe = []; 
            score = 0;
            endGame = false;
            bird1.reset() 
        } 
    })
}        