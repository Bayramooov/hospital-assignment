var canvas = document.querySelector('canvas');
var fps = document.querySelector('#fps');
var vw = window.innerWidth;
var vh = window.innerHeight;

canvas.width = vw;
canvas.height = vh;

var c = canvas.getContext('2d');

window.addEventListener('resize', function() {
  vw = window.innerWidth;
  vh = window.innerHeight;

  canvas.width = vw;
  canvas.height = vh;
});


/********************************************************************************
//  RECTANGLE
//  c.fillRect(x, y, width, height) - creates the rectangle default black color
//  c.fillStyle - setting the color of the rectangle
//  c.fill() - applies the fillStyle
//  c.clearRect(x, y, width, height) - clears the canvas

c.fillStyle = 'rgba(255, 125, 147, .3)';
c.fillRect(100, 100, 100, 100);
c.fillStyle = 'rgba(34, 125, 147, .3)';
c.fillRect(200, 200, 100, 100);
c.fillStyle = 'rgba(34, 87, 167, .3)';
c.fillRect(300, 300, 100, 100);

*/


/********************************************************************************
//  LINE
//  c.moveTo(x, y) - moves the current pos
//  c.lineTo(x, y) - drawes line to the pos, from current pos
//  c.strokeStyle - setting the color of the line
//  c.stroke() - for making it visible

c.beginPath();
c.moveTo(0, 0);
c.lineTo(300, 300);
c.lineTo(30, 100);
c.strokeStyle = 'red';
c.stroke();

c.beginPath();
c.moveTo(30, 100);
c.lineTo(200, 100);
c.strokeStyle = 'blue';
c.lineTo(250, 100);
c.lineTo(250, 500);
c.stroke();

*/


/*******************************************************************************
// ARC
// c.beginPath() - should be used everytime 
// c.arc(x: int,
//       y: int,
//       radius: int,
//       startAngle length: float,
//       endAngle length: float,
//       drawCounterClockwise: bool)

for (i = 0; i < 30; i++) {
  var x = Math.random() * vw;
  var y = Math.random() * vh;
  var radius = Math.random() * 100;

  var r = Math.random() * 255;
  var g = Math.random() * 255;
  var b = Math.random() * 255;
  var alpha = Math.random();

  c.beginPath();
  c.arc(x, y, radius, 0, Math.PI * 2, false);
  c.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
  c.stroke();
}

*/



/*****************************************************************
//  BOBLE EFFECT

function Circle(x, y, radius, dx = 0, dy = 0, borderColor = 'black', innerColor = null) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.dx = dx;
  this.dy = dy;
  this.borderColor = borderColor;
  this.innerColor = innerColor;

  this.draw = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.strokeStyle = this.borderColor;
    c.fillStyle = this.innerColor;
    c.fill();
    c.stroke();
  }

  this.update = function() {
    if (this.radius < 50) this.radius += .5;
    else this.radius = .01;

    if (this.x - this.radius < 0 || this.x + this.radius > vw) this.dx = -this.dx;
    if (this.y - this.radius < 0 || this.y + this.radius > vh) this.dy = -this.dy;

    this.x += this.dx;
    this.y += this.dy;

    this.draw();
  }
}

var circleArray = [];

for (i = 0; i < 300; i++) {
  var radius = Math.random() * (40 - 5) + 5;
  var x = Math.random() * (vw - radius * 2) + radius;
  var y = Math.random() * (vh - radius * 2) + radius;
  var dx = (Math.random() - 0.5) * 10;
  var dy = (Math.random() - 0.5) * 10;
  var red = Math.random() * 255;
  var green = Math.random() * 255;
  var blue = Math.random() * 255;
  // var alpha = Math.random();
  var alpha = 1;
  var color = `rgba(${red}, ${green}, ${blue}, ${alpha})`;

  circleArray.push(new Circle(x, y, radius, dx, dy, color, color));
}

var start = Date.now();
var count = 0;

function animate() {
  ++count;
  var now = Date.now();

  window.requestAnimationFrame(animate);
  c.clearRect(0, 0, vw, vh);

  for (i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }

  if (now - start > 1000) {
    console.log(count, 'fps');
    start = now;
    count = 0;
  }
}

animate();

*/



/*****************************************************************/
//  HOVER EFFECT

function Circle(x, y, minRadius, maxRadius, dx = 0, dy = 0, color = null) {
  this.x = x;
  this.y = y;
  this.maxRadius = maxRadius;
  this.minRadius = minRadius;
  this.radius = minRadius;
  this.dx = dx;
  this.dy = dy;
  this.color = color;

  this.draw = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    c.fillStyle = this.color;
    c.fill();
    c.strokeStyle = this.color;
    c.stroke();
  }

  this.update = function() {
    // mouse interaction
    if (mouse.x - this.x <  50 && mouse.x - this.x > -50 &&
        mouse.y - this.y <  50 && mouse.y - this.y > -50) {
      if (this.radius < this.maxRadius - 3) this.radius += 3;
    }
    else if (this.radius > this.minRadius + .2) this.radius -= .2;

    // bobble collision
    if (this.x - this.radius < 0 || this.x + this.radius > vw) this.dx = -this.dx;
    if (this.y - this.radius < 0 || this.y + this.radius > vh) this.dy = -this.dy;

    this.x += this.dx;
    this.y += this.dy;

    this.draw();
  }
}

var mouse = {
  x: undefined,
  y: undefined
};

window.addEventListener('mousemove', function(event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

var circleArray = [];
var colors = [
  // bluish
  ['#366180','#B8E1FF','#6BC1FF','#00538E','#569BCC'],

  // bluish orange
  ['#64A1A5','#B4D8DA','#F2F2F0','#F7AE7E','#E27E7E'],

  // light mix
  ['#F2D0D0','#B1CCE2','#F2E6D9','#F5F4EE','#F5F4EE','#CBEFFD','#CBEFFD'],

  // grey
  ['#B0B0BF','#656773','#E9EBF2','#CCD0D9','#949BA6']
];

var colorsX = Math.floor(Math.random() * colors.length);

for (i = 0; i < 1000; i++) {
  var minRadius = Math.random() * (2 - .01) + .01;
  var maxRadius = Math.random() * (30 - 20) + 20;
  var x = Math.random() * (vw - minRadius * 2) + minRadius;
  var y = Math.random() * (vh - minRadius * 2) + minRadius;
  var dx = (Math.random() - 0.5) * 2;
  var dy = (Math.random() - 0.5) * 2;

  // color palatte 1
  // var red = Math.random() * 255;
  // var green = Math.random() * 255;
  // var blue = Math.random() * 255;
  // var alpha = 1;
  // var color = `rgba(${red}, ${green}, ${blue}, ${alpha})`;

  // color palatte 2
  var colorsY = Math.floor(Math.random() * colors[colorsX].length);
  console.log(colorsX, colorsY);
  var color = colors[colorsX][colorsY];

  circleArray.push(new Circle(x, y, minRadius, maxRadius, dx, dy, color, color));
}

var start = Date.now();
var count = 0;

function animate() {
  ++count;
  var now = Date.now();

  window.requestAnimationFrame(animate);
  c.clearRect(0, 0, vw, vh);

  for (i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }

  if (now - start > 1000) {
    fps.innerText = `${count} fps`;
    start = now;
    count = 0;
  }
}

animate();

/**/


