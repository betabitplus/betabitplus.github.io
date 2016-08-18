(() => {
'use strict'

////////////////////////
// UTILITYS
////////////////////////

let getRandom = (min, max) => {
  return min + Math.random() * (max - min);
}

let randomInteger = (min, max) => {
  return Math.floor(min + Math.random() * (max + 1 - min));
}

let makeThrottle = (func, startTimer, gap) => {
  return () => {
    if (new Date() - startTimer <= gap) return false;

    startTimer = new Date();
    return func.call(this);
  }
}

let makeGradient2 = ((from, to, steps) => {
  this.currentStep = 0;
  return (from, to, steps) => {
    return (this.currentStep < steps) ? from + (to - from) / steps * this.currentStep++ : to;
  };
})();

makeGradient2.reset = () => {
  this.currentStep = 0;
}

// let makeGradient = (from, to, steps) => {
//   return (makeGradient.step < steps) ? from + (to - from) / steps * makeGradient.step++ : to;
// }

// makeGradient.reset = () => {
//   makeGradient.step = 0;
// }

// makeGradient.step = 0;

////////////////////////
// VECTOR
////////////////////////

class Vec2 {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  clone() {
    return new Vec2(this.x, this.y);
  }

  copy(vec) {
    this.x = vec.x;
    this.y = vec.y;
    return this;
  }

  add(vec) {
    
    this.x += vec.x;
    this.y += vec.y;
    return this;
  }

  subtract(vec) {
    this.x -= vec.x;
    this.y -= vec.y;
    return this;
  }

  angle(vec) {
    return Math.atan2((vec.y - this.y), (vec.x - this.x));
  }

  addPolar(angle, speed = 1) {
    this.x += speed * Math.cos(angle);
    this.y += speed * Math.sin(angle);
    return this;
  }

  // max(value, multiplier) {
  //   return new Vec2((this.x > max) ? this.x * multiplier : this.x,
  //                   (this.y > max) ? this.y * multiplier : this.y);
  // }

  // limit(max, multiplier) {
    
  // }
}

////////////////////////
// EVENT
////////////////////////

class Event {
  constructor(options) {
    this.type = options.type;
    this.keyCode = options.keyCode;
    this.world = options.world;
    this.action = options.action;
    this.throttling = options.throttling;
    this.callback = options.callback;

    if (this.throttling)
      this.action = makeThrottle(this.action, new Date(), this.throttling);

    if (this.type === 'keyhold') this.keyListener();
    if (this.type === 'mousepress') this.mouseListener();
  }

  keyListener () {
    document.addEventListener('keydown', (e) => {
      if (e.keyCode === this.keyCode) {
        e.preventDefault();
        this.world.keyboard[this.keyCode] = true;
      }
    });

    document.addEventListener('keyup', (e) => {
      if (e.keyCode === this.keyCode) this.world.keyboard[this.keyCode] = false;
      if (this.callback) this.callback();
    });
  }

  mouseListener() {
    this.world.canvas.addEventListener('mousedown', (e) => {
      e.preventDefault();
      this.world.isMousePressed = true;
      this.world.mouseCoords = new Vec2(e.clientX, e.clientY);
    });

    this.world.canvas.addEventListener('mouseup', (e) => {
      this.world.isMousePressed = false;
      if (this.callback) this.callback();
    });

    this.world.canvas.addEventListener('mousemove', (e) => {
      e.preventDefault();
      this.world.mouseCoords = new Vec2(e.clientX, e.clientY);
    });
  }

  update() {
    if (this.world.keyboard[this.keyCode]) this.action();
    if (this.type === 'mousepress' && this.world.isMousePressed) this.action();
  }
}

////////////////////////
// TIMER
////////////////////////

class Timer {
  constructor(options) {
    this.interval = options.interval;
    this.action = options.action;
    this.callback = options.callback;
    this.repeat = options.repeat - 1;
    this.scatter = options.scatter || [0, 0];
    // this.callback = options.callback;

    this.time = 0;
    this.timer = setInterval(() => this.time += 0.01, 10);
  }

  update() {

    if (this.time >= this.interval + getRandom(this.scatter[0], this.scatter[1])) {
      this.action();

      if (!this.repeat--) clearInterval(this.timer);
      this.time = 0;
    }

  }
}

////////////////////////
// WORLD
////////////////////////

class World {
  constructor(canvas, config) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.canvasWidth = canvas.width;
    this.canvasHeight = canvas.height;

    this.herroSpeed = config.herroSpeed;

    this._isGameStop = true;
    this.fps = 0;
    this.score = 0;

    this.enemies = [];
    this.bombs = [];
    this.bullets = [];
    this.stars = [];
    this.events = [];
    this.keyboard = {};
    this.timers = [];
    this.mouseCoords = {};

    this.isMousePressed = false;

    this.herro = new Herro({
      world: this,
      loc: new Vec2(50, this.canvasHeight / 2),
      width: 40,
      height: 40,
      healthPoints: 100,
      speed: this.herroSpeed
    });

    for (let i = 0; i < 5; i++) {

      let enemy = new Enemy({
        world: this,
        loc: new Vec2(this.canvasWidth - 50, i * 50),
        width: 40,
        height: 40,
        gap: 10,
        speed: 1,
        life: 3
      });

      this.enemies.push(enemy);
    }

    for (let i = 0; i < 300; i++) {
      let num = getRandom(.1, .3);
      let star = new Star({
        world: this,
        loc: new Vec2(Math.random() * this.canvasWidth, Math.random() * this.canvasHeight),
        size: .5 + Math.random(),
        color: `rgba(255, 255, 255, ${Math.random()})`,
        direction: new Vec2(0, num)
      });

      this.stars.push(star);
    }

    this.cheakEnter = (e) => {
      if (e.keyCode === 13) this._isGameStop = false;
      this.tick();
    }

    document.addEventListener('keydown', this.cheakEnter);
  }

  start() {
    this.tick();
  }

  tick() {
    if (this._isGameStop){
      new Menu({
        world: this,
        overlay: {
          title: 'Space Game',
          subtitle: 'press enter to start'
        }
      });
    }
    else {
      this.fps++;
      document.removeEventListener('keydown', this.cheakEnter);
      this.update();
      this.draw();
      requestAnimationFrame(this.tick.bind(this));
    }
  }

  update() {
    this.stars.forEach((star) => star.update());
    this.timers.forEach((timer) => timer.update());
    this.events.forEach((event) => event.update());
    this.enemies.forEach((enemy) => enemy.update());
    this.bombs.forEach((bomb, ind) => (bomb.notVisible(10)) ? this.bombs.splice(ind, 1) : bomb.update());
    // for (let i = 0; i < this.herro.bullets.length; i++)
    //   console.log(this.herro.bullets[i].loc.y);

    ////////////////////////
    // DETECT ENEMY HIT
    ////////////////////////
    this.bullets.forEach((bullet, ind) => {
      (bullet.notVisible()) ? this.bullets.splice(ind, 1) : bullet.update();

      this.enemies.forEach((enemy, index) => {
        if (bullet.isCrossed(enemy)) {

          enemy.hitted(index);
          this.bullets.splice(ind, 1);
        }
      });

    });

    ////////////////////////
    // DETECT HERRO HIT
    ////////////////////////
    this.bombs.forEach((bomb) => {
      if (bomb.isCrossed(this.herro)) this.herro.hitted();
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    this.stars.forEach((star) => star.draw());
    this.enemies.forEach((enemy) => enemy.draw());
    this.bullets.forEach((bullet) => bullet.draw());
    this.bombs.forEach((bomb) => bomb.draw());
    this.herro.draw();
  }
}

////////////////////////
// MENU
////////////////////////

class Menu {
  constructor(options) {
    this.world = options.world;
    this.ctx = this.world.ctx;
    this.overlay = options.overlay;

    this.draw();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.ctx.fillStyle = "rgba(0, 0, 0, .5)";
    this.ctx.fillRect(0, 0, this.world.canvasWidth, this.world.canvasHeight);
    this.ctx.fillStyle = "white";
    this.ctx.font = "Bold 40pt Arial";
    this.ctx.fillText(this.overlay.title, 40, 250);
    this.ctx.font = "14pt Arial";
    this.ctx.fillText(this.overlay.subtitle, 120, 300);
  }
}

////////////////////////
// SCENE
////////////////////////

class Scene {
  constructor(options) {

  }
}

////////////////////////
// OBJECT
////////////////////////

class Obj {
  constructor(options) {
    this.loc = options.loc;
    this.width = options.width;
    this.height = options.height;
    this.world = options.world;
  }

  isCrossed(a) {
    if(this.loc.x + this.width > a.loc.x && this.loc.x < a.loc.x + a.width)
        if(this.loc.y + this.height >= a.loc.y && this.loc.y < a.loc.y + a.height)
            return true;
    return false;
  }

  notVisible(threshold = 0) {
    if (this.loc.y > this.world.canvasHeight + threshold) return 'bottom';
    if (this.loc.y < -threshold) return 'top';
    if (this.loc.x > this.world.canvasWidth + threshold) return 'right';
    if (this.loc.x < -threshold) return 'left';
    // return this.loc.y > this.world.canvasHeight + threshold || this.loc.y < -threshold ||
    //        this.loc.x > this.world.canvasWidth + threshold || this.loc.x < -threshold;
  }
}

////////////////////////
// STAR
////////////////////////

class Star extends Obj {
  constructor(options) {
    super(options);
    this.size = options.size;
    this.color = options.color;
    this.direction = options.direction;
  }

  update() {
    this.loc.add(this.direction);

    if (this.notVisible() === 'right')
      this.loc.copy(new Vec2(0, Math.random() * this.world.canvasHeight));
    if (this.notVisible() === 'left')
      this.loc.copy(new Vec2(this.world.canvasWidth, Math.random() * this.world.canvasHeight));
    if (this.notVisible() === 'top')
      this.loc.copy(new Vec2(Math.random() * this.world.canvasWidth, this.world.canvasHeight));
    if (this.notVisible() === 'bottom')
      this.loc.copy(new Vec2(Math.random() * this.world.canvasWidth, 0));
  }

  draw() {
      this.world.ctx.fillStyle = this.color;
      this.world.ctx.beginPath();
      this.world.ctx.arc( this.loc.x, this.loc.y, this.size, 0, 2 * Math.PI );
      this.world.ctx.fill();
  }
}

////////////////////////
// ENEMY
////////////////////////

class Enemy extends Obj {
  constructor(options) {
    super(options);
    this.gap = options.gap;
    this.speed = options.speed;
    this.life = options.life - 1;
    this.bombs = this.world.bombs;

    this.isHitted = false;
    this._moveToRight = true;

    this.world.timers.push(new Timer({
      interval: 4,
      repeat: Infinity,
      scatter: [-1, 1],
      action: () => {
        this.bombs.push(new Bullet({
          loc: this.loc.clone().add( new Vec2( 0, (this.height - 5) / 2 ) ),
          world: this.world,
          width: 5,
          height: 5,
          color: 'red',
          speed: 3,
          angle: this.loc.angle( this.loc.clone().add( new Vec2(-1, 0) ) )
        }));
      }
    }));
  }

  update() {
    this.moving();
  }

  moving() {
    let enemies = this.world.enemies;

    if (enemies[enemies.length - 1].loc.y + this.height >= this.world.canvasHeight)
      this._moveToRight = false;
    this.loc.add( new Vec2( 0, (this._moveToRight ? this.speed : -this.speed) ) );
    if (this.world.enemies[0].loc.y <= 0) this._moveToRight = true;
  }

  draw() {
    this.world.ctx.fillStyle = this.isHitted ? 'red' : 'green';
    this.world.ctx.fillRect(this.loc.x, this.loc.y, this.width, this.height);
  }

  hitted(ind) {

    if (!this.life--) {
      this.world.enemies.splice(ind, 1);
      this.world.timers.splice(ind, 1);
    }

    this.world.timers.push(new Timer({
      interval: .1,
      action: () => {
        this.isHitted = false;
      }
    }));

    this.isHitted = true;
    this.world.score += 10;
  }
}

////////////////////////
// HERRO
////////////////////////

class Herro extends Obj {
  constructor(options) {
    super(options);
    this.speed = options.speed;
    this.healthPoints = options.healthPoints;
    this.lateralAcceleration = false;
    this.linearAcceleration = false;

    this.world.events.push(new Event({
      type: 'keyhold',
      keyCode: 65,
      world: this.world,
      callback: () => {
        this.lateralAcceleration = false;
      },
      action: () => {
        this.world.stars.forEach((star) => star.loc.add(new Vec2(getRandom(.1, .2), 0)));
        this.lateralAcceleration = true;

        if (this.loc.x > 0) this.loc.x -= this.linearAcceleration ? this.speed * Math.sqrt(2) / 2 : this.speed;
      }
    }));

    this.world.events.push(new Event({
      type: 'keyhold',
      keyCode: 68,
      world: this.world,
      callback: () => {
        this.lateralAcceleration = false;
      },
      action: () => {
        this.world.stars.forEach((star) => star.loc.add(new Vec2(getRandom(-.1, -.2), 0)));
        this.lateralAcceleration = true;

        if (this.loc.x < this.world.canvasWidth - this.width) this.loc.x += this.linearAcceleration ? this.speed * Math.sqrt(2) / 2 : this.speed;
      }
    }));

    this.world.events.push(new Event({
      type: 'keyhold',
      keyCode: 87,
      world: this.world,
      callback: () => {
        this.linearAcceleration = false;
      },
      action: () => {
        this.world.stars.forEach((star) => star.loc.add(new Vec2(0, getRandom(.1, .2))));
        this.linearAcceleration = true;

        if (this.loc.y > 0) this.loc.y -= this.lateralAcceleration ? this.speed * Math.sqrt(2) / 2 : this.speed;
      }
    }));

    this.world.events.push(new Event({
      type: 'keyhold',
      keyCode: 83,
      world: this.world,
      callback: () => {
        this.linearAcceleration = false;
      },
      action: () => {
        this.world.stars.forEach((star) => star.loc.add(new Vec2(0, getRandom(-.2, -.1))));
        this.linearAcceleration = true;

        if (this.loc.y < this.world.canvasHeight - this.height) this.loc.y += this.lateralAcceleration ? this.speed * Math.sqrt(2) / 2 : this.speed;
      }
    }));

    this.world.events.push(new Event({
      type: 'keyhold',
      keyCode: 32,
      world: this.world,
      throttling: 200,
      action: () => {
        this.world.bullets.push(new Bullet({
          loc: this.loc.clone().add( new Vec2( 0, (this.height - 5) / 2 ) ),
          world: this.world,
          width: 5,
          height: 5,
          color: 'blue',
          speed: 10,
          angle: this.loc.angle(this.loc.clone().add(new Vec2(1, 0)))
        }));
        // console.log('cannon');
      }
    }));

    this.world.events.push(new Event({
      type: 'mousepress',
      world: this.world,
      throttling: 80,
      action: () => {
        let bullLoc = this.loc.clone().add( new Vec2( 0, (this.height - 2) / 2 ) );

        this.world.bullets.push(new Bullet({
          loc: bullLoc,
          world: this.world,
          width: 2,
          height: 2,
          color: 'orange',
          speed: 6,
          angle: bullLoc.angle(this.world.mouseCoords)
        }));
        // console.log('machine');
        // console.log(event.clientX);
      }
    }));

  }

  draw() {
    this.world.ctx.fillStyle = 'orange';
    this.world.ctx.fillRect(this.loc.x, this.loc.y, this.width, this.height);
  }

  hitted(ind) {
    console.log('Game over');
  }
}

////////////////////////
// BULLET
////////////////////////

class Bullet extends Obj {
  constructor(options) {
    super(options);
    this.color = options.color;
    this.speed = options.speed;
    this.angle = options.angle;
  }

  update() {
    this.loc.addPolar(this.angle, this.speed);
  }

  draw() {
    this.world.ctx.fillStyle = this.color;
    this.world.ctx.fillRect(this.loc.x, this.loc.y, this.width, this.height);
  }
}

////////////////////////
// CANNON
////////////////////////

class Cannon extends Bullet {
  constructor(options) {
    super(options);
  }
}

////////////////////////
// GAME
////////////////////////

let game = new World(document.getElementById('canvas'), {
  herroSpeed: 4,
  herroDisperse: 35
});
window.game = game;

game.start();

setInterval(() => {
  document.querySelector('#fps span').innerHTML = game.fps;
  document.querySelector('#score span').innerHTML = game.score;
  game.fps = 0;
}, 1000);

// document.getElementById('herroSpeed').addEventListener('change', function(e) {
//   game.herro.speed = this.value;
// });

// document.getElementById('herroDisperse').addEventListener('change', function(e) {
//   game.herro.disperse = this.value;
// });

}).call(this);