var canvas = document.querySelector('#engine3d');
var fps = document.querySelector('#fps');

var vw = window.innerWidth;
var vh = window.innerHeight;

canvas.width = vw;
canvas.height = vh;

var c = canvas.getContext('2d');

var fNear = 0.1;
var fFar = 1000;
var fFov = 90;
var fAspectRatio = vh/vw;
var fFovRad = 1 / Math.tan(((fFov/2)/180) * Math.PI);

var matrix = [
  [ fAspectRatio * fFovRad, 0, 0, 0 ],

  [ 0, fFovRad, 0, 0 ],

  [ 0, 0, fFar / (fFar - fNear), 1 ],

  [ 0, 0, (-fFar * fNear) / (fFar - fNear), 0 ]
];

function multMatrixVector(matrix, vector) {
  var x = matrix[0][0] * vector[0] +
          matrix[0][1] * vector[1] +
          matrix[0][2] * vector[2] +
          matrix[0][3];

  var y = matrix[1][0] * vector[0] +
          matrix[1][1] * vector[1] +
          matrix[1][2] * vector[2] +
          matrix[1][3];

  var z = matrix[2][0] * vector[0] +
          matrix[2][1] * vector[1] +
          matrix[2][2] * vector[2] +
          matrix[2][3];

  var w = matrix[3][0] * vector[0] +
          matrix[3][1] * vector[1] +
          matrix[3][2] * vector[2] +
          matrix[3][3];

  if (w != 0) {
    x /= w; y /= w; z /= w;
  }

  return [x, y, z];
}

var start = Date.now();
var count = 0;

var scale = 40;

canvas.addEventListener('wheel', event => {
	event.preventDefault();
	scale += event.deltaY/25;
	if (scale < 20) scale = 20;
	else if (scale > 400) scale = 400;
});

// var angle = 0;
var angleX = 0;
var angleY = 0;
// var angleZ = 0;
var initMousePos = {};

var mousedown = false;
canvas.addEventListener('mousedown', event => {
	initMousePos.x = event.offsetX;
	initMousePos.y = event.offsetY;
	mousedown = true;
});

canvas.addEventListener('mouseup', event => {
	mousedown = false;
});

canvas.addEventListener('mousemove', event => {
	if (mousedown) {
		angleX -= (initMousePos.y - event.offsetY) * 0.01;
		angleY -= (initMousePos.x - event.offsetX) * 0.01;
	}
});

vCamera = [0, 0, 0];

