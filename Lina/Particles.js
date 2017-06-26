(function() {
'use strict'

function ColorLuminance(hex, lum) {

  // validate hex string
  hex = String(hex).replace(/[^0-9a-f]/gi, '');
  if (hex.length < 6) {
    hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
  }
  lum = lum || 0;

  // convert to decimal and change luminosity
  var rgb = "#", c, i;
  for (i = 0; i < 3; i++) {
    c = parseInt(hex.substr(i*2,2), 16);
    c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
    rgb += ("00"+c).substr(c.length);
  }

  return rgb;
}

// console.log();

let canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    particles = [], timer = 0, textSize, textShift;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

var mq = window.matchMedia( "(min-width: 1280px)" );
if (mq.matches) {
  textSize = 15;
  textShift = 150;
} else {
  textSize = 8;
  textShift = 50;
}

var img = document.getElementById('image1');

let init = () => {
  // Background
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  // Title
  ctx.font = "bold " + textSize + "em Arial";
  // ctx.fillStyle = "#feffff";
  ctx.fillStyle = "#feffff";
  ctx.fillText("Линочка",30,100 + textShift);
  ctx.fillText("С Днем",30,300 + textShift);
  ctx.fillText("Рождения",30,500 + textShift);
}

init();
var map = ctx.getImageData(0,0,canvas.width,canvas.height);

let createParticles = () => {
  var data, dy, x, m;
  for (var k = 0; k < 30; k++) {
    if (particles.length < 3000) {
      x = Math.random() * canvas.width;
      dy = Math.random() * canvas.height;
      m = Math.random();
      if (map.data[4*Math.floor(x) + canvas.width*4*Math.floor(dy)] === 254) {
        data = {
          x: x,
          y: 0,
          destY: dy,
          speed: 2 + Math.random() * 3,
          size: 16 + Math.floor(16*m),
          radius: 5 + Math.random() * 5,
          color: ColorLuminance("31ff1e", 0.1 - Math.random() * 0.24)
        }
        particles.push(data);
      }
    }
  }
}

let updateParticles = () => particles.forEach((particle) => {
  if (particle.y < particle.destY) particle.y += particle.speed;
});

let loopParticles = () => particles.forEach((particle) => particle.y > canvas.height ? particle.y = 0 : null );

let drawParticles = () => {
  init();
  timer++;
  if (timer % 50 === 0) map = ctx.getImageData(0,0,canvas.width,canvas.height);

  particles.forEach((particle) => {
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fillStyle = particle.color;
    ctx.fill();
  })
}

let loop = () => {
  requestAnimationFrame(loop);
  createParticles();
  updateParticles();
  loopParticles();
  drawParticles();
}

requestAnimationFrame(loop);

}).call(this);
