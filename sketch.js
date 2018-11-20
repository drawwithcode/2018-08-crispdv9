
var balls = [];

var threshold = 30;
var accChangeX = 0;
var accChangeY = 0;
var accChangeT = 0;
var r=255
var g=0
var b=0
var myColor;

function setup() {
  createCanvas(windowWidth, windowHeight);
  myColor = color(r,g,b)
  background(myColor)
  noStroke()
  for (var i=0; i<20; i++) {
    balls.push(new Ball());
  }
}

function draw() {
    myColor = color(r,g,b)
    background(myColor)
    push()
    fill(250)
    textSize(12);
    textFont('Allerta Stencil')
    textAlign(CENTER)
    text('The fireflies rut out from the light.\nShake your phone five seconds to scare them.\nBe aware, they will come back!',windowWidth/2, windowHeight/2)
    pop()
    if (r >5){
      r-=5
    }
    if (g >5){
      g-=5
    }
  for (var i=0; i<balls.length; i++) {
    balls[i].move();
    balls[i].display();
  }

  checkForShake();

 }

function Ball() {
  this.x = random(0,width);
  this.y = random(0,height);
  this.diameter = random(10, 30);
  this.xspeed = random(0,2);
  this.yspeed = random(0,2);
  this.oxspeed = this.xspeed;
  this.oyspeed = this.yspeed;
  this.direction = 0.5;

  this.move = function() {
    this.x += this.xspeed * this.direction;
    this.y += this.yspeed * this.direction;
  };

  // Rebota cuando toca el borde
  this.turn = function() {
    if (this.x < 0) {
      this.x = 0;
      this.direction = -this.direction;
    }
    else if (this.y < 0) {
      this.y = 0;
      this.direction = -this.direction;
    }
    else if (this.x > width - 20) {
      this.x = width - 20;
      this.direction = -this.direction;
    }
    else if (this.y > height - 20) {
      this.y = height - 20;
      this.direction = -this.direction;
    }
  }

  this.shake = function() {
    this.xspeed += random(5, accChangeX/3);
    this.yspeed += random(5, accChangeX/3);
  }

  this.stopShake = function() {
    if (this.xspeed > this.oxspeed) {
      this.xspeed -= 0.6;
    }
    else {
      this.xspeed = this.oxspeed;
    }
    if (this.yspeed > this.oyspeed) {
      this.yspeed -= 0.6;
    }
    else {
      this.yspeed = this.oyspeed;
    }
  };

  this.display = function() {
    ellipse(this.x, this.y, this.diameter, this.diameter);
  }
}

function checkForShake() {
  // Calcular cambio total de aceleración en x e y, (accelerationX, accelerationY)
  accChangeX = abs(accelerationX - pAccelerationX);
  accChangeY = abs(accelerationY - pAccelerationY);
  accChangeT = accChangeX + accChangeY;
  if (accChangeT >= threshold) {
    for (var i=0; i<balls.length; i++) {
      balls[i].shake();
      balls[i].turn();
       r = 255
       g = 244
       b = 0
    }
  }
  else {
    for (var i=0; i<balls.length; i++) {
      balls[i].stopShake();
      balls[i].turn();
      r = 10
      g = 8
      b = 77
    }
  }
}
