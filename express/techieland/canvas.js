var canvas = document.querySelector('canvas');
var vw = window.innerWidth;
var vh = window.innerHeight;
var c = canvas.getContext('2d');

canvas.width = vw;
canvas.height = vh;

var mouse = {
  x: undefined,
  y: undefined
};

window.addEventListener('mousemove', function(event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

window.addEventListener('resize', function() {
  vw = window.innerWidth;
  vh = window.innerHeight;
  canvas.width = vw;
  canvas.height = vh;
});

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

// var colorsX = Math.floor(Math.random() * colors.length);
var colorsX = 2;

for (i = 0; i < 1000; i++) {
  var minRadius = Math.random() * (2 - .01) + .01;
  var maxRadius = Math.random() * (30 - 20) + 20;
  var x = Math.random() * (vw - minRadius * 2) + minRadius;
  var y = Math.random() * (vh - minRadius * 2) + minRadius;
  var dx = (Math.random() - 0.5) * 2;
  var dy = (Math.random() - 0.5) * 2;
  var colorsY = Math.floor(Math.random() * colors[colorsX].length);
  var color = colors[colorsX][colorsY];

  circleArray.push(new Circle(x, y, minRadius, maxRadius, dx, dy, color, color));
}

function animate() {
  window.requestAnimationFrame(animate);
  c.clearRect(0, 0, vw, vh);

  for (i = 0; i < circleArray.length; i++)
    circleArray[i].update();
}

animate();