function animate() {
  window.requestAnimationFrame(animate);

  ++count;
  var now = Date.now();

  c.clearRect(0, 0, vw, vh);


  // var meshCube = [

  //   // SOUTH
  //   [ [-0.5, -0.5, -0.5],  [-0.5, 0.5, -0.5],  [0.5, 0.5, -0.5] ],
  //   [ [-0.5, -0.5, -0.5],  [0.5, 0.5, -0.5],  [0.5, -0.5, -0.5] ],

  //   // EAST
  //   [ [0.5, -0.5, -0.5],  [0.5, 0.5, -0.5],  [0.5, 0.5, 0.5] ],
  //   [ [0.5, -0.5, -0.5],  [0.5, 0.5, 0.5],  [0.5, -0.5, 0.5] ],

  //   // NORTH
  //   [ [0.5, -0.5, 0.5],  [0.5, 0.5, 0.5],  [-0.5, 0.5, 0.5] ],
  //   [ [0.5, -0.5, 0.5],  [-0.5, 0.5, 0.5],  [-0.5, -0.5, 0.5] ],

  //   // WEST
  //   [ [-0.5, -0.5, 0.5],  [-0.5, 0.5, 0.5],  [-0.5, 0.5, -0.5] ],
  //   [ [-0.5, -0.5, 0.5],  [-0.5, 0.5, -0.5],  [-0.5, -0.5, -0.5] ],

  //   // TOP
  //   [ [-0.5, 0.5, -0.5],  [-0.5, 0.5, 0.5],  [0.5, 0.5, 0.5] ],
  //   [ [-0.5, 0.5, -0.5],  [0.5, 0.5, 0.5],  [0.5, 0.5, -0.5] ],

  //   // BOTTOM
  //   [ [0.5, -0.5, 0.5],  [-0.5, -0.5, 0.5],  [-0.5, -0.5, -0.5] ],
  //   [ [0.5, -0.5, 0.5],  [-0.5, -0.5, -0.5],  [0.5, -0.5, -0.5] ]

  // ];

  var meshCube = [

    // SOUTH
    [ [-2, -2, 2],  [0, 3, 0],  [2, -2, 2] ],

    // EAST
    [ [2, -2, 2],  [0, 3, 0],  [2, -2, -2] ],

    // NORTH
    [ [2, -2, -2],  [0, 3, 0],  [-2, -2, -2] ],

    // WEST
    [ [-2, -2, -2],  [0, 3, 0],  [-2, -2, 2] ],

    // BOTTOM
    [ [2, -2, -2],  [-2, -2, -2],  [-2, -2, 2] ],
    [ [2, -2, -2],  [-2, -2, 2],  [2, -2, 2] ]

  ];

  // angle += .5;

  // var matRotX = [
  //   [ 1, 0, 0, 0 ],

  //   [ 0, Math.cos((angle/180) * Math.PI * 1), Math.sin((angle/180) * Math.PI * 1), 0, 0 ],

  //   [ 0, -Math.sin((angle/180) * Math.PI * 1), Math.cos((angle/180) * Math.PI * 1), 0 ],

  //   [ 0, 0, 0, 1 ]
  // ];

  // var matRotY = [
  //   [ Math.cos((angle/180) * Math.PI * 1.5), 0, Math.sin((angle/180) * Math.PI * 1.5), 0 ],

  //   [ 0, 1, 0, 0, 0 ],

  //   [ -Math.sin((angle/180) * Math.PI * 1.5), 0, Math.cos((angle/180) * Math.PI * 1.5), 0 ],

  //   [ 0, 0, 0, 1 ]
  // ];

  // var matRotZ = [
  //   [ Math.cos((angle/180) * Math.PI), Math.sin((angle/180) * Math.PI), 0, 0 ],

  //   [ -Math.sin((angle/180) * Math.PI), Math.cos((angle/180) * Math.PI), 0, 0 ],

  //   [ 0, 0, 1, 0 ],

  //   [ 0, 0, 0, 1 ]
  // ];

  var matRotY = [
    [ Math.cos((angleY/180) * Math.PI * 1.5), 0, Math.sin((angleY/180) * Math.PI * 1.5), 0 ],

    [ 0, 1, 0, 0, 0 ],

    [ -Math.sin((angleY/180) * Math.PI * 1.5), 0, Math.cos((angleY/180) * Math.PI * 1.5), 0 ],

    [ 0, 0, 0, 1 ]
  ];

  var matRotX = [
    [ 1, 0, 0, 0 ],

    [ 0, Math.cos((angleX/180) * Math.PI * 1), Math.sin((angleX/180) * Math.PI * 1), 0, 0 ],

    [ 0, -Math.sin((angleX/180) * Math.PI * 1), Math.cos((angleX/180) * Math.PI * 1), 0 ],

    [ 0, 0, 0, 1 ]
  ];

  for (tri of meshCube) {
    var triProjected = [[], [], []];

    // Rotate in X-Axis
    tri[0] = multMatrixVector(matRotX, tri[0]);
    tri[1] = multMatrixVector(matRotX, tri[1]);
    tri[2] = multMatrixVector(matRotX, tri[2]);

    // Rotate in Y-Axis
    tri[0] = multMatrixVector(matRotY, tri[0]);
    tri[1] = multMatrixVector(matRotY, tri[1]);
    tri[2] = multMatrixVector(matRotY, tri[2]);

    // Rotate in Z-Axis
    // tri[0] = multMatrixVector(matRotZ, tri[0]);
    // tri[1] = multMatrixVector(matRotZ, tri[1]);
    // tri[2] = multMatrixVector(matRotZ, tri[2]);

    // Offset into the screen
    tri[0][2] += scale;
    tri[1][2] += scale;
    tri[2][2] += scale;


    var normal = [];
    var line1 = [];
    var line2 = [];

    // line1
    line1[0] = tri[1][0] - tri[0][0];
    line1[1] = tri[1][1] - tri[0][1];
    line1[2] = tri[1][2] - tri[0][2];

    // line2
    line2[0] = tri[2][0] - tri[0][0];
    line2[1] = tri[2][1] - tri[0][1];
    line2[2] = tri[2][2] - tri[0][2];

    // normal
    normal[0] = line1[1] * line2[2] - line1[2] * line2[1];
    normal[1] = line1[2] * line2[0] - line1[0] * line2[2];
    normal[2] = line1[0] * line2[1] - line1[1] * line2[0];

    var length = Math.sqrt(normal[0] * normal[0] + normal[1] * normal[1] + normal[2] * normal[2]);
    normal[0] /= length; normal[1] /= length; normal[2] /= length;

    var visible = normal[0] * (tri[0][0] - vCamera[0]) +
                  normal[1] * (tri[0][1] - vCamera[1]) +
                  normal[2] * (tri[0][2] - vCamera[2]) < 0;
    
    if (visible) continue;

    // Illumination
    var lightDirection = [0, 0, -1];
    length = Math.sqrt(lightDirection[0] * lightDirection[0] + lightDirection[1] * lightDirection[1] + lightDirection[2] * lightDirection[2]);
    lightDirection[0] /= length; lightDirection[1] /= length; lightDirection[2] /= length;
    
    // Dot product between normal and lightDirection
    var dotProduct = normal[0] * lightDirection[0] + normal[1] * lightDirection[1] + normal[2] * lightDirection[2];

    // console.log('dotProduct', dotProduct);
    
    // Project triangles from 3D --> 2D
    triProjected = [
      multMatrixVector(matrix, tri[0]),
      multMatrixVector(matrix, tri[1]),
      multMatrixVector(matrix, tri[2]),
    ];

    // Scale into view
    triProjected[0][0] += 1; triProjected[0][1] += 1;
    triProjected[1][0] += 1; triProjected[1][1] += 1;
    triProjected[2][0] += 1; triProjected[2][1] += 1;

    triProjected[0][0] *= 0.5 * vw; triProjected[0][1] *= 0.5 * vh;
    triProjected[1][0] *= 0.5 * vw; triProjected[1][1] *= 0.5 * vh;
    triProjected[2][0] *= 0.5 * vw; triProjected[2][1] *= 0.5 * vh;

    c.beginPath();
    c.moveTo(triProjected[0][0], triProjected[0][1]);
    c.lineTo(triProjected[1][0], triProjected[1][1]);
    c.lineTo(triProjected[2][0], triProjected[2][1]);
    c.lineTo(triProjected[0][0], triProjected[0][1]);
    c.closePath();
    c.fillStyle = `rgba(255, 230, 170, ${Math.abs(dotProduct * 0.9)})`;
    // c.fillStyle = `white`;
    c.fill();
    // c.strokeStyle = 'white';
    // c.stroke();

  }

  // if (angle > 720) angle = 0;

  if (now - start > 1000) {
    fps.innerText = `${count} fps`;
    start  = now;
    count = 0;
  }
}

animate();