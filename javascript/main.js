// Status game
var requestId
var endGame = false
const gravity = 0.4
var jump = 6
const degree = Math.PI/180
var score = 0
var best = parseInt(localStorage.getItem("best")) || 0


// Gamezone
const boardWidth = 288
const boardHeight = 526
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// Bird (yellow & green)
var speedY = 0              // Bird jump speed
var birdX = boardWidth/8
var birdY = boardHeight/2
var bird1                   // Yellow Bird
var bird2                   // Green Bird
class Bird {
    x
    y
    width
    height
    img
    constructor(x,y,width,height,img) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.img = img
    }
    draw() {
        ctx.save()
        ctx.translate(this.x,this.y)
            if (speedY >= jump) {
                swooshing.play()        
                ctx.rotate(90* degree)
                ctx.drawImage(this.img,0,-24 ,34,24)
                
            } else {
                ctx.rotate(-25 * degree)
                ctx.drawImage(this.img,0,0,34,24)
            } 
        ctx.restore();
    }
    update() { 
        speedY += gravity
        this.y = Math.max(this.y + speedY,3)   
        if (this.y + this.height >= boardHeight - 105) {
            dieAud.play()
            this.y = boardHeight - 105 - this.height
            this.img = yellowMidImg
            endGame = true
            
        } 
    }
    reset() {
        ctx.clearRect(36,397,43,32)
        speedY = 0
        this.x = boardWidth/8
        this.y = boardHeight/2
    }
}
bird1 = new Bird(birdX,birdY,34,24,yellowMidImg)
bird1.img = yellowMidImg

// Pipes
var pipe1              // Top pipe
var pipe2              // Bottom pipe
const speedX = -2      // Speed of pipe
var arrPipe = []
class Pipe {
    x
    y
    width
    height
    img
    passed
    constructor(x,y,width,height,img,passed) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.img = img    
        this.passed = passed
    }
}

// Base
var base
class Base {
    x
    y
    width
    height
    img
    constructor(x,y,width,height,img) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height  
        this.img = img  
    }
    draw() {
        ctx.drawImage(this.img,this.x,this.y,this.width,this.height)
    }
}
base = new Base(0,429,288,83,baseImg)