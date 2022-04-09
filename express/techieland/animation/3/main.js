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

var angle = 0;
var start = Date.now();
var count = 0;

function animate() {
  window.requestAnimationFrame(animate);

  ++count;
  var now = Date.now();

  c.clearRect(0, 0, vw, vh);


  // var meshCube = [

  //   // SOUTH
  //   [ [1, 0, 0],  [0, 1, 0],  [1, 1, 0] ],
  //   [ [0, 0, 0],  [1, 1, 0],  [1, 0, 0] ],

  //   // EAST
  //   [ [1, 0, 0],  [1, 1, 0],  [1, 1, 1] ],
  //   [ [1, 0, 0],  [1, 1, 1],  [1, 0, 1] ],

  //   // NORTH
  //   [ [1, 0, 1],  [1, 1, 1],  [0, 1, 1] ],
  //   [ [1, 0, 1],  [0, 1, 1],  [0, 0, 1] ],

  //   // WEST
  //   [ [0, 0, 1],  [0, 1, 1],  [0, 1, 0] ],
  //   [ [0, 0, 1],  [0, 1, 0],  [0, 0, 0] ],

  //   // TOP
  //   [ [0, 1, 0],  [0, 1, 1],  [1, 1, 1] ],
  //   [ [0, 1, 0],  [1, 1, 1],  [1, 1, 0] ],

  //   // BOTTOM
  //   [ [1, 0, 1],  [0, 0, 1],  [0, 0, 0] ],
  //   [ [1, 0, 1],  [0, 0, 0],  [1, 0, 0] ]

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
    [ [-2, -2, 2],  [-2, -2, -2],  [2, -2, -2] ],
    [ [-2, -2, 2],  [2, -2, -2],  [2, -2, 2] ]

  ];

  angle += 2;

  var matRotZ = [
    [ Math.cos((angle/180) * Math.PI), Math.sin((angle/180) * Math.PI), 0, 0 ],

    [ -Math.sin((angle/180) * Math.PI), Math.cos((angle/180) * Math.PI), 0, 0 ],

    [ 0, 0, 1, 0 ],

    [ 0, 0, 0, 1 ]
  ];

  var matRotY = [
    [ Math.cos((angle/180) * Math.PI * 1.5), 0, Math.sin((angle/180) * Math.PI * 1.5), 0 ],

    [ 0, 1, 0, 0, 0 ],

    [ -Math.sin((angle/180) * Math.PI * 1.5), 0, Math.cos((angle/180) * Math.PI * 1.5), 0 ],

    [ 0, 0, 0, 1 ]
  ];

  var matRotX = [
    [ 1, 0, 0, 0 ],

    [ 0, Math.cos((angle/180) * Math.PI * 1), Math.sin((angle/180) * Math.PI * 1), 0, 0 ],

    [ 0, -Math.sin((angle/180) * Math.PI * 1), Math.cos((angle/180) * Math.PI * 1), 0 ],

    [ 0, 0, 0, 1 ]
  ];


  for (tri of meshCube) {
    var triProjected = [[], [], []];

    tri[0] = multMatrixVector(matRotZ, tri[0]);
    tri[1] = multMatrixVector(matRotZ, tri[1]);
    tri[2] = multMatrixVector(matRotZ, tri[2]);

    tri[0] = multMatrixVector(matRotX, tri[0]);
    tri[1] = multMatrixVector(matRotX, tri[1]);
    tri[2] = multMatrixVector(matRotX, tri[2]);

    tri[0] = multMatrixVector(matRotY, tri[0]);
    tri[1] = multMatrixVector(matRotY, tri[1]);
    tri[2] = multMatrixVector(matRotY, tri[2]);

    tri[0][2] += 50;
    tri[1][2] += 50;
    tri[2][2] += 50;

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
    c.stroke();

  }

  if (angle > 720) angle = 0;


  if (now - start > 1000) {
    fps.innerText = `${count} fps`;
    start  = now;
    count = 0;
  }
}

animate